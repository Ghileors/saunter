import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

export const SearchRoute = () => {
  return (
    <Form>
      <InputGroup className="mb-3">
        <Form.Control placeholder="Search..." />
        <Button variant="outline-secondary" id="button-addon2">
          <Search />
        </Button>
      </InputGroup>
    </Form>
  );
};
