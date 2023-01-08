import CopyToClipboard from 'copy-to-clipboard';
import { marked } from 'marked';
import React from 'react';
// import ReactDOMServer from 'react-dom/server';

import { Section, Heading, Content, Button } from './components';
import './AboutMe.scss';

function ProfileContent({ profile, interests }) {
  if (!profile) {
    return <p>Your profile looks empty!</p>;
  }

  return (
    <>
      {profile?.about_me && (
        <span dangerouslySetInnerHTML={{ __html: marked(profile.about_me) }} />
      )}
      {profile?.about_me && (
        <span dangerouslySetInnerHTML={{ __html: marked(profile.about_me) }} />
      )}
      {profile?.interests && (
        <>
          <p>
            <strong>More about my interests</strong>
          </p>
          <span
            dangerouslySetInnerHTML={{
              __html: marked(profile.interests),
            }}
          />
          {interests?.interests && (
            <ul className="AboutMe-interests">
              {interests.interests.map(interest => (
                <li key={interest.name}>{interest.name}</li>
              ))}
            </ul>
          )}
        </>
      )}
      {profile?.media && (
        <>
          <p>
            <strong>My Favorite Music, Movies & Books</strong>
          </p>
          <span dangerouslySetInnerHTML={{ __html: marked(profile.media) }} />
        </>
      )}
      {profile?.teach && (
        <>
          <p>
            <strong>Teach, Learn, Share</strong>
          </p>
          <span dangerouslySetInnerHTML={{ __html: marked(profile.teach) }} />
        </>
      )}
      {profile?.amazing_thing && (
        <>
          <p>
            <strong>One Amazing Thing I've Done</strong>
          </p>
          <span
            dangerouslySetInnerHTML={{
              __html: marked(profile.amazing_thing),
            }}
          />
        </>
      )}
      {profile?.surf_reason && (
        <>
          <p>
            <strong>Why I'm on Couchsurfing</strong>
          </p>
          <span
            dangerouslySetInnerHTML={{
              __html: marked(profile.surf_reason),
            }}
          />
        </>
      )}
      {profile?.offer_hosts && (
        <>
          <p>
            <strong>What I Can Share With Hosts</strong>
          </p>
          <span
            dangerouslySetInnerHTML={{
              __html: marked(profile.offer_hosts),
            }}
          />
        </>
      )}
    </>
  );
}

function AboutMe({ user, interests }) {
  const copy = () => {
    /*
    // Generate static HTML from React component
    const profileElement = ProfileContent({profile: user?.profile, interests});
    const html = ReactDOMServer.renderToString(profileElement);

    // Strip out HTML for copying
    // @TODO: this losts newlines :-( https://stackoverflow.com/a/50230647
    // @TODO: can we preserve some HTML and copy-paste that to Trustroots?
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent || div.innerText || '';
    */

    const text = document.querySelector('.Section-content').textContent;
    console.log('text:', text);
    CopyToClipboard(text, {
      format: 'text/plain',
    });
  };

  return (
    <Section>
      <Heading>
        About me
        <Button onClick={copy} className="AboutMe-copy">
          Copy profile to clipboard
        </Button>
      </Heading>
      <Content>
        <ProfileContent profile={user?.profile} interests={interests} />
      </Content>
    </Section>
  );
}

export default AboutMe;
