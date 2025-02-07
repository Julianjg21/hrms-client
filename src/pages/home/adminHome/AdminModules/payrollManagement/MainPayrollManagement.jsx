import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
function MainPayrollManagement() {
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
    navigate("searchUsers", { state: "/AdminPortal/payrollManagement/payrollGenerator" });
  }, []); //Navigate to the searchUsers component
  return (
    <div>
      <Outlet />
    </div>
  );
}


export default MainPayrollManagement;
