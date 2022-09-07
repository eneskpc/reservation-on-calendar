import Days from "./days";
import Slices from "store/slices";
import WeekDays from "./weekdays";
import moment from "moment-timezone";
import { useAppSelector } from "store";

const Calendar = () => {
  const currentDate = useAppSelector<string>(
    (s) => s[Slices.Reservation].currentDate
  );

  const currentDateAsMoment = moment(currentDate);

  return (
    <div className="grid grid-cols-7 col-span-2">
      <h1 className="col-span-7 flex justify-center items-center text-2xl font-bold">
        <strong>{currentDateAsMoment.format("MMMM")}</strong>
      </h1>
      <WeekDays type="short" />
      <Days />
    </div>
  );
};

export default Calendar;
