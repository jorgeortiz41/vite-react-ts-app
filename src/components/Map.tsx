import React from 'react'
import MenuBar from './MenuBar'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import.meta.env.VITE_MAPS_KEY




function Map() {
    const mapContainerStyle = {
        width: '100%',
        height: '600px'
        };

    const center = {
        lat: 18.470,
        lng: -66.123,
      };


  return (
    <>
        <MenuBar />
        <div>Map</div>
        <LoadScript googleMapsApiKey={import.meta.env.VITE_MAPS_KEY}>
            <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={13}
            >
            <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    </>
  )
}

export default Map