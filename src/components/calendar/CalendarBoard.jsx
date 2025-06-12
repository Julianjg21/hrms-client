import React, { useState, useMemo, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import AlertModal from "../../common/modals/AlertModal";
import ShowEventDetails from "../../common/modals/events/ShowEventDetailsModal";
import NewEventModal from "../../common/modals/events/CreateOrUpdateEventModal";
import ProtectedElements from "../../hooks/ProtectedElements.mjs";
import {
  selectPermissions,
  extractUsedPermissions,
} from "../../utils/utils.mjs";
import * as Sentry from "@sentry/react";
import { getAllEventsByDate } from "../../services/api/userEvents/UserEventsApis.mjs";
// Mapping Spanish month names to JS month indices
const MONTHS = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

function CalendarBoard() {
  // Modal and selected event management
  const [event, setEvent] = useState("");
  const [events, setEvents] = useState([]);

  // Selected day and month offset state
  const [daySelected, setDaySelected] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);

  // Used to highlight today's date
  const [today] = useState(new Date().getDate());

  // Show and hide modal  that displays event details
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
  const [showNewEventModal, setShowNewEventModal] = useState(false);

  // Modal close functions
  const CloseEventDetailsModal = () => setShowEventDetailsModal(false);
  const CloseNewEventModal = () => setShowNewEventModal(false);

  // Auth and permission-related state
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [requiredPermissions, setRequiredPermissions] = useState([""]);

  // Alert message handling
  const [alertData, setAlertData] = useState({});
  const [showAlertModal, setShowAlertModal] = useState(false);

  const location = useLocation();

  // Calendar calculation: current month, weeks and days matrix
  const date = useMemo(() => {
    const now = new Date();
    now.setMonth(now.getMonth() + monthOffset);

    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysArray = Array(35).fill(null);
    for (let i = adjustedFirstDay, d = 1; d <= daysInMonth; i++, d++) {
      daysArray[i] = d;
    }

    const weeks = [];
    for (let i = 0; i < daysArray.length; i += 7) {
      weeks.push(daysArray.slice(i, i + 7));
    }

    return {
      year,
      month: new Intl.DateTimeFormat("es-CO", {
        timeZone: "America/Bogota",
        month: "long",
      }).format(now),
      todayMonth: new Intl.DateTimeFormat("es-CO", {
        timeZone: "America/Bogota",
        month: "long",
      }).format(new Date()),
       todayDay: new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    day: "2-digit",
  }),
      weeks,
    };
  }, [monthOffset]);

  // Load permissions and authentication info on component mount
  useEffect(() => {
    const selected = selectPermissions(["management_events"]);
    setRequiredPermissions(selected);
    setPermissions(extractUsedPermissions(selected));

    if (location.pathname.startsWith("/AdminPortal")) {
      setUserId(localStorage.getItem("AdminUserId"));
      setToken(localStorage.getItem("AdminToken"));
    } else if (location.pathname.startsWith("/EmployeePortal")) {
      setUserId(localStorage.getItem("EmployeeUserId"));
      setToken(localStorage.getItem("EmployeeToken"));
    }
  }, [location.pathname]);


  // Reload events when user or selected day changes
  useEffect(() => {
    handleGetAllEventsByDate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, daySelected]);

  // Fetches events from backend based on selected date
  const handleGetAllEventsByDate = async () => {
    const newDate =
      daySelected === 0
        ? new Date(date.year, MONTHS[date.month.toLowerCase()], date.todayDay)
        : new Date(date.year, MONTHS[date.month.toLowerCase()], daySelected);
    const dateToFind = newDate.toISOString().split("T")[0];

    try {
      const response = await getAllEventsByDate(
        token,
        permissions,
        userId,
        dateToFind
      );
      setEvents(response.data.data);
    } catch (error) {
      Sentry.captureException(error);

    };
  }

    // Exposes event reload externally
    const updateEvents = () => handleGetAllEventsByDate();

    // Opens modal and sets selected event
    const showEventInformation = (event) => {
      setEvent(event);
      setShowEventDetailsModal(true);
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
                                  : day === daySelected
                                    ? "table-dark"
                                    : ""
                              }
                              onClick={() => setDaySelected(day)}
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

                {Array.isArray(events) && events.length > 0 ? (
                  <div className="px-3 pb-3 pt-2 d-flex flex-column gap-2">
                    {events.map((event) => (
                      <button
                        key={event.id}
                        onClick={() => showEventInformation(event)}
                        className="btn btn-outline-light text-start w-100 d-flex align-items-center justify-content-between py-2 px-3 rounded-2 shadow-sm border border-0 bg-gradient"
                        style={{ backgroundColor: "#2c2f36" }}
                      >
                        <span className="fw-medium">{event.title}</span>
                        <span className="badge bg-primary bg-opacity-75">
                          {event?.time || "📅"}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-light text-center mt-3 mb-3">
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
          updateEvents={updateEvents}
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
