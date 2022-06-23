import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { ChevronRight, StarFill, ArrowsFullscreen } from 'react-bootstrap-icons';

export const ShortDesc = () => {
  return (
    <ListGroup.Item
      variant="secondary"
      as="li"
      className="d-flex align-items-center border-0 rounded"
    >
      <ArrowsFullscreen width={48} />
      <div className="row">
        <div className="d-flex align-items-center gap-2">
          <StarFill />
          <h6 className="m-0">Path title</h6>
        </div>
        <p className="m-0 col-10 text-truncate">
          Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do
        </p>
      </div>
      <strong>600 m</strong>
      <ChevronRight />
    </ListGroup.Item>
  );
};
