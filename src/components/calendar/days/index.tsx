import { AnimationProps, motion } from "framer-motion";
import {
  GetFirstDayOfMonth,
  GetFirstDayOfNextMonth,
  GetLastDayOfMonth,
  GetLastDayOfPrevMonth
} from "helpers/date-helpers";
import { useAppDispatch, useAppSelector } from "store";

import { changeCurrentDate } from "store/slices/reservations/etkinlikIOSlice";
import moment from "moment-timezone";

const Days = () => {
  const item: AnimationProps["variants"] = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const dispatch = useAppDispatch();

  const currentISODate = useAppSelector<string>(
    (s) => s.ETKINLIK_IO.currentDate
  );

  let currentDay = GetFirstDayOfMonth(moment(currentISODate));
  let lastDayOfMonth = GetLastDayOfMonth(moment(currentISODate));
  let firstDayOfNextMonth = GetFirstDayOfNextMonth(moment(currentISODate));
  let lastDayOfPrevMonth = GetLastDayOfPrevMonth(moment(currentISODate));
  let weekDayOfCurrent = parseInt(currentDay.format("E")) % 7;

  let allDays: string[] = [];
  while (lastDayOfMonth.diff(currentDay) > 0) {
    allDays = [...allDays, currentDay.format()];
    currentDay.add({ days: 1 });
  }

  let prevDays: string[] = [];
  for (let index = weekDayOfCurrent; index > 0; index--) {
    prevDays = [...prevDays, lastDayOfPrevMonth.format()];
    lastDayOfPrevMonth.add({ days: -1 });
  }

  prevDays.sort((a, b) => a.localeCompare(b));

  let nextDays: string[] = [];
  for (let index = 0; index < 42 - allDays.length - prevDays.length; index++) {
    nextDays = [...nextDays, firstDayOfNextMonth.format()];
    firstDayOfNextMonth.add({ days: 1 });
  }
  return (
    <>
      {prevDays.map((prev, index) => {
        const current = moment(prev).startOf("day");
        const left = moment().startOf("day").diff(current, "d");
        const bg =
          currentISODate === prev
            ? "bg-red-400"
            : left === 0
            ? "bg-purple-400"
            : "";
        return (
          <motion.div
            variants={item}
            key={index + prev}
            className={`p-2 text-center text-slate-500`}
          >
            <button
              className={`${bg} flex justify-center items-center rounded-full h-full w-full`}
              onClick={() => dispatch(changeCurrentDate(prev))}
            >
              {current.format("D")}
            </button>
          </motion.div>
        );
      })}
      {allDays.map((day, index) => {
        const current = moment(day).startOf("day");
        const left = moment().startOf("day").diff(current, "d");
        const bg =
          currentISODate === day
            ? "bg-red-400"
            : left === 0
            ? "bg-purple-400"
            : "";
        return (
          <motion.div
            variants={item}
            key={index + day}
            className={`p-2 text-center`}
          >
            <button
              className={`${bg} flex justify-center items-center rounded-full h-full w-full text-purple-900`}
              onClick={() => dispatch(changeCurrentDate(day))}
            >
              {current.format("D")}
            </button>
          </motion.div>
        );
      })}
      {nextDays.map((next, index) => {
        const current = moment(next).startOf("day");
        const left = moment().startOf("day").diff(current, "d");
        const bg =
          currentISODate === next
            ? "bg-red-400"
            : left === 0
            ? "bg-purple-400"
            : "";
        return (
          <motion.div
            variants={item}
            key={index + next}
            className={`p-2 text-center text-slate-500`}
          >
            <button
              className={`${bg} flex justify-center items-center rounded-full h-full w-full`}
              onClick={() => dispatch(changeCurrentDate(next))}
            >
              {current.format("D")}
            </button>
          </motion.div>
        );
      })}
    </>
  );
};

export default Days;
