import logo from './logo.svg';
import './App.css';
import React, { useRef, useEffect } from 'react';
import { select } from 'd3';
import LineChart from "./LineChart";


function App() {
  return (
    <div className="App">
      <header className="App-header">
       <LineChart />

      </header>


    </div>
  );
}

export default App;
