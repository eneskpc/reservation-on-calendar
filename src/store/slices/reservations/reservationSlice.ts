import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import Slices from "store/slices";
import moment from "moment-timezone";

export interface ReservationItem {
  location: string;
  section: string;
  resTime: Date;
  tag: string;
}

export interface ReservationState {
  currentDate: string;
  reservations: ReservationItem[];
}

const initialState: ReservationState = {
  currentDate: moment().format(),
  reservations: [],
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
