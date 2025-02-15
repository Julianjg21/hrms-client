import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { IoMdCalculator } from "react-icons/io";
import { FaFileAlt } from "react-icons/fa";

import { Button } from "react-bootstrap";
function MainPayrollManagement() {
  const navigate = useNavigate();
  const location = useLocation();

  // State to keep track of the active button based on the current route
  const [activeButton, setActiveButton] = useState("");
  useEffect(() => {
    navigate("searchUsersPg", {
      state: "/AdminPortal/payrollManagement/payrollGenerator",
    });
  }, []);


  // Update active button based on the current route
  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location]); //Navigate to the searchUsers component

  const buttons = [
    {
      label: "Nomina",
      icon: <IoMdCalculator className="text-secondary me-1" />,
      path: "searchUsersPg",
      state: "/AdminPortal/payrollManagement/payrollGenerator",
    },
    {
      label: "Extractos de Nómina",
      icon: <FaFileAlt className="text-secondary me-1" />,
      path: "searchUsersPe",
      state: "/AdminPortal/payrollManagement/downloadPayrollExtract",
    },
  ];
  return (
    <div className="container">
      <div className="row ">
        {buttons.map(({ label, icon, path, state }) => (
          <div className="col-6 p-0 d-flex justify-content-center">
            <Button
              key={path}
              title="Seleccionar sección"
              variant="outline-dark"
              className={`border-warning rounded-0 w-100  d-flex justify-content-center align-items-center ${
                activeButton.includes(path) || activeButton.includes(state)
                  ? "bg-dark text-light"
                  : ""
              }`}
              onClick={() => navigate(path, { state })}
            >
              {label} {icon}
            </Button>
          </div>
        ))}
      </div>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default MainPayrollManagement;
