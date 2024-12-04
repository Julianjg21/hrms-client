import React from "react";
import { Form, Card, Button, CardTitle } from "react-bootstrap";
function CreateUser() {
  return (
    <div>
      <Card style={{ width: "" }} className="mt-2 mb-2">
        <Card.Body className="p-0 border  border-secondary">
          <CardTitle className="text-center mt-5 mb-2">
            Datos Personales
          </CardTitle>
          <Form className="p-3 mt-4">
            <div className="row">
              <div className="col-6">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="float-start">Nombres</Form.Label>
                  <Form.Control
                    type="text "
                    placeholder="Nombres completos del usuario"
                    /*    value={email} //Bind the state
                    onChange={(e) => setEmail(e.target.value)} */
                    className="rounded-4"
                  />
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="float-start">Apellidos</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Apellidos completos del usuarios"
                    /*          value={password} //Bind the state
                    onChange={(e) => setPassword(e.target.value)} */
                    className="rounded-4"
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-6">
                <Form.Group
                  className="mb-3"
                  controlId="formBasicIdentificationType"
                >
                  <Form.Label className="text-center">
                    Tipo de Identificación
                  </Form.Label>
                  <Form.Select
                  /*        value={identificationType} // Estado ligado al valor seleccionado
                    onChange={(e) => setIdentificationType(e.target.value)} // Manejador de cambios */
                  >
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="CE">Cédula de Extranjería</option>
                    <option value="DINP">
                      Documento de identificacion nacional pasaporte
                    </option>
                    <option value="PAS">Pasaporte</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="float-start">
                    Identificacion
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Numero de identificacion del usuario"
                    /*          value={password} //Bind the state
                    onChange={(e) => setPassword(e.target.value)} */
                    className="rounded-4"
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-1 col-md-4"></div>
              <div className=" col-10 col-md-4 d-flex align-items-center">
                <Form.Group
                  className="mb-3 w-100"
                  controlId="formBasicPassword"
                >
                  <Form.Label className="text-center w-100">
                    Correo Electrónico
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Correo electrónico del usuario"
                    className="rounded-4"
                  />
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
                <Form.Group
                  className="mb-3"
                  controlId="formBasicIdentificationType"
                >
                  <Form.Label className="text-center">Rol Empleado</Form.Label>
                  <Form.Select
                  /*        value={identificationType} // Estado ligado al valor seleccionado
                    onChange={(e) => setIdentificationType(e.target.value)} // Manejador de cambios */
                  >
                    <option value="Bartender">Bartender</option>
                    <option value="Mesero">Mesero</option>
                    <option value="Host">Host</option>
                    <option value="OPl">Operario de limpieza</option>
                    <option value="DJ">DJ</option>
                    <option value="OPs">Operario de seguridad</option>
                    <option value="Bartender">Bartender</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Gerente">Gerente</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-4 col-1"></div>
            </div>

            <div className="row mt-3">
              <div className="col-6">
                {" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="float-start">Banco</Form.Label>
                  <Form.Control
                    type="text "
                    placeholder="Nombre del banco"
                    /*    value={email} //Bind the state
                    onChange={(e) => setEmail(e.target.value)} */
                    className="rounded-4"
                  />
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="float-start">N.cuenta</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Numero de cuenta bancario"
                    /*          value={password} //Bind the state
                    onChange={(e) => setPassword(e.target.value)} */
                    className="rounded-4"
                  />
                </Form.Group>
              </div>
            </div>

            <div className="d-flex justify-content-center mt-5 mb-3">
              <Button
                variant="warning"
                type="submit"
                className="border border-1 text-light"
              >
                Registrar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CreateUser;
