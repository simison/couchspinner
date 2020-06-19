import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './Profile.scss';
import { formatDate } from './utils';
import { Section, CsProfileLink, Tabs } from './components';
import AboutMe from './AboutMe';
import Friends from './Friends';
import Images from './Images';
import Messages from './Messages';
import Raw from './Raw';
import References from './References';
import TrustrootsTree from './trustroots-tree.svg';
import { STORAGE_PREFIX } from './constants';

function Profile({profile, images, fileDate}) {
  const { user_data: user, interests, references, friends, messages } = profile;

  const referencesCount = (references?.written_references?.length ?? 0) + (references?.received_references?.length ?? 0);
  const friendsCount = friends?.friends?.length ?? 0;
  // const messagesCount = messages?.messages?.length ?? 0;
  const imagesCount = images?.length ?? 0;
  const routes = [
    { route: '/', label: 'About me' },
    { route: '/references', label: 'References', count: referencesCount },
    { route: '/friends', label: 'Friends', count: friendsCount },
    // { route: '/messages', label: 'Messages', count: messagesCount },
    { route: '/images', label: 'Images', count: imagesCount },
    { route: '/raw', label: 'Raw' }
  ];

  const clearCache = () => {
    window.sessionStorage.removeItem(`${STORAGE_PREFIX}_profile`);
    window.sessionStorage.removeItem(`${STORAGE_PREFIX}_profile_images`);
  };

  return (
    <Router>
      <div className="Profile">
        <div className="Profile-header">
          <p>
            <em>
              <CsProfileLink id={user?.id}>Your Couchsurfing.com profile</CsProfileLink>
              { fileDate && ` as of ${ formatDate(fileDate) }` }
            </em>
            <a
              href="/"
              className="Profile-clear"
              onClick={ clearCache }
            >
              Clear profile
            </a>
          </p>
          <h1>
            { user?.profile?.first_name && `${user.profile.first_name} ` }
            { user?.profile?.last_name && `${user.profile.last_name} ` }
            { user?.username && `(${user.username})` }
          </h1>
          { user?.profile?.occupation && <h3>{ user.profile.occupation }</h3> }
        </div>

        <Section>
          <Tabs routes={ routes } />
        </Section>

        <Switch>
          <Route exact path="/">
            <AboutMe user={ user } interests={ interests } />
          </Route>
          <Route path="/references">
            <References references={ references } userId={ user?.id } />
          </Route>
          <Route path="/friends">
            <Friends friends={ friends?.friends || [] } />
          </Route>
          <Route path="/messages">
            <Messages messages={ messages?.messages || [] } userId={ user?.id } />
          </Route>
          <Route path="/images">
            <Images images={ images } />
          </Route>
          <Route path="/raw">
            <Raw json={ profile } />
          </Route>
        </Switch>

        <div className="promo">
          <a href="https://www.trustroots.org/?ref=couchspinner" target="_blank" rel="noopener noreferrer">
            <img src={TrustrootsTree} className="tr-logo" alt="Trustroots" /><br />
            Join Trustroots.org<br />
            Travellers hospitality community.
          </a>
        </div>
      </div>
    </Router>
  );
}

export default Profile;
