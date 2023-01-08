import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/browser';

import './index.scss';
import App from './App';
// import * as serviceWorker from './serviceWorker';

// JavaScript error logging
Sentry.init({
  dsn: window.couchspinner_settings?.sentry || '',
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
