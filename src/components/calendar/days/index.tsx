import { AnimationProps, motion } from "framer-motion";
import {
  GetFirstDayOfMonth,
  GetFirstDayOfNextMonth,
  GetLastDayOfMonth,
  GetLastDayOfPrevMonth,
} from "helpers/date-helpers";

import Slices from "store/slices";
import moment from "moment-timezone";
import { useAppSelector } from "store";

const Days = () => {
  const item: AnimationProps["variants"] = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  const currentISODate = useAppSelector<string>(
    (s) => s[Slices.Reservation].currentDate
  );

  let currentDate = moment(currentISODate);
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
        const bg = left === 0 ? "bg-red-900" : "";
        return (
          <motion.div
            variants={item}
            key={index + prev}
            className={`p-2 text-center text-slate-400`}
          >
            <button
              className={`${bg} flex justify-center items-center rounded-full h-full w-full`}
            >
              {current.format("D")}
            </button>
          </motion.div>
        );
      })}
      {allDays.map((day, index) => {
        const current = moment(day).startOf("day");
        const left = moment().startOf("day").diff(current, "d");
        const bg = left === 0 ? "bg-purple-300" : "";
        return (
          <motion.div
            variants={item}
            key={index + day}
            className={`p-2 text-center`}
          >
            <button
              className={`${bg} flex justify-center items-center rounded-full h-full w-full`}
            >
              {current.format("D")}
            </button>
          </motion.div>
        );
      })}
      {nextDays.map((next, index) => {
        const current = moment(next).startOf("day");
        const left = moment().startOf("day").diff(current, "d");
        const bg = left === 0 ? "bg-purple-300" : "";
        return (
          <motion.div
            variants={item}
            key={index + next}
            className={`p-2 text-center text-slate-400`}
          >
            <button
              className={`${bg} flex justify-center items-center rounded-full h-full w-full`}
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
