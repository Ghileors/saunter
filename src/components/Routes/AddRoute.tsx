import React, { FC } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { Map } from '../Map';

interface AddRouteProps {
  show: boolean;
  handleClose: () => void;
}

export const AddRoute: FC<AddRouteProps> = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Add new path</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" placeholder="Enter a path name" autoFocus />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Short description</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                  <Form.Text className="text-muted">Limit {} of 160</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Full description</Form.Label>
                  <Form.Control as="textarea" rows={10} />
                </Form.Group>
              </Form>

              <div className="d-flex flex-column align-items-center justify-content-center">
                <h2>Length {}</h2>
                <Button variant="outline-secondary" className="mt-2" onClick={handleClose}>
                  Add path
                </Button>
              </div>
            </Col>
            <Col>
              <Map />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};
