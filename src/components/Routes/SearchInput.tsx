import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

export const SearchInput = () => {
  const { setSearchQuery } = useActions();
  const { searchQuery } = useTypedSelector((state) => state.routes);

  return (
    <Form>
      <InputGroup className="mb-3">
        <Form.Control
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
        <Button variant="outline-secondary" onClick={() => setSearchQuery('')}>
          <XCircle />
        </Button>
      </InputGroup>
    </Form>
  );
};
