import React from "react";
import { Form, Button } from "react-bootstrap";
function AdminForm() {
  return (
    <Form className="p-3">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="float-start">Correo</Form.Label>
        <Form.Control type="email" placeholder="Ingrese su email registrado" />
        <Form.Text className="text-muted">
          No compartas tu contraseña personal.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="float-start">Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Ingrese su contraseña" />
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
