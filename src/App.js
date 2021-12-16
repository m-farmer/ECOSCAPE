
import './App.css';
import React, { useRef, useEffect } from 'react';
import { select } from 'd3';

import Coordinates from './Coordinates'
import Circles from './CircleChart'

function App() {
  return (
    <div className="App">
      <header className="App-header">

       <Circles />
       <Coordinates />

      </header>


    </div>
  );
}

export default App;
