import React from 'react';
import { Button, ButtonGroup, Card, Stack } from 'react-bootstrap';
import ExpandIcon from '../../assets/expand.png';

import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Map } from '../Map';

export const FullDesc = () => {
  const { fetchToggleFavorite, fetchRemoveRoute } = useActions();
  const { selectedRoute } = useTypedSelector((state) => state.routes);

  if (!selectedRoute) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center h-75">
        <img src={ExpandIcon} width={120} className="mb-4" />
        <h3>Select path</h3>
      </div>
    );
  }

  return (
    <Stack className="h-75">
      <div className="d-flex justify-content-between align-items-center">
        <h3>{selectedRoute.name}</h3>
        <strong>{selectedRoute.routeLength}</strong>
      </div>
      <p>{selectedRoute.fullDesc}</p>
      <Card className="h-75">
        <Map key={selectedRoute.id} waypoints={selectedRoute.waypoints} />
      </Card>
      <ButtonGroup vertical className="d-grid justify-content-end">
        <Button
          variant="link"
          className={`${selectedRoute.isFavorite && 'text-danger'}`}
          onClick={() => fetchToggleFavorite(selectedRoute)}
        >
          {selectedRoute.isFavorite ? 'Remove from favorite' : 'Add to favorite'}
        </Button>
        <Button
          variant="link"
          className="text-end text-danger"
          onClick={() => fetchRemoveRoute(selectedRoute.id)}
        >
          Remove
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
