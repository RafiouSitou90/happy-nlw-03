import React from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { FiPlus } from 'react-icons/fi'

import { Sidebar } from '../components'
import { mapIcon } from '../utils'

import '../styles/pages/create-orphanage.css'

export default function CreateOrphanage() {

    return (
        <div id="page-create-orphanage">
            <Sidebar />

            <main>
                <form className="create-orphanage-form">
                    <fieldset>
                        <legend>Data</legend>

                        <Map
                            center={[-27.2092052,-49.6401092]}
                            style={{ width: '100%', height: 280 }}
                            zoom={15}
                        >
                            <TileLayer
                                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                            />

                            <Marker interactive={false} icon={mapIcon} position={[-27.2092052,-49.6401092]} />
                        </Map>

                        <br/>
                        <div className="input-block">
                            <label htmlFor="name">Name</label>
                            <input id="name" />
                        </div>

                        <div className="input-block">
                            <label htmlFor="about">About <span>Maximum of 300 characters</span></label>
                            <textarea id="name" maxLength={300} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="images">Images</label>

                            <div className="uploaded-image">

                            </div>

                            <button className="new-image">
                                <FiPlus size={24} color="#15b6d6" />
                            </button>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Visit</legend>

                        <div className="input-block">
                            <label htmlFor="instructions">Instructions</label>
                            <textarea id="instructions" />
                        </div>

                        <div className="input-block">
                            <label htmlFor="opening_hours">Name</label>
                            <input id="opening_hours" />
                        </div>

                        <div className="input-block">
                            <label htmlFor="open_on_weekends">Open weekend</label>

                            <div className="button-select">
                                <button type="button" className="active">Yes</button>
                                <button type="button">no</button>
                            </div>
                        </div>
                    </fieldset>

                    <button className="confirm-button" type="submit">
                        Confirm
                    </button>
                </form>
            </main>
        </div>
    )
}
