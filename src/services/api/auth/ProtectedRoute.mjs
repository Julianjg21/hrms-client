import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true); //To handle the load while validating the token
  const [isValidToken, setIsValidToken] = useState(false); //To handle token validity
  const navigate = useNavigate(); //Direct to another route
  const location = useLocation(); //Get the current route

  useEffect(() => {
    let tokenKey = ""; //variable to store the token
    let userPermissions = []; //variable to store the user's role permissions
    let userId = "";
    let adminEmail = "";
    //verify which route the client is trying to access to determine which access token it should verify
    if (location.pathname.startsWith("/EmployeePortal")) {
      tokenKey = "EmployeeToken";
      userPermissions = "EmployeePermissions";
      userId = "EmployeeUserId";
    } else if (location.pathname.startsWith("/AdminPortal")) {
      tokenKey = "AdminToken";
      userPermissions = "AdminPermissions";
      userId = "AdminUserId";
      adminEmail = "AdminEmail";
    }

    //Get the token saved in the cookies
    const token = localStorage.getItem(tokenKey);

    if (!token) {
      //If there is no token, redirect to login
      navigate("/login");
      setLoading(false);
      return;
    }

    //Verify the token by sending it in the header
    axios
      .get("http://localhost:3080/auth/protected", {
        headers: {
          Authorization: `Bearer ${token}`, //Send the token in the header
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setIsValidToken(true); //If the token is valid
        }
      })
      .catch(() => {
        localStorage.removeItem(tokenKey); //If the token is invalid, remove the token
        localStorage.removeItem(userPermissions);
        localStorage.removeItem(userId);
        localStorage.removeItem(adminEmail);
        localStorage.removeItem("AllPermissions");

        navigate("/login"); //Redirect to login if token is invalid
      })
      .finally(() => {
        setLoading(false); //Stop loading when verification is finished
      });
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isValidToken) {
    return <Navigate to="/login" />; //If the token is invalid, redirect to the login
  }
  return <Outlet />; //If the token is valid, render the protected routes
};

export default ProtectedRoute;
