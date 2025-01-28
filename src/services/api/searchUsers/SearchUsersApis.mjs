import axios from "axios";
import { API_ROUTES } from "../../ApiEndPoints.mjs";

// Function that is responsible for looking for users
export const searchUsers = async (data, token) => {
  try {
    const response = await axios.post(API_ROUTES.searchUsers, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log("Error when trying to search the user", error);
    throw error;
  }
};

//Function to search for employees
export const searchEmployees = async (
  data, //Credentials and permissions
  token //Token to validate the user
) => {
  try {
    const response = await axios.post(API_ROUTES.searchEmployees, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log("Error trying to find employees", error);
    throw error;
  }
};
