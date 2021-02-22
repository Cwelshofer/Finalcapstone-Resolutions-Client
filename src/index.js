import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import { Resolution } from './components/Resolution';




ReactDOM.render(
  <React.StrictMode>

          <Router>
              <Resolution />
          </Router>
         
  </React.StrictMode>,
  document.getElementById("root")
)
