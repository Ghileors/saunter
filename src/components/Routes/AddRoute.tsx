import React, { ChangeEvent, FC, useState, useMemo, useEffect } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { Map } from '../Map';
import LengthIcon from '../../assets/length.png';
import ApproveIcon from '../../assets/approved.png';
import NotApproveIcon from '../../assets/not-approved.png';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { NewRoute } from '../../types/route';

interface AddRouteProps {
  show: boolean;
  handleClose: () => void;
}

const SHORT_DESC_LIMIT = 160;

const validateForm = (route: NewRoute) => {
  const { routeLength, isFavorite, ...requiredFields } = route;
  return Object.entries(requiredFields).reduce<Record<string, boolean>>((errors, [key, value]) => {
    if (!value.length) {
      errors[key] = true;
    }
    return errors;
  }, {});
};

type ErrorsType = ReturnType<typeof validateForm>;

export const AddRoute: FC<AddRouteProps> = ({ show, handleClose }) => {
  const { updateNewRouteField, fetchCreateRoute, resetNewRouteFields } = useActions();
  const { newRoute, currentLocation, newRouteLength } = useTypedSelector((state) => state.routes);
  const [errors, setErrors] = useState<ErrorsType>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateNewRouteField({ [name]: value });
  };

  const onClose = () => {
    resetNewRouteFields();
    handleClose();
    setErrors({});
  };

  const isApprovedSubmit = useMemo(() => !Object.keys(errors).length, [errors]);

  const handleSubmit = async () => {
    if (!isApprovedSubmit) {
      return;
    }
    fetchCreateRoute({ ...newRoute, routeLength: newRouteLength });
    onClose();
  };

  useEffect(() => {
    const formErrors = validateForm(newRoute);
    setErrors(formErrors);
  }, [newRoute]);

  const cutShortDescLength = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let cutValue = value;
    if (value.length > SHORT_DESC_LIMIT) {
      cutValue = value.substring(0, SHORT_DESC_LIMIT - 1);
    }
    updateNewRouteField({ [name]: cutValue });
  };

  return (
    <Modal show={show} onHide={onClose} size="xl">
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
                    placeholder="Enter a path title"
                    onChange={handleChange}
                    isInvalid={errors.name}
                    autoFocus
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Short description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="shortDesc"
                    value={newRoute.shortDesc}
                    onChange={cutShortDescLength}
                    isInvalid={errors.shortDesc}
                    rows={3}
                  />
                  <Form.Text className="text-muted">
                    Limit {SHORT_DESC_LIMIT - newRoute.shortDesc.length} of 160
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Full description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="fullDesc"
                    onChange={handleChange}
                    rows={6}
                    isInvalid={errors.fullDesc}
                  />
                </Form.Group>
              </Form>

              <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex align-items-center gap-3">
                  <img src={LengthIcon} width="48" /> <div id="length-portal"></div>
                  <h3 className="m-0">Length {newRouteLength}</h3>
                </div>
                <Button variant="outline-secondary" className="mt-3 p-2" onClick={handleSubmit}>
                  <img
                    src={isApprovedSubmit ? ApproveIcon : NotApproveIcon}
                    width="24"
                    className="mr-1"
                  />{' '}
                  Add path
                </Button>
              </div>
            </Col>
            <Col className={`p-0 ${errors.waypoints && 'border border-danger'}`}>
              <Map center={currentLocation} isRedactionModeOn />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};
