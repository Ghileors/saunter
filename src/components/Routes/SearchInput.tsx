import React, { ChangeEvent, FC } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

export const SearchInput = () => {
  const { setSearchQuery } = useActions();
  const { searchQuery } = useTypedSelector((state) => state.routes);

  return (
    <Form>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="outline-secondary" id="button-addon2" onClick={() => setSearchQuery('')}>
          <Search />
        </Button>
      </InputGroup>
    </Form>
  );
};