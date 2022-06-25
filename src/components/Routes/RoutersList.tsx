import React, { useMemo } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ShortDesc } from './ShortDesc';

export const RoutersList = () => {
  const { setSelectedRoute } = useActions();
  const { routesList, selectedRoute, searchQuery } = useTypedSelector((state) => state.routes);

  const sortedByFavorites = useMemo(
    () => [...routesList].sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite)),
    [routesList]
  );


  return (
    <ListGroup as="ul" className="d-grid gap-2">
      {sortedByFavorites.map((route) => (
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
