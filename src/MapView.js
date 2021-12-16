import React, { useEffect, useRef, useState, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import ReactMapGL, { Marker, Popup, Layer, Source } from 'react-map-gl';
import './App.css';


const MAP_KEY = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const binLocations = 'https://data.cityofnewyork.us/resource/sxx4-xhzg.geojson';

const neighborhoods = 'https://data.cityofnewyork.us/resource/xyye-rtrs.geojson';

const bluePrintStyle = "mapbox://styles/m-m-farmer/ckx6q7bzz2hrq14nt0pl40ha2";

const styles = {
  width: "100vw",
  height: "100vh",
  //position: "absolute"
};

const MapView = () => {
  const [map, setMap] = useState(null);
  const [bins, setBins] = useState(null);
  const mapContainer = useRef(null);

    useEffect(() => {
    fetch(binLocations)
    .then(response => response.json())
    .then(data =>
        setBins(data))
  },[]);

  useEffect(() => {
    mapboxgl.accessToken = MAP_KEY
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: bluePrintStyle, // stylesheet location
        center: [-73.9665, 40.7812],
        zoom: 14
      });


      map.on("load", () => {
        setMap(map);
        map.resize();


        map.addLayer({
          id: "binLocations",
          type: "circle",
          source: {
            type: 'geojson',
            data: binLocations
          },
          layout: {
            "icon-image": "hospital-15",
            "icon-allow-overlap": true,

          },
          // paint: {}
        })

        map.addSource("bin-locations", {
          type: "geojson",
          data: {
            "type": "FeatureCollection",
            "features": []
          }})

          const marker = new mapboxgl.Marker()
            .setLngLat([-73.9665, 40.7812],)
            .addTo(map)

          const popup = new mapboxgl.Popup();

          map.on('mousemove', (event) => {
            console.log('hi')
            const features = map.queryRenderedFeatures(event.point, {
              layers: ['binLocations']
            });
            if (!features.length) {
              popup.remove();
              return;
            }
            const feature = features[0];

            popup
            .setLngLat([+feature.properties.longitude, +feature.properties.latitude])
            .setHTML(feature.properties.address)
            .addTo(map);

            map.getCanvas().style.cursor = features.length ? 'pointer' : '';
          })



      }

      );

    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);





  console.log('bins', bins)

  return <div ref={el => (mapContainer.current = el)} style={styles} />;
};

export default MapView;
