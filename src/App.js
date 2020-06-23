import React, { useCallback, useState, useEffect, createRef } from 'react';
import { useDropzone } from 'react-dropzone';
import jszip from 'jszip';
import classnames from 'classnames';

import './App.scss';
import About from './About';
import Intro from './Intro';
import Profile from './Profile';
import { testStorage } from './utils';
import { STORAGE_PREFIX } from './constants';
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
  const files = zip.filter((relativePath, zipEntry) => {
    return (
      !zipEntry.dir &&
      ['jpg', 'gif', 'png'].includes(zipEntry.name.split('.').pop())
    );
  });

  const imageProcessor = files.map(async file => {
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
    images,
    json,
  };
}

function getNamesFromJson(json) {
  const names = new Map();

  const collectName = visit => {
    const person = visit?.surfer || visit?.host || {};
    const username = person?.username;
    const id = person?.profile?.id;
    const displayName = person?.profile?.display_name;
    names.set(id, { displayName, username });
  };

  if (json?.couch_visits?.host_couch_visits) {
    json.couch_visits.host_couch_visits.forEach(collectName);
  }

  if (json?.couch_visits?.surfer_couch_visits) {
    json.couch_visits.surfer_couch_visits.forEach(collectName);
  }

  return names;
}

function setCacheValue(key, value) {
  try {
    window.sessionStorage.setItem(`${STORAGE_PREFIX}_${key}`, value);
  } catch (error) {
    console.error(error);
  }
}

function App() {
  const isStorageAvailable = testStorage('sessionStorage');

  // Re-hydrade previous cache
  const cachedFileDate =
    isStorageAvailable &&
    window.sessionStorage.getItem(`${STORAGE_PREFIX}_file_date`);
  const cachedProfile =
    isStorageAvailable &&
    JSON.parse(window.sessionStorage.getItem(`${STORAGE_PREFIX}_profile`));
  const cachedProfileImages =
    isStorageAvailable &&
    JSON.parse(
      window.sessionStorage.getItem(`${STORAGE_PREFIX}_profile_images`),
    );
  const cachedNames = cachedProfile
    ? getNamesFromJson(cachedProfile)
    : new Map();

  const [profile, setProfile] = useState(cachedProfile || EXAMPLE_PROFILE);
  const [profileImages, setProfileImages] = useState(cachedProfileImages || []);
  const [names, setNames] = useState(cachedNames);
  const [fileDate, setFileDate] = useState(cachedFileDate || false);
  const [isProcessing, setIsProcessing] = useState(false);
  const ref = createRef();

  // Store for the browser session — gets cleaared out when closing tab but not on page refresh
  useEffect(() => {
    if (isStorageAvailable) {
      setCacheValue('file_date', fileDate);
      setCacheValue('profile_images', JSON.stringify(profileImages));
      setCacheValue('profile', JSON.stringify(profile));
    }
  }, [isStorageAvailable, profile, profileImages, fileDate]);

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
      return alert(
        'Please drop either the zip file or json file.\n\nE.g. "couchsurfing-export-123456-202005200751.zip", or "123456-202005200751.json"',
      );
    }

    setFileDate(file.lastModifiedDate);

    if (file.type === 'application/zip') {
      const { json, images } = await extractZip(file);
      const names = getNamesFromJson(json);
      setProfile(json);
      setNames(names);
      setProfileImages(images);
    } else if (file.type === 'application/json') {
      const jsonProfile = await file.text();
      try {
        const json = JSON.parse(jsonProfile);
        const names = getNamesFromJson(json);
        setProfile(json);
        setNames(names);
      } catch {
        alert('File is little too funky for us to understand... 😥');
      }
    }

    setIsProcessing(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={classnames('App', { 'is-processing': isProcessing })}>
      {profile ? (
        <Profile
          fileDate={fileDate}
          images={profileImages}
          names={names}
          profile={profile}
        />
      ) : (
        <>
          <div
            className={classnames('drop-container', {
              'is-dropping': isDragActive,
            })}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Intro aboutRef={ref} />
          </div>
          <About ref={ref} />
        </>
      )}
    </div>
  );
}

export default App;
