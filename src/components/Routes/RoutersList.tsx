import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ShortDesc } from './ShortDesc';

export const RoutersList = () => {
  const { setSelectedRoute } = useActions();
  const { routesList, selectedRoute } = useTypedSelector((state) => state.routes);

  return (
    <ListGroup as="ul" className="d-grid gap-2">
      {routesList.map((route) => (
        <ShortDesc
          key={route.id}
          route={route}
          isActive={selectedRoute && selectedRoute.id === route.id}
          handleSelect={setSelectedRoute}
        />
      ))}
    </ListGroup>
  );
};
