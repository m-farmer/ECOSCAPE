// import {API_KEY} from '@env'
import env from 'react-dotenv';
import React from 'react';

const MAP_KEY = process.env.API_KEY;

export default function Map() {

  return (
    <div><h1>{MAP_KEY}</h1></div>
  )
}
