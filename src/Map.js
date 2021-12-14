import React, {useState} from 'react';
import mapboxgl from 'mapbox-gl'
import ReactMapGL from 'react-map-gl';

const MAP_KEY = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export default function Map() {

  const [viewport, setViewport] = useState({
    latitude: 40.7812,
    longitude: -73.9665,
    width: '100vw',
    height: '100vh',
    zoom: 10
  })
  return (
    <div>

      <ReactMapGL {...viewport} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/m-m-farmer/ckx6q7bzz2hrq14nt0pl40ha2"
      // for click and drag and zoom feature:
      onViewportChange={viewport => {
        setViewport(viewport);
      }}
      >
      Markers Here
      </ReactMapGL>
    </div>
  )
}

