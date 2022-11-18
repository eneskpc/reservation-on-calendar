import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import Event from "models/EtkinlikIO/Event";
import NameSlug from "models/EtkinlikIO/NameSlug";
import Slices from "store/slices";
import { eventsApi } from "./etkinlikIOActions";
import moment from "moment-timezone";

export interface EtkinlikIOState {
  currentDate: string;
  eventCollection: Event[];
  favouriteEvents: Event[];
  selectedCategory: NameSlug | null;
  categories: NameSlug[];
}

const initialState = {
  currentDate: moment().startOf("day").format(),
  eventCollection: [],
  favouriteEvents: [],
  categories: [],
  selectedCategory: null,
} as EtkinlikIOState;

const etkinlikIOSlice = createSlice({
  name: Slices.EtkinlikIO,
  initialState,
  reducers: {
    changeCurrentDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<NameSlug>) => {
      state.selectedCategory = action.payload;
    },
    setFavouriteEvents: (state, action: PayloadAction<Event[]>) => {
      state.favouriteEvents = action.payload;
    },
    addFavouriteEvent: (state, action: PayloadAction<Event>) => {
      if (state.favouriteEvents.some((fe) => fe.id === action.payload.id)) {
        return;
      }
      state.favouriteEvents = [...state.favouriteEvents, action.payload];
    },
    removeFavouriteEvent: (state, action: PayloadAction<Event>) => {
      state.favouriteEvents = state.favouriteEvents.filter(
        (fe) => fe.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      eventsApi.endpoints.getEvents.matchFulfilled,
      (state, { payload }) => {
        state.eventCollection = payload.data.items || [];
      }
    );
    builder.addMatcher(
      eventsApi.endpoints.getCategories.matchFulfilled,
      (state, { payload }) => {
        state.categories = payload.data || [];
      }
    );
  },
});

export const {
  changeCurrentDate,
  setSelectedCategory,
  setFavouriteEvents,
  addFavouriteEvent,
  removeFavouriteEvent,
} = etkinlikIOSlice.actions;

export default etkinlikIOSlice.reducer;
