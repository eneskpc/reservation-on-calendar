import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import Slices from "store/slices";
import moment from "moment-timezone";

export interface ReservationItem {
  id: string;
  location: string;
  section: string;
  resTime: Date;
  tag: string;
  color: string;
}

export interface ReservationState {
  currentDate: string;
  reservations: ReservationItem[];
}

const initialState: ReservationState = {
  currentDate: moment().format(),
  reservations: [
    {
      id: "1",
      location: "Istanbul, Turkey",
      color: "#7E22CE",
      resTime: moment().toDate(),
      section: "Dahiliye",
      tag: "İç Hastalıkları",
    },
    {
      id: "2",
      location: "Istanbul, Turkey",
      color: "#7E22CE",
      resTime: moment().toDate(),
      section: "Dahiliye",
      tag: "İç Hastalıkları",
    },
    {
      id: "3",
      location: "Istanbul, Turkey",
      color: "#7E22CE",
      resTime: moment().toDate(),
      section: "Dahiliye",
      tag: "İç Hastalıkları",
    },
    {
      id: "4",
      location: "Istanbul, Turkey",
      color: "#7E22CE",
      resTime: moment().toDate(),
      section: "Dahiliye",
      tag: "İç Hastalıkları",
    },
    {
      id: "5",
      location: "Istanbul, Turkey",
      color: "#7E22CE",
      resTime: moment().toDate(),
      section: "Dahiliye",
      tag: "İç Hastalıkları",
    },
    {
      id: "6",
      location: "Istanbul, Turkey",
      color: "#7E22CE",
      resTime: moment().toDate(),
      section: "Dahiliye",
      tag: "İç Hastalıkları",
    },
    {
      id: "7",
      location: "Istanbul, Turkey",
      color: "#7E22CE",
      resTime: moment().toDate(),
      section: "Dahiliye",
      tag: "İç Hastalıkları",
    },
    {
      id: "8",
      location: "Istanbul, Turkey",
      color: "#7E22CE",
      resTime: moment().toDate(),
      section: "Dahiliye",
      tag: "İç Hastalıkları",
    },
    {
      id: "9",
      location: "Istanbul, Turkey",
      color: "#7E22CE",
      resTime: moment().toDate(),
      section: "Dahiliye",
      tag: "İç Hastalıkları",
    },
    {
      id: "10",
      location: "Istanbul, Turkey",
      color: "#7E22CE",
      resTime: moment().toDate(),
      section: "Dahiliye",
      tag: "İç Hastalıkları",
    },
    {
      id: "11",
      location: "Istanbul, Turkey",
      color: "#7E22CE",
      resTime: moment().toDate(),
      section: "Dahiliye",
      tag: "İç Hastalıkları",
    },
  ],
};

const reservationSlice = createSlice({
  name: Slices.Reservation,
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ReservationItem>) => {
      state.reservations = [...state.reservations, action.payload];
    },
    changeCurrentDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
    },
  },
});

export const { add, changeCurrentDate } = reservationSlice.actions;

export default reservationSlice.reducer;
