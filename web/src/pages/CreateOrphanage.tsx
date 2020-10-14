import {LatLng, LeafletMouseEvent} from "leaflet";
import React, {ChangeEvent, FormEvent, useState} from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { FiPlus } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'

import { Sidebar } from '../components'
import { api } from '../services'
import { mapIcon } from '../utils'

import '../styles/pages/create-orphanage.css'

export default function CreateOrphanage() {
    const history = useHistory()

    const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
    const [name, setName] = useState<string>('')
    const [about, setAbout] = useState<string>('')
    const [instructions, setInstructions] = useState<string>('')
    const [opening_hours, setOpeningHours] = useState<string>('')
    const [open_on_weekends, setOpenOnWeekends] = useState<boolean>(false)
    const [images, setImages] = useState<File[]>([])
    const [previewImages, setPreviewImages] = useState<string[]>([])


    function handleMapClick (event: LeafletMouseEvent) {
        const { lat, lng } = event.latlng
        setPosition({
            latitude: lat,
            longitude: lng
        })
    }

    function handleSelectImages (event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
            return
        }

        const selectedImages = Array.from(event.target.files)

        setImages(selectedImages)

        const selectedImagesPreview = selectedImages.map(image => {
            return URL.createObjectURL(image)
        })

        setPreviewImages(selectedImagesPreview)
    }

    async function handleSubmit (event: FormEvent) {
        event.preventDefault()

        const { latitude, longitude } = position

        const formData = new FormData()

        formData.append('name', name)
        formData.append('about', about)
        formData.append('instructions', instructions)
        formData.append('opening_hours', opening_hours)
        formData.append('latitude', String(latitude))
        formData.append('longitude', String(longitude))
        formData.append('open_on_weekends', String(open_on_weekends))

        images.forEach(image => {
            formData.append('images', image)
        })

        await api.post('orphanages', formData)

        alert('Orphanage created successfully!')

        history.push('/app')
    }

    return (
        <div id="page-create-orphanage">
            <Sidebar />

            <main>
                <form className="create-orphanage-form" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Data</legend>

                        <Map
                            center={[-27.2092052,-49.6401092]}
                            style={{ width: '100%', height: 280 }}
                            zoom={15}
                            onClick={handleMapClick}
                        >
                            <TileLayer
                                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                            />

                            { position.latitude !== 0 && (
                                <Marker
                                    interactive={false}
                                    icon={mapIcon}
                                    position={new LatLng(position.latitude, position.longitude)}
                                />
                            )}
                        </Map>

                        <div className="input-block">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="about">About <span>Maximum of 300 characters</span></label>
                            <textarea
                                id="name"
                                maxLength={300}
                                value={about}
                                onChange={e => setAbout(e.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="images">Images</label>

                            <div className="images-container">
                                {previewImages.map((image, index) => {
                                    return (
                                        <img key={index} src={image} alt={name}/>
                                    )
                                })}
                                <label htmlFor="images[]" className="new-image">
                                    <FiPlus size={24} color="#15b6d6" />
                                </label>
                            </div>
                            <input multiple onChange={handleSelectImages} type="file" id="images[]" />

                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Visit</legend>

                        <div className="input-block">
                            <label htmlFor="instructions">Instructions</label>
                            <textarea
                                id="instructions"
                                value={instructions}
                                onChange={e => setInstructions(e.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="opening_hours">Opening hours</label>
                            <input
                                id="opening_hours"
                                value={opening_hours}
                                onChange={e => setOpeningHours(e.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="open_on_weekends">Open weekend</label>

                            <div className="button-select">
                                <button
                                    type="button"
                                    className={open_on_weekends ? 'active' : ''}
                                    onClick={() => setOpenOnWeekends(true)}
                                >
                                    Yes
                                </button>

                                <button
                                    type="button"
                                    className={!open_on_weekends ? 'active' : ''}
                                    onClick={() => setOpenOnWeekends(false)}
                                >
                                    no
                                </button>
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
