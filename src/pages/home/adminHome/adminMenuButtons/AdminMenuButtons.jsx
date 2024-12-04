import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faFolder, faBusinessTime, faCalendarDays} from "@fortawesome/free-solid-svg-icons";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { IoIosNavigate } from "react-icons/io";
import { useNavigate } from "react-router-dom";
function AdminMenuButtons() {
  const navigate = useNavigate();
  return (
    <div className=" btn-group-vertical p-0">
      <Button variant="outline-dark" className=" border-warning rounded-0 text-start " onClick={() => navigate('userManagement')}>
      <FontAwesomeIcon icon={faUserGroup} className="text-secondary"
      />  Control de Usuarios
      </Button>
      <Button variant="outline-dark" className=" border-warning rounded-0 text-start" >
      <FontAwesomeIcon icon={faFolder} className="text-secondary" /> Doumentación de Empleados
      </Button>
      <Button variant="outline-dark" className=" border-warning rounded-0 text-start">
      <FontAwesomeIcon icon={faBusinessTime} className="text-secondary me-1"/>Nomina
      </Button>
      <Button variant="outline-dark" className=" border-warning rounded-0 text-start">
      <BsFillCalendarDateFill className="text-secondary me-1"/>Calendario
      </Button>
      <Button variant="outline-dark" className=" border-warning rounded-0 text-start">
      <FontAwesomeIcon icon={faCalendarDays} className="text-secondary"/> Horario/Turnos
      </Button>
      <Button variant="outline-dark" className=" border-warning rounded-0 text-start">
      <IoIosNavigate className="text-secondary me-1"/>Solicitudes de Usuarios
      </Button>
    </div>
  );
}

export default AdminMenuButtons;
