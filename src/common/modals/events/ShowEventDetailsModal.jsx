import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import AlertModal from "../AlertModal";
import * as Sentry from "@sentry/react";
import createAlertData from "../../../hooks/CreateAlertData.mjs";
import { deleteEvent } from "../../../services/api/userEvents/UserEventsApis.mjs";
import CreateOrUpdateEventModal from "./CreateOrUpdateEventModal";
import {
  selectPermissions,
  extractUsedPermissions,
} from "../../../utils/utils.mjs";
function ShowEventDetails({ eventDetails, onClose, show, updateEvents }) {
  //State for user permissions and authentication
  const [userId, setUserId] = useState(); //Admin user ID
  const [token, setToken] = useState(); //Admin authentication token
  const [permissions, setPermissions] = useState([]); // Extracted permissions

  // State for user permissions and authentication
  const [requiredPermissions, setRequiredPermissions] = useState([""]);
  //Atributes of the modal alert
  const [alertData, setAlertData] = useState({});
  const [showAlertModal, setShowAlertModal] = useState(false);

  const location = useLocation(); //To redirect to another route

  useEffect(() => {
    // Get required permissions
    const getPermissions = selectPermissions(["management_events"]);

    setRequiredPermissions(getPermissions);

    // Extract used permissions
    const extractedPermissions = extractUsedPermissions(getPermissions);
    setPermissions(extractedPermissions);

    if (location.pathname.startsWith("/AdminPortal")) {
      // Get user ID and token from localStorage
      setUserId(localStorage.getItem("AdminUserId"));
      setToken(localStorage.getItem("AdminToken"));
    } else if (location.pathname.startsWith("/EmployeePortal")) {
      // Get user ID and token from localStorage
      setUserId(localStorage.getItem("EmployeeUserId"));
      setToken(localStorage.getItem("EmployeeToken"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showEditModal, setShowEditModal] = React.useState(false);
  const closeEditModal = () => {
    setShowEditModal(false);
    updateEvents();
  };

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

  const handleDeleteEvent = async () => {
    let alertData;
    try {
      const response = await deleteEvent(
        eventDetails.id_event,
        token,
        permissions,
        userId
      );

      alertData = response || {
        data: { message: "Error desconocido.", status: 500 },
      };
    } catch (error) {
      //Server response
      alertData = error.response || {
        data: { message: "Error desconocido.", status: 500 },
      };
      Sentry.captureException(error); // Capture the error in Sentry
    } finally {
      setAlertData(createAlertData(alertData.data.message, alertData.status)); //Save server response on the alert

      setShowAlertModal(true);
      updateEvents(); // Update events after creating a new event
    }
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
                  <p>
                    {startDate} Hora: {startHour}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-6 text-secondary fw-bolder">
                  Finalizacíon:
                </div>
                <div className="col-6">
                  <p>
                    {endDate} Hora: {endHour}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="border border-top-0 float-end bg-light border-dark">
          <Button className="btn btn-secondary " onClick={handleShowEditModal}>
            Editar{" "}
          </Button>
          <Button className="btn btn-danger" onClick={handleDeleteEvent}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      <CreateOrUpdateEventModal
        show={showEditModal}
        onClose={closeEditModal}
        eventDetails={eventDetails}
        updateEvents={updateEvents}
        dates={{ startHour, startDate, endHour, endDate }}
      />
      <AlertModal
        show={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        title={alertData.title}
        titleColor={alertData.titleColor}
        icon={alertData.icon}
        bodyText={alertData.bodyText}
        buttonText={alertData.buttonText}
      />
    </div>
  );
}

export default ShowEventDetails;
