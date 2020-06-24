import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';

import './index.scss';
import App from './App';
// import * as serviceWorker from './serviceWorker';

// JavaScript error logging
Sentry.init({
  dsn:
    'https://dace55ddccfc480083c04f2a876322a3@o356100.ingest.sentry.io/5288459',
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
