import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import { Resolution } from './components/Resolution';
import { Grommet } from "grommet";


ReactDOM.render(
  <React.StrictMode>
    <Grommet>
          <Router>
              <Resolution />
          </Router>
    </Grommet>
  </React.StrictMode>,
  document.getElementById("root")
)
