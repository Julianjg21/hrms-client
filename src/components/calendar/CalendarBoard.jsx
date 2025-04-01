import React, { useState, useMemo } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
function CalendarBoard() {
  // State to track the month offset from the current date
const [monthOffset, setMonthOffset] = useState(0);

const date = useMemo(() => {
  // Create a new Date instance with the current date
  const fecha = new Date();

  // Adjust the month based on the offset
  fecha.setMonth(fecha.getMonth() + monthOffset);

  return {
    // Format the month name in Spanish (Colombia) with the Bogotá time zone
    month: new Intl.DateTimeFormat("es-CO", {
      timeZone: "America/Bogota",
      month: "long",
    }).format(fecha),

    // Get the year from the adjusted date
    year: fecha.getFullYear(),

    // Get the number of days in the adjusted month
    monthDays: new Date(
      fecha.getFullYear(),
      fecha.getMonth() + 1,
      0
    ).getDate(),
  };
}, [monthOffset]);

// Function to move to the next month
const nextMonth = () => {
  setMonthOffset((prev) => prev + 1);
};

// Function to move to the previous month
const previousMonth = () => {
  setMonthOffset((prev) => prev - 1);
};

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 bg-dark p-0">
          <button className="float-end btn  btn-dark">
            <CiCirclePlus size="30px" />
          </button>
        </div>
      </div>
      <div className="row bg-secondary">
        <div className="col-3">
          <button
            className="h-100 bg-secondary border-0 float-end"
            onClick={previousMonth}
          >
            <IoMdArrowDropleft className="text-light" size="30px" />
          </button>
        </div>
        <div className="col-6 align-items-center d-flex justify-content-center bg-light ">
          <p className="fw-bolder fs-5">
            {date.month}/{date.year}
          </p>
        </div>
        <div className="col-3">
          <button
            className="h-100  bg-secondary border-0 float-start"
            onClick={nextMonth}
          >
            <IoMdArrowDropright className="text-light" size="30px" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default CalendarBoard;
