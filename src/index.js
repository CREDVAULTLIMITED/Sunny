/* eslint-disable import/first */
// Define process globally before any imports
window.process = window.process || {
  env: {},
  browser: true,
  version: '',
  nextTick: function(fn) { setTimeout(fn, 0); }
};

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