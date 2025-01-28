import axios from "axios";
import { API_ROUTES } from "../../ApiEndPoints.mjs";

// Function to verify the user password
export const verifyUserPassword = async (
  data, //User Credentials and permissions
  token //Token to authenticate the request
) => {
  try {
    const response = await axios.post(API_ROUTES.verifyPassword, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log("Error al intentar verificar la contraseña", error);
    throw error;
  }
};
