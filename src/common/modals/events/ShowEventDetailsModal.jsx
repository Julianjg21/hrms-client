import React from "react";
import { Modal, Button } from "react-bootstrap";
import CreateOrUpdateEventModal from "./CreateOrUpdateEventModal";
function ShowEventDetails({ eventDetails, onClose, show }) {
  
  const [showEditModal, setShowEditModal] = React.useState(false);
  const closeEditModal = () => setShowEditModal(false);

  const handleShowEditModal = () => {
    setShowEditModal(true);
    onClose();
  };

  return (
    <div>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header
          closeButton
          className="bg-light border  border border-bottom-0 border-dark"
        >
          <Modal.Title className="w-100 text-center text-secondary">
            Evento
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="border border-bottom-0 border-top-0 border-dark">
          <h2 className="text-center fs-5">{eventDetails.title}</h2>
          <div className="mt-4 mb-2 border p-1">
            <div className="row mt-1">
              <div className="col-6">
                <p className="text-secondary fw-bolder ">Lugar o link:</p>
              </div>
              <div className="col-6">
                {" "}
                <p className="">{eventDetails.ubication}</p>
              </div>
            </div>
          </div>
          <div className="mt-2 mb-2">
            <h3 className="text-center fs-6 text-secondary">Descripción</h3>
            <div className="border p-1">
              <p>{eventDetails.description}</p>
            </div>
          </div>
          <div className="mt-2 mb-2">
            <h3 className="text-center fs-6 text-secondary">Fecha: </h3>
            <div className="border  p-1">
              <div className="row">
                <div className="col-6">
                  <p className="text-secondary fw-bolder">Inicio:</p>
                </div>
                <div className="col-6">
                  <p>{eventDetails.start_date}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6 text-secondary fw-bolder">
                  Finalizacíon:
                </div>
                <div className="col-6">
                  <p>{eventDetails.end_date}</p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="border border-top-0 float-end bg-light border-dark">
          <Button className="btn btn-secondary " onClick={handleShowEditModal}>
            Editar{" "}
          </Button>
          <Button className="btn btn-danger">Eliminar</Button>
        </Modal.Footer>
      </Modal>
      <CreateOrUpdateEventModal
        show={showEditModal}
        onClose={closeEditModal}
        eventDetails={eventDetails}
      />
    </div>
  );
}

export default ShowEventDetails;
