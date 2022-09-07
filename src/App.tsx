import Calendar from "components/calendar";
import CustomAlert from "components/custom-alert";
import ReservationInMonth from "components/reservation-in-month";
import SideBar from "components/sidebar";

function App() {
  return (
    <>
      <CustomAlert
        title="Selam"
        icon="hey"
        buttons={[
          {
            content: <>Selamlar</>,
            clickAction: () => alert("selam"),
          },
        ]}
      >
        <div>Nasılsın</div>
      </CustomAlert>
      <div className="flex flex-col h-screen w-full justify-center items-center bg-gradient-to-r to-purple-300 from-purple-600">
        <div className="grid grid-cols-4 w-full max-w-[1280px] max-h-[700px] shadow-2xl bg-white rounded-lg">
          <SideBar />
          <Calendar />
          <ReservationInMonth />
        </div>
      </div>
    </>
  );
}

export default App;
