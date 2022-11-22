import EventItem from "./EventItem";
import moment from "moment-timezone";
import { useAppSelector } from "store";

const EventsAsList = () => {
  const [currentDate, events] = useAppSelector((state) => [
    state.ETKINLIK_IO.currentDate,
    state.ETKINLIK_IO.eventCollection,
  ]);

  const currentDateAsMoment = moment(currentDate);

  return (
    <div className="absolute w-full h-full overflow-x-hidden overflow-y-auto">
      <div className="grid grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {events
          .filter((e) =>
            currentDateAsMoment.isBetween(
              moment(e.start),
              moment(e.end),
              "days",
              "[]"
            )
          )
          .map((e) => (
            <EventItem self={e} key={e.id} />
          ))}
      </div>
    </div>
  );
};

export default EventsAsList;
