import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import React, { Suspense, lazy } from 'react';

import './Profile.scss';
import { formatDate } from './utils';
import { Section, CsProfileLink, Tabs, Loading } from './components';
import AboutMe from './AboutMe';
import Friends from './Friends';
import Images from './Images';
import Messages from './Messages';
import Raw from './Raw';
import References from './References';
import TrustrootsTree from './trustroots-tree.svg';

// Slow rendering elements
const Messages = lazy(() => import('./Messages'));
const References = lazy(() => import('./References'));

function Profile({ fileDate, images, names, profile }) {
  const { user_data: user, interests, references, friends, messages } = profile;

  const referencesCount =
    (references?.written_references?.length ?? 0) +
    (references?.received_references?.length ?? 0);
  const friendsCount = friends?.friends?.length ?? 0;
  // const messagesCount = messages?.messages?.length ?? 0;
  const imagesCount = images?.length ?? 0;
  const routes = [
    { route: '/', label: 'About me' },
    { route: '/references', label: 'References', count: referencesCount },
    { route: '/friends', label: 'Friends', count: friendsCount },
    // { route: '/messages', label: 'Messages', count: messagesCount },
    { route: '/images', label: 'Images', count: imagesCount },
    { route: '/raw', label: 'Raw' },
  ];

  const clearSessionStorage = () => {
    try {
      window.sessionStorage.clear();
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
    }
  };

  return (
    <Router>
      <div className="Profile">
        <div className="Profile-header">
          <p>
            <em>
              <CsProfileLink id={user?.id}>
                Your Couchsurfing.com profile
              </CsProfileLink>
              {fileDate && ` as of ${formatDate(fileDate)}`}
            </em>
            <a href="/" className="Profile-clear" onClick={clearSessionStorage}>
              Clear out the profile
            </a>
          </p>
          <h1>
            {user?.profile?.first_name && `${user.profile.first_name} `}
            {user?.profile?.last_name && `${user.profile.last_name} `}
            {user?.username && `(${user.username})`}
          </h1>
          {user?.profile?.occupation && <h3>{user.profile.occupation}</h3>}
        </div>

        <Section>
          <Tabs routes={routes} />
        </Section>

        <Switch>
          <Route exact path="/">
            <AboutMe user={user} interests={interests} />
          </Route>
          <Route path="/references">
            <Suspense fallback={<Loading>References</Loading>}>
              <References
                names={names}
                references={references}
                userId={user?.id}
              />
            </Suspense>
          </Route>
          <Route path="/friends">
            <Friends names={names} friends={friends?.friends || []} />
          </Route>
          <Route path="/messages">
            <Suspense fallback={<Loading>Messages</Loading>}>
              <Messages
                messages={messages?.messages || []}
                userId={user?.id}
                names={names}
              />
            </Suspense>
          </Route>
          <Route path="/images">
            <Images images={images} />
          </Route>
          <Route path="/raw">
            <Raw json={profile} />
          </Route>
        </Switch>

        <div className="promo">
          <a
            href="https://www.trustroots.org/?ref=couchspinner"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={TrustrootsTree} className="tr-logo" alt="Trustroots" />
            <br />
            Join Trustroots.org
            <br />
            Travellers hospitality community.
          </a>
        </div>
      </div>
    </Router>
  );
}

export default Profile;
