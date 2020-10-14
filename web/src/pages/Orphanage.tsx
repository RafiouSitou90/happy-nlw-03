import {LatLng} from "leaflet";
import React, {useEffect, useState} from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiClock, FiInfo } from 'react-icons/fi'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { useParams } from 'react-router-dom'


import { Sidebar } from '../components'
import {api} from "../services";
import {mapIcon} from '../utils'

import '../styles/pages/orphanage.css'

interface Orphanage {
    name: string
    about: string
    latitude: number
    longitude: number
    instructions: string
    opening_hours: string
    open_on_weekends: boolean
    images: Array<{url: string}>
}

interface OrphanageParams {
    id: string
}

export default function Orphanage() {
    const { id } = useParams<OrphanageParams>()
    const [orphanage, setOrphanage] = useState<Orphanage>()
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0)

    useEffect(() => {
        api.get(`orphanages/${id}`).then(response => {
            setOrphanage(response.data)
        })
    }, [id])

    if (!orphanage) {
        return <p>Loading...</p>
    }

    const {
        images,
        name,
        about,
        latitude,
        longitude,
        instructions,
        open_on_weekends,
        opening_hours
    } = orphanage
    const position = new LatLng(latitude, longitude)

    return (
        <div id="page-orphanage">
            <Sidebar />

            <main>
                <div className="orphanage-details">
                    <img src={images[activeImageIndex].url} alt={name} />

                    <div className="images">
                        {
                            images.map(({url}, index) => {
                                return (
                                    <button
                                        key={index}
                                        className={activeImageIndex === index ? 'active' : ''}
                                        type="button"
                                        onClick={() => {
                                            setActiveImageIndex(index)
                                        }}
                                    >
                                        <img src={url} alt={name} />
                                    </button>
                                )
                            })
                        }
                    </div>

                    <div className="orphanage-details-content">
                        <h1>{name}</h1>
                        <p>{about}</p>

                        <div className="map-container">
                            <Map
                                center={position}
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
                                <Marker interactive={false} icon={mapIcon} position={position} />
                            </Map>

                            <footer>
                                <a
                                    href={`https://www.google.com/maps/dir/.api=1&destination=${latitude},${longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View directions on Google Maps
                                </a>
                            </footer>
                        </div>

                        <hr />

                        <h2>Visiting instructions</h2>
                        <p>{instructions}</p>

                        <div className="open-details">
                            <div className="hour">
                                <FiClock size={32} color="#15B6D6" />
                                Monday to Friday <br />
                                {opening_hours}
                            </div>
                            {open_on_weekends
                                ? (
                                    <div className="open-on-weekends">
                                        <FiInfo size={32} color="#39CC83" />
                                        We serve <br/>
                                        weekend
                                    </div>
                                )
                                : (
                                    <div className="open-on-weekends dont-open">
                                        <FiInfo size={32} color="#FF669D"/>
                                        We don't serve <br/>
                                        weekend
                                    </div>
                                )
                            }

                        </div>

{/*                        <button type="button" className="contact-button">
                            <FaWhatsapp size={20} color="#FFF" />
                            Get in touch
                        </button>*/}
                    </div>
                </div>
            </main>
        </div>
    )
}
