import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { verifyUserPassword } from "../../../services/api/auth/VerifyUserCredentials.mjs";
import { deleteUser } from "../../../services/api/userManagement/UserManagementApis.mjs";
function DeleteUserModal({
  permissions,
  userId,
  token,
  showDeleteUserModal,
  onCloseDeleteUserModal,
  deleteUserConfirmation,
  dataUser,
}) {
  const [password, setPassword] = useState();
  const [warning, setWarning] = useState();

  const handleVerifyUserPassword = async () => {
    const data = {
      permissions, //Permissions necessary to delete the user
      userId, // userId of the admin
      password, //password of the admin
      email: localStorage.getItem("AdminEmail"), //email fo the user that is going to be deleted
    };
    try {
      const response = await verifyUserPassword(data, token);
      if (response.status === 200) {
        //If the password is correct
        handleDeleteUser(); //Delete the user from  the data bases
      }
    } catch (error) {
      console.log("Error when verifying the password.");
      setWarning("¡Contraseña incorrecta!");
    }
  };
  //function to delete the user
  const handleDeleteUser = async () => {
    try {
      await deleteUser(dataUser, token, permissions, userId);
      deleteUserConfirmation(); //confirmation that the user was deleted
    } catch (error) {
      console.error("Error deleting the user:", error.message);
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
            <Form.Group>
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
        >
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default DeleteUserModal;
