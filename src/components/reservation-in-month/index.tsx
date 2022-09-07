import { Bars4Icon, MapPinIcon } from "@heroicons/react/24/outline";

import { ReservationState } from "store/slices/reservations/reservationSlice";
import Slices from "store/slices";
import moment from "moment-timezone";
import { useAppSelector } from "store";

const ReservationInMonth = () => {
  const state = useAppSelector<ReservationState>((s) => s[Slices.Reservation]);

  const currentDateAsMoment = moment(state.currentDate);

  return (
    <div className="bg-purple-200 flex flex-col justify-between rounded-r-md">
      <h3 className="text-lg font-bold p-4">
        Reservation in The Selected Month
      </h3>
      <div className="h-[500px] pl-4 overflow-y-auto overflow-x-hidden">
        {state.reservations.map((res) => {
          const date = moment(res.resTime);
          return (
            <div
              key={res.id}
              className="flex justify-between items-center py-2"
            >
              <div className="bg-purple-900 text-white text-center leading-[0.5] px-4 py-1 rounded-md">
                <small>{date.format("MMM").toUpperCase()}</small>
                <div className="text-2xl">{date.format("D")}</div>
              </div>
              <div>
                <div className="px-3 text-slate-500">
                  <MapPinIcon className="h-4 w-4 inline-block" /> {res.location}
                </div>
                <div className="px-3">
                  {res.section}({res.tag})
                </div>
              </div>
              <div>
                <button className="text-purple-900 mr-3">
                  <Bars4Icon className="h-7 w-7" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-purple-900 text-right pr-4">
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
