import { AnimationProps, motion } from "framer-motion";
import { Bars4Icon, MapPinIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "store";

import Event from "models/EtkinlikIO/Event";
import { FAVOURITE_EVENTS } from "../../constants";
import moment from "moment-timezone";
import { setFavouriteEvents } from "store/slices/reservations/etkinlikIOSlice";
import { useEffect } from "react";

const ReservationInMonth = () => {
  const container: AnimationProps["variants"] = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.25,
        staggerChildren: 0.15,
      },
    },
  };
  const item: AnimationProps["variants"] = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const favouriteEvents = useAppSelector<Event[]>(
    (s) => s.ETKINLIK_IO.favouriteEvents
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (favouriteEvents && favouriteEvents.length > 0) {
      return;
    }
    let fe = localStorage.getItem(FAVOURITE_EVENTS);
    if (localStorage.getItem(FAVOURITE_EVENTS)) {
      dispatch(setFavouriteEvents(JSON.parse(fe || "")));
    }
  }, []);

  return (
    <div className="bg-purple-200 flex-col justify-between rounded-r-md hidden xl:flex">
      <h3 className="text-lg font-normal p-4">Events</h3>
      <div className="relative h-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="absolute w-full h-full pl-4 overflow-y-auto overflow-x-hidden"
        >
          {favouriteEvents.map((res) => {
            const date = moment(res.start);
            return (
              <motion.div
                variants={item}
                key={res.id}
                className="flex justify-between py-2"
              >
                <div className="flex justify-center items-center flex-col bg-purple-900 text-white px-4 rounded-md">
                  <small>{date.format("MMM").toUpperCase()}</small>
                  <div className="text-2xl">{date.format("DD")}</div>
                </div>
                <div className="w-full">
                  <small className="px-3 text-slate-500">
                    <MapPinIcon className="h-4 w-4 inline-block" />{" "}
                    {res.venue.district.name},&nbsp;
                    {res.venue.city.name}
                  </small>
                  <div className="px-3">
                    <strong>{res.name}</strong>
                    <small className="block">
                      {res.tags.map((t) => t.name)}
                    </small>
                  </div>
                </div>
                <div>
                  <button className="text-purple-900 mr-3">
                    <Bars4Icon className="h-7 w-7" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <div className="text-purple-900 text-right pr-4 pb-3">
        Events is provided <span>by</span> <strong>etkinlik.io</strong> for
        Turkey
      </div>
    </div>
  );
};

export default ReservationInMonth;
