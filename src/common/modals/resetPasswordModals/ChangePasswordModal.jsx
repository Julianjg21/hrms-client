import React, { useState } from "react";
import * as Sentry from "@sentry/react";
import { resetPassword } from "../../../services/api/resetPasswords/ResetPassowordApis.mjs";
import createAlertData from "../../../hooks/CreateAlertData.mjs";
import { Modal, Button, Form } from "react-bootstrap";
import AlertModal from "../AlertModal";
function ChangePasswordModal({
  showChangePasswordModal, //show the modal
  closeChangePasswordModal, // close the modal
  userEmail: email, //email of the user
}) {
  //form states
  const [newPassword, setNewPassword] = useState(""); //save data of the input newPassword
  const [confirmPassword, setConfirmPassword] = useState(""); //save data of the input confirmPassword

  //Atributes of the modal alert
  const [alertData, setAlertData] = useState({});
  const [showAlertModal, setShowAlertModal] = useState(false);

  //Change the password of the user
  const handleSubmit = async () => {
    const data = {
      email: email, //user email
      newPassword: newPassword, //new password
    };
    let alertData;
    //check if the new password and the confirmation match
    if (newPassword === confirmPassword) {
      //send data to the server
      try {
        const response = await resetPassword(data);
        //check if the response is correct

        //close the changePasswordModal
        closeChangePasswordModal();
        //set confirmation alert attributes
        alertData = response || {
          data: { message: "Error desconocido.", status: 500 },
        };
      } catch (error) {
        //Server response
        alertData = error.response || {
          data: { message: "Error desconocido.", status: 500 },
        };
        Sentry.captureException(error); // Capture the error in Sentry
        //set error alert atributs
      } finally {
        setAlertData(createAlertData(alertData.data.message, alertData.status)); //Save server response on the alert
        //Activate alert
        setShowAlertModal(true);
        //reset form inputs
        setNewPassword("");
        setConfirmPassword("");
      }
      //actions if passwords do not match
    } else {
      //set error alert atributs
      setAlertData(
        createAlertData(
          "Las contraseñas  no coinciden. \t Porfavor, inténtalo de nuevo.",
          400
        )
      );
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
        title={alertData.title}
        titleColor={alertData.titleColor}
        icon={alertData.icon}
        bodyText={alertData.bodyText}
        buttonText={alertData.buttonText}
      />
    </>
  );
}

export default ChangePasswordModal;
