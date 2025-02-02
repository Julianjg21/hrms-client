import axios from "axios";
import { API_ROUTES } from "../../ApiEndPoints.mjs";

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
    console.log("Error al intentar verificar la contraseña", error);
    throw error;
  }
};
