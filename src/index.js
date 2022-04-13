import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';
import App from './App';

// trivia API: https://opentdb.com/

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

