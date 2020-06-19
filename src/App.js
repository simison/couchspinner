import React, {useCallback, useState, createRef} from 'react';
import {useDropzone} from 'react-dropzone';
import jszip from 'jszip';
import classnames from 'classnames';

import './App.css';
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

function App() {
  const [profile, setProfile] = useState(EXAMPLE_PROFILE);
  const [profileImages, setProfileImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileDate, setFileDate] = useState(false);
  const ref = createRef();

  const onDrop = useCallback(async acceptedFiles => {
    setIsProcessing(true);

    if (acceptedFiles.length !== 1) {
      setIsProcessing(false);
      return alert('Just one file please.');
    }

    const file = acceptedFiles[0];

    if (!['application/zip', 'application/json'].includes(file.type)) {
      setIsProcessing(false);
      return alert('Please drop either the zip file or json file, e.g. "couchsurfing-export-123456-202005200751.zip", or "123456-202005200751.json"');
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
              <Intro
                aboutRef={ ref }
                input={ <input {...getInputProps() } />}
                isDragActive={ isDragActive }
              />
            </div>
            <About ref={ ref }/>
          </>
        )
      }
    </div>
  );
}

export default App;
