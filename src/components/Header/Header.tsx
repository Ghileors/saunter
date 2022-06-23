import React, { FC } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { ArrowsFullscreen } from 'react-bootstrap-icons';

export const Header: FC<{ handleOpen: () => void }> = ({ handleOpen }) => {
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container fluid>
        <Nav className="d-flex align-items-center">
          <ArrowsFullscreen width={64} />
          <h2>Saunter</h2>
        </Nav>
        <Button variant="primary" onClick={handleOpen}>
          Add path
        </Button>
      </Container>
    </Navbar>
  );
};
