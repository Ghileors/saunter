import React, { FC, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { Col, Container, Row } from 'react-bootstrap';
import { Header } from './components/Header/Header';
import { SearchRoute } from './components/Routes/SearchRoute';
import { RoutersList } from './components/Routes/RoutersList';
import { FullDesc } from './components/Routes/FullDesc';
import { AddRoute } from './components/Routes/AddRoute';
import { LatLngLiteral } from './types/google-types';

import './App.module.css';

const defaultCenter = {
  lat: 43,
  lng: -80,
};

const API_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

const App: FC = () => {
  const [show, setShow] = useState(false);
  const [center, setCenters] = useState<LatLngLiteral>(defaultCenter);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries: ['places'],
  });

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  const toggleShowState = () => {
    setShow((prev) => !prev);
  };

  return (
    <Container className="overflow-hidden">
      <Header handleOpen={toggleShowState} />
      <Row>
        <Col className="gap-4">
          <SearchRoute />

          <RoutersList />
        </Col>
        <Col>
          <FullDesc />
        </Col>
      </Row>
      <AddRoute show={show} handleClose={toggleShowState} />
    </Container>
  );
};

export default App;
