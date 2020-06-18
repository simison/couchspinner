import marked from 'marked';
import React from 'react'

import { Section, Heading, Content } from './components';
import './AboutMe.css';

function AboutMe({user, interests}) {
  return (
    <Section>
      <Heading>About me</Heading>
      <Content>
        { user?.profile?.about_me && (
          <span dangerouslySetInnerHTML={{ __html: marked(user.profile.about_me) }} />
        ) }
        { user?.profile?.about_me && (
          <span dangerouslySetInnerHTML={{ __html: marked(user.profile.about_me) }} />
        ) }
        { user?.profile?.interests && (
          <>
            <p><strong>More about my interests</strong></p>
            <span dangerouslySetInnerHTML={{ __html: marked(user.profile.interests) }} />
            { interests?.interests && (
              <ul className="AboutMe-interests">
              { interests.interests.map(interest => (
                <li key={interest.name}>{interest.name}</li>
              )) }
              </ul>
            ) }
          </>
        ) }
        { user?.profile?.media && (
          <>
            <p><strong>My Favorite Music, Movies & Books</strong></p>
            <span dangerouslySetInnerHTML={{ __html: marked(user.profile.media) }} />
          </>
        ) }
        { user?.profile?.teach && (
          <>
            <p><strong>Teach, Learn, Share</strong></p>
            <span dangerouslySetInnerHTML={{ __html: marked(user.profile.teach) }} />
          </>
        ) }
        { user?.profile?.amazing_thing && (
          <>
            <p><strong>One Amazing Thing I've Done</strong></p>
            <span dangerouslySetInnerHTML={{ __html: marked(user.profile.amazing_thing) }} />
          </>
        ) }
        { user?.profile?.surf_reason && (
          <>
            <p><strong>Why I'm on Couchsurfing</strong></p>
            <span dangerouslySetInnerHTML={{ __html: marked(user.profile.surf_reason) }} />
          </>
        ) }
        { user?.profile?.offer_hosts && (
          <>
            <p><strong>What I Can Share With Hosts</strong></p>
            <span dangerouslySetInnerHTML={{ __html: marked(user.profile.offer_hosts) }} />
          </>
        ) }
      </Content>
    </Section>
  );
}

export default AboutMe;
