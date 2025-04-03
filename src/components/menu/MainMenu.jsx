import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { Outlet, useLocation } from "react-router-dom";
import company_logo from "../../assets/login/company_logo.png";
function MainMenu({ MenuButtons }) {
  //State to handle whether the form is collapsed or not
  const [isCollapsed, setIsCollapsed] = useState(true);

  //Access the current URL path.
  const location = useLocation();

  //Check if the current path matches either '/AdminPortal' or '/EmployeePortal'.
  const isHomeRootRoute =
    location.pathname === "/AdminPortal" ||
    location.pathname === "/EmployeePortal";

  //Function to toggle collapse
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className={`col-12 col-md-2 p-0 ${
            isCollapsed ? "col-md-2" : ""
          } position-relative`}
        >
          <button
            className="w-100 border-warning border-opacity-50 border border-1 p-1  justify-content-between align-items-center"
            type="button"
            onClick={toggleCollapse}
            title="Selecciionar Sección"
          >
            Options
            <span className="float-end">
              <FontAwesomeIcon icon={faAnglesLeft} className="" />
            </span>
          </button>

          {/*Collapsible menu */}
          <div
            className={`collapse ${isCollapsed ? "show" : ""}`}
            id="collapseExample"
          >
            <div className="card card-body rounded-0 p-0">
              {MenuButtons && <MenuButtons />}
            </div>
          </div>
        </div>
        <div
          className={`col-12 col-md-9 mt-3 mt-md-0  ${
            isCollapsed ? "col-md-10" : "col-md-12"
          }`}
        >
          <div className="border border-1 border-warning  border-opacity-50 mt-2 p-0 container">
            <Outlet />
            {/* Render image only when Outlet is empty */}
            {isHomeRootRoute && (
              <img
                src={company_logo}
                alt="Placeholder"
                className="w-full h-auto w-100 h-100"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
