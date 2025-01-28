import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faBusinessTime, faCalendarDays} from "@fortawesome/free-solid-svg-icons";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { IoIosNavigate } from "react-icons/io";
import { FaFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function EmployeeMenuButtons() {

  const navigate = useNavigate(); //Hook to navigate between sections
  return (
    <div className=" btn-group-vertical p-0">
      <Button variant="outline-dark" className=" border-warning rounded-0 text-start " onClick={() => navigate('userManagement')}>
      <FontAwesomeIcon icon={faUserGroup} className="text-secondary"
      />  Datos Personales
      </Button>
      <Button variant="outline-dark" className=" border-warning rounded-0 text-start" >
      <IoIosNavigate className="text-secondary me-1"/> Solicitudes de Documentos
      </Button>
      <Button variant="outline-dark" className=" border-warning rounded-0 text-start">
      <FaFileAlt icon={faBusinessTime} className="text-secondary me-1"/>Mis Extractos  Nomina
      </Button>
      <Button variant="outline-dark" className=" border-warning rounded-0 text-start">
      <BsFillCalendarDateFill className="text-secondary me-1"/>Calendario
      </Button>
      <Button variant="outline-dark" className=" border-warning rounded-0 text-start">
      <FontAwesomeIcon icon={faCalendarDays} className="text-secondary"/> Horario/Turnos
      </Button>
    </div>
  );
}

export default EmployeeMenuButtons;
