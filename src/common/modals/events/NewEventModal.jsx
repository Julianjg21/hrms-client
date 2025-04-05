import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

function NewEventModal({
  show, //Check if the modal is visible
  onClose, //Function to close the modal) {
}) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header
        closeButton
        className="bg-light border  border border-bottom-0 border-dark"
      >
        <Modal.Title className="w-100 text-center text-secondary">
          Nuevo Evento
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="border border-bottom-0 border-top-0 bg-light border-dark">
        <Form>
          <Form.Group>
            <Form.Control type="text" placeholder="Título" className="mb-3" />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Lugar o Link"
              className="mb-3"
            />
          </Form.Group>
          <div className="border border-1"></div>
          <Form.Group className="mb-3 mt-3 text-secondary">
            <div className="row">
              <div className="col-4">
                <Form.Label>Inicia</Form.Label>
              </div>
              <div className="col-4">
                <Form.Control type="date" placeholder="Fecha" />
              </div>
              <div className="col-4">
                <Form.Control type="time" placeholder="Fecha" />
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3 mt-3 text-secondary">
            <div className="row">
              <div className="col-4">
                <Form.Label>Finzaliza</Form.Label>
              </div>
              <div className="col-4">
                <Form.Control type="date" placeholder="Fecha" />
              </div>
              <div className="col-4">
                <Form.Control type="time" placeholder="Fecha" />
              </div>
            </div>
          </Form.Group>
          <div className="border border-1"></div>
          <Form.Group>
            <Form.Control
              as="textarea"
              placeholder="Descripción"
              className="mt-3 mb-3"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="border border-top-0 d-flex justify-content-center bg-light border-dark">
        <Button variant="primary">Agregar Evento</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewEventModal;
