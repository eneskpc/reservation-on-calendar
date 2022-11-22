import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import Slices from "store/slices";

type OptionsState = {
  isMapOpen: boolean;
  isCalendarOpen: boolean;
  currentLocation: GeolocationPosition | null;
};

const initialState = {
  isMapOpen: true,
  isCalendarOpen: false,
  currentLocation: null,
} as OptionsState;

const optionsSlice = createSlice({
  name: Slices.Options,
  initialState,
  reducers: {
    toggleMapOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isMapOpen = payload;
    },
    toggleCalendarOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isCalendarOpen = payload;
    },
    setCurrentLocation: (
      state,
      { payload }: PayloadAction<GeolocationPosition | null>
    ) => {
      state.currentLocation = payload;
    },
  },
});

export const { toggleMapOpen, toggleCalendarOpen, setCurrentLocation } =
  optionsSlice.actions;

export default optionsSlice.reducer;
