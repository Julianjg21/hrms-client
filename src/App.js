import React from "react";
import LoginPage from "./pages/login/LoginPage";
import AdminPortalPage from "./pages/home/adminHome/AdminPortalPage";
import "./App.css";
import ProtectedRoute from "./services/api/auth/ProtectedRoute.mjs";
import EmployeePortalPage from "./pages/home/employeeHome/EmployeePortalPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainUserManagement from "./pages/home/adminHome/AdminModules/userManagement/MainUserManagement";
function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/login" element={<LoginPage />} />
        {/* Protected route - only accessible if the user is authenticated */}
        <Route element={<ProtectedRoute />}>
          {/* Admin portal route, only accessible for admins */}
          <Route path="/AdminPortal" element={<AdminPortalPage />}>
            {/* child routes*/}
            <Route path="userManagement" element={<MainUserManagement />} />
          </Route>
          {/* Employee portal route, only accessible for employees */}
          <Route path="/EmployeePortal" element={<EmployeePortalPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
