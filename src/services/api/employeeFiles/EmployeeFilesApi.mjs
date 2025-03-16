import axios from "axios";
import { API_ROUTES } from "../../ApiEndPoints.mjs";
import * as Sentry from "@sentry/react";
// Function to upload user documents to the server
export const uploadUserDocuments = async (
  formData,
  token,
  userId,
  permissions
) => {
  try {
    // Sending file and metadata using FormData to the server
    const response = await axios.post(
      API_ROUTES.uploadUserDocuments,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Required header for file uploads
          Authorization: `Bearer ${token}`, // Bearer token for authorization
          "x-user-id": userId, //user id of the admin
          "x-permissions": JSON.stringify(permissions), //Convert object to String Json
        },
      }
    );
    return response; // Return server response
  } catch (error) {
    Sentry.captureException(error); // Capture the error in Sentry
    throw error; // Propagate the error for further handling
  }
};

// Function to retrieve user documents from the server
export const getUserDocuments = async (data, token) => {
  try {
    // Requesting files from the server with necessary permissions and user info
    const response = await axios.get(
      `${API_ROUTES.getUserDocuments}?user_id=${data.user_id}`,
      {
        headers: {
          "Content-Type": "application/json", // Header for JSON data
          Authorization: `Bearer ${token}`, // Bearer token for authorization
          "x-user-id": data.userId, //user id of the admin
          "x-permissions": JSON.stringify(data.permissions), //Convert object to String Json
        },
      }
    );
    return response; // Return server response
  } catch (error) {
    Sentry.captureException(error); // Capture the error in Sentry
    throw error; // Propagate the error for further handling
  }
};

// Function to download user documents from the server
export const downloadUserDocuments = async (data, token) => {
  try {
    // Requesting file download with specific headers and response type
    const response = await axios.get(
      `${API_ROUTES.downloadUserDocuments}/${data.documentId}`,
      {
        headers: {
          "Content-Type": "application/json", // Header for JSON data
          Authorization: `Bearer ${token}`, // Bearer token for authorization
          "x-user-id": data.userId, //user id of the admin
          "x-permissions": JSON.stringify(data.permissions), //Convert object to String Json
        },
        responseType: "blob", // Ensure binary data is returned
      }
    );
    return response; // Return server response
  } catch (error) {
    Sentry.captureException(error); // Capture the error in Sentry
    throw error; // Propagate the error for further handling
  }
};
// Function to create Payroll Pdf
export const generatePayrollPdf = async (payrollData, token, data) => {
  try {
    // Requesting file download with specific headers and response type
    const response = await axios.put(
      `${API_ROUTES.generatePayrollPdf}/${payrollData.user_id}`,
      { payrollData },
      {
        headers: {
          "Content-Type": "application/json", // Header for JSON data
          Authorization: `Bearer ${token}`, // Bearer token for authorization
          "x-user-id": data.userId, //user id of the admin
          "x-permissions": JSON.stringify(data.permissions), //Convert object to String Json
        },
        responseType: "arraybuffer", //Receive binary data
      }
    );
    return response; // Return server response
  } catch (error) {
    Sentry.captureException(error); // Capture the error in Sentry
    throw error; // Propagate the error for further handling
  }
};

// Function to retrieve user payroll extracts from the server
export const getUserPayrollExtracts = async (data, token) => {
  try {
    // Requesting files from the server with necessary permissions and user info
    const response = await axios.get(
      `${API_ROUTES.getUserPayrollExtracts}?user_id=${data.user_id}`,
      {
        headers: {
          "Content-Type": "application/json", // Header for JSON data
          Authorization: `Bearer ${token}`, // Bearer token for authorization
          "x-user-id": data.userId, //user id of the admin
          "x-permissions": JSON.stringify(data.permissions), //Convert object to String Json
        },
      }
    );
    return response; // Return server response
  } catch (error) {
    Sentry.captureException(error); // Capture the error in Sentry
    throw error; // Propagate the error for further handling
  }
};

// Function to download employee payroll extracts from the server
export const downloadUserPayrollExtracts = async (data, token) => {
  try {
    // Requesting file download with specific headers and response type
    const response = await axios.get(
      `${API_ROUTES.downloadUserPayrollExtracts}/${data.payrollExtractId}`,
      {
        headers: {
          "Content-Type": "application/json", // Header for JSON data
          Authorization: `Bearer ${token}`, // Bearer token for authorization
          "x-user-id": data.userId, //user id of the admin
          "x-permissions": JSON.stringify(data.permissions), //Convert object to String Json
        },
        responseType: "blob", // Ensure binary data is returned
      }
    );
    return response; // Return server response
  } catch (error) {
    Sentry.captureException(error); // Capture the error in Sentry
    throw error; // Propagate the error for further handling
  }
};
