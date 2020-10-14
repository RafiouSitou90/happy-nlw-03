import { LatLng } from 'leaflet'
import React from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import mapMarker from '../assets/images/map-marker.svg'
import { mapIcon } from '../utils'

import '../styles/pages/orphanages-map.css'

const OrphanagesMap = () => {
    const position = new LatLng(-15.8665877, -47.9713124)
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
            </aside>

            <Map
                center={position}
                zoom={15}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            >
                {/*<TileLayer url={"https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"}/>*/}
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                    position={position}
                    icon={mapIcon}
                >
                    <Popup
                        closeButton={false}
                        minWidth={240}
                        maxWidth={240}
                        className="map-popup"
                    >
                        Child House
                        <Link to={"/orphanages/1"}>
                            <FiArrowRight size={20} color={"#FFF"} />
                        </Link>
                    </Popup>
                </Marker>

            </Map>

            <Link to={"/orphanages/create"} className="create-orphanage">
                <FiPlus size={32} color={"#FFF"}/>
            </Link>
        </div>
    );
};

export default OrphanagesMap;
