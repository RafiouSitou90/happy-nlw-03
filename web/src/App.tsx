import React from 'react'
import { FiArrowRight } from 'react-icons/fi'

import './styles/global.css'
import './styles/pages/landing.css'

import logo from './assets/images/logo.svg'

function App() {
  return (
      <div id="page-landing">
          <div className="content-wrapper">
              <img src={logo} alt="Happy"/>

              <main>
                  <h1>Bring happiness to the world</h1>
                  <p>Visit orphanages and change the day of many children.</p>
              </main>

              <div className="location">
                  <strong>Federal District</strong>
                  <span>Brasilia</span>
              </div>

              <a href="" className="enter-app">
                  <FiArrowRight size={26} color={"rgba(0, 0, 0, 0.6)"} />
              </a>
          </div>
      </div>
  );
}

export default App;
