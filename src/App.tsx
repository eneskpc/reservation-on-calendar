import { AnimationProps, motion } from "framer-motion";
import CustomAlert, { CustomIconType } from "components/custom-alert";

import Calendar from "components/calendar";
import ReservationInMonth from "components/reservation-in-month";
import SideBar from "components/sidebar";

function App() {
  return (
    <>
      {false && (
        <CustomAlert
          title="Are you sure?"
          icon={CustomIconType.QUESTION}
          buttons={[
            {
              content: <div className="btn-primary">Selamlar</div>,
              clickAction: () => console.log("selam"),
            },
            {
              content: <div className="btn-primary">Selamlar</div>,
              clickAction: () => console.log("selam"),
            },
          ]}
        >
          <div>Nasılsın</div>
        </CustomAlert>
      )}
      <div className="flex flex-col h-screen w-full justify-center items-center bg-gradient-to-r to-purple-300 from-purple-600">
        <motion.div className="grid grid-cols-4 w-full max-w-[1280px] max-h-[700px] shadow-2xl bg-white rounded-lg">
          <SideBar />
          <Calendar />
          <ReservationInMonth />
        </motion.div>
      </div>
    </>
  );
}

export default App;
