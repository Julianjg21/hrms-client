import React from "react";
import company_logo from "../../assets/login/company_logo.png";
import { Navbar } from "react-bootstrap";
function LoginNavbar() {
  return (
    <Navbar className="bg-body-tertiary p-0">
      <Navbar.Brand href="#home" className="p-0">
        <img
          src={company_logo}
          alt="company logo"
          width="40%"
          height="35%"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
    </Navbar>
  );
}
export default LoginNavbar;
