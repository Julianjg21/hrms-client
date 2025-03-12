import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { loginAdmin } from "../../../services/api/loginForms/LoginFormsApis.mjs";
import { useNavigate } from "react-router-dom";
import AlertModal from "../../../common/modals/AlertModal";
function AdminForm() {
  const [email, setEmail] = useState(""); //user email
  const [password, setPassword] = useState(""); // user password
  const [showAlertModal, setShowAlertModal] = useState(false); //Activate modal alert

  const navigate = useNavigate(); //useNavigate hook

  //send data to the server
  const handleLogin = async (event) => {
    event.preventDefault(); //Prevent page reload
    const typeUser = "administrator"; //type of user to enter
    //send data
    try {
       //Send credentials to the server
      const response = await loginAdmin(email, password, typeUser);
      //Save the token in localStorage
      localStorage.setItem("AdminToken", response.data.token);
      localStorage.setItem(
        "AdminPermissions",
        JSON.stringify(response.data.permissions)
      );
      localStorage.setItem("AdminUserId", response.data.userId);  //Save the user id in localStorage
      localStorage.setItem("AdminEmail", response.data.email); //Save the user email in localStorage

      //Navigate to the AdminPortal path
      navigate("/AdminPortal");
    } catch (error) {
      console.error(
        "Error logging:",
        error.response?.data?.message || error.message
      );
      setShowAlertModal(true);
    }
  };

  return (
    <div className="bg-light">
      <Form className="p-3" onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="adminEmail">
          <Form.Label className="float-start">Correo</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su email registrado"
            value={email} //Bind the state
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Text className="text-muted">
            No compartas tu contraseña personal.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="adminPassword">
          <Form.Label className="float-start">Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese su contraseña"
            value={password} //Bind the state
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="d-flex justify-content-center mt-3 mb-3 ">
          <Button variant="light" type="submit" title="Iniciar sesión" className="border border-1">
            Ingresar
          </Button>
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
            La contraseña o el correo electronico ingresados son incorrectos.
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

export default AdminForm;
