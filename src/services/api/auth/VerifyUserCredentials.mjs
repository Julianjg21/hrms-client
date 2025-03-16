import axios from "axios";
import { API_ROUTES } from "../../ApiEndPoints.mjs";
import * as Sentry from "@sentry/react";
// Function to verify the user password
export const verifyUserPassword = async (
  data, //User Credentials and permissions
  token, //Token to authenticate the request
  permissions, //Permissions necessary to delete the user
  userId, // userId of the admin
) => {
  try {
    const response = await axios.post(API_ROUTES.verifyPassword, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "x-user-id": userId, //user id of the admin
        "x-permissions": JSON.stringify(permissions)//Convert object to String Json
      },
    });

    return response;
  } catch (error) {
    Sentry.captureException(error); // Capture the error in Sentry
    throw error;
  }
};
