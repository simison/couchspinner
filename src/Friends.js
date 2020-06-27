import React from 'react';
import classnames from 'classnames';

import { Section, Heading, Content, CsProfileLink } from './components';
import './Friends.scss';

function TrustrootsSearch({ search, label }) {
  return (
    search && (
      <a
        href={`https://www.trustroots.org/search/members?ref=couchspinner&ref-location=friends&search=${search}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    )
  );
}

function FriendList({ className, list }) {
  // Does at least one friend on the list have name or username?
  const listHasNames = list.some(
    ({ displayName, username }) => displayName || username,
  );

  return (
    <ul className={classnames('Friendist', className)}>
      {listHasNames && (
        <li className="no-print">
          We had their names from couch requests:
          <strong className="Friendlist-tr-label">
            Search them on Trustroots:
          </strong>
        </li>
      )}
      {list.map(({ id, displayName, username }) => {
        return (
          <li key={id}>
            <strong>
              <CsProfileLink id={id}>
                {displayName || username || `Member ${id}`}
                {username && ` (${username})`}
              </CsProfileLink>
            </strong>
            {(displayName || username) && (
              <span className="Friendlist-tr no-print">
                <span className="Friendlist-tr-label">
                  Search on Trustroots{' '}
                </span>
                {displayName && (
                  <TrustrootsSearch search={displayName} label="by name" />
                )}
                {displayName && username && ' or '}
                {username && (
                  <TrustrootsSearch search={username} label="by username" />
                )}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function Friends({ friends, names }) {
  const friendIds = friends.map(friend => {
    const id = parseInt(
      friend.profile.replace('https://www.couchsurfing.com/users/', ''),
      10,
    );
    const { displayName, username } = names.has(id) ? names.get(id) : {};
    return {
      displayName,
      id,
      username,
    };
  });

  const unknownFriends = friendIds.filter(({ displayName }) => !displayName);
  const knownFriends = friendIds.filter(({ displayName }) => displayName);

  return (
    <Section>
      <Heading>Friends</Heading>
      <Content>
        {!friendIds.length === 0 && <p>No friends. :-(</p>}
        {knownFriends.length > 0 && (
          <>
            <h3>Known friends</h3>
            <FriendList className="Friendlist-known" list={knownFriends} />
          </>
        )}
        {unknownFriends.length > 0 && (
          <>
            <h3>Unknown friends</h3>
            <p>
              Your export file does not have names for these members.
              <br />
              <span className="no-print">
                Some of their profiles might be public so you could try see whom
                they are.
              </span>
            </p>
            <FriendList className="Friendlist-unknown" list={unknownFriends} />
          </>
        )}
      </Content>
    </Section>
  );
}

export default Friends;
