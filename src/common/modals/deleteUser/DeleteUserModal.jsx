import React, { useState, useEffect } from "react";
import * as Sentry from "@sentry/react";
import { Modal, Button, Form } from "react-bootstrap";
import { verifyUserPassword } from "../../../services/api/auth/VerifyUserCredentials.mjs";
import { deleteUser } from "../../../services/api/userManagement/UserManagementApis.mjs";
import {
  selectPermissions,
  extractUsedPermissions,
} from "../../../utils/utils.mjs";
function DeleteUserModal({
  userId,
  token,
  showDeleteUserModal,
  onCloseDeleteUserModal,
  deleteUserConfirmation,
  dataUser,
}) {
  const [password, setPassword] = useState(); //password entered by the user
  const [warning, setWarning] = useState(); //Incorrect password warning
  const [permissions, setPermissions] = useState([]); //Permissions extracted from the required permissions

  useEffect(() => {
    // First get the required permissions
    const getPermissions = selectPermissions(["delete_user"]);
    // Then extract the permissions
    const extract = extractUsedPermissions(getPermissions);
    setPermissions(extract);
  }, []);

  const handleVerifyUserPassword = async () => {
    const data = {
      password, //password of the admin
      email: localStorage.getItem("AdminEmail"), //email fo the user that is going to be deleted
    };
    try {
      const response = await verifyUserPassword(
        data, //User data
        token, //token of authentication
        permissions, //Permissions necessary to delete the user
        userId // userId of the admin
      );
      if (response.status === 200) {
        //If the password is correct
        handleDeleteUser(); //Delete the user from  the data bases
      }
    } catch (error) {
      Sentry.captureException(error); // Capture the error in Sentry
      setWarning("¡Contraseña incorrecta!");
    }
  };
  //function to delete the user
  const handleDeleteUser = async () => {
    try {
      await deleteUser(dataUser.user_id, token, permissions, userId);
      deleteUserConfirmation(); //confirmation that the user was deleted
    } catch (error) {
      Sentry.captureException(error); // Capture the error in Sentry
    }
  };
  return (
    <Modal
      show={showDeleteUserModal}
      onHide={onCloseDeleteUserModal}
      centered
      size="sm"
    >
      <Modal.Header className="border border-bottom-0 ">
        <Modal.Title className="fs-6 w-100 text-center text-primary">
          ¿Estas seguro de eliminar
          <br /> este usuario?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="border border-bottom-0 border-top-0">
        <div className="text-center">
          <Form>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label className="text-secondary">
                Para continuar, confirme su contraseña:
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <p className=" text-danger">{warning}</p>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer className="border border-top-0 d-flex justify-content-center">
        <Button
          variant="light"
          type="button"
          className="border-black"
          onClick={handleVerifyUserPassword}
          title="Confirmar contraseña"
        >
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default DeleteUserModal;
