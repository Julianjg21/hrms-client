import React, { useEffect, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import {
  getUserPayrollExtracts,
  downloadUserPayrollExtracts,
} from "../../../../../../services/api/employeeFiles/EmployeeFilesApi.mjs";
import {
  selectPermissions,
  extractUsedPermissions,
} from "../../../../../../utils/utils.mjs";

function DownloadPayrollExtract() {
  // Get user data from location state
  const location = useLocation();
  const userData = location.state;

  // State for files and selections
  const [filesFound, setFilesFound] = useState([]); // Files found in the database
  const [payrollExtractId, setPayrollExtractId] = useState(); // Selected file ID

  // State for user permissions and authentication
  const [, /* requiredPermissions */ setRequiredPermissions] = useState([
    { download_payroll_extracts: "employee_documentation" },
  ]); // Required permissions
  const [permissions, setPermissions] = useState([]); // Extracted permissions
  const [userId, setUserId] = useState(); // Admin user ID
  const [token, setToken] = useState(); // Admin authentication token

  //  data to display user info
  const data = [
    {
      header: "Usuario seleccionado",
      child: `${userData.user_names} ${userData.last_names}`,
    },
    { header: "N.Documento", child: userData.identification },
    { header: "Cargo", child: userData.employee_type },
  ];

  // Effect to fetch required permissions and user authentication details
  useEffect(() => {
    const fetchData = async () => {
      // Get required permissions
      const getPermissions = selectPermissions(["download_payroll_extracts"]);

      setRequiredPermissions(getPermissions);

      // Extract used permissions
      const extractedPermissions = extractUsedPermissions(getPermissions);
      setPermissions(extractedPermissions);


      // Get user ID and token from localStorage
      setUserId(localStorage.getItem("AdminUserId"));
      setToken(localStorage.getItem("AdminToken"));
    };

    fetchData();
  }, []);

  // Effect to fetch files once all necessary dependencies are available
  useEffect(() => {
    // Verify that all required dependencies are available
    if (userId && token && permissions.length > 0) {
      getFiles(); // Fetch the files from the database
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, token, permissions]);

  const getFiles = async () => {
    const requestData = {
      user_id: userData.user_id, // Employee's user ID
      permissions, // Necessary permissions
      userId, // Admin user ID
    };

    try {
      // Request to obtain documents
      const response = await getUserPayrollExtracts(requestData, token);

      setFilesFound(response.data); // Update state with retrieved documents

      // Automatically select the first document if available
      if (response.data.length > 0) {
        setPayrollExtractId(response.data[0].id);
      }
    } catch (error) {
      console.error("Error obtaining files:", error); // Handle errors during file fetching
    }
  };

  // Function to handle file download
  const handleDownload = async () => {
    const requestData = {
      permissions, // Necessary permissions
      userId, // Admin user ID
      payrollExtractId, // Selected document ID
    };

    try {
      // Request to download the document
      const response = await downloadUserPayrollExtracts(requestData, token);

      // Extract file name from Content-Disposition header if available
      const contentDisposition = response.headers["content-disposition"];
      let fileName = `file_${payrollExtractId}`; // Default file name

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
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error when downloading the file in the client:", error); // Handle download errors
    }
  };

  return (
    <div className="container p-1">
      <div className="border  border-warning mt-3">
        <h1 className="text-center fs-4 text-secondary mt-3">
          Descargar Extracto de Nomina
        </h1>
        <Table className="mt-5 ">
          <tbody>
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <tr>
                  <th className="text-secondary text-center border-0">
                    {item.header}
                  </th>
                </tr>
                <tr>
                  <td className="text-primary text-center border-0">
                    {item.child}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>

        <Form className="mt-5 mb-5">
          <div className="row">
            <div className="col-md-4 col-2"></div>
            <div className="col-md-4 col-8">
              <Form.Group className="mb-3 text-center">
                <Form.Label className="fw-bold text-secondary">
                  Seleccione el extracto que desea descargar:
                </Form.Label>
                <Form.Select
                  className=" text-center"
                  onChange={(e) => setPayrollExtractId(e.target.value)}
                >
                  {filesFound.map((option) => (
                    <option key={option.id} value={option.id}>
                      Extracto de pago{" "}
                      {new Date(option.payroll_extract_date).toLocaleDateString(
                        "es-ES"
                      )}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-4"></div>
          </div>
          <div className="row">
            <div className="col-md-4 col-3"></div>
            <div className="col-md-4 col-6 d-flex justify-content-center align-items-center mb-5">
              {" "}
              <Button
                className="mt-5 border border-dark"
                variant="light"
                type="button"
                onClick={handleDownload}
              >
                Descargar
              </Button>
            </div>
            <div className="col-4"></div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default DownloadPayrollExtract;
