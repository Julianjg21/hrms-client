import React, { useState, useMemo } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import Table from "react-bootstrap/Table";
function CalendarBoard() {
  //Status to track the displacement of the month
  const [monthOffset, setMonthOffset] = useState(0);

  const date = useMemo(() => {
    const fecha = new Date();
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
    };
  }, [monthOffset]);

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
                        <td className="" key={i}>
                          {day || ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="row">
            <div className="col-12 bg-dark p-0 rounded-bottom-3">
              <p className="text-light  text-center mt-5 mb-5">
                No hay eventos
              </p>
            </div>
          </div>
        </div>
        <div className="col-0 col-md-2"></div>
      </div>
    </div>
  );
}
export default CalendarBoard;
