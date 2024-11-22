import React from "react";
import company_logo from "../../assets/login/company_logo.png";
function LoginNavbar() {
  return (
    <div className="container-fluid  p-0 border border-1">
      <nav className="navbar  bg-light h-100 w-100 p-0 ">
        <div className="row  p-0">
          <div className="col-4 ">
            <a className="navbar-brand" href="#">
              <img
                src={company_logo}
                alt="company logo"
                className="w-100 h-100 "
              />
            </a>
          </div>
          <div className="col-4"></div>
          <div className="col-4"></div>
        </div>
      </nav>
    </div>
  );
}
export default LoginNavbar;
