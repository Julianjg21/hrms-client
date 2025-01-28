import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronDown,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Navbar, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
function HomeNavbar() {
  const navigate = useNavigate(); //Direct to another route
  const location = useLocation(); //Get the current route

  //log out the user
  const logOut = () => {
    let tokenKey = ""; //Variable to store the token
    //verify which token should be searched according to the user's path
    if (location.pathname.startsWith("/EmployeePortal")) {
      tokenKey = "EmployeeToken";
    } else if (location.pathname.startsWith("/AdminPortal")) {
      tokenKey = "AdminToken";
    }
    //remove the token saved in cookies
    localStorage.removeItem(tokenKey);
    //navigate to login
    navigate("/login");
  };

  return (
    <Navbar className=" bg-dark p-2 p-md-3 ">
      <Navbar.Brand className="text-light d-flex flex-column align-items-center   fw-medium fs-6">
        JUVENTUS <br />
        <span className=" text-danger">BAR</span>
      </Navbar.Brand>

      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Button variant="dark" className="p-2">
          <FontAwesomeIcon icon={faBell} className="text-light fs-5" />
        </Button>

        <Dropdown>
          <Dropdown.Toggle variant="dark" className="custom-dropdown-toggle">
            Julian Jimenez
            <FontAwesomeIcon icon={faChevronDown} className="text-light ms-2" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={logOut} className="">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-secondary me-2"
              />
              Cerrar Sesión
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default HomeNavbar;
