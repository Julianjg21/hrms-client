import React, { useState, useEffect } from "react";
import createAlertData from "../../../../../../hooks/CreateAlertData.mjs";
import { useLocation } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { Form, Button } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import { generatePayrollPdf } from "../../../../../../services/api/employeeFiles/EmployeeFilesApi.mjs";
import {
  selectPermissions,
  extractUsedPermissions,
} from "../../../../../../utils/utils.mjs";
import AlertModal from "../../../../../../common/modals/AlertModal";
import ProtectedElements from "../../../../../../hooks/ProtectedElements.mjs";
function PayrollGenerator() {
  // Get user data from location state
  const location = useLocation();
  const userData = location.state;

  //Atributes of the modal alert
  const [alertData, setAlertData] = useState({});
  const [showAlertModal, setShowAlertModal] = useState(false);

  // States to manage permissions and user data
  const [requiredPermissions, setRequiredPermissions] = useState([]); //Permissions
  const [permissions, setPermissions] = useState([]); // Permissions required for user actions
  const [userId, setUserId] = useState(); // ID of the logged-in user
  const [token, setToken] = useState(); // Token of the logged-in user

  // States for payroll details and calculations
  const [rows, setRows] = useState([
    { deductionTypeInput: "text", inputNumber: "number" },
  ]);
  const [date, setDate] = useState();
  const [basicSalary, setBasicSalary] = useState(0);
  const [bonuses, setBonuses] = useState(0);
  const [hoursWorked, setHoursWorked] = useState(0);
  const [daytimeOvertimeHours, setDaytimeOvertimeHours] = useState(0);
  const [daytimeEarnings, setDaytimeEarnings] = useState(0);
  const [nightOvertimeHours, setNightOvertimeHours] = useState(0);
  const [nightEarnings, setNightEarnings] = useState(0);
  const [holidayOvertimeHours, setHolidayOvertimeHours] = useState(0);
  const [holidayEarnings, setHolidayEarnings] = useState(0);

  // States for overtime checkboxes
  const [daytimeOvertimeHourCheckbox, setDaytimeOvertimeHourCheckbox] =
    useState(false);
  const [nightOvertimeHourCheckbox, setNightOvertimeHourCheckbox] =
    useState(false);
  const [holidayOvertimeHourCheckbox, setHolidayOvertimeHourCheckbox] =
    useState(false);

  // Calculate hourly rate based on basic salary
  const hourlyRate = basicSalary > 0 ? basicSalary / 240 : 0;

  // State for payroll details (array of objects)
  const [payrollDetails, setPayrollDetails] = useState([]);

  // Fetch permissions, user ID, and token on component mount
  useEffect(() => {
    const fetchData = async () => {
      // Get required permissions
      const getPermissions = selectPermissions(["generate_payroll_extracts"]);
      setRequiredPermissions(getPermissions);
      const extractedPermissions = extractUsedPermissions(getPermissions);
      setPermissions(extractedPermissions);

      // Get user ID and token from localStorage
      setUserId(localStorage.getItem("AdminUserId"));
      setToken(localStorage.getItem("AdminToken"));
    };

    fetchData();
  }, []);

  // Function to save payroll data as a PDF
  const savePayrollPdf = async (e, requestType) => {
    e.preventDefault();
    const payrollData = {
      requestType: requestType,
      identification: userData.identification,
      name: `${userData.last_names} ${userData.user_names}`,
      date,
      position: userData.employee_type,
      basic_salary: basicSalary,
      payrollDetail: [
        {
          description: "Salario Basico",
          hours: hoursWorked,
          accrued: basicSalary,
          deductions: 0,
        },
        {
          description: "Bonificaciones/comisiones",
          accrued: bonuses,
        },
        {
          description: "Horas extras diurnas",
          hours: daytimeOvertimeHours,
          accrued: daytimeEarnings,
          deductions: 0,
        },
        {
          description: "Horas extras nocturnas",
          hours: nightOvertimeHours,
          accrued: nightEarnings,
          deductions: 0,
        },
        {
          description: "Horas extras Dominicales",
          hours: holidayOvertimeHours,
          accrued: holidayEarnings,
          deductions: 0,
        },
        ...payrollDetails,
      ],
      user_id: userData.user_id,
    };

    const data = { userId, permissions };
    let alertData;
    try {
      //Generate the PDF and receive it as Blob
      const response = await generatePayrollPdf(payrollData, token, data, {
        responseType: "blob", //To receive binary data
      });

      //Server response
      alertData = response || {
        data: { message: "Error desconocido.", status: 500 },
      };
      setAlertData(
        createAlertData(
          requestType === "show"
            ? `Extracto de nomina de ${userData.last_names} ${userData.user_names}  generado correctamente.`
            : `Se ha guardado correctamente el extracto de nomina de ${userData.last_names} ${userData.user_names}`,
          200
        )
      ); //Save server response on the alert

      // 🔹 Create a Blob from the PDF file received in the response
      const blob = new Blob([response.data], { type: "application/pdf" });
      // 🔹 Create a temporary URL for the Blob to enable download or view
      const url = window.URL.createObjectURL(blob);

      // 🔹 Get the file name from the 'Content-Disposition' header if available
      const contentDisposition = response.headers["content-disposition"];
      // Set a default file name using the user's identification
      let fileName = `payrollExtract_${payrollData.identification}.pdf`;

      if (contentDisposition) {
        // Extract the file name from the 'Content-Disposition' header
        const match = contentDisposition.match(
          /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        );
        if (match && match[1]) {
          // Decode the file name to handle special characters
          fileName = decodeURIComponent(match[1].replace(/['"]/g, ""));
        }
      }

      // 🔹 Check the request type to decide the file action
      if (payrollData.requestType === "save") {
        // If requestType is "save", download the file

        // Create a temporary link element to initiate the download
        const link = document.createElement("a");
        link.href = url; // Set the link to the Blob URL
        link.setAttribute("download", fileName); // Set the downloaded file name
        document.body.appendChild(link); // Append the link to the DOM
        link.click(); // Trigger the download by simulating a click
        link.remove(); // Remove the link from the DOM after download
      } else {
        // If requestType is NOT "save", open the file in a new tab
        window.open(url, "_blank"); // Open the Blob URL in a new browser tab
      }

      // 🔹 Clean up the temporary URL to free memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      //Server response
      alertData = error.response || {
        data: { message: "Error desconocido.", status: 500 },
      };
      setAlertData(createAlertData(alertData.data.message, alertData.status)); //Save server response on the alert
      Sentry.captureException(error); // Capture the error in Sentry
    } finally {
      setShowAlertModal(true);
    }
  };

  // Function to add a new row to the payroll details
  const addNewRow = () => {
    setRows([...rows, { deductionTypeInput: "text", inputNumber: "number" }]);
  };

  // Function to handle input changes in payroll details
  const handleInputChange = (e, index, fieldName) => {
    setPayrollDetails((prevState) => {
      const updatedState = [...prevState]; // Copy previous state

      // If no object exists for the index, create one
      if (!updatedState[index]) {
        updatedState[index] = {};
      }

      // Update the corresponding value
      updatedState[index][fieldName] = e.target.value;

      return updatedState;
    });
  };

  return (
    <div className="container p-md-4 p-0">
      <div className="container p-md-5 p-1 border border-warning">
        <h1 className="text-center fs-4">Calcular</h1>
        <div className="row mt-5">
          <div className="col-6">
            Empleado:
            <span className="text-primary">
              {userData.user_names} {userData.last_names}
            </span>
          </div>
          <div className="col-6">
            Cargo:
            <span className="text-primary"> {userData.employee_type}</span>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-12">
            N. Documento:
            <span className="text-primary"> {userData.identification}</span>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-12">
            Banco:<span className="text-primary"> {userData.bank}</span>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-12">
            N. Cuenta:
            <span className="text-primary"> {userData.account_number}</span>
          </div>
        </div>
        <div className="border border-secondary mt-3"></div>
        <ProtectedElements
          requiredPermission={requiredPermissions.generate_payroll_extracts}
        >
          <Form onSubmit={(e) => savePayrollPdf(e, "save")}>
            <div className="row mt-2">
              <div className="col-4">
                <Form.Group>
                  <Form.Label>
                    <br />
                    Salario Básico
                  </Form.Label>
                  <CurrencyInput
                    required
                    id="currency-basicSalary"
                    name="basicSalary"
                    className="form-control"
                    placeholder="Ingrese el salario básico"
                    decimalsLimit={2} //Without decimals for copy
                    groupSeparator="." //Mile separator
                    decimalSeparator="," //decimal separator, although it will not be used here
                    prefix="COP "
                    onValueChange={(value) => {
                      // Verifica que el valor sea una cadena válida
                      const sanitizedValue = (value || "")
                        .toString()
                        .replace(/[^\d,-]/g, "") //only allows numbers, commas and scripts
                        .replace(/\./g, "") //Eliminates separating points from thousands
                        .replace(",", "."); //Replace commas by decimal point

                      setBasicSalary(parseFloat(sanitizedValue) || 0);
                    }}
                  />
                </Form.Group>
              </div>
              <div className="col-4">
                <Form.Group>
                  <Form.Label>
                    Bonificaciones
                    <br /> Comisiones
                  </Form.Label>
                  <CurrencyInput
                    id="currency-basicSalary"
                    name="basicSalary"
                    className="form-control"
                    placeholder="Ingrese el monto de bonificación"
                    decimalsLimit={0} //Without decimals for copy
                    groupSeparator="." //Mile separator
                    decimalSeparator="," //decimal separator, although it will not be used here
                    prefix="COP "
                    onValueChange={(value) => {
                      //Verify that the value is a valid chain
                      const sanitizedValue = (value || "")
                        .toString()
                        .replace(/[^\d,-]/g, "") //only allows numbers, commas and scripts
                        .replace(/\./g, "") //Eliminates separating points from thousands
                        .replace(",", "."); //Replace commas by decimal point

                      setBonuses(parseFloat(sanitizedValue) || 0);
                    }}
                  />
                </Form.Group>
              </div>
              <div className="col-4">
                <Form.Group>
                  <Form.Label>
                    Total Horas <br />
                    Trabajadas
                  </Form.Label>
                  <Form.Control
                    required
                    type="number"
                    value={hoursWorked}
                    onChange={(e) => setHoursWorked(parseFloat(e.target.value))}
                  ></Form.Control>
                </Form.Group>
              </div>
            </div>
            <div className=" mt-4">
              <div className="row mt-2">
                <div className="col-12">
                  <Form.Group>
                    <div className="row">
                      <div className="col-6">
                        <Form.Check
                          type="checkbox"
                          label="Horas extras diurnas"
                          id="checkboxSalarioBasico"
                          onClick={(e) => {
                            setDaytimeOvertimeHourCheckbox(e.target.checked);

                            if (!e.target.checked) {
                              setDaytimeOvertimeHours(0);
                              setDaytimeEarnings(0);
                            }
                          }}
                        />
                      </div>
                      <div className="col-2">
                        <Form.Control
                          type="number"
                          placeholder="Horas"
                          disabled={!daytimeOvertimeHourCheckbox}
                          onChange={(e) => {
                            setDaytimeOvertimeHours(parseFloat(e.target.value));

                            const total =
                              parseFloat(e.target.value) * hourlyRate * 1.25;
                            setDaytimeEarnings(
                              // 🔹 Check if 'total' is Not-a-Number (NaN)
                              Number.isNaN(total)
                                ? 0 // If 'total' is NaN, set daytime earnings to 0
                                : parseFloat(total.toFixed(2)) // Otherwise, round to 2 decimal places and convert to a number
                            );
                          }}
                        ></Form.Control>
                      </div>
                      <div className="col-4">
                        <Form.Control
                          disabled={!daytimeOvertimeHourCheckbox}
                          type="number"
                          value={daytimeEarnings}
                        ></Form.Control>
                      </div>
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <Form.Group>
                    <div className="row">
                      <div className="col-6">
                        <Form.Check
                          type="checkbox"
                          label="Horas extras nocturnas"
                          id="checkboxSalarioBasico"
                          onClick={(e) => {
                            setNightOvertimeHourCheckbox(e.target.checked);
                            if (!e.target.checked) {
                              setNightOvertimeHours(0);
                              setNightEarnings(0);
                            }
                          }}
                        />
                      </div>
                      <div className="col-2">
                        <Form.Control
                          type="number"
                          placeholder="Horas"
                          disabled={!nightOvertimeHourCheckbox}
                          onChange={(e) => {
                            setNightOvertimeHours(parseFloat(e.target.value));

                            const total =
                              parseFloat(e.target.value) * hourlyRate * 1.75;
                            setNightEarnings(
                              // 🔹 Check if 'total' is Not-a-Number (NaN)
                              Number.isNaN(total)
                                ? 0 // If 'total' is NaN, set night earnings to 0
                                : parseFloat(total.toFixed(2)) // Otherwise, round to 2 decimal places and convert to a number
                            );
                          }}
                        ></Form.Control>
                      </div>
                      <div className="col-4">
                        <Form.Control
                          type="number"
                          value={nightEarnings}
                          disabled={!nightOvertimeHourCheckbox}
                        ></Form.Control>
                      </div>
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <Form.Group>
                    <div className="row">
                      <div className="col-6">
                        <Form.Check
                          type="checkbox"
                          label="Horas extras Dominicales/festivas"
                          id="checkboxSalarioBasico"
                          onClick={(e) => {
                            setHolidayOvertimeHourCheckbox(e.target.checked);
                            if (!e.target.checked) {
                              setHolidayOvertimeHours(0);
                              setHolidayEarnings(0);
                            }
                          }}
                        />
                      </div>
                      <div className="col-2">
                        <Form.Control
                          type="number"
                          placeholder="Horas"
                          disabled={!holidayOvertimeHourCheckbox}
                          onChange={(e) => {
                            setHolidayOvertimeHours(parseFloat(e.target.value));

                            const total =
                              parseFloat(e.target.value) * hourlyRate * 2;
                            setHolidayEarnings(
                              // 🔹 Check if 'total' is Not-a-Number (NaN)
                              Number.isNaN(total)
                                ? 0 // If 'total' is NaN, set holiday earnings to 0
                                : parseFloat(total.toFixed(2)) // Otherwise, round to 2 decimal places and convert to a number
                            );
                          }}
                        ></Form.Control>
                      </div>
                      <div className="col-4">
                        <Form.Control
                          type="number"
                          disabled={!holidayOvertimeHourCheckbox}
                          value={holidayEarnings}
                        ></Form.Control>
                      </div>
                    </div>
                  </Form.Group>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-5">
                <h2 className="fs-5 mt-5">
                  Deducciones
                  <Button
                    className="float-end "
                    variant="success"
                    onClick={addNewRow}
                    title="Agregar nueva decucción"
                  >
                    Agregar
                  </Button>
                </h2>
              </div>
              <ol>
                {rows.map((row, index) => (
                  <div key={index}>
                    <li className="">
                      <div className="row mt-4 ">
                        <div className="col-12">
                          <Form.Group>
                            <div className="row ">
                              <div className="col-5">
                                <Form.Control
                                  placeholder="Descripcion"
                                  type={row.deductionTypeInput}
                                  onChange={(e) =>
                                    handleInputChange(e, index, "description")
                                  }
                                />
                              </div>
                              <div className="col-2">
                                <Form.Control
                                  type={row.inputNumber}
                                  placeholder="Horas"
                                  onChange={(e) =>
                                    handleInputChange(
                                      {
                                        target: {
                                          value: parseFloat(e.target.value),
                                        },
                                      },
                                      index,
                                      "hours"
                                    )
                                  }
                                />
                              </div>
                              <div className="col-5">
                                <CurrencyInput
                                  id={`currency-input-${index}`}
                                  name="accrued"
                                  className="form-control"
                                  placeholder="Ingrese el monto"
                                  decimalsLimit={0}
                                  groupSeparator="."
                                  decimalSeparator=","
                                  prefix="COP "
                                  onValueChange={(value) => {
                                    //Verify that the value is a chain before applying the methods
                                    const sanitizedValue = (value || "")
                                      .toString()
                                      .replace(/[^\d,-]/g, "") //only allows numbers, commas and scripts
                                      .replace(/\./g, "") //Eliminates separating points from thousands
                                      .replace(",", "."); //Replace commas by decimal point

                                    handleInputChange(
                                      {
                                        target: {
                                          value:
                                            parseFloat(sanitizedValue) || 0,
                                        },
                                      },
                                      index,
                                      "deductions"
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          </Form.Group>
                        </div>
                      </div>
                    </li>
                    <div className="border-bottom border-secondary mt-4"></div>
                  </div>
                ))}
              </ol>
            </div>
            <div className="mt-5">
              <div className="row">
                <div className="col-md-4 col-2"></div>
                <div className="col-md-4 col-8">
                  <Form.Group
                    className="mb-3 text-center"
                    controlId="userBirthdateInput"
                  >
                    <Form.Label className=" text-center">
                      Fecha de Extracto <br />
                      Generado
                    </Form.Label>

                    <Form.Control
                      required
                      type="date"
                      placeholder="Selecciona tu fecha de nacimiento"
                      className="rounded-4"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-4 col-2"></div>
              </div>
            </div>
            <div className="mt-5 mb-3">
              <div className="row">
                <div className="col-6 d-flex justify-content-center align-items-center">
                  <Button
                    className="text-center"
                    variant="secondary"
                    type="button"
                    onClick={(e) => savePayrollPdf(e, "show")}
                    title="Previsualización de extracto"
                  >
                    Previsualización <br /> de extracto
                  </Button>
                </div>
                <div className="col-6 d-flex justify-content-center align-items-center">
                  <Button
                    className="text-center "
                    variant="dark"
                    type="submit"
                    title="Generar y guardar extracto "
                  >
                    Generar y guardar <br /> extracto
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </ProtectedElements>
      </div>

      <AlertModal
        show={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        title={alertData.title}
        titleColor={alertData.titleColor}
        icon={alertData.icon}
        bodyText={alertData.bodyText}
        buttonText={alertData.buttonText}
      />
    </div>
  );
}

export default PayrollGenerator;
