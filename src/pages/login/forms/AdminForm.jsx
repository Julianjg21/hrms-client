import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AdminForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); //We use the useNavigate hook
  const handleLogin = async (event) => {
    event.preventDefault(); //Prevent page reload
    const typeUser = "administrator"; //type of user to enter
    try {
      //
      const response = await axios.post("http://localhost:3080/auth/login", {
        email,
        password,
        typeUser,
      });

      //Save the token in localStorage
      localStorage.setItem("AdminToken", response.data.token);
      //Navigate to the AdminPortal path
      navigate("/AdminPortal");
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
        <Form.Label className="float-start">Correo</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingrese su email registrado"
          value={email} //Bind the state
          onChange={(e) => setEmail(e.target.value)}
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
      <div className="d-flex justify-content-center mt-3 mb-3 ">
        <Button variant="light" type="submit" className="border border-1">
          Ingresar
        </Button>
      </div>
    </Form>
  );
}

export default AdminForm;
