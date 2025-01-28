import axios from "axios";
import { API_ROUTES } from "../../ApiEndPoints.mjs";

export const getPermissions = async () => {
  try {
    // Get all permissions from the server
    const response = await axios.get(
    API_ROUTES.getAllPermissions
    );
    return response;
  } catch (error) {
    console.log("Error trying to obtain all permits", error);
    throw error;
  }
};