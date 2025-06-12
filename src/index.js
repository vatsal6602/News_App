import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ This is the correct import
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ✅ React 18+ root rendering
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();