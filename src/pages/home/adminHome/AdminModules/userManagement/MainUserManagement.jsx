import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
function MainUserManagement() {
  //color of the buttons to change the section
  const [createUserButtonColor, setCreateUserButtonColor] =
    useState("text-bg-dark");
  const [editUserButtonColor, setEditUserButtonColor] =
    useState("text-bg-light");

  const navigate = useNavigate(); // useNavigate hook
  const location = useLocation(); // useLocation hook

  useEffect(() => {
    const actualLocation = location.pathname; //Get the current route
    //check the current route
    if (actualLocation.includes("/searchUsers") || actualLocation.includes("/editUser")) {
      setCreateUserButtonColor("text-bg-light"); //set color to the admin form  button
      setEditUserButtonColor("text-bg-dark"); // set color to the employee form button
    } else {
      setCreateUserButtonColor("text-bg-dark"); //set color to the admin form  button
      setEditUserButtonColor("text-bg-light"); // set color to the employee form button
    }
  }, [location]); //react to changes

  return (
    <div className="container w-100">
      <div className="row ">
        <div className="col-6 p-0">
          <Button
            variant="outline-dark"
            className={`border-warning ${createUserButtonColor} border-opacity-50 w-100 rounded-0`}
            onClick={() => navigate("createUser")}
          >
            Crear Usuario
          </Button>
        </div>
        <div className="col-6 p-0">
          <Button
            variant="outline-dark"
            className={`border-warning w-100 ${editUserButtonColor} rounded-0`}
            onClick={() => navigate("searchUsers")}
          >
            Modificar Usuario
          </Button>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default MainUserManagement;
