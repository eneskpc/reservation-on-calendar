import moment from "moment-timezone";

type Props = {
  type: string;
};

const WeekDays = ({ type }: Props) => {
  return (
    <>
      {(type === "short" ? moment.weekdaysShort() : moment.weekdays()).map(
        (wd) => (
          <div key={wd} className="p-2 text-center">{wd}</div>
        )
      )}
    </>
  );
};

export default WeekDays;
