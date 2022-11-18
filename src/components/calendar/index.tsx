import { AnimationProps, motion } from "framer-motion";

import Days from "./days";
import WeekDays from "./weekdays";

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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="grid grid-cols-7 bg-purple-300"
      layout
    >
      <WeekDays type="short" />
      <Days />
    </motion.div>
  );
};

export default Calendar;
