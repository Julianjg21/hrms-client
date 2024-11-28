import React from "react";
import LoginPage from "./pages/login/LoginPage";
import AdminPortalPage from "./pages/Home/AdminHome/AdminPortalPage";
import "./App.css";
import ProtectedRoute from "./services/Api/Auth/ProtectedRoute.mjs";
import EmployeePortalPage from "./pages/Home/EmployeeHome/EmployeePortalPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/login" element={<LoginPage />} />
        {/* Default route that also leads to the login page */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected route - only accessible if the user is authenticated */}
        <Route element={<ProtectedRoute />}>
          {/* Admin portal route, only accessible for admins */}
          <Route path="/AdminPortal" element={<AdminPortalPage />} />
          {/* Employee portal route, only accessible for employees */}
          <Route path="/EmployeePortal" element={<EmployeePortalPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
