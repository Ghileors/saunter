import React from 'react';
import { Button, ButtonGroup, Container, Row } from 'react-bootstrap';
import ExpandIcon from '../../assets/expand.png';
import { Map } from '../Map';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

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
    <Container className="p-0 h-75">
      <div className="d-flex justify-content-between align-items-center">
        <h3>{selectedRoute.name}</h3>
        <strong>{selectedRoute.routeLength}</strong>
      </div>
      <Row className="overflow-auto" style={{ maxHeight: '25%' }}>
        <p>{selectedRoute.fullDesc}</p>
      </Row>
      <Row className="h-50">
        <div>
          <Map key={selectedRoute.id} waypoints={selectedRoute.waypoints} />
        </div>
      </Row>
      <Row>
        <ButtonGroup vertical className="d-grid justify-content-end">
          <Button
            variant="link"
            className={`${selectedRoute.isFavorite && 'text-danger'} text-end`}
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
      </Row>
    </Container>
  );
};
