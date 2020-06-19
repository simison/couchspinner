import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import './Profile.css';
import { formatDate } from './utils';
import { Section, CsProfileLink } from './components';
import AboutMe from './AboutMe';
import Friends from './Friends';
import Images from './Images';
import Messages from './Messages';
import Raw from './Raw';
import References from './References';
import TrustrootsTree from './trustroots-tree.svg';

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

  return (
    <Router>
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
            { routes.map(({ route, label, count }) => (
              <li key={route}>
                <NavLink activeClassName="is-active" to={ route }>
                  { label }
                  { !! count && <span className="Profile-tab-count">{ count }</span> }
                </NavLink>
              </li>
            )) }
          </ul>
        </Section>

        <Switch>
          <Route exact path="/">
            <AboutMe user={ user } interests={ interests } />
          </Route>
          <Route path="/references">
            <References references={ references } />
          </Route>
          <Route path="/friends">
            <Friends friends={ friends?.friends || [] } />
          </Route>
          <Route path="/messages">
            <Messages messages={ messages?.messages || [] } />
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
