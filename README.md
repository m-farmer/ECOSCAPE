# Ecoscape

A simple map visualization of the public recycling bins in New York City and their proximity to certain neighborhoods. 

## Dependencies

### `npm install d3 `
### `npm install mapbox-gl --save`
### `npm install react-dotenv`
### `npm install --save react-map-gl`

## to run
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


This project was built with React, Mapbox GL, and d3.js.

There are two main components: Circles and Coordinates. The Circles component renders the simple data visualization of the relative number of recycling bins in each borough, while the Coordinates component renders the map and corresponding marker data. 

Mapbox GL requires a unique access token, which can be acquired by creating a free Mapbox account. 
It is important that, if using React, any access token saved in a .env file be named process.env.REACT_APP_MAPBOX_ACCESS_TOKEN, or else it will not work! You can create a variable name for it, but it's important to use the REACT_APP_MAPBOX_TOKEN string in the .env file.

Data was fetched from NYC Open Data (selected geoJSON format) with useEffect hooks. There is no JSON data stored locally. 
