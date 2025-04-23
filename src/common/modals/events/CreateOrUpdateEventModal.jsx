import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import * as Sentry from "@sentry/react";
import { createNewEvent, updateEvent} from "../../../services/api/userEvents/UserEventsApis.mjs";
import {
  selectPermissions,
  extractUsedPermissions,
} from "../../../utils/utils.mjs";
import ProtectedElements from "../../../hooks/ProtectedElements.mjs";
import createAlertData from "../../../hooks/CreateAlertData.mjs";
import AlertModal from "../AlertModal";
function CreateOrUpdateEventModal({
  show, //Check if the modal is visible
  onClose, //Function to close the modal) {
  updateEvents,
  updateEventData
}) {
  //State for user permissions and authentication
  const [userId, setUserId] = useState(); //Admin user ID
  const [token, setToken] = useState(); //Admin authentication token
  const [permissions, setPermissions] = useState([]); // Extracted permissions

  //Atributes of the modal alert
  const [alertData, setAlertData] = useState({});
  const [showAlertModal, setShowAlertModal] = useState(false);

  // State for user permissions and authentication
  const [requiredPermissions, setRequiredPermissions] = useState([""]);

  //event data
  const [title, setTitle] = useState(updateEventData?.title || "");
  const [ubication, setUbication] = useState(updateEventData?.ubication || "");
  const [startDate, setStartDate] = useState();
  const [startHour, setStartHour] = useState();
  const [endDate, setEndDate] = useState();
  const [endHour, setEndHour] = useState();
  const [description, setDescription] = useState(updateEventData?.description || "");

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

  // Create event
  const handleCreateEvent = async () => {
    const eventData = {
      userId,
      title,
      ubication,
      startDate: `${startDate} ${startHour}:00`,
      endDate: `${endDate} ${endHour}:00`,
      description,
    };
    let alertData;

    try {
      const response = await createNewEvent(eventData, token, permissions);

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

  //Update event
  const handleUpdateEvent = async () => {
    const eventData = {
      title,
      ubication,
      startDate: `${startDate} ${startHour}:00`,
      endDate: `${endDate} ${endHour}:00`,
      description,
      eventId: updateEventData.id_event
    }
    let alertData;

    try {
      const response = await updateEvent(eventData, token, permissions, userId);

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
        <ProtectedElements
          requiredPermission={requiredPermissions.management_events}
        >
          <Form>
            <Form.Group>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Título"
                value={title}
                className="mb-3"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                onChange={(e) => setUbication(e.target.value)}
                type="text"
                placeholder="Lugar o Link"
                value={ubication}
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
                  <Form.Control
                    onChange={(e) => setStartDate(e.target.value)}
                    type="date"
                    placeholder="Fecha"
                  />
                </div>
                <div className="col-4">
                  <Form.Control
                    onChange={(e) => setStartHour(e.target.value)}
                    type="time"
                    placeholder="Fecha"
                  />
                </div>
              </div>
            </Form.Group>
            <Form.Group className="mb-3 mt-3 text-secondary">
              <div className="row">
                <div className="col-4">
                  <Form.Label>Finzaliza</Form.Label>
                </div>
                <div className="col-4">
                  <Form.Control
                    onChange={(e) => setEndDate(e.target.value)}
                    type="date"
                    placeholder="Fecha"
                  />
                </div>
                <div className="col-4">
                  <Form.Control
                    onChange={(e) => setEndHour(e.target.value)}
                    type="time"
                    placeholder="Fecha"
                  />
                </div>
              </div>
            </Form.Group>
            <div className="border border-1"></div>
            <Form.Group>
              <Form.Control
                onChange={(e) => setDescription(e.target.value)}
                as="textarea"
                placeholder="Descripción"
                value={description}
                className="mt-3 mb-3"
              />
            </Form.Group>
          </Form>
        </ProtectedElements>
      </Modal.Body>
      <Modal.Footer className="border border-top-0 d-flex justify-content-center bg-light border-dark">
        <Button variant="primary" type="button" onClick={`${updateEventData ? handleCreateEvent : handleUpdateEvent  }`}>
          {`${updateEventData ? "Actualizar Evento" : " Agregar Evento"}` }
        </Button>
      </Modal.Footer>
      <AlertModal
        show={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        title={alertData.title}
        titleColor={alertData.titleColor}
        icon={alertData.icon}
        bodyText={alertData.bodyText}
        buttonText={alertData.buttonText}
      />
    </Modal>
  );
}

export default CreateOrUpdateEventModal;
