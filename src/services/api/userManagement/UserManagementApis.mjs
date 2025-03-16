import axios from "axios";
import { API_ROUTES } from "../../ApiEndPoints.mjs";
import * as Sentry from "@sentry/react";

//Delete user
export const deleteUser = async (
  user_id, //Send id of the user to delete
  token, //Token that is used to authenticate the user
  permissions, //Send permissions necessary to delete the  user
  userId //User id of the user that is deleting the user
) => {
  try {
    const response = await axios.delete(`${API_ROUTES.deleteUser}/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "x-user-id": userId, //user id of the admin
        "x-permissions": JSON.stringify(permissions), //Convert object to String Json
      },
    });
    return response;
  } catch (error) {
    Sentry.captureException(error); // Capture the error in Sentry
    throw error;
  }
};

export const updateUserData = async (
  permissions, //Send permissions necessary to update  the data of the user
  userId, //User id of the user that is updating the user
  userData, //User data to update
  userDetails, //user details to update
  token, //Token that is used to authenticate the user
  user_id
) => {
  try {
    //Send the data to the server
    const response = await axios.put(
      `${API_ROUTES.editUserData}/${user_id}`,
      {
        permissions, //send permissions necessary to create user
        userId, //send the user id
        userData, //send the user data
        userDetails, //send the user details
      },
      //Send the token in the headers
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

//Create user
export const createUser = async (
  permissions, //send permissions necessary to create user
  userId, //send the user id
  userData, //send the user data
  userDetails, //send the user details
  token //Token that is used to authenticate the user
) => {
  try {
    //Send the data to the server
    const response = await axios.post(
      API_ROUTES.createUser,
      {
        userData, //send the user data
        userDetails, //send the user details
      },
      //Send the token in the headers
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
