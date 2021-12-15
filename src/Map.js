import React, {useState, useEffect} from 'react';
import mapboxgl from 'mapbox-gl'
import ReactMapGL, {Marker} from 'react-map-gl';

const MAP_KEY = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const binLocations = 'https://data.cityofnewyork.us/resource/sxx4-xhzg.geojson';

const bluePrintStyle = "mapbox://styles/m-m-farmer/ckx6q7bzz2hrq14nt0pl40ha2";

export default function Map() {

  const [bins, setBins] = useState([])
  const [viewport, setViewport] = useState({
    latitude: 40.7812,
    longitude: -73.9665,
    width: '100vw',
    height: '100vh',
    zoom: 14
  })


  useEffect(() => {
    fetch(binLocations)
    .then(response => response.json())
    .then(data =>
        setBins(data))
  },[])



  console.log('bins', bins)
  console.log('bins.features', bins.features)
  console.log('typeof bins.features', typeof bins.features)

  if (bins.features) {
    bins.features.forEach(bin => console.log(bin.properties))
  }

  return (
    <div>

      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={MAP_KEY}
      mapStyle={bluePrintStyle}
      // for click and drag and zoom feature:
      onViewportChange={viewport => {
        setViewport(viewport);
      }}
      >

      {
        !bins.features ?

          <div></div>
          :


        bins.features.map(bin => (
          <Marker
            latitude={+bin.properties.latitude}
            longitude={+bin.properties.longitude}
          >

            <img
            src='/recycleBin.svg'
            alt = 'R'
            width='2%'
            ></img>
          </Marker>
        ))

      }

      </ReactMapGL>
    </div>
  )
}

