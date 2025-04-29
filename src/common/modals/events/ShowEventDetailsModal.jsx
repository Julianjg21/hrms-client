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

  //Format the start and end date to YYYY-MM-DD and HH:MM
  let startDate = "";
  let startHour = "";
  let endDate = "";
  let endHour = "";

  if (eventDetails?.start_date) {
    const start_Date = new Date(eventDetails.start_date);
    const end_Date = new Date(eventDetails.end_date);

    if (!isNaN(start_Date)) {
      const isoStr = start_Date.toISOString();
      startDate = isoStr.split("T")[0];
      startHour = isoStr.split("T")[1].substring(0, 5);
    }
    if (!isNaN(end_Date)) {
      const isoStr = end_Date.toISOString();
      endDate = isoStr.split("T")[0];
      endHour = isoStr.split("T")[1].substring(0, 5);
    }
  }

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
                  <p>{startDate} Hora: { startHour}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6 text-secondary fw-bolder">
                  Finalizacíon:
                </div>
                <div className="col-6">
                  <p>{endDate} Hora: { endHour}</p>
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
        dates={{ startHour, startDate, endHour, endDate }}
      />
    </div>
  );
}

export default ShowEventDetails;
