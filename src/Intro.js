import React from 'react'

import sofa from './sofa.svg';
import './Intro.css';
import { scrollToRef } from './utils';

const stopUploadsFromTriggering = event => { event.stopPropagation(); };

function Intro({isDragActive, input, aboutRef}) {
  return (
    <div className="App-landing-section Intro">
      <h1>CouchSpinner</h1>
      { /* https://www.flaticon.com/free-icon/sofa_2965901?term=sofa&page=1&position=39 */ }
      <img src={sofa} className="Intro-logo" alt="logo" />
      { input }
      <div className="Intro-instructions">
        {
          isDragActive ?
            <p>Drop the file here...</p> :
            <p>Look into your Couchsurfing profile by dropping the export file here, or click to select file.</p>
        }
      </div>
      <p>
        <a href="#about" onClick={ event => {
          stopUploadsFromTriggering(event);
          event.preventDefault();
          scrollToRef(aboutRef);
        }}>
          Read more
        </a>
        <br /><br />
        <a
          className="Intro-by-link"
          onClick={stopUploadsFromTriggering}
          href="https://www.trustroots.org/?ref=couchspinner"
        >
          By Trustroots
        </a>
      </p>
    </div>
  );
};

export default Intro;
