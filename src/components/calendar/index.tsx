import { AnimateSharedLayout, AnimationProps, motion } from "framer-motion";

import Days from "./days";
import Slices from "store/slices";
import WeekDays from "./weekdays";
import moment from "moment-timezone";
import { useAppSelector } from "store";

const Calendar = () => {
  const container: AnimationProps["variants"] = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05,
      },
    },
  };

  const currentDate = useAppSelector<string>(
    (s) => s[Slices.Reservation].currentDate
  );

  const currentDateAsMoment = moment(currentDate);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="grid grid-cols-7 col-span-2"
      layout
    >
      <h3 className="col-span-7 flex justify-center items-end text-2xl font-bold">
        <strong className="uppercase">
          {currentDateAsMoment.format("MMMM YYYY")}
        </strong>
      </h3>
      <WeekDays type="short" />
      <Days />
    </motion.div>
  );
};

export default Calendar;
