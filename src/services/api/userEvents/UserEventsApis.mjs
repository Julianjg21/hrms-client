import axios from "axios";
import { API_ROUTES } from "../../ApiEndPoints.mjs";
import * as Sentry from "@sentry/react";

//create new event
export const createNewEvent = async (eventData, token, permissions) => {
  try {
    const response = await axios.post(API_ROUTES.createNewEvent, eventData, {
      headers: {
        Authorization: `Barear ${token}`,
        "Content-Type": "application/json",
        "x-user-id": eventData.userId, //user id of the user
        "x-permissions": JSON.stringify(permissions), //Convert object to String Json
      },
    });
    return response;
  } catch (error) {
    Sentry.captureException(error); // Capture the error in Sentry
    throw error; // Handle error
  }
};

//update event
export const updateEvent = async (eventData, token, permissions, userId) => {
  try {
    const response = await axios.put(API_ROUTES.updateEvent, eventData, {
      headers: {
        Authorization: `Barear ${token}`,
        "Content-Type": "application/json",
        "x-user-id": userId, //user id of the user
        "x-permissions": JSON.stringify(permissions), //Convert object to String Json
      },
    });
    return response;
  } catch (error) {
    Sentry.captureException(error); // Capture the error in Sentry
    throw error; // Handle error
  }
};

//delete event
export const deleteEvent = async (eventId, token, permissions, userId) => {
  try {
    const response = await axios.delete(
      `${API_ROUTES.deleteEvent}/${eventId}`,
      {
        headers: {
          Authorization: `Barear ${token}`,
          "Content-Type": "application/json",
          "x-user-id": userId, //user id of the user
          "x-permissions": JSON.stringify(permissions), //Convert object to String Json
        },
      }
    );
    return response;
  } catch (error) {
    Sentry.captureException(error); // Capture the error in Sentry
    throw error; // Handle error
  }
};

// Get all events of the user
export const getAllEvents = async (token, permissions, userId) => {
  try {
    const response = await axios.get(
      `${API_ROUTES.getAllEvents}/${userId}`,
      {
        headers: {
          Authorization: `Barear ${token}`,
          "Content-Type": "application/json",
          "x-user-id": userId, //user id of the user
          "x-permissions": JSON.stringify(permissions), //Convert object to String Json
        },
      }
    );
    return response;
  } catch (error) {
    Sentry.captureException(error); // Capture the error in Sentry
    throw error; // Handle error
  }
};
