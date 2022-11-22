import DeciderBody from "components/decider-body";
import MobileMenu from "components/mobile-menu";
import ReservationInMonth from "components/reservation-in-month";
import SideBar from "components/sidebar";
import { motion } from "framer-motion";

const App = () => {
  return (
    <>
      <div
        id="general-modal"
        className="fixed bg-black/30 w-full h-full flex justify-center items-center z-50 empty:hidden"
      ></div>
      <div className="flex flex-col h-screen max-h-screen p-0 xl:p-10 w-full justify-center items-center bg-gradient-to-r to-purple-300 from-purple-600">
        <MobileMenu />
        <motion.div className="grid grid-cols-4 xl:grid-cols-5 grid-rows- w-full h-screen shadow-2xl bg-white rounded-none xl:rounded-lg">
          <SideBar />
          <DeciderBody />
          <ReservationInMonth />
        </motion.div>
      </div>
    </>
  );
};

export default App;
