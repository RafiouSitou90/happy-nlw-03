import Leaflet from 'leaflet'

import mapMarkerImg from '../assets/images/map-marker.svg'

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,

    iconSize: [48, 58],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60]
})

export default mapIcon
