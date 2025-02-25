import React from "react";
import PropTypes from "prop-types";
import { IoIosLock } from "react-icons/io";

//Component that receives a required permission and a child element
const ProtectedElements = ({ requiredPermission, children }) => {
  //Get the list of permissions from localStorage
  const getPermisos = localStorage.getItem("AdminPermissions");
  const permisos = JSON.parse(getPermisos) || []; // Parsear permisos o usar un array vacío si no existen
  console.log("r",requiredPermission )

  //Validate if the required permission is in the permission list
  const isBlocked = !permisos.some((permiso) => {
    const permissionValue = permiso.permission?.toLowerCase() || ""; //Ensure permission.permission is a string
    const requiredValue = requiredPermission?.toLowerCase() || ""; //Ensures requiredPermission is a string
    return permissionValue === requiredValue;
  });

  return (
    <div className="lock-wrapper">
      {/*Show the overlay with the lock if the element is locked */}
      {isBlocked && (
        <div className="lock-overlay">
          <IoIosLock />
        </div>
      )}
      {/*Clone the child element and pass the properties to it */}
      {React.cloneElement(children, {
        disabled: isBlocked, //Deactivate the element if it is locked
        className: `${children.props.className || ""} ${
          isBlocked ? "disabled" : ""
        }`, //Add class "disabled"
      })}
    </div>
  );
};

//Validation of component properties
ProtectedElements.propTypes = {
  requiredPermission: PropTypes.string.isRequired, //The required permission as string
  children: PropTypes.element.isRequired, //Child element (input or button)
};

export default ProtectedElements;
