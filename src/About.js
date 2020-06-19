import React, { forwardRef } from 'react'

import { Anchor } from './components';
import './About.css';

const About = forwardRef(({isDragActive, input, aboutRef}, ref) => {
  return (
    <div className="App-landing-section About" id="about" ref={ ref }>
      <h1>About</h1>

      <div className="About-FAQ">
        <h3>Why CouchSpinner exists? <Anchor id="why-couchspinner-exists" /></h3>
        <p>CouchSurfing locked out significant portion of their community by <a href="https://blog.couchsurfing.com/couchsurfing-needs-your-help/">turning into a paid site overnight</a> on May 14, 2020.</p>
        <p>You can recover your data from CouchSurfing, but what can you do with it then?</p>
        <p>With CouchSpinner, you can preview your profile, references and messages again. {/*You could also use CouchSpinner to turn your CouchSurfing profile into a Trustroots profile!*/}</p>

        <h3>How can I export my CouchSurfing profile? <Anchor id="how-can-i-export-my-couchsurfing-profile" /></h3>
        <p>If you can still access your profile, <a href="https://support.couchsurfing.org/hc/en-us/articles/360045738353-Download-your-data">follow these instructions to download your data</a>.</p>
        <p>If you cannot access your profile, you can ask for a copy of your data and to delete your account by contacting Couchsurfing Support at <a href="mailto:support@couchsurfing.com">support@couchsurfing.com</a> or through <a href="mailto:privacy@couchsurfing.com">privacy@couchsurfing.com</a>.</p>

        <h3>Do you store my CouchSurfing profile? <Anchor id="do-you-store-my-couchsurfing-profile" /></h3>
        <p>Nope. Your profile is never uploaded to us — we never see it. Everything happens in your browser only. This is completely secure.</p>

        <h3>Who made this? <Anchor id="who-made-this" /></h3>
        <p>Folks behind <a href="https://www.trustroots.org/?ref=couchspinner">Trustroots.org</a>, a free and community ran hospitality exchange site alternative to CouchSurfing.</p>
        <p>We built the functionality anyway for Trustroots and wanted to give it away for people who don't want to join Trustroots.</p>
        <p>We'd love if you would consider joining Trustroots though! <span role="img" aria-hidden>🙂</span></p>

        <h3>Is this open source? <Anchor id="is-this-open-source" /></h3>
        <p><a href="https://github.com/simison/couchspinner">Yep!</a> Feel free to help out.</p>

        <h3>What are other alternatives to CouchSurfing? <Anchor id="couchsurfing-alternatives" /></h3>
        <p>In addition to <a href="https://www.trustroots.org/?ref=couchspinner">Trustroots</a>, you could check <a href="https://www.bewelcome.org/">BeWelcome</a>, <a href="https://www.warmshowers.org/">Warmshowers</a> and <a href="https://hackercouch.com/">Hackercouch</a>.</p>

        <h3>Not all my data is here! <Anchor id="not-all-my-data-is-here" /></h3>
        <p>Could be! Please check "raw" tab of your profile to browser what the file actually contains and what we are showing.</p>
        <p>The preview doesn't show everything, but also the file from CouchSurfing could be only partial. They've elaborated that <a href="https://www.facebook.com/groups/253525915764545/?post_id=274543140329489&comment_id=274552816995188&reply_comment_id=274560876994382">some of the very old data might've been lost</a>. You should reach out to CouchSurfing for any specifics though.</p>
      </div>

    </div>
  );
});

export default About;
