import React from "react";
import { Modal, Button } from "react-bootstrap";

function AlertModal({
  show, //Check if the modal is visible
  onClose, //Function to close the modal
  title = "¡Error!", //Modal title
  titleColor = "text-danger", //Class for title color
  bodyText = "Please try again.", //Main text in the body
  icon = null, //Optional icon to display in the body
  buttonText = "OK", //Button text
  onButtonClick = null, //Action when button is pressed
}) {
  return (
    <Modal show={show} onHide={onClose} centered size="sm">
      <Modal.Header className={`border border-bottom-0 ${titleColor}`}>
        <Modal.Title className={`fs-6 w-100 text-center ${titleColor}`}>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="border border-bottom-0 border-top-0">
        <div className="text-center">
          <p className="text-black">{bodyText}</p>
          {icon && <div className="mb-3">{icon}</div>}{" "}
          {/*Render the icon if it exists */}
        </div>
      </Modal.Body>
      <Modal.Footer className="border border-top-0 d-flex justify-content-center">
        <Button
          variant="light"
          title={buttonText}
          type="button"
          className="border-black"
          onClick={onButtonClick || onClose} //Use the custom action or close the modal
        >
          {buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AlertModal;
