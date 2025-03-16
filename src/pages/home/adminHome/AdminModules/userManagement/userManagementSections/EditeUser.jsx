import React, { useState, useEffect } from "react";
import AlertModal from "../../../../../../common/modals/AlertModal";
import DeleteUserModal from "../../../../../../common/modals/deleteUSer/DeleteUserModal";
import { Form, Card, Button, CardTitle } from "react-bootstrap";
import ProtectedElements from "../../../../../../hooks/ProtectedElements.mjs";
import * as Sentry from "@sentry/react";
import {
  selectPermissions,
  extractUsedPermissions,
} from "../../../../../../utils/utils.mjs";
import { FaCheckCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { updateUserData } from "../../../../../../services/api/userManagement/UserManagementApis.mjs";
function EditUser() {
  //Get the user data from the location state
  const location = useLocation();
  const dataUser = location.state;

  //Format the date to the input date format
  const formattedDate = `${new Date(
    dataUser.birth_date
  ).getFullYear()}-${String(
    new Date(dataUser.birth_date).getMonth() + 1
  ).padStart(2, "0")}-${String(
    new Date(dataUser.birth_date).getDate()
  ).padStart(2, "0")}`;

  //States of the form
  const [names, setNames] = useState(dataUser.user_names);
  const [lastNames, setLastNames] = useState(dataUser.last_names);
  const [identificationType, setIdentificationType] = useState(
    dataUser.type_identification
  );
  const [phoneNumber, setPhoneNumber] = useState(dataUser.phone_number);
  const [identification, setIdentification] = useState(dataUser.identification);
  const [birthDate, setBirthDate] = useState(formattedDate);
  const [bank, setBank] = useState(dataUser.bank);
  const [accountNumber, setAccountNumber] = useState(dataUser.account_number);
  const [email, setEmail] = useState(dataUser.email);
  const [employeeType, setEmployeeType] = useState(dataUser.employee_type);

  //Atributes of the modal alert
  const [title, setTitle] = useState("");
  const [titleColor, setTitleColor] = useState("");
  const [icon, setIcon] = useState();
  const [bodyText, setBodyText] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [showAlertModal, setShowAlertModal] = useState(false); //Activate modal alert

  //Permissions and user data
  const [requiredPermissions, setRequiredPermissions] = useState([]); //Permissions required to create a user
  const [permissions, setPermissions] = useState([]); //Permissions extracted from the required permissions
  const [requiredDeletePermissions, setRequiredDeletePermissions] = useState(
    []
  );
  const [userId, setUserId] = useState(); //Id of the user logged in
  const [token, setToken] = useState(); //Token of the user logged in

  //Show the deleteUser modal
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

  useEffect(() => {
    // First get the required permissions
    const getPermissions = selectPermissions([
      "edit_user_email",
      "edit_user_number_phone",
      "edit_user_names",
      "edit_user_lastNames",
      "edit_type_identification",
      "edit_identification",
      "edit_birth_date",
      "edit_employee_role",
      "edit_bank_name",
      "edit_account_number",
      "update_user_data",
    ]);
    const getDeletePermissions = selectPermissions(["delete_user"]);
    setRequiredDeletePermissions(getDeletePermissions);

    setRequiredPermissions(getPermissions);

    // Then extract the permissions
    const extract = extractUsedPermissions(getPermissions);
    setPermissions(extract);
    //Then get the user id
    setUserId(localStorage.getItem("AdminUserId"));
    //Then get the user token
    setToken(localStorage.getItem("AdminToken"));
  }, []);
  //Function to send the data to the server
  const sendData = async (e) => {
    //Prevent the page from refreshing
    e.preventDefault();
    //Create the user data object
    const userData = {
      email,
      identification,
      permissions,
    };
    //Create the user details object
    const userDetails = {
      user_names: names,
      last_names: lastNames,
      type_identification: identificationType,
      phone_number: phoneNumber,
      identification,
      birth_date: birthDate, //Pass it as a string in YYYY-MM-DD format
      bank,
      account_number: accountNumber,
      employee_type: employeeType,
    };

    try {
      //Send the data to the server
      const response = await updateUserData(
        permissions, //Permissions needed to edit the user
        userId, //Id of the user logged in
        userData, //User data
        userDetails, //User details
        token, //Token of the user logged in
        dataUser.user_id
      );
      //If the response is 200, the user was edited successfully
      if (response.status === 200) {
        //Set the modal alert
        setTitle("");
        setTitleColor("text-dark");
        setIcon(<FaCheckCircle className=" text-success fs-1" />);
        setBodyText(response.data.message);
        setButtonText("Aceptar");
      }
    } catch (error) {
      Sentry.captureException(error); // Capture the error in Sentry
      //Set the modal alert
      setTitle("!Error¡");
      setTitleColor("text-danger");
      setIcon(<FaCheckCircle className="text-danger fs-1" />);
      setBodyText(error.response.data.message);
      setButtonText("Aceptar");
    } finally {
      setShowAlertModal(true);
    }
  };

  const deleteUserConfirmation = (params) => {
    setShowDeleteUserModal(false);
    setTitle("");
    setTitleColor("text-dark");
    setIcon(<FaCheckCircle className=" text-success fs-1" />);
    setBodyText("¡Usuario eliminado con exito!");
    setButtonText("Aceptar");
    setShowAlertModal(true);
  };

  return (
    <div>
      <Card style={{ width: "" }} className="mt-2 mb-2">
        <Card.Body className="p-0 border  border-secondary">
          <CardTitle className="text-center mt-5 mb-2">
            Datos Personales
          </CardTitle>
          <Form className="p-3 mt-4" onSubmit={sendData}>
            <div className="row">
              <div className="col-6">
                <Form.Group className="mb-3" controlId="userNamesInput">
                  <Form.Label className="float-start">Nombres</Form.Label>
                  <ProtectedElements
                    requiredPermission={requiredPermissions.edit_user_names}
                  >
                    <Form.Control
                      type="text "
                      placeholder="Nombres completos del usuario"
                      value={names} //Bind the state
                      onChange={(e) => setNames(e.target.value)}
                      className="rounded-4"
                    />
                  </ProtectedElements>
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="mb-3" controlId="userLastNamesInput">
                  <Form.Label className="float-start">Apellidos</Form.Label>
                  <ProtectedElements
                    requiredPermission={requiredPermissions.edit_user_lastNames}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Apellidos completos del usuarios"
                      value={lastNames} //Bind the state
                      onChange={(e) => setLastNames(e.target.value)}
                      className="rounded-4"
                    />
                  </ProtectedElements>
                </Form.Group>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <Form.Group
                  className="mb-3"
                  controlId="userTypeIdentificationInput"
                >
                  <Form.Label className="text-center">
                    Tipo de Identificación
                  </Form.Label>
                  <ProtectedElements
                    requiredPermission={
                      requiredPermissions.edit_type_identification
                    }
                  >
                    <Form.Select
                      value={identificationType} // Estado ligado al valor seleccionado
                      onChange={(e) => setIdentificationType(e.target.value)} // Controlador de cambios
                    >
                      <option value="Cédula de Ciudadanía">
                        Cédula de Ciudadanía
                      </option>
                      <option value="Cédula de Extranjería">
                        Cédula de Extranjería
                      </option>
                      <option value="Documento de identificación nacional pasaporte">
                        Documento de identificación nacional pasaporte
                      </option>
                      <option value="Pasaporte">Pasaporte</option>
                    </Form.Select>
                  </ProtectedElements>
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group
                  className="mb-3"
                  controlId="userIdentificationInput"
                >
                  <Form.Label className="float-start">
                    Identificación
                  </Form.Label>
                  <ProtectedElements
                    requiredPermission={requiredPermissions.edit_identification}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Numero de identificacion del usuario"
                      value={identification} //Bind the state
                      onChange={(e) => setIdentification(e.target.value)}
                      className="rounded-4"
                    />
                  </ProtectedElements>
                </Form.Group>
              </div>
            </div>
            <div className="container">
              <div className="row mt-3">
                <div className="col-6">
                  <Form.Group className="mb-3" controlId="userNumberPhoneInput">
                    <Form.Label className="float-start">Telefono</Form.Label>
                    <ProtectedElements
                      requiredPermission={
                        requiredPermissions.edit_user_number_phone
                      }
                    >
                      <Form.Control
                        type="tel"
                        placeholder="Numero de telefono de usuario"
                        value={phoneNumber} //Bind the state
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="rounded-4"
                      />
                    </ProtectedElements>
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group className="mb-3 " controlId="userBirthdateInput">
                    <Form.Label className="float-start center">
                      Fecha de Nacimiento
                    </Form.Label>
                    <ProtectedElements
                      requiredPermission={requiredPermissions.edit_birth_date}
                    >
                      <Form.Control
                        type="date"
                        placeholder="Selecciona tu fecha de nacimiento"
                        className="rounded-4"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                      />
                    </ProtectedElements>
                  </Form.Group>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-1 col-md-4"></div>
              <div className=" col-10 col-md-4 d-flex align-items-center">
                <Form.Group className="mb-3 w-100" controlId="userEmailInput">
                  <Form.Label className="text-center w-100">
                    Correo Electrónico
                  </Form.Label>
                  <ProtectedElements
                    requiredPermission={requiredPermissions.edit_user_email}
                  >
                    <Form.Control
                      type="email"
                      placeholder="Correo electrónico del usuario"
                      className="rounded-4"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </ProtectedElements>
                </Form.Group>
              </div>
              <div className="col-1 col-md-4"></div>
            </div>

            <div className="row mt-3">
              <div className="col-md-4 col-1"></div>
              <div className="col-md-4 col-10 text-center  border-top border-secondary">
                <p className="fw-bold">Rol de empleado y datos de nomina</p>
              </div>
              <div className="col-md-4 col-1"></div>
            </div>

            <div className="row mt-2">
              <div className="col-md-4 col-1"></div>
              <div className="col-md-4 col-10 text-center">
                <Form.Group className="mb-3" controlId="userRolEmployeeInput">
                  <Form.Label className="">Rol Empleado</Form.Label>
                  <ProtectedElements
                    requiredPermission={requiredPermissions.edit_employee_role}
                  >
                    <Form.Select
                      value={employeeType} // Estado ligado al valor seleccionado
                      onChange={(e) => setEmployeeType(e.target.value)} // Controlador de cambios
                    >
                      <option value="Bartender">Bartender</option>
                      <option value="Mesero">Mesero</option>
                      <option value="Host">Host</option>
                      <option value="Operario de limpieza">
                        Operario de limpieza
                      </option>
                      <option value="DJ">DJ</option>
                      <option value="Operario de seguridad">
                        Operario de seguridad
                      </option>
                      <option value="Bartender">Bartender</option>
                      <option value="Administrador">Administrador</option>
                      <option value="Gerente">Gerente</option>
                    </Form.Select>
                  </ProtectedElements>
                </Form.Group>
              </div>
              <div className="col-md-4 col-1"></div>
            </div>

            <div className="row mt-3">
              <div className="col-6">
                <Form.Group className="mb-3" controlId="bankInput">
                  <Form.Label className="float-start">Banco</Form.Label>
                  <ProtectedElements
                    requiredPermission={requiredPermissions.edit_bank_name}
                  >
                    <Form.Control
                      type="text "
                      placeholder="Nombre del banco"
                      value={bank} //Bind the state
                      onChange={(e) => setBank(e.target.value)}
                      className="rounded-4"
                    />
                  </ProtectedElements>
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="mb-3" controlId="bankNumber">
                  <Form.Label className="float-start">N.cuenta</Form.Label>
                  <ProtectedElements
                    requiredPermission={requiredPermissions.edit_account_number}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Numero de cuenta bancario"
                      value={accountNumber} //Bind the state
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="rounded-4"
                    />
                  </ProtectedElements>
                </Form.Group>
              </div>
            </div>
            <div className="row mt-5 mb-3">
              <div className="col-4 float-start">
                <ProtectedElements
                  requiredPermission={requiredDeletePermissions.delete_user}
                >
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => setShowDeleteUserModal(true)}
                    title="Eliminar Usuario"
                  >
                    Eliminar
                    <tr />
                    Usuario
                  </Button>
                </ProtectedElements>
              </div>
              <div className="col-4 d-flex justify-content-center">
                <ProtectedElements
                  requiredPermission={requiredPermissions.update_user_data}
                >
                  <Button
                    variant="warning"
                    type="submit"
                    className="border border-1 text-light"
                    title="Guardar cambios"
                  >
                    Guardar <tr />
                    Cambios
                  </Button>
                </ProtectedElements>
              </div>
              <div className="col-4"></div>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <AlertModal
        show={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        title={title}
        titleColor={titleColor}
        icon={icon}
        bodyText={bodyText}
        buttonText={buttonText}
      />
      <DeleteUserModal
        permissions={permissions}
        userId={userId}
        token={token}
        showDeleteUserModal={showDeleteUserModal}
        onCloseDeleteUserModal={() => setShowDeleteUserModal(false)}
        deleteUserConfirmation={deleteUserConfirmation}
        dataUser={dataUser}
      />
    </div>
  );
}

export default EditUser;
