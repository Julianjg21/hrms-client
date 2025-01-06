import React, { useEffect } from "react";
import axios from "axios";
import AdminForm from "./pages/login/forms/AdminForm";
import EmployeesForm from "./pages/login/forms/EmployeesForm";
import LoginPage from "./pages/login/LoginPage";
import AdminPortalPage from "./pages/home/adminHome/AdminPortalPage";
import "./App.css";
import ProtectedRoute from "./services/api/auth/ProtectedRoute.mjs";
import EmployeePortalPage from "./pages/home/employeeHome/EmployeePortalPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CreateUser from "./pages/home/adminHome/AdminModules/userManagement/userManagementSections/CreateUser";
import MainUserManagement from "./pages/home/adminHome/AdminModules/userManagement/MainUserManagement";

function App() {
  //get all permissions from the server and store them in local storage
  useEffect(() => {
    const getAllPermissions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3080/requestUserRole/getAllPermissions"
        );
        //store all permissions in local storage
        localStorage.setItem("AllPermissions", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error al obtener los permisos:", error);
      }
    };

    getAllPermissions();
  }, []);
  return (
    <Router>
      <Routes>
        {/* Default global addressing to log */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Route for the login page */}
        <Route path="/login" element={<LoginPage />}>
          {/*Default redirection to /AdminForm child of login*/}
          <Route index element={<Navigate to="admins" />} />
          {/* children of /login*/}
          <Route path="admins" element={<AdminForm />} />
          <Route path="employees" element={<EmployeesForm />} />
        </Route>
        {/* Protected route - only accessible if the user is authenticated */}
        <Route element={<ProtectedRoute />}>
          {/* Admin portal route, only accessible for admins */}
          <Route path="/AdminPortal" element={<AdminPortalPage />}>
            {/* child routes*/}
            <Route path="userManagement" element={<MainUserManagement />}>
              <Route index element={<Navigate to="createUser" />} />
              <Route path="createUser" element={<CreateUser />} />
            </Route>
          </Route>
          {/* Employee portal route, only accessible for employees */}
          <Route path="/EmployeePortal" element={<EmployeePortalPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
