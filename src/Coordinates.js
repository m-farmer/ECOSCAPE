import React, { useEffect, useRef, useState, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import ReactMapGL, { Marker, Popup, Layer, Source } from 'react-map-gl';
import './App.css';


const MAP_KEY = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const binLocations = 'https://data.cityofnewyork.us/resource/sxx4-xhzg.geojson';

const neighborhoods = 'https://data.cityofnewyork.us/resource/xyye-rtrs.geojson';

const bluePrintStyle = "mapbox://styles/m-m-farmer/ckx6q7bzz2hrq14nt0pl40ha2";

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 40.7812,
    longitude: -73.9665,
    width: '100vw',
    height: '100vh',
    zoom: 14
  });
  const [selectedBin, setSelectedBin] = useState(null);
  const [bins, setBins] = useState([]);

  const [hoods, setHoods] = useState([]);
  const [selectedHood, setSelectedHood] = useState(null);

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


  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedBin(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={MAP_KEY}
        mapStyle={bluePrintStyle}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {
          bins.features ?
          bins.features.map(bin => (
          <Marker
            latitude={+bin.properties.latitude}
            longitude={+bin.properties.longitude}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedBin(bin);
              }}
            >
              <img src="/recycleBin.svg" alt="recycle icon" width="20px" />
            </button>
          </Marker>
        ))
        :
        (<div />)}

        {selectedBin ? (
          <Popup

            latitude={+selectedBin.properties.latitude}
            longitude={+selectedBin.properties.longitude}
            onClose={() => {
              setSelectedBin(null);
            }}
          >
            <div className="popupStyle">
              <h4>{selectedBin.properties.address}</h4>
            </div>
          </Popup>
        ) : null}


        {
          hoods.features ?
          hoods.features.map(hood => (
          <Marker
            latitude={+hood.geometry.coordinates[1]}
            longitude={+hood.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedHood(hood);
              }}
            >
              <img src="/home.svg" alt="home" width="30px" />
            </button>
          </Marker>
        ))
        :
        (<div />)}

        {selectedHood ? (
          <Popup

            latitude={+selectedHood.geometry.coordinates[1]}
            longitude={+selectedHood.geometry.coordinates[0]}
            onClose={() => {
              setSelectedHood(null);
            }}
          >
            <div  className="popupStyle">
              <h4>{selectedHood.properties.name}</h4>
            </div>
          </Popup>
        ) : null}

      </ReactMapGL>
    </div>
  );
}

