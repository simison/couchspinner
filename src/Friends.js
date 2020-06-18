import React from 'react'

import { Section, Heading, Content, CsProfileLink } from './components';

function AboutMe({friends}) {
  return (
    <Section>
      <Heading>Friends</Heading>
      <Content>
        { friends.length ? (
          <ul>
          { friends.map(friend => {
            const id = parseInt(friend.profile.replace('https://www.couchsurfing.com/users/', ''), 10);
            return (
              <li key={id}>
                <CsProfileLink id={id}>{friend.profile}</CsProfileLink>
              </li>
            );
          }) }
          </ul>
        ) : 'No friends. :-(' }
      </Content>
    </Section>
  );
}

export default AboutMe;
