import React, { useState, useEffect } from "react";
import { Card, Button, CardTitle } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function LoginForm() {
  //color of the buttons to change the login form
  const [adminButtonColor, setAdminButtonColor] = useState("text-bg-dark");
  const [employeeButtonColor, setEmployeeButtonColor] =
    useState("text-bg-light");

  //hooks
  const navigate = useNavigate(); // useNavigate hook
  const location = useLocation(); // useLocation hook

  useEffect(() => {
    const actualLocation = location.pathname; //Get the current route
    //check the current route
    if (actualLocation.includes("/employees")) {
      setAdminButtonColor("light"); //set color to the admin form  button
      setEmployeeButtonColor("dark"); // set color to the employee form button
    } else {
      setAdminButtonColor("dark"); //set color to the admin form  button
      setEmployeeButtonColor("light"); // set color to the employee form button
    }
  }, [location]); //react to changes

  return (
    <div className="container-fluid bg-dark h-100">
      <div className="row">
        <div className="col-1 col-md-3 col-lg-4"></div>
        <div className="col-12 col-md-6 mt-4 col-lg-4 mb-4">
          <Card style={{ width: "" }} className="">
            <Card.Body className="p-0 border  border-warning  bg-light">
              <div className="container p-0 d-flex">
                <Button
                  variant={adminButtonColor}
                  type="button"
                  title="Iniciar sesión para administradores"
                  value="admin"
                  className={`flex-fill h-100   rounded-0 border-black`}
                  style={{ minWidth: "150px" }}
                  onClick={() => navigate("admins")}
                >
                  ADMINISTRADOR
                </Button>
                <Button
                  variant={employeeButtonColor}
                  type="button"
                  title="Iniciar sesión como empleado"
                  value="employee"
                  className={`flex-fill h-100 rounded-0  border-black`}
                  style={{ minWidth: "150px" }}
                  onClick={() => navigate("employees")}
                >
                  EMPLEADO
                </Button>
              </div>
              <CardTitle className="text-center mt-5 mb-2">
                Iniciar Sesión
              </CardTitle>
              <Outlet />
            </Card.Body>
          </Card>
        </div>
        <div className="col-1 col-md-3 col-lg-3"></div>
      </div>
    </div>
  );
}

export default LoginForm;
