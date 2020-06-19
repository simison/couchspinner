import {useDropzone} from 'react-dropzone';
import classnames from 'classnames';
import jszip from 'jszip';
import React, {useCallback, useState, useEffect, createRef} from 'react';

import './App.css';
import { fetchUserProfiles } from './worker';
import { STORAGE_PREFIX } from './constants';
import About from './About';
import Intro from './Intro';
import Profile from './Profile';
// import example from './example-profile.json';
const EXAMPLE_PROFILE = false;

async function getJsonFromZip(zip) {
  const files = zip.filter((relativePath, zipEntry) => {
    return !zipEntry.dir && zipEntry.name.split('.').pop() === 'json';
  });

  if (!files.length) {
    return false;
  }

  const jsonString = await zip.file(files[0].name).async('string');

  try {
    const json = JSON.parse(jsonString);
    return json;
  } catch {
    return false;
  }
}

async function getImagesFromZip(zip) {
  const files =  zip.filter((relativePath, zipEntry) => {
    return !zipEntry.dir && ['jpg', 'gif', 'png'].includes(zipEntry.name.split('.').pop());
  });

  const imageProcessor = files.map(async (file) => {
    const blob = await zip.file(file.name).async('blob');
    const urlCreator = window.URL || window.webkitURL;
    const blobUrl = urlCreator.createObjectURL(blob);

    return {
      blobUrl,
      id: file.name,
    };
  });

  const images = await Promise.all(imageProcessor);

  return images;
}

async function extractZip(file) {
  const zip = await jszip.loadAsync(file);
  const json = await getJsonFromZip(zip);
  const images = await getImagesFromZip(zip);

  return {
    json,
    images,
  };
}

function collectUserIds(profile) {
  const { references, friends } = profile;

  // Pull lists of IDs we're interested
  // Basically just other people's IDs, not your own
  const idsFromReceivedReferences = references ? references.received_references.map(reference => reference.creator_id) : [];
  const idsFromWrittenReferences = references ? references.written_references.map(reference => reference.recipient_id) : [];
  const idsFromFriends = friends ? friends.friends.map(friend => parseInt(friend.profile.replace('https://www.couchsurfing.com/users/', ''), 10)) : [];

  // Combine above arrays
  const all = [
    ...idsFromReceivedReferences,
    ...idsFromWrittenReferences,
    ...idsFromFriends,
  ];

  // Use Set to create unique array
  return [...new Set(all)];
}

function App() {
  // Re-hydrade previous cache
  const cachedProfile = JSON.parse(window.sessionStorage.getItem(`${STORAGE_PREFIX}_profile`));
  const cachedProfileImages = JSON.parse(window.sessionStorage.getItem(`${STORAGE_PREFIX}_profile_images`));

  const [profile, setProfile] = useState(cachedProfile || EXAMPLE_PROFILE);
  const [profileImages, setProfileImages] = useState(cachedProfileImages || []);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileDate, setFileDate] = useState(false);
  const ref = createRef();

  // Store for the browser session
  useEffect(() => {
    window.sessionStorage.setItem(`${STORAGE_PREFIX}_profile`, JSON.stringify(profile));
    window.sessionStorage.setItem(`${STORAGE_PREFIX}_profile_images`, JSON.stringify(profileImages));
  }, [profile, profileImages]);

  // Send different user IDs from the profile to worker for profile fetching
  useEffect(() => {
    const allUserIds = collectUserIds(profile);
    fetchUserProfiles(allUserIds);
  }, [profile]);

  // On uploading file(s)
  const onDrop = useCallback(async acceptedFiles => {
    setIsProcessing(true);

    if (acceptedFiles.length !== 1) {
      setIsProcessing(false);
      return alert('Just one file please.');
    }

    const file = acceptedFiles[0];

    if (!['application/zip', 'application/json'].includes(file.type)) {
      setIsProcessing(false);
      return alert('Please drop either the zip file or json file.\n\nE.g. "couchsurfing-export-123456-202005200751.zip", or "123456-202005200751.json"');
    }

    setFileDate(file.lastModifiedDate);

    if (file.type === 'application/zip') {
      const { json, images } = await extractZip(file);
      setProfile(json);
      setProfileImages(images);
    } else if (file.type === 'application/json') {
      const jsonProfile = await file.text();
      try {
        const json = JSON.parse(jsonProfile)
        setProfile(json);
      } catch {
        alert('File is little too funky for us to understand... 😥');
      }
    }

    setIsProcessing(false);
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <div className={ classnames( 'App', { 'is-processing': isProcessing } ) }>
      { profile
        ? <Profile profile={ profile } images={ profileImages } fileDate={ fileDate } />
        : (
          <>
            <div className={ classnames( 'drop-container', { 'is-dropping': isDragActive } ) } {...getRootProps()}>
              <input {...getInputProps() } />
              <Intro aboutRef={ ref }/>
            </div>
            <About ref={ ref }/>
          </>
        )
      }
    </div>
  );
}

export default App;
