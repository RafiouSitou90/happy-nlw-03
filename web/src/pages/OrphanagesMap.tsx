import React from 'react'
import {Link} from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'

import mapMarker from '../assets/images/map-marker.svg'

import '../styles/pages/orphanages-map.css'

const OrphanagesMap = () => {

  return (
      <div id="page-map">
          <aside>
              <header>
                  <img src={mapMarker} alt="Happy"/>

                  <h2>Choose an orphanage on the map</h2>
                  <p>Many children are waiting for your visit :)</p>
              </header>

              <footer>
                  <strong>Federal District</strong>
                  <span>Brasilia</span>
              </footer>

              <div></div>

              <Link to={""} className="create-orphanage">
                  <FiPlus size={32} color={"#FFF"} />
              </Link>
          </aside>
      </div>
  );
};

export default OrphanagesMap;
