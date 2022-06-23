import React from 'react';
import { Button, ButtonGroup, Card, Stack } from 'react-bootstrap';
import { Map } from '../Map';

export const FullDesc = () => {
  return (
    <Stack className="h-100">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Path title</h3>
        <strong>1.75km</strong>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus a cum perspiciatis
        eius, corrupti facere odit repellendus labore nemo excepturi laborum. Eveniet culpa ullam
        voluptatum possimus tempora quae unde amet.
      </p>
      <Card className="h-75">
        <Map />
      </Card>
      <ButtonGroup vertical className="d-grid justify-content-end">
        <Button variant="link">Add to favorite</Button>
        <Button variant="link" className="text-end text-danger">
          Remove
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
