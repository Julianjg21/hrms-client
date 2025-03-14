import React from "react";
import PropTypes from "prop-types";
import { IoIosLock } from "react-icons/io";

//Component that protects elements according to user permissions
const ProtectedElements = ({ requiredPermission, children }) => {
  // Obtain the list of permits stored in localStorage
  const getPermisos = localStorage.getItem("AdminPermissions");

  // Parse permits (convert from String to Array) or use an empty array if there are no stored permits
  const permisos = JSON.parse(getPermisos) || [];

  //Verify if the required permit is on the user's permissions list
  const isBlocked = !permisos.some((permiso) => {
    //Ensure that the values ​​are lowercase text chains to avoid comparison problems
    const permissionValue = permiso.permission?.toLowerCase() || "";
    const requiredValue = requiredPermission?.toLowerCase() || "";
    return permissionValue === requiredValue; //Returns `True` if the required permission is on the list
  });

  return (
 //container that wraps the protected element
    <div className="lock-wrapper">
      {/* If the user has no permission, a red padlock is shown on the element */}
      {isBlocked && (
        <div className="lock-overlay">
          <IoIosLock size={20} color="red" />
        </div>
      )}
      {/* Clon the son element and add properties to disable it if you have no permission */}
      {React.cloneElement(children, {
        disabled: isBlocked, //Disable inputs and buttons if you don't have permissions
        className: `${children.props.className || ""} ${isBlocked ? "disabled" : ""}`,//Add a CSS class if it is blocked
      })}
    </div>
  );
};

//Property validation to ensure that the correct values ​​are passed
ProtectedElements.propTypes = {
  requiredPermission: PropTypes.string.isRequired, //permission required as string
  children: PropTypes.element.isRequired, // Son element (it can be a button or input)
};

export default ProtectedElements;
