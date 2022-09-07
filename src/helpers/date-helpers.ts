import moment from "moment-timezone";

export const GetFirstDayOfMonth = (currentDate?: moment.Moment) => {
  if (currentDate == null) {
    currentDate = moment();
  }
  return currentDate.startOf("months");
};

export const GetLastDayOfMonth = (currentDate?: moment.Moment) => {
  if (currentDate == null) {
    currentDate = moment();
  }
  return currentDate.endOf("months");
};

export const GetLastDayOfPrevMonth = (currentDate?: moment.Moment) => {
  if (currentDate == null) {
    currentDate = moment();
  }
  return currentDate.add(-1, "month").endOf("months");
};

export const GetFirstDayOfNextMonth = (currentDate?: moment.Moment) => {
  if (currentDate == null) {
    currentDate = moment();
  }
  return currentDate.add(1, "month").startOf("months");
};