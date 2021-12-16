import React, {useState, useEffect, useMemo} from 'react';
import mapboxgl from 'mapbox-gl'
import ReactMapGL, { Marker, Popup, Layer, Source } from 'react-map-gl';
import './App.css';
const MAP_KEY = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const binLocations = 'https://data.cityofnewyork.us/resource/sxx4-xhzg.geojson';

const neighborhoods = 'https://data.cityofnewyork.us/resource/xyye-rtrs.geojson';

const bluePrintStyle = "mapbox://styles/m-m-farmer/ckx6q7bzz2hrq14nt0pl40ha2";

export default function Map() {

  const [bins, setBins] = useState([]);
  const [hoods, setHoods] = useState([]);
  const [selectedHood, setSelectedHood] = useState(null);

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


  useEffect(() => {
    fetch(neighborhoods)
    .then(response => response.json())
    .then(data =>
        setHoods(data))
  })



  // this is to prevent a slowdown in performance --> bins only rerender if there is a change in the data itself
  // also need to account for the fact that bins is undefined when the component first mounts
  const recycleBins = useMemo(() =>
  bins.features ?
  bins.features.map (
    bin => (
      <Marker
        longitude={+bin.properties.longitude}
        latitude={+bin.properties.latitude}
      >
        <img
        src='/recycleBin.svg'
        alt = 'R' width='20px'

        />
      </Marker>
    )
  )
  : (<div />), [bins])

  const neighborhoodNames = useMemo(() =>
  hoods.features ?
  hoods.features.map (
    hood => (
      <Marker
        longitude={+hood.geometry.coordinates[0]}
        latitude={+hood.geometry.coordinates[1]}
      >
        <img src='/home.svg' alt = 'R' width='30px'/>
      </Marker>
    )
  )
  : (<div />), [hoods])




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
      { recycleBins }
      { neighborhoodNames}
      </ReactMapGL>
    </div>
  )
}

