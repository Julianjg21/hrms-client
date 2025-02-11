import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faFolder,
  faBusinessTime,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { IoIosNavigate } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";

function AdminMenuButtons() {
  // State to keep track of the active button based on the current route
  const [activeButton, setActiveButton] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Update active button based on the current route
  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location]);

  // Button configuration for dynamic rendering
  const buttons = [
    {
      label: "Control de Usuarios",
      icon: <FontAwesomeIcon icon={faUserGroup} className="text-secondary" />,
      path: "userManagement",
    },
    {
      label: "Documentación de Empleados",
      icon: <FontAwesomeIcon icon={faFolder} className="text-secondary" />,
      path: "employeeDocumentation",
    },
    {
      label: "Nómina",
      icon: (
        <FontAwesomeIcon
          icon={faBusinessTime}
          className="text-secondary me-1"
        />
      ),
      path: "payrollManagement",
    },
    {
      label: "Calendario",
      icon: <BsFillCalendarDateFill className="text-secondary me-1" />,
      path: "calendar",
    },
    {
      label: "Horario/Turnos",
      icon: (
        <FontAwesomeIcon icon={faCalendarDays} className="text-secondary" />
      ),
      path: "schedule",
    },
    {
      label: "Solicitudes de Usuarios",
      icon: <IoIosNavigate className="text-secondary me-1" />,
      path: "userRequests",
    },
  ];

  return (
    <div className="btn-group-vertical p-0">
      {buttons.map(({ label, icon, path }) => (
        <Button
          key={path}
          title="Seleccionar sección"
          variant="outline-dark"
          className={`border-warning rounded-0 text-start ${
            activeButton.includes(path) ? "bg-dark text-light" : ""
          }`}
          onClick={() => navigate(path)}
        >
          {icon} {label}
        </Button>
      ))}
    </div>
  );
}

export default AdminMenuButtons;
