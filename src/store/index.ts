import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import Slices from "./slices";
import etkinlikIOSlice from "./slices/reservations/etkinlikIOSlice";
import optionsSlice from "./slices/options/optionsSlice";

export const store = configureStore({
  reducer: {
    [Slices.EtkinlikIO]: etkinlikIOSlice,
    [Slices.Options]: optionsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
