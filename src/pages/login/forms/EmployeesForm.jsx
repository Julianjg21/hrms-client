import React, { useState } from "react";
import { loginEmployee } from "../../../services/api/loginForms/LoginFormsApis.mjs";
import { Form, Button } from "react-bootstrap";
import * as Sentry from "@sentry/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import FindEmailModal from "../../../common/modals/resetPasswordModals/FindEmailModal";
import AlertModal from "../../../common/modals/AlertModal";
function EmployeesForm() {
  const [showFindEmailModal, setShowFindEmailModal] = useState(false); //show modal findEmailModal
  const [identification, setIdentification] = useState(""); //save data of the input  employeeIdentification
  const [password, setPassword] = useState(""); // save data of the input  employeePassword
  const [showAlertModal, setShowAlertModal] = useState(false); //Activate modal alert

  const navigate = useNavigate(); //We use the useNavigate hook

  const closeFindEmailModal = () => setShowFindEmailModal(false); // close the modal FindEmailModal
  const handleFindEmailModal = () => setShowFindEmailModal(true); // show modal FindEmailModal

  const handleLogin = async (event) => {
    event.preventDefault(); //Prevent page reload
    const typeUser = "employee"; //user type

    try {
      //Send credentials to the server
      const response = await loginEmployee(identification, password, typeUser);
      //Save the token in localStorage
      localStorage.setItem("EmployeeToken", response.data.token); //Save the token in localStorage
      localStorage.setItem("EmployeePermissions", response.data.permissions); //Save the permissions in localStorage
      localStorage.setItem("EmployeeUserId", response.data.userId); //Save the userId in localStorage

      //navigate to the Employee Portal route
      navigate("/EmployeePortal");
    } catch (error) {
      Sentry.captureException(error); // Capture the error in Sentry
      setShowAlertModal(true);
    }
  };

  return (
    <div>
      <Form className="p-3 " onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="employeeIdentification">
          <Form.Label className="float-start">
            Número de Identificación
          </Form.Label>

          <Form.Control
            type="text"
            value={identification} //Bind the state
            placeholder="Ingrese su número de identificación de identidad"
            onChange={(e) => setIdentification(e.target.value)}
            required
          />
          <Form.Text className="text-muted">
            No compartas tu contraseña personal.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="employeePassword">
          <Form.Label className="float-start">Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese su contraseña"
            value={password} //Bind the state
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="d-block justify-content-center mt-3">
          <Button
            variant="light"
            type="submit"
            className="border border-1 d-block mx-auto"
            style={{ maxWidth: "300px" }}
            title="Sección deshabilitada"
            disabled="true"
          >
            Ingresar🔐
          </Button>
          <Button
            variant="light"
            type="button"
            title="Recurper contraseña"
            className="border-0 mt-1 text-black bg-white d-block mx-auto text-decoration-underline"
            style={{ maxWidth: "300px" }}
            onClick={handleFindEmailModal}
          >
            <FontAwesomeIcon icon={faKey} /> ¿Recuperar Contraseña?
          </Button>
          <FindEmailModal
            showFindEmailModal={showFindEmailModal}
            closeFindEmailModal={closeFindEmailModal}
          />
        </div>
      </Form>
      <AlertModal
        show={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        title="¡Error!"
        titleColor="text-danger"
        icon={""}
        bodyText={
          <>
            La contraseña o número de identificación ingresados son incorrectos.
            <br />
            <br />
            "Por favor, inténtalo de nuevo."
          </>
        }
        buttonText="Cerrar"
      />
    </div>
  );
}

export default EmployeesForm;
