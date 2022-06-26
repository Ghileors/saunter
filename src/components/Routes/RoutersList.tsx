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

  const searchedRoutes = useMemo(
    () =>
      routesList.filter(
        (route) => route.name.search(searchQuery) != -1 || route.fullDesc.search(searchQuery) != -1
      ),
    [routesList, searchQuery]
  );

  return (
    <ListGroup as="ul" className="d-flex gap-2 h-75 overflow-auto ">
      {(searchQuery.length ? searchedRoutes : sortedByFavorites).map((route) => (
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
