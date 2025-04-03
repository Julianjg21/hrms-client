import React from "react";
import HomeNavbar from "../../../components/navbar/HomeNavbar";
import MainMenu from "../../../components/menu/MainMenu";
import AdminMenuButtons from "./adminMenuButtons/AdminMenuButtons";
function AdminPortalPage() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <HomeNavbar />
      </header>
      <main className="flex-grow-1 ">
        <MainMenu MenuButtons={AdminMenuButtons} />
      </main>
      <div className="bg-dark mt-3" style={{height:"3rem"}}>
      </div>
    </div>
  );
}
export default AdminPortalPage;
