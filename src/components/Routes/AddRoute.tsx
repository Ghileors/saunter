import React, { ChangeEvent, FC, useCallback } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import LengthIcon from '../../assets/length.png';
import ApproveIcon from '../../assets/approved.png';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Map } from '../Map';

interface AddRouteProps {
  show: boolean;
  handleClose: () => void;
}

export const AddRoute: FC<AddRouteProps> = ({ show, handleClose }) => {
  const { updateNewRouteField, fetchCreateRoute } = useActions();
  const { newRoute, currentLocation } = useTypedSelector((state) => state.routes);

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
                  <Form.Control
                    as="textarea"
                    name="shortDesc"
                    value={newRoute.shortDesc}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if (newRoute.shortDesc.length === 160) return;
                      handleChange(e);
                    }}
                    rows={3}
                  />
                  <Form.Text className="text-muted">
                    Limit {160 - newRoute.shortDesc.length} of 160
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Full description</Form.Label>
                  <Form.Control as="textarea" name="fullDesc" onChange={handleChange} rows={6} />
                </Form.Group>
              </Form>

              <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex align-items-center gap-3">
                  <img src={LengthIcon} width="48" />{' '}
                  <h3 className="m-0">Length {newRoute.routeLength}</h3>
                </div>
                <Button variant="outline-secondary" className="mt-3 p-2" onClick={handleSubmit}>
                  <img src={ApproveIcon} width="24" className="mr-1" /> Add path
                </Button>
              </div>
            </Col>
            <Col>
              <Map center={currentLocation} />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};
