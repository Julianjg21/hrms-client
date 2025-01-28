import axios from "axios";
import { API_ROUTES } from "../../ApiEndPoints.mjs";

//Find email in the database
export const findEmail = async (data) => {
  try {
    const response = await axios.post(
      API_ROUTES.findEmail,
      data
    );
    return response;
  } catch (error) {
    console.log("Error trying to find the user", error);
    throw error;
  }
};

//Verify code to reset password
export const verifyCode = async (data) => {
  try {
    const response = await axios.post(
      API_ROUTES.verifyCode,
      data
    );
    return response;
  } catch (error) {
    console.log("Error trying to verify the code", error);
    throw error;
  }
};

//Reset password
export const resetPassword = async (data) => {
  try {
    const response = await axios.post(
      API_ROUTES.resetPassword,
      data
    );
    return response;
  } catch (error) {
    console.log("Error trying to restore password", error);
    throw error;
  }
};
