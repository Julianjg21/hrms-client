import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function EmployeesForm() {
  const [identification, setIdentification] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); //We use the useNavigate hook
  const handleLogin = async (event) => {
    event.preventDefault(); //Prevent page reload
    const typeUser = "employee";

    try {
      const response = await axios.post("http://localhost:3080/auth/login", {
        identification,
        password,
        typeUser,
      });

      //Save the token in localStorage
      localStorage.setItem("EmployeeToken", response.data.token);
     //navigate to the Employee Portal route
      navigate("/EmployeePortal");
    } catch (error) {
      console.error(
        "Error al iniciar sesión:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <Form className="p-3" onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="float-start">
          Número de Identificación
        </Form.Label>

        <Form.Control
          type="text"
          value={identification} //Bind the state
          placeholder="Ingrese su número de identificación de identidad"
          onChange={(e) => setIdentification(e.target.value)}
        />
        <Form.Text className="text-muted">
          No compartas tu contraseña personal.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
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
        >
          Ingresar
        </Button>
        <Button
          variant="light"
          type="submit"
          className="border-0 mt-1 text-black bg-white d-block mx-auto text-decoration-underline"
          style={{ maxWidth: "300px" }}
        >
          <FontAwesomeIcon icon={faKey} /> ¿Recuperar Contraseña?
        </Button>
      </div>
    </Form>
  );
}

export default EmployeesForm;
