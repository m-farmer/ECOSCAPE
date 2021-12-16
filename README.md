# Ecoscape

![ECOSCAPE_COVER](https://user-images.githubusercontent.com/43537116/146384092-35a3b680-1f7c-4197-aa6e-3f9dc7df59ef.jpg)


A simple map visualization of the public recycling bins in New York City and their proximity to certain neighborhoods. 

## Dependencies

`npm install d3 `
`mapbox-gl --save`
`react-dotenv`
`--save react-map-gl`

## to run
`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


This project was built with React, Mapbox GL, and d3.js.

There are two main components: Circles and Coordinates. The Circles component renders the simple data visualization of the relative number of recycling bins in each borough, while the Coordinates component renders the map and corresponding marker data. 

Mapbox GL requires a unique access token, which can be acquired by creating a free Mapbox account. 
It is important that, if using React, any access token saved in a .env file be named process.env.REACT_APP_MAPBOX_ACCESS_TOKEN, or else it will not work! You can create a variable name for it, but it's important to use the REACT_APP_MAPBOX_TOKEN string in the .env file.

Data was fetched from NYC Open Data API endpoints (geoJSON format) with useEffect hooks. 

Be sure to include the link to the Mapbox stylesheet in <head> of index.html: 
  <link href='https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css' rel='stylesheet' />
  
  
