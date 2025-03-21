import React, { useState, useEffect } from "react";
import ProtectedElements from "../../hooks/ProtectedElements.mjs";
import { useLocation } from "react-router-dom";
import ListUsersModal from "../../common/modals/searchUsers/ListUsersModal.jsx";
import { Form, Card, Button, CardTitle } from "react-bootstrap";
import { searchUsers } from "../../services/api/searchUsers/SearchUsersApis.mjs";
import * as Sentry from "@sentry/react";
import {
  selectPermissions,
  extractUsedPermissions,
} from "../../utils/utils.mjs";
import { searchEmployees } from "../../services/api/searchUsers/SearchUsersApis.mjs";
function SearchUsers() {
  const [showListUsersModal, setShowListUsersModal] = useState(false);

  const location = useLocation();

  //User data states
  const [userNames, setUserNames] = useState("");
  const [identificationType, setIdentificationType] = useState(
    "Cédula de Ciudadanía"
  );
  const [identification, setIdentification] = useState();
  const [usersFound, setUsersFound] = useState({ user: [{}] });

  //permissions and token
  const [requiredPermissions, setRequiredPermissions] = useState([]); //Permissions required to access the component
  const [permissions, setPermissions] = useState([]); //Permissions extracted from the required permissions
  const [userId, setUserId] = useState(); //User id from  the admin logged in
  const [token, setToken] = useState(); //Token from the admin logged in

  //Show or close listUsersModal
  const activateListUsersModal = () => setShowListUsersModal(true);
  const closeListUsersModal = () => setShowListUsersModal(false);

  useEffect(() => {
    // First get the required permissions
    const getPermissions = selectPermissions(["get_user_data"]);
    // Then extract the required permissions
    setRequiredPermissions(getPermissions);

    // Then extract the permissions
    const extract = extractUsedPermissions(getPermissions);
    setPermissions(extract);
    //Then get the user id
    setUserId(localStorage.getItem("AdminUserId"));
    //Then get the user token
    setToken(localStorage.getItem("AdminToken"));
  }, []);

  const handleFindUser = async (e) => {
    e.preventDefault();
    const data = {
      user_names: userNames, //User names
      type_identification: identificationType, //Type of identification
      identification: identification, //Identification number
    };
    try {
      //Search the user with the data provided
      const response = await searchUsers(
        data, // user data
        token, //Token of authentication
        permissions, //Permissions requied to access the component
        userId //User id from the admin logged in
      );
      if (response.status === 200) {
        //If the user is found
        setUsersFound(response.data); //Save in the state  the user found
        activateListUsersModal(); //Activate de modal with the list of users found
      }
    } catch (error) {
     Sentry.captureException(error); // Capture the error in Sentry
    }
  };

  //Function to search employees by type of area
  const handleSeachEmployees = async (value) => {
    const data = {
      employee_type: value,
    };

    try {
      const response = await searchEmployees(
        data,
        token,
        permissions, //Permissions requied to access the component
        userId //User id from the admin logged in
      );
      if (response.status === 200) {
        setUsersFound(response.data); //Save in the state the users found
        activateListUsersModal(); //Activate the modal with the list of users found
      }
    } catch (error) {
        Sentry.captureException(error); // Capture the error in Sentry
    }
  };

  return (
    <div className="mt-3 mb-3">
      <ProtectedElements requiredPermission={requiredPermissions.get_user_data}>
        <Card className="text-center border border-dark ">
          <Card.Body>
            <CardTitle className="mt-4">Buscar usuario</CardTitle>

            <Form onSubmit={handleFindUser}>
              <div className="row mt-5">
                <div className="col-md-2 col-1"></div>
                <div className="col-md-8 col-10  ">
                  <Form.Group controlId="formUserName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Escribe aqui el nombre del usuario que buscas."
                      className="rounded-4"
                      onChange={(e) => setUserNames(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-2 col-1"></div>
              </div>
              <div className="row mt-4">
                <div className="col-md-4 col-2"></div>
                <div className="col-md-4 col-8">
                  <Form.Group controlId="formDocumentSelect">
                    <Form.Label>Tipo de Documento</Form.Label>
                    <Form.Select
                      className="text-center"
                      value={identificationType}
                      onChange={(e) => setIdentificationType(e.target.value)}
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
                  </Form.Group>
                </div>
                <div className="col-4"></div>
              </div>
              <div className="row mt-4">
                <div className="col-md-2 col 1"></div>
                <div className="col-md-8 col-10">
                  <Form.Group controlId="formDocumentNumber">
                    <Form.Label></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Digite el número de identificación del usuario que busca."
                      className="rounded-4"
                      onChange={(e) => setIdentification(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-2 col-1"></div>
              </div>
              <Button
                variant="light"
                type="submit"
                className="mt-4 border-black"
                title="Buscar usuarios"
              >
                Buscar
              </Button>
              <div className="row mt-5">
                <div className="col-1"></div>
                <div className="col-10 border border-opacity-50 border-secondary  "></div>
                <div className="col-1"></div>
              </div>
            </Form>

            <div className="row mt-5 mb-4">
              <div className="col-md-4 col-2"></div>
              <div className="col-md-4 col-8">
                <Form>
                  <Form.Group className="form-group" controlId="formTypeArea">
                    <Form.Label className="mb-5">
                      Buscar Usuario por Tipo de <br /> Area
                    </Form.Label>
                    <Form.Select
                      id="exampleSelect"
                      className="form-control text-center"
                      onChange={(e) => {
                        handleSeachEmployees(e.target.value); //Call the function
                      }}
                      defaultValue="" //Predetermined value
                    >
                      <option value="" disabled>Selecciona una opción</option>
                      <option value="seguridad">Área de Seguridad</option>
                      <option value="administrador">Área Administrativa</option>
                      <option value="limpieza">Área de Limpieza</option>
                      <option value="atencion">
                        Área de Atención al Cliente
                      </option>
                      <option value="entretenimiento">
                        Área de Entretenimiento
                      </option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              </div>
              <div className="col-md-4 col-2"></div>
            </div>
          </Card.Body>
        </Card>
      </ProtectedElements>
      <ListUsersModal
        showListUsersModal={showListUsersModal}
        closeListUsersModal={closeListUsersModal}
        usersFound={usersFound}
        nextRoute={location.state}
      />
    </div>
  );
}

export default SearchUsers;
