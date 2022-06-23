import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { ShortDesc } from './ShortDesc';

export const RoutersList = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 1];

  return (
    <ListGroup as="ul" className="d-grid gap-2">
      {items.map((item) => (
        <ShortDesc />
      ))}
    </ListGroup>
  );
};
