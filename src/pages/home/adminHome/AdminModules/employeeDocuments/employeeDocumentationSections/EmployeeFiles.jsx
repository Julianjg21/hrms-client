import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import {
  downloadUserDocuments,
  getUserDocuments,
  uploadUserDocuments,
} from "../../../../../../services/api/employeeFiles/EmployeeFilesApi.mjs";
import ProtectedElements from "../../../../../../services/api/auth/ProtectedElements.mjs";
import {
  selectPermissions,
  extractUsedPermissions,
} from "../../../../../../utils/utils.mjs";
function EmployeeFiles() {
  const [fileKey, setFileKey] = useState(Date.now()); //Unique key to reset the input
  const [file, setFile] = useState(null); //Save the file selected by the user
  const [message, setMessage] = useState(""); //Message to show the user
  const [filesFound, setFilesFound] = useState({}); //Files found in the database

  //Permissions and user data
  const [requiredPermissions, setRequiredPermissions] = useState([]); //Permissions required to create a user
  const [permissions, setPermissions] = useState([]); //Permissions extracted from the required permissions
  const [userId, setUserId] = useState(); //Id of the user logged in
  const [token, setToken] = useState(); //Token of the user logged in

  const location = useLocation(); //Get the user data from the previous component
  const userData = location.state; //User data

  //Inputs to upload the files
  const inputs = [
    {
      type_document: "Documento de Identificacion",
      id: "identification_document",
    },
    {
      type_document: "Certificados de Educacíon",
      id: "education_certificates",
    },
    { type_document: "Certificados  de Cursos", id: "course_certificates" },
    { type_document: "Certificaciones Laborales", id: "work_certifications" },
    { type_document: "Contrato de trabajo", id: "work_contract" },
    { type_document: "Extractos de Nomina", id: "payroll_extracts" },
    {
      type_document: "Extractos Salud y Pensión",
      id: "health_and_pension_extracts",
    },
    { type_document: "Documentos Adicionales", id: "additional_documents" },
  ];

  useEffect(() => {
    // First get the required permissions
    const getPermissions = selectPermissions([
      "upload_user_documents",
      "download_user_documents",
    ]);
    setRequiredPermissions(getPermissions);

    // Then extract the permissions
    const extract = extractUsedPermissions(getPermissions);
    setPermissions(extract);

    // Then get the user id
    const userId = localStorage.getItem("AdminUserId");
    setUserId(userId);

    // Then get the user token
    const token = localStorage.getItem("AdminToken");
    setToken(token);
  }, []);

  useEffect(() => {
   //Verify that all the necessary units are available
    if (userId && token && permissions) {
      getFiles(); // Get the files from the database
    }
  }, [userId, token, permissions]);

  // Function to fetch files associated with a user
  const getFiles = async () => {
    const data = {
      user_id: userData.user_id, // User ID of the employee
      permissions, // Necessary permissions to obtain files from the database
      userId, // User ID of the admin
    };

    try {
      // Request to obtain documents
      const response = await getUserDocuments(data, token);

      // Group documents by type
      const groupedDocuments = response.data[0].reduce(
        (accumulatedDocs, currentDoc) => {
          accumulatedDocs[currentDoc.document_type] =
            accumulatedDocs[currentDoc.document_type] || [];
          accumulatedDocs[currentDoc.document_type].push(currentDoc);
          return accumulatedDocs;
        },
        {}
      );
      setFilesFound(groupedDocuments); // Update state with grouped documents
    } catch (error) {
      console.log("Error obtaining files", error); // Handle errors during file fetching
    }
  };

  // Function to handle file upload
  const handleSubmit = async (e, id) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!file) {
      // Show error message if no file is selected
      setMessage({ message: "Por favor, selecciona un archivo.", id: id });
      setFileKey(Date.now()); // Reset file input by changing its key
      return;
    }

    // Create FormData for the file upload
    const formData = new FormData();
    formData.append("file", file); // Append the file
    formData.append("document_type", id); // Append document type
    formData.append("user_id", userData.user_id); // Append employee user ID

    try {
      // Upload the document and handle the response
      const response = await uploadUserDocuments(formData, token, userId, permissions );
      setMessage({ message: response.data.message, id: id }); // Show success message
      setFile(null); // Clear the file input
      getFiles(); // Refresh the file list
    } catch (error) {
      setMessage({ message: "Error al subir el archivo.", id: id }); // Show error message
      console.error(error); // Log the error for debugging
    }
  };

  // Function to handle file download
  const handleDownload = async (id) => {
    const data = {
      permissions, // Necessary permissions
      userId, // Admin user ID
      "documentId":id, // Document ID
    };

    try {
      // Request to download the document
      const response = await downloadUserDocuments(data, token);
      // Extract file name from Content-Disposition header if available
      const contentDisposition = response.headers["content-disposition"];
      let fileName = `file_${id}`; // Default file name

      if (contentDisposition) {
        const match = contentDisposition.match(
          /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        );
        if (match && match[1]) {
          fileName = decodeURIComponent(match[1].replace(/['"]/g, ""));
        }
      }

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      // Create a URL for the blob and trigger the download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      // Clean up the URL and remove the link
      window.URL.revokeObjectURL(url);
      link.remove();
    } catch (error) {
      console.error("Error when you download the file in the client:", error); // Handle download errors
    }
  };

  //Function to handle the file change selected in the INPUT
  const handleFileChange = (e) => {
    //Updates the 'file' state with the selected file
    setFile(e.target.files[0]);
  };

  return (
    <div className="container p-3 bg-light bg-opacity-50 border border-1 border-dark ">
      <div className="text-center ">
        <h4 className="fw-bold ">Gestión de Documentos del Empleado</h4>
        <p className="mt-3 fs-5">
          Administra de forma eficiente los documentos del empleado. Puedes
          subir, descargar y organizar la documentación correspondiente de
          <span className="text-primary text-capitalize ms-2">
            {userData.user_names} {userData.last_names}
          </span>
          .
        </p>
      </div>

      <div className="row   border-opacity-50  p-2 rounded-3 ">
        {inputs.map((input, index) => (
          <div className="col-12 mt-3 col-md-6 bg-light">
            <ProtectedElements
              requiredPermission={requiredPermissions.upload_user_documents}
            >
              <Form
                onSubmit={(e) => handleSubmit(e, input.id)}
                className="border-top border-2 border-secondary border-opacity-50"
              >
                <Form.Group key={index} controlId={`formInput${index}`}>
                  <Form.Label className=" fw-bold">
                    {input.type_document}
                  </Form.Label>
                  <Form.Control
                    type="file"
                    key={fileKey}
                    onChange={handleFileChange}
                  />
                  <Button variant="secondary" className="mt-2" type="submit" title="Guardar archivos">
                    Subir Archivos
                  </Button>
                </Form.Group>
                {message.id === input.id && (
                  <p className=" text-decoration-underline">
                    {message.message}
                  </p>
                )}
              </Form>
            </ProtectedElements>
            <div className="mt-3 text-center mb-4">
              <h5>Archivos Encontrados</h5>
              <div className="">
                <p>
                  {filesFound[input.id] && filesFound[input.id].length > 0
                    ? filesFound[input.id][0]["file_name"]
                    : "No hay archivos disponibles"}
                </p>
                {filesFound[input.id] && filesFound[input.id].length > 0 && (
                  <ProtectedElements
                    requiredPermission={
                      requiredPermissions.download_user_documents
                    }
                  >
                    <Button
                      className="bg-light text-danger border border-0 p-0"
                      title="Descargar archivo"
                      onClick={() =>
                        handleDownload(filesFound[input.id][0]["id"])
                      }
                    >
                      Descargar
                    </Button>
                  </ProtectedElements>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default EmployeeFiles;
