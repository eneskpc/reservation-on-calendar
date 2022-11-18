import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import EventCollection from "models/EtkinlikIO/EventCollection";
import NameSlug from "models/EtkinlikIO/NameSlug";
import ResponseBase from "models/common/ResponseBase";
import Slices from "store/slices";

export const eventsApi = createApi({
  reducerPath: Slices.EtkinlikIO,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:49153/api/v1",
    prepareHeaders: (headers, { getState }) => {
      //   const token = (getState() as RootState).ETKINLIK_IO.;
      //   if (token) {
      //     headers.set("Authorization", `Bearer ${token}`);
      //   }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getEvents: builder.mutation<ResponseBase<EventCollection>, void>({
      query: () => ({
        url: "events",
      }),
    }),
    getCategories: builder.mutation<ResponseBase<NameSlug[]>, void>({
      query: () => ({
        url: "categories",
      }),
    }),
  }),
});

export const { useGetEventsMutation, useGetCategoriesMutation } = eventsApi;
