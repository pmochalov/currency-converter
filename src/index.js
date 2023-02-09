import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import s from './index.module.scss';

const rootElem = document.getElementById('root');
rootElem.classList.add(s.Root)
const root = ReactDOM.createRoot(rootElem);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
