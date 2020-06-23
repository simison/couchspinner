import React from 'react';

import './Intro.scss';
import { scrollToRef } from './utils';
import sofa from './sofa.svg';

const stopUploadsFromTriggering = event => {
  event.stopPropagation();
};

function Intro({ aboutRef }) {
  return (
    <div className="App-landing-section Intro">
      <h1>CouchSpinner</h1>
      <h2>Preview Couchsurfing profile exports</h2>
      {/* https://www.flaticon.com/free-icon/sofa_2965901?term=sofa&page=1&position=39 */}
      <img src={sofa} className="Intro-logo" alt="logo" />
      <div className="Intro-instructions">
        <p>Drop the export file here, or click to select it.</p>
      </div>
      <p>
        <a
          href="#about"
          onClick={event => {
            stopUploadsFromTriggering(event);
            event.preventDefault();
            scrollToRef(aboutRef);
          }}
        >
          Read more
        </a>
        <br />
        <br />
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
}

export default Intro;
