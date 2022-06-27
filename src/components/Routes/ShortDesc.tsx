import React, { FC } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { ChevronRight, StarFill, ArrowsFullscreen } from 'react-bootstrap-icons';
import { IRoute } from '../../types/route';

const colClass = 'p-0 d-flex justify-content-center align-items-center';

interface ShortDescProps {
  route: IRoute;
  isActive: boolean | null;
  handleSelect: (route: IRoute) => void;
}

export const ShortDesc: FC<ShortDescProps> = ({ route, isActive, handleSelect }) => {
  return (
    <ListGroup.Item
      onClick={() => handleSelect(route)}
      variant="secondary"
      as="li"
      role="button"
      className="d-flex align-items-center border-0 rounded"
      active={!!isActive}
    >
      <Container className="p-0">
        <Row>
          <Col className={`${colClass} col-1`}>
            <ArrowsFullscreen width={48} />
          </Col>
          <Col className="col-8">
            <div className="d-flex gap-2">
              {route.isFavorite && <StarFill />}
              <h6 className="m-0">{route.name}</h6>
            </div>
            <p className={`m-0 col-10 ${!isActive && 'text-truncate'}`}>{route.shortDesc}</p>
          </Col>
          <Col className={`${colClass} col-3 gap-2`}>
            <strong>{route.routeLength}</strong>
            <ChevronRight />
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  );
};
