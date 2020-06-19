import React, { useState } from 'react'

import './Profile.css';
import { Section, CsProfileLink } from './components';
import { formatDate } from './utils';
import References from './References';
import AboutMe from './AboutMe';
import Messages from './Messages';
import Friends from './Friends';
import Raw from './Raw';
import classnames from 'classnames';
import TrustrootsTree from './trustroots-tree.svg';

function Profile({profile, images, fileDate}) {
  const { user_data: user, interests, references, friends, messages } = profile;
  const [page, setPage] = useState('about-me');

  const referencesCount = (references?.written_references?.length ?? 0) + (references?.received_references?.length ?? 0);
  const friendsCount = friends?.friends?.length ?? 0;
  const messagesCount = messages?.messages?.length ?? 0;

  return (
    <>
      <div className="Profile">
        <div className="Profile-header">
          <p><em>
            <CsProfileLink id={user?.id}>Your Couchsurfing.com profile</CsProfileLink>
            { fileDate && ` as of ${ formatDate(fileDate) }` }
          </em></p>
          <h1>
            { user?.profile?.first_name && `${user.profile.first_name} ` }
            { user?.profile?.last_name && `${user.profile.last_name} ` }
            { user?.username && `(${user.username})` }
          </h1>
          { user?.profile?.occupation && <h3>{ user.profile.occupation }</h3> }
        </div>

        <Section>
          <ul className="Profile-tabs">
            {
              [
                { slug: 'about-me', label: 'About me' },
                { slug: 'references', label: 'References', count: referencesCount },
                { slug: 'friends', label: 'Friends', count: friendsCount },
                { slug: 'messages', label: 'Messages', count: messagesCount },
                { slug: 'raw', label: 'Raw' }
              ].map(({slug, label, count}) => (
                <li key={slug}>
                  <button
                    className={ classnames( { 'is-active': slug === page } ) }
                    onClick={ () => setPage(slug) }
                  >
                    { label }
                    { count && <span className="Profile-tab-count">{ count }</span> }
                  </button>
                </li>
              ))
            }
          </ul>
        </Section>
        { page === 'about-me' && <AboutMe user={ user } interests={ interests } /> }
        { page === 'references' && <References references={ references } /> }
        { page === 'friends' && <Friends friends={ friends?.friends || [] } /> }
        { page === 'messages' && <Messages messages={ messages?.messages || [] } /> }
        { page === 'raw' && <Raw json={ profile } /> }
        <div className="promo">
          <a href="https://www.trustroots.org/?ref=couchspinner" target="_blank" rel="noopener noreferrer">
            <img src={TrustrootsTree} className="tr-logo" alt="Trustroots" /><br />
            Join Trustroots.org<br />
            Travellers hospitality community.
          </a>
        </div>
      </div>
    </>
  );
}

export default Profile;
