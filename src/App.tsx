import Calendar from "components/calendar";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { useAppSelector } from "store";
import Slices from "store/slices";

import { ReservationItem } from "store/slices/reservations/reservationSlice";

function App() {
  const [currentDate, setCurrentDate] = useState<string>(moment().format());
  const reservations = useAppSelector<ReservationItem[]>(
    (s) => s[Slices.Reservation].reservations
  );

  const currentDateAsMoment = moment(currentDate);

  const btnPrevMonth_onClick = () => {
    setCurrentDate(moment(currentDate).add({ month: -1 }).format());
  };

  const btnNextMonth_onClick = () => {
    setCurrentDate(moment(currentDate).add({ month: 1 }).format());
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-6xl letter-spacing-[-0.125em]">
        Reservation System
      </h1>
      <div className="grid grid-cols-3">
        <button onClick={btnPrevMonth_onClick}>Prev Month</button>
        <strong className="text-center w-28">{currentDateAsMoment.format("MMM, YYYY")}</strong>
        <button onClick={btnNextMonth_onClick}>Next Month</button>
      </div>
      <Calendar currentDate={currentDate} />
    </div>
  );
}

export default App;
