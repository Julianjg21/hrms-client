import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
function MainEmployeeDocumentation() {
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
    navigate("searchUsers", { state: "/AdminPortal/employeeDocumentation/employeeFiles" });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //Navigate to the searchUsers component
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default MainEmployeeDocumentation;
