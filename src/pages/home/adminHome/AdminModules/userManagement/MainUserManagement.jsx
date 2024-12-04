import React from "react";
import { Button } from "react-bootstrap";
import CreateUser from "./userManagementSections/CreateUser";
function MainUserManagement() {
  return (
    <div className="container w-100">
      <div className="row ">
        <div className="col-6 p-0">
          <Button variant="outline-dark" className="border-warning border-opacity-50 w-100 rounded-0" >Crear Usuario</Button>
        </div>
        <div className="col-6 p-0">
          <Button variant="outline-dark" className="border-warning w-100 rounded-0">Modificar Usuario</Button>
        </div>
      </div>
      <div>
        <CreateUser />
      </div>
    </div>
  );
}

export default MainUserManagement;
