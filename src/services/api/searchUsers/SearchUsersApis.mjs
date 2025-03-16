import axios from "axios";
import { API_ROUTES } from "../../ApiEndPoints.mjs";
import * as Sentry from "@sentry/react";
// Function that is responsible for looking for users
export const searchUsers = async (data, token, permissions, userId) => {
  const params = new URLSearchParams(data);
  try {
    const response = await axios.get(
      `${API_ROUTES.searchUsers}?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "x-user-id": userId, //user id of the admin
          "x-permissions": JSON.stringify(permissions), //Convert object to String Json
        },
      }
    );
    return response;
  } catch (error) {
    Sentry.captureException(error); // Capture the error in Sentry
    throw error;
  }
};

//Function to search for employees
export const searchEmployees = async (
  data, //Credentials and permissions
  token, //Token to validate the user
  permissions,
  userId
) => {
  const params = new URLSearchParams(data);
  try {
    const response = await axios.get(
      `${API_ROUTES.searchEmployees}?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "x-user-id": userId, //user id of the admin
          "x-permissions": JSON.stringify(permissions), //Convert object to String Json
        },
      }
    );
    return response;
  } catch (error) {
    Sentry.captureException(error); // Capture the error in Sentry
    throw error;
  }
};
