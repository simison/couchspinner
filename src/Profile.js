import { Routes, Route, BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import React, { Suspense, lazy } from 'react';

import './Profile.scss';
import { formatDate } from './utils';
import { Section, CsProfileLink, Tabs, Loading, Button } from './components';
import AboutMe from './AboutMe';
import Friends from './Friends';
import Images from './Images';
import Raw from './Raw';
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
  const messagesCount = messages?.messages?.length ?? 0;
  const imagesCount = images?.length ?? 0;
  const routes = [
    { route: '/', label: 'About me' },
    { route: '/references', label: 'References', count: referencesCount },
    { route: '/friends', label: 'Friends', count: friendsCount },
    { route: '/messages', label: 'Messages', count: messagesCount },
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
    <BrowserRouter>
      <div className="Profile">
        <div className="Profile-header">
          <div>
            <em>
              <CsProfileLink id={user?.id}>
                Your Couchsurfing.com profile
              </CsProfileLink>
              {fileDate && ` as of ${formatDate(fileDate)}`}
            </em>
            <h1>
              {user?.profile?.first_name && `${user.profile.first_name} `}
              {user?.profile?.last_name && `${user.profile.last_name} `}
              {user?.username && `(${user.username})`}
            </h1>
            {user?.profile?.occupation && <h3>{user.profile.occupation}</h3>}
          </div>
          <div className="Profile-buttons">
            <Button
              href="/"
              className="Profile-clear"
              onClick={clearSessionStorage}
            >
              Clear out the profile
            </Button>
            <Button
              href="https://www.trustroots.org/signup?ref=couchspinner&ref-location=header"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sign up Trustroots.org
            </Button>
          </div>
        </div>

        <Section>
          <Tabs routes={routes} />
        </Section>

        <Routes>
          <Route
            exact
            path="/"
            element={<AboutMe user={user} interests={interests} />}
          />
          <Route
            path="/references"
            element={
              <Suspense fallback={<Loading>References</Loading>}>
                <References
                  names={names}
                  references={references}
                  userId={user?.id}
                />
              </Suspense>
            }
          />
          <Route
            path="/friends"
            element={<Friends names={names} friends={friends?.friends || []} />}
          />
          <Route
            path="/messages"
            element={
              <Suspense fallback={<Loading>Messages</Loading>}>
                <Messages
                  messages={messages?.messages || []}
                  names={names}
                  userId={user?.id}
                />
              </Suspense>
            }
          />
          <Route path="/images" element={<Images images={images} />} />
          <Route path="/raw" element={<Raw json={profile} />} />
        </Routes>

        <div className="promo">
          <a
            href="https://www.trustroots.org/?ref=couchspinner&ref-location=footer"
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
    </BrowserRouter>
  );
}

export default Profile;
