import React from 'react';
import ReactDOM from 'react-dom';
import Dexie from 'dexie';

import './index.css';
import { STORAGE_PREFIX } from './constants';
// import * as serviceWorker from './serviceWorker';
import App from './App';

// Initialize IndexedDB database
// https://dexie.org/
export const db = new Dexie(STORAGE_PREFIX);

// Declare tables, IDs and indexes
db.version(1).stores({
  friends: '&id, name, image'
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
