import logo from './logo.svg';
import './App.css';
import React, { useRef, useEffect } from 'react';
import { select } from 'd3';
import LineChart from "./LineChart";
import Map from './Map'


function App() {
  return (
    <div className="App">
      <header className="App-header">
       <LineChart />
       <Map />

      </header>


    </div>
  );
}

export default App;
