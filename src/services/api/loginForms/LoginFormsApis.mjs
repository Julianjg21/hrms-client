import axios from "axios";
import { API_ROUTES } from "../../ApiEndPoints.mjs";
import * as Sentry from "@sentry/react";
//function to login the employee
export const loginEmployee = async (
  identification, //employee identification
  password, //employee password
  typeUser //Type of user "Admin or employee"
) => {
  try {
    //Request to the server to login the employee
    const response = await axios.post(API_ROUTES.login, {
      identification,
      password,
      typeUser,
    });

    return response;
  } catch (error) {
    Sentry.captureException(error); // Capture the error in Sentry
    throw error;
  }
};

//function to login the admins
export const loginAdmin = async (
  email, //admin email
  password, //admin password
  typeUser //Type of user "Admin or employee"
) => {
  try {
    //Request to the server to login the admin
    const response = await axios.post(API_ROUTES.login, {
      email,
      password,
      typeUser,
    });

    return response;
  } catch (error) {
    Sentry.captureException(error); // Capture the error in Sentry
    throw error;
  }
};
