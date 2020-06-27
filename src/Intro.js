import React from 'react';

import './Intro.scss';
import { scrollToElementById } from './utils';
import sofa from './sofa.svg';

function Intro() {
  return (
    <div className="App-landing-section Intro">
      <h1>CouchSpinner</h1>
      <h2>Preview Couchsurfing profile export files</h2>
      {/* https://www.flaticon.com/free-icon/sofa_2965901?term=sofa&page=1&position=39 */}
      <img src={sofa} className="Intro-logo" alt="logo" />
      <button className="Intro-instructions">
        Drop the file here,
        <br />
        or click to select it.
      </button>
      <p>
        <a
          href="#how-can-i-export-my-couchsurfing-profile"
          onClick={scrollToElementById}
        >
          How do I get CouchSurfing profile export file?
        </a>
        <br />
        <br />
        <a href="#about" onClick={scrollToElementById}>
          Read more
        </a>
        <br />
        <br />
        <a
          className="Intro-by-link"
          onClick={event => event.stopPropagation()}
          href="https://www.trustroots.org/?ref=couchspinner"
        >
          By Trustroots
        </a>
      </p>
    </div>
  );
}

export default Intro;
