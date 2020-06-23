import React from 'react';

import { Section, Heading, Content, CsProfileName } from './components';

function AboutMe({ friends, names }) {
  return (
    <Section>
      <Heading>Friends</Heading>
      <Content>
        {friends.length ? (
          <ul>
            {friends.map(friend => {
              const id = parseInt(
                friend.profile.replace(
                  'https://www.couchsurfing.com/users/',
                  '',
                ),
                10,
              );
              return (
                <li key={id}>
                  <CsProfileName
                    names={names}
                    id={id}
                    alt={friend.profile.replace('https://www.', '')}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          'No friends. :-('
        )}
      </Content>
    </Section>
  );
}

export default AboutMe;
