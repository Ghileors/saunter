import React, { FC, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { Map } from './components/Map';
import { LatLngLiteral } from './types/google-types';

import './App.module.css';

const defaultCenter = {
  lat: 43,
  lng: -80,
};

const API_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

const App: FC = () => {
  const [center, setCenters] = useState<LatLngLiteral>(defaultCenter);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries: ['places'],
  });

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Map center={center} />
    </div>
  );
};

export default App;
