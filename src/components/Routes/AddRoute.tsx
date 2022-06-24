import React, { ChangeEvent, FC, useCallback } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Map } from '../Map';

interface AddRouteProps {
  show: boolean;
  handleClose: () => void;
}

export const AddRoute: FC<AddRouteProps> = ({ show, handleClose }) => {
  const { updateNewRouteField, fetchCreateRoute} = useActions();
  const { newRoute } = useTypedSelector((state) => state.routes);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateNewRouteField({ [name]: value });
  }, []);

  const handleSubmit = () => {
    fetchCreateRoute(newRoute);
    handleClose();
  };

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
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter a path name"
                    onChange={handleChange}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Short description</Form.Label>
                  <Form.Control as="textarea" name="shortDesc" onChange={handleChange} rows={3} />
                  <Form.Text className="text-muted">
                    Limit {160 - newRoute.shortDesc.length} of 160
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Full description</Form.Label>
                  <Form.Control as="textarea" name="fullDesc" onChange={handleChange} rows={10} />
                </Form.Group>
              </Form>

              <div className="d-flex flex-column align-items-center justify-content-center">
                <h2>Length {newRoute.routeLength}</h2>
                <Button variant="outline-secondary" className="mt-2" onClick={handleSubmit}>
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
