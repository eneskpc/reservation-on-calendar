import { AnimationProps, motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import { changeCurrentDate } from "store/slices/reservations/reservationSlice";
import moment from "moment-timezone";
import { useAppDispatch } from "store";
import { useState } from "react";

const SideBar = () => {
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

  const [currentDate, setCurrentDate] = useState<string>(moment().format());

  const dispatch = useAppDispatch();

  const currentDateAsMoment = moment(currentDate);

  const btnPrevYear_onClick = () => {
    const newCurrentDate = moment(currentDate).add({ year: -1 }).format();
    dispatch(changeCurrentDate(newCurrentDate));
    setCurrentDate(newCurrentDate);
  };

  const btnNextYear_onClick = () => {
    const newCurrentDate = moment(currentDate).add({ year: 1 }).format();
    dispatch(changeCurrentDate(newCurrentDate));
    setCurrentDate(newCurrentDate);
  };

  const btnMonth_onClick = (month: number) => {
    const newCurrentDate = moment(currentDate).set("month", month).format();
    dispatch(changeCurrentDate(newCurrentDate));
    setCurrentDate(newCurrentDate);
  };

  const months = moment.months();

  return (
    <div className="flex flex-col justify-between bg-purple-700 text-white rounded-l-md">
      <div className="flex justify-around items-center">
        <button className="p-4" onClick={btnPrevYear_onClick}>
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <strong className="text-center text-3xl">
          {currentDateAsMoment.format("YYYY")}
        </strong>
        <button className="p-4" onClick={btnNextYear_onClick}>
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="flex flex-col justify-around"
      >
        {months.map((m, index) => {
          const color =
            m === currentDateAsMoment.format("MMMM")
              ? "bg-gradient-to-r to-transparent from-purple-800"
              : "";
          return (
            <motion.button
              variants={item}
              whileTap="tap"
              whileHover="hover"
              className={`${color} py-3 px-5 flex justify-between items-center w-full`}
              onClick={() => btnMonth_onClick(index)}
              key={index}
            >
              <strong>{m}</strong> <small>({29})</small>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default SideBar;
