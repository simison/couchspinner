import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import jszip from 'jszip';

import './App.css';
import Intro from './Intro';
import Profile from './Profile';
const exampleProfile = false;

async function getJsonFromZip(zip) {
  const files = zip.filter((relativePath, zipEntry) => {
    return !zipEntry.dir && zipEntry.name.split('.').pop() === 'json';
  });

  if (!files.length) {
    return false;
  }

  const jsonString = await zip.file(files[0].name).async('string');

  try {
    const json = JSON.parse(jsonString)
    return json;
  } catch {
    return false;
  }
}

function getImagesFromZip(zip) {
  // eslint-disable-next-line
  const files =  zip.filter((relativePath, zipEntry) => {
    return !zipEntry.dir && ['jpg', 'gif', 'png'].includes(zipEntry.name.split('.').pop());
  });

  return {};
}

async function extractZip(file) {
    const zip = await jszip.loadAsync(file); // .then(async (zip) => {
    const json = await getJsonFromZip(zip);
    const images = await getImagesFromZip(zip);

    console.log(json,images);
    return {
      json,
      images,
    };
}

function App() {
  const [profile, setProfile] = useState(exampleProfile || false);
  const [profileImages, setProfileImages] = useState({});

  const onDrop = useCallback(async acceptedFiles => {
    console.log('acceptedFiles:',acceptedFiles);

    if (acceptedFiles.length !== 1) {
      return alert('Just one file please.');
    }

    const file = acceptedFiles[0];

    if (!['application/zip', 'application/json'].includes(file.type)) {
      return alert('Please drop either the zip file or json file, e.g. "couchsurfing-export-123456-202005200751.zip", or "123456-202005200751.json"');
    }

    if (file.type === 'application/zip') {
      const { json, images } = extractZip(file);
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
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <div className={ `App${isDragActive ? ' is-dropping' : ''}` } {...getRootProps()}>
      { profile
        ? <Profile profile={ profile } images={ profileImages } />
        : <Intro isDragActive={ isDragActive } input={ <input {...getInputProps() } />} />
      }
    </div>
  );
}

export default App;
