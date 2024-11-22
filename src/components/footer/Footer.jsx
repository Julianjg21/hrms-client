import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
function Footer() {
  return (
    <div className="container-fluid border border-1">
      <footer>
        <div className="row mt-2 mb-2">
          <div className="col-4  text-center align-content-center">
            <a href="*" className=" text-bg-light text-decoration-none">
              Ayuda <FontAwesomeIcon icon={faCircleQuestion} />
            </a>
          </div>
          <div className="col-4"></div>
          <div className="col-4">
            <div className="d-flex align-items-center ">
              <FontAwesomeIcon
                icon={faLocationDot}
                style={{ height: "30px" }} // Agregamos un margen entre el ícono y el texto
              />
              <p className="mb-0">
                Calle XXXXXXX <br />
                N.XXXXX
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
