import React from 'react'
import ReactDOM from 'react-dom/client'
import { HeroesApp } from './HeroesApp.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <HeroesApp />
    </Router>
  </React.StrictMode>,
)
