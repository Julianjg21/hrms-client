import React, { useState, useMemo, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import AlertModal from "../../common/modals/AlertModal";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import ShowEventDetails from "../../common/modals/events/ShowEventDetailsModal";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import {
  selectPermissions,
  extractUsedPermissions,
} from "../../utils/utils.mjs";
import NewEventModal from "../../common/modals/events/NewEventModal";
import * as Sentry from "@sentry/react";
import ProtectedElements from "../../hooks/ProtectedElements.mjs";
import { getAllEvents } from "../../services/api/userEvents/UserEventsApis.mjs";
function CalendarBoard() {


  //Show event information states and function
  const [event, setEvent] = useState(""); //Event information
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false); //Show  modal
  const CloseEventDetailsModal = () => setShowEventDetailsModal(false); //Function to close the modal

  //Show and close the new event modal state and function
  const [showNewEventModal, setShowNewEventModal] = useState(false); //State to control the visibility of the new event modal
  const CloseNewEventModal = () => setShowNewEventModal(false); //Function to close the  New event modal


  //Status to track the displacement of the month
  const [monthOffset, setMonthOffset] = useState(0);

  const [today, setToday] = useState(new Date().getDate()); //Current date

  //State for user permissions and authentication
  const [userId, setUserId] = useState(); // user ID
  const [token, setToken] = useState(); // authentication token
  const [permissions, setPermissions] = useState([]); // Extracted permissions

  // State for user permissions and authentication
  const [requiredPermissions, setRequiredPermissions] = useState([""]);

  //Atributes of the modal alert
  const [alertData, setAlertData] = useState({});
  const [showAlertModal, setShowAlertModal] = useState(false);

  const location = useLocation(); //To redirect to another route

  useEffect(() => {
    // Get required permissions
    const getPermissions = selectPermissions(["management_events"]);

    setRequiredPermissions(getPermissions);

    // Extract used permissions
    const extractedPermissions = extractUsedPermissions(getPermissions);
    setPermissions(extractedPermissions);

    if (location.pathname.startsWith("/AdminPortal")) {
      // Get user ID and token from localStorage
      setUserId(localStorage.getItem("AdminUserId"));
      setToken(localStorage.getItem("AdminToken"));
    } else if (location.pathname.startsWith("/EmployeePortal")) {
      // Get user ID and token from localStorage
      setUserId(localStorage.getItem("EmployeeUserId"));
      setToken(localStorage.getItem("EmployeeToken"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //State to store the events of the user
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (userId) {
      handleGetAllEvents(); // Get all events of the user
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const updateEvents = (newEvent) => {
    handleGetAllEvents(); // Get all events of the user
  };
  //Get all events of the user
  const handleGetAllEvents = async () => {
    /*     let alertData; */

    try {
      const response = await getAllEvents(token, permissions, userId);
      setEvents(response.data.data);
      console.log(response);
      /*   alertData = response || {
        data: { message: "Error desconocido.", status: 500 },
      }; */
    } catch (error) {
      //Server response
      /*   alertData = error.response || {
        data: { message: "Error desconocido.", status: 500 },
      }; */
      Sentry.captureException(error); // Capture the error in Sentry
    } finally {
      /*   setAlertData(createAlertData(alertData.data.message, alertData.status)); //Save server response on the alert

      setShowAlertModal(true); */
    }
  };

  const date = useMemo(() => {
    const fecha = new Date();
    const todayMonth = new Date(); //Current month
    fecha.setMonth(fecha.getMonth() + monthOffset);

    //Obtain key data of the month
    const year = fecha.getFullYear();
    const month = fecha.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); //Day of the week of the 1st day of the month

    //Adjustment for Monday to be the first day (0) and Sunday (6)
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    //Generate the 35 -day array for the calendar
    const daysArray = Array(35).fill(null);
    let dayCounter = 1;

    for (let i = adjustedFirstDay; i < daysArray.length; i++) {
      if (dayCounter <= daysInMonth) {
        daysArray[i] = dayCounter++;
      }
    }
    //Group in ranks of 7
    const weeks = [];
    for (let i = 0; i < daysArray.length; i += 7) {
      weeks.push(daysArray.slice(i, i + 7));
    }

    return {
      month: new Intl.DateTimeFormat("es-CO", {
        timeZone: "America/Bogota",
        month: "long",
      }).format(fecha),
      year,
      weeks,
      todayMonth: new Intl.DateTimeFormat("es-CO", {
        timeZone: "America/Bogota",
        month: "long",
      }).format(todayMonth),
    };
  }, [monthOffset]);

  const getTodayEvents = (day) => {
    setToday(day); //Set the current day
  };

  const showEventInformation = (event) => {
    setShowEventDetailsModal(true);
    setEvent(event);
  };

  return (
    <div className="container  mt-2">
      <h1 className=" text-center fs-2 mt-2 mb-4">Calendario</h1>
      <p className="text-center ">
        • Gestiona aquí tus eventos del día a día para una mejor organización de
        tu tiempo.
      </p>

      <div className="row mt-2 mb-2 ">
        <div className="col-0 col-md-2"></div>
        <div className="col-12 col-md-8 ">
          <div className="row">
            <div className="col-12 bg-dark p-0 rounded-top-3">
              <button
                className="float-end btn  btn-dark "
                title="Agregar evento"
                onClick={() => setShowNewEventModal(true)}
              >
                <CiCirclePlus size="30px" />
              </button>
            </div>
          </div>
          <div className="row bg-secondary">
            <div className="col-3 ">
              <button
                className="h-100 bg-secondary border-0 float-end "
                onClick={() => setMonthOffset((prev) => prev - 1)}
              >
                <IoMdArrowDropleft className="text-light shadow" size="30px" />
              </button>
            </div>
            <div className="col-6  bg-light rounded-5 mt-3 mb-3 shadow">
              <p className="fw-bolder fs- text-center mt-3 text-uppercase ">
                {date.month}:{date.year}
              </p>
            </div>
            <div className="col-3">
              <button
                className="h-100  bg-secondary border-0 float-start"
                onClick={() => setMonthOffset((prev) => prev + 1)}
              >
                <IoMdArrowDropright className="text-light shadow" size="30px" />
              </button>
            </div>
          </div>
          <ProtectedElements
            requiredPermission={requiredPermissions.management_events}
          >
            <div className="row">
              <div className="col-12 p-0">
                <Table
                  striped
                  hover
                  className="table table-borderless w-100 h-100"
                >
                  <thead>
                    <tr className="table-secondary">
                      {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map(
                        (day) => (
                          <th key={day}>{day}</th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {date.weeks.map((week, index) => (
                      <tr key={index} className="table-secondary ">
                        {week.map((day, i) => (
                          <td
                            className={
                              day === today && date.month === date.todayMonth
                                ? "table-light"
                                : ""
                            }
                            onClick={() => getTodayEvents(day)}
                            key={i}
                          >
                            {day || ""}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </ProtectedElements>
          <div className="row">
            <div className="col-12 bg-dark p-0 rounded-bottom-3">
              <h2 className="text-light text-center fs-5 mt-1 mb-0">Eventos</h2>
              {events ? (
                <div className="p-3">
                  {events.map((event) => (
                    <button
                      onClick={() => showEventInformation(event)}
                      className="w-100 text-start btn btn-dark border-0 border-bottom  border-primary"
                    >
                      {event.title}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-light  text-center mt-5 mb-5">
                  No hay eventos
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="col-0 col-md-2"></div>
      </div>
      <ShowEventDetails
        eventDetails={event}
        show={showEventDetailsModal}
        onClose={CloseEventDetailsModal}
      />
      <NewEventModal
        show={showNewEventModal}
        onClose={CloseNewEventModal}
        updateEvents={updateEvents}
      />
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
export default CalendarBoard;
