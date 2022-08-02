import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';

import './asserts/styles/reset.scss';
import './asserts/styles/main.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);