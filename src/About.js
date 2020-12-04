import React from 'react';

import { scrollToElementById } from './utils';
import './About.css';

function FaqHeading({ children, id }) {
  return (
    <h3 id={id}>
      <a
        className="Anchor"
        href={`#${id}`}
        onClick={scrollToElementById}
        title="Link here"
      >
        #
      </a>
      {children}
    </h3>
  );
}

function About({ isDragActive, input }) {
  return (
    <div className="App-landing-section About" id="about">
      <h1>About</h1>

      <div className="About-FAQ">
        <FaqHeading id="how-can-i-export-my-couchsurfing-profile">
          How can I export my CouchSurfing profile?{' '}
        </FaqHeading>
        <p>
          If you can still access your profile,{' '}
          <a href="https://support.couchsurfing.org/hc/en-us/articles/360045738353-Download-your-data">
            follow these instructions to download your data
          </a>
          .
        </p>
        <p>
          If you cannot access your profile, you can ask for a copy of your data
          and to delete your account by contacting Couchsurfing Support at{' '}
          <a href="mailto:support@couchsurfing.com">support@couchsurfing.com</a>{' '}
          or through{' '}
          <a href="mailto:privacy@couchsurfing.com">privacy@couchsurfing.com</a>
          .
        </p>

        <FaqHeading id="why-couchspinner-exists">
          Why CouchSpinner exists?
        </FaqHeading>
        <p>
          CouchSurfing locked out a significant portion of their community by{' '}
          <a href="https://blog.couchsurfing.com/couchsurfing-needs-your-help/">
            turning into a paid site overnight
          </a>{' '}
          on May 14, 2020.
        </p>
        <p>
          You can recover your data from CouchSurfing, but what can you do with
          it then?
        </p>
        <p>
          With CouchSpinner, you can preview your profile, references, and
          messages again!
        </p>

        <FaqHeading id="who-made-this">Who made this?</FaqHeading>
        <p>
          Folks behind{' '}
          <a href="https://www.trustroots.org/?ref=couchspinner&ref-location=faq">
            Trustroots.org
          </a>
          , a free and community-run hospitality exchange site you can use
          instead of CouchSurfing.
        </p>
        <p>
          We built the functionality anyway for Trustroots and wanted to give it
          away for everyone.
        </p>
        <p>
          We'd love it if you would also join Trustroots, of course!{' '}
          <span role="img" aria-hidden>
            🙂
          </span>
        </p>

        <FaqHeading id="do-you-store-my-couchsurfing-profile">
          Do you store my CouchSurfing profile?{' '}
        </FaqHeading>
        <p>
          Nope. Your profile is never uploaded to us — we never see it.
          Everything happens in your browser only. This is completely secure.
        </p>

        <FaqHeading id="it-did-not-work">It didn't work!</FaqHeading>
        <p>
          Oh no!{' '}
          <a href="https://couchspinner.wordpress.com/">Please get in touch</a>{' '}
          with Mikael to see if we can help.
        </p>

        <FaqHeading id="couchsurfing-alternatives">
          What are other alternatives to CouchSurfing?
        </FaqHeading>
        <p>
          You could check{' '}
          <a href="https://www.trustroots.org/?ref=couchspinner&ref-location=faq">
            Trustroots
          </a>
          , <a href="https://www.bewelcome.org/">BeWelcome</a>,{' '}
          <a href="https://www.warmshowers.org/">Warmshowers</a>, and{' '}
          <a href="https://hackercouch.com/">Hackercouch</a>.
        </p>

        <FaqHeading id="i-see-only-some-names">
          I see only some names, but not everyone?
        </FaqHeading>
        <p>
          Most of the Couchsurfing export doesn't contain names of other
          profiles, only user IDs. There are a few names available from "couch
          requests", which then we can show elsewhere too.
        </p>

        <FaqHeading id="not-all-my-data-is-here">
          Not all my data is here!
        </FaqHeading>
        <p>
          Could be! Please check the "raw" tab of your profile to see what the
          file actually contains and what we are showing.
        </p>
        <p>
          The preview doesn't show everything, but also the file from
          CouchSurfing could be only partial. They've elaborated that{' '}
          <a href="https://www.facebook.com/groups/253525915764545/?post_id=274543140329489&comment_id=274552816995188&reply_comment_id=274560876994382">
            some of the very old data might've been lost
          </a>
          . You should reach out to CouchSurfing for any specifics, though.
        </p>

        <FaqHeading id="is-this-open-source">Is this open-source?</FaqHeading>
        <p>
          <a href="https://github.com/simison/couchspinner">Yep!</a> Feel free
          to help out.
        </p>
      </div>
    </div>
  );
}

export default About;
