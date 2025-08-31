/* eslint-disable import/first */
// Import process polyfill before any other imports
import './polyfills/process-browser.js';
import 'process/browser';

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './index.css';
import './App.css';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
