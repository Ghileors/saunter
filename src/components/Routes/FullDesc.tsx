import React, { useState } from 'react';
import { Button, ButtonGroup, Card, Stack } from 'react-bootstrap';
import { ArrowsFullscreen } from 'react-bootstrap-icons';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Map } from '../Map';

export const FullDesc = () => {
  const { fetchToggleFavorite } = useActions();
  const { selectedRoute } = useTypedSelector((state) => state.routes);

  if (!selectedRoute) {
    return <ArrowsFullscreen width={120} />;
  }

  return (
    <Stack className="h-75">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Path title</h3>
        <strong>1.75km</strong>
      </div>
      <p>{selectedRoute.fullDesc}</p>
      <Card className="h-75">{/* <Map /> */}</Card>
      <ButtonGroup vertical className="d-grid justify-content-end">
        <Button
          variant="link"
          onClick={() => fetchToggleFavorite(selectedRoute.id, selectedRoute.isFavorite)}
          className={`${selectedRoute.isFavorite && 'text-danger'}`}
        >
          {selectedRoute.isFavorite ? 'Remove from favorite' : 'Add to favorite'}
        </Button>
        <Button variant="link" className="text-end text-danger">
          Remove
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
