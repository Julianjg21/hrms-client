import React from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
function EmployeesForm() {
  return (
    <Form className="p-3">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="float-start">
          Número de Identificación
        </Form.Label>

        <Form.Control
          type="text"
          placeholder="Ingrese su número de identificación de identidad"
        />
        <Form.Text className="text-muted">
          No compartas tu contraseña personal.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="float-start">Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Ingrese su contraseña" />
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
