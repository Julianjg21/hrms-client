import React, { useState } from "react";
import { Card, Button, CardTitle } from "react-bootstrap";
import EmployeesForm from "./forms/EmployeesForm";
import AdminForm from "./forms/AdminForm";

function LoginForm() {
  //color of the buttons to change the login form
  const [adminButtonColor, setAdminButtonColor] = useState("text-bg-dark");
  const [employeeButtonColor, setEmployeeButtonColor] =
    useState("text-bg-light");
  //Form to render
  const [renderForm, setRenderForm] = useState("AdminForm");

 //Change button color and render the selected form
  const selectButton = (e) => {
    if (e.target.value === "employee") {
      setAdminButtonColor("text-bg-light");
      setEmployeeButtonColor("text-bg-dark");
      setRenderForm("EmployeesForm");
    } else {
      setAdminButtonColor("text-bg-dark ");
      setEmployeeButtonColor("text-bg-light");
      setRenderForm("AdminForm");
    }
  };

  return (
    <div className="container-fluid bg-black h-100">
      <div className="row">
        <div className="col-1 col-md-3 col-lg-4"></div>
        <div className="col-12 col-md-6 mt-4 col-lg-4 mb-4">
          <Card style={{ width: "" }} className="">
            <Card.Body className="p-0 border  border-warning">
              <div className="container p-0 d-flex">
                <Button
                  variant="primary"
                  type="button"
                  value="admin"
                  className={`flex-fill h-100  ${adminButtonColor} rounded-0 border-black`}
                  style={{ minWidth: "150px" }}
                  onClick={(e) => selectButton(e)}
                >
                  ADMINISTRADOR
                </Button>
                <Button
                  variant="primary"
                  type="button"
                  value="employee"
                  className={`flex-fill h-100 rounded-0 ${employeeButtonColor} border-black`}
                  style={{ minWidth: "150px" }}
                  onClick={(e) => selectButton(e)}
                >
                  EMPLEADO
                </Button>
              </div>
              <CardTitle className="text-center mt-5 mb-2">
                Iniciar Sesión
              </CardTitle>
              {renderForm === "AdminForm" ? <AdminForm /> : <EmployeesForm />}
            </Card.Body>
          </Card>
        </div>
        <div className="col-1 col-md-3 col-lg-3"></div>
      </div>
    </div>
  );
}

export default LoginForm;
