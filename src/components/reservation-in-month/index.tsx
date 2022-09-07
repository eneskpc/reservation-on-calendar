import Slices from "store/slices";
import moment from "moment-timezone";
import { useAppSelector } from "store";

const ReservationInMonth = () => {
  const currentDate = useAppSelector<string>(
    (s) => s[Slices.Reservation].currentDate
  );

  const currentDateAsMoment = moment(currentDate);

  return (
    <div className="bg-purple-200 flex flex-col justify-between">
      <h3>Reservation in The Selected Month</h3>
      <div className="text-purple-900 text-right mr-4">
        <h1 className="text-logo">Reservation System</h1>
        <span>by</span>&nbsp;
        <a className="font-extrabold" href="https://eneskpc.github.io">
          Enes KAPUCU
        </a>
      </div>
    </div>
  );
};

export default ReservationInMonth;
