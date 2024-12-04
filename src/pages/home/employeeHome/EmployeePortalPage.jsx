import React from "react";
import HomeNavbar from "../../../components/navbar/HomeNavbar";
import MainMenu from "../../../components/Menu/MainMenu";
import EmployeeMenuButtons from "./employeeMenuButtons/EmployeeMenuButtons";
function EmployeePortalPage() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <HomeNavbar />
      </header>
      <main className="flex-grow-1 ">
        <MainMenu MenuButtons={EmployeeMenuButtons} />
      </main>
      <div className="bg-dark mt-3" style={{ height: "3rem" }}></div>
    </div>
  );
}

export default EmployeePortalPage;
