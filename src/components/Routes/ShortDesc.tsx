import React, { FC } from 'react';
import { ListGroup } from 'react-bootstrap';
import { ChevronRight, Star, StarFill, ArrowsFullscreen } from 'react-bootstrap-icons';
import { IRoute } from '../../types/route';

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
      <ArrowsFullscreen width={48} />
      <div className="row">
        <div className="d-flex align-items-center gap-2">
          {route.isFavorite ? <StarFill /> : <Star />}
          <h6 className="m-0">{route.name}</h6>
        </div>
        <p className="m-0 col-10 text-truncate">{route.shortDesc}</p>
      </div>
      <strong>{route.routeLength}</strong>
      <ChevronRight />
    </ListGroup.Item>
  );
};
