import axios from "axios";
import { API_ROUTES } from "../../ApiEndPoints.mjs";
import * as Sentry from "@sentry/react";
export const getPermissions = async () => {
  try {
    // Get all permissions from the server
    const response = await axios.get(
    API_ROUTES.getAllPermissions
    );
    return response;
  } catch (error) {
      Sentry.captureException(error); // Capture the error in Sentry
    throw error;
  }
};