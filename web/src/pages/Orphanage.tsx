import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiClock, FiInfo } from 'react-icons/fi'
import { Map, Marker, TileLayer } from 'react-leaflet'

import { Sidebar } from '../components'
import {mapIcon} from '../utils'

import '../styles/pages/orphanage.css'

export default function Orphanage() {

    return (
        <div id="page-orphanage">
            <Sidebar />

            <main>
                <div className="orphanage-details">
                    <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />

                    <div className="images">
                        <button className="active" type="button">
                            <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
                        </button>
                        <button type="button">
                            <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
                        </button>
                        <button type="button">
                            <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
                        </button>
                        <button type="button">
                            <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
                        </button>
                        <button type="button">
                            <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
                        </button>
                        <button type="button">
                            <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
                        </button>
                    </div>

                    <div className="orphanage-details-content">
                        <h1>Child House</h1>
                        <p>
                            It provides assistance to children aged 6 to 15 who are at risk and / or socially vulnerable.
                        </p>

                        <div className="map-container">
                            <Map
                                center={[-27.2092052,-49.6401092]}
                                zoom={16}
                                style={{ width: '100%', height: 280 }}
                                dragging={false}
                                touchZoom={false}
                                zoomControl={false}
                                scrollWheelZoom={false}
                                doubleClickZoom={false}
                            >
                                <TileLayer
                                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                                />
                                <Marker interactive={false} icon={mapIcon} position={[-27.2092052,-49.6401092]} />
                            </Map>

                            <footer>
                                <a href="">View directions on Google Maps</a>
                            </footer>
                        </div>

                        <hr />

                        <h2>Visiting instructions</h2>
                        <p>Come as you feel more at ease and bring a lot of love to give.</p>

                        <div className="open-details">
                            <div className="hour">
                                <FiClock size={32} color="#15B6D6" />
                                Monday to Friday <br />
                                8AM to 6PM
                            </div>
                            <div className="open-on-weekends">
                                <FiInfo size={32} color="#39CC83" />
                                We serve <br />
                                weekend
                            </div>
                        </div>

                        <button type="button" className="contact-button">
                            <FaWhatsapp size={20} color="#FFF" />
                            Get in touch
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}
