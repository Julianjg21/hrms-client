import React, { useState } from "react";
import * as Sentry from "@sentry/react";
import { resetPassword } from "../../../services/api/resetPasswords/ResetPassowordApis.mjs";
import { Modal, Button, Form } from "react-bootstrap";
import AlertModal from "../AlertModal";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
function ChangePasswordModal({
  showChangePasswordModal, //show the modal
  closeChangePasswordModal, // close the modal
  userEmail: email, //email of the user
}) {
  //form states
  const [newPassword, setNewPassword] = useState(""); //save data of the input newPassword
  const [confirmPassword, setConfirmPassword] = useState(""); //save data of the input confirmPassword

  //Alert modal states
  const [showAlertModal, setShowAlertModal] = useState(false); //Activate modal alert

  //Atributes of the modal alert
  const [title, setTitle] = useState("");
  const [titleColor, setTitleColor] = useState("");
  const [icon, setIcon] = useState();
  const [bodyText, setBodyText] = useState("");
  const [buttonText, setButtonText] = useState("");

  //Change the password of the user
  const handleSubmit = async () => {
    const data = {
      email: email, //user email
      newPassword: newPassword, //new password
    };
    //check if the new password and the confirmation match
    if (newPassword === confirmPassword) {
      //send data to the server
      try {
        const response = await resetPassword(data);
        //check if the response is correct
        if (response.status === 200) {
          //close the changePasswordModal
          closeChangePasswordModal();
          //set confirmation alert attributes
          setTitle("");
          setTitleColor("text-danger");
          setIcon(<FaCheckCircle className="text-primary fs-1" />);
          setBodyText(response.data.message);
          setButtonText("Aceptar");
          setShowAlertModal(true); //activate the modal alert
        }
      } catch (error) {
        Sentry.captureException(error); // Capture the error in Sentry
        //set error alert atributs
        setTitle("Error");
        setTitleColor("text-danger");
        setIcon(<MdError className="text-danger fs-1" />);
        setBodyText(error.response.data.message);
        setButtonText("Aceptar");
        setShowAlertModal(true); //activate the modal alert
      } finally {
        //reset form inputs
        setNewPassword("");
        setConfirmPassword("");
      }
      //actions if passwords do not match
    } else {
      //set error alert atributs
      setTitle("Error");
      setTitleColor("text-danger");
      setIcon();
      setBodyText(
        <>
          Las contraseñas no coinciden.
          <br />
          <br />
          "Por favor, inténtalo de nuevo."
        </>
      );
      setButtonText("Aceptar");
      setShowAlertModal(true); //activate the modal alert
    }
  };

  return (
    <>
      <Modal
        show={showChangePasswordModal}
        onHide={closeChangePasswordModal}
        centered
      >
        <Modal.Header closeButton className="border-0  text-center p-5 ">
          <Modal.Title className="fs-6 w-100 text-center ">
            Recuperacion de contraseña
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form>
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>Nueva contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Repetir contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0 d-flex justify-content-center p-5">
          <Button
            variant="light"
            className=" border-black "
            onClick={handleSubmit}
            type="button"
            title="Restaurar contraseña"
          >
            Restaurar <br />
            Contraseña
          </Button>
        </Modal.Footer>
      </Modal>
      <AlertModal
        show={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        title={title}
        titleColor={titleColor}
        icon={icon}
        bodyText={bodyText}
        buttonText={buttonText}
      />
    </>
  );
}

export default ChangePasswordModal;
