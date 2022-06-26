import React, { FC, useEffect, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { Col, Container, Row } from 'react-bootstrap';
import { Header } from './components/Header/Header';
import { SearchInput } from './components/Routes/SearchInput';
import { RoutersList } from './components/Routes/RoutersList';
import { FullDesc } from './components/Routes/FullDesc';
import { AddRoute } from './components/Routes/AddRoute';
import { getBrowserLocation } from './utils/geo';
import { LatLngLiteral } from './types/google';
import { useActions } from './hooks/useActions';

import './App.css';

const API_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

const App: FC = () => {
  const { fetchRoutes, setCurrentLocation } = useActions();
  const [show, setShow] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries: ['places'],
  });

  useEffect(() => {
    if (isLoaded) {
      fetchRoutes();
      getBrowserLocation().then((currLoc: LatLngLiteral) => {
        setCurrentLocation(currLoc);
      });
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  const toggleShowState = () => {
    setShow((prev) => !prev);
  };

  return (
    <Container className="overflow-hidden h-100">
      <Header handleOpen={toggleShowState} />
      <Row className="h-100">
        <Col className="gap-4">
          <SearchInput />
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
