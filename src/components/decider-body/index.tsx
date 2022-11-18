import {
    CalendarDaysIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    MapIcon
} from "@heroicons/react/24/outline";
import {
    toggleCalendarOpen,
    toggleMapOpen
} from "store/slices/options/optionsSlice";
import { useAppDispatch, useAppSelector } from "store";

import Calendar from "components/calendar";
import EventsAsList from "components/events-as-list";
import EventsOnMap from "components/events-on-map";
import { changeCurrentDate } from "store/slices/reservations/etkinlikIOSlice";
import moment from "moment-timezone";
import { useEffect } from "react";
import { useGetEventsMutation } from "store/slices/reservations/etkinlikIOActions";

const DeciderBody = () => {
  const options = useAppSelector((state) => state.OPTIONS);
  const dispatch = useAppDispatch();
  const [getAllEvents] = useGetEventsMutation();

  const currentDate = useAppSelector<string>((s) => s.ETKINLIK_IO.currentDate);

  const currentDateAsMoment = moment(currentDate);

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  const btnPrevMonth_onClick = () => {
    const newCurrentDate = moment(currentDate).add({ month: -1 }).format();
    dispatch(changeCurrentDate(newCurrentDate));
  };

  const btnNextMonth_onClick = () => {
    const newCurrentDate = moment(currentDate).add({ month: 1 }).format();
    dispatch(changeCurrentDate(newCurrentDate));
  };

  return (
    <div className="col-span-2 lg:col-span-3 flex flex-col">
      <div className="bg-purple-400 flex justify-between items-center">
        <button
          type="button"
          title="Map View"
          className="text-purple-900 p-3 rounded-md"
          onClick={() => dispatch(toggleMapOpen(!options.isMapOpen))}
        >
          <MapIcon className="w-6 h-6" />
        </button>
        <div className="flex">
          <button className="pr-2" onClick={btnPrevMonth_onClick}>
            <ChevronDoubleLeftIcon className="w-6 h-6 text-purple-900" />
          </button>
          <h3 className="text-2xl uppercase font-bold whitespace-nowrap text-center text-purple-900">
            {currentDateAsMoment.format("LL")}
          </h3>
          <button className="pl-2" onClick={btnNextMonth_onClick}>
            <ChevronDoubleRightIcon className="w-6 h-6 text-purple-900" />
          </button>
        </div>
        <button
          type="button"
          title="Map View"
          className="text-purple-900 p-3 rounded-md"
          onClick={() => dispatch(toggleCalendarOpen(!options.isCalendarOpen))}
        >
          <CalendarDaysIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="h-full flex flex-col">
        {options.isCalendarOpen && <Calendar />}
        <div className="relative h-full">
          {!options.isMapOpen ? <EventsAsList /> : <EventsOnMap />}
        </div>
      </div>
    </div>
  );
};

export default DeciderBody;