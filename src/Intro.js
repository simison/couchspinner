import React from 'react'

import sofa from './sofa.svg';
import './Intro.css';

function Intro({isDragActive, input}) {
  return (
    <div className="Intro">
      <h1>CouchSpinner</h1>
      { /* https://www.flaticon.com/free-icon/sofa_2965901?term=sofa&page=1&position=39 */ }
      <img src={sofa} className="Intro-logo" alt="logo" />
      { input }
      {
        isDragActive ?
          <p>Drop the file here...</p> :
          <p>Drop the Couchsurfing profile file here, or click to select file.</p>
      }
      <p>By <a onClick={event => { event.stopPropagation() }} href="https://www.trustroots.org/?ref=couchspinner">Trustroots</a></p>
    </div>
  );
}

export default Intro;
