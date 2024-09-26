import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ReactGA from "react-ga4";
// import dotenv from 'dotenv';
// dotenv.config();

ReactGA.initialize("G-5W94CQT39J");
// Send pageview with a custom path
ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "dora." });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
