import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import EventCollection from "models/EtkinlikIO/EventCollection";
import { GetAPI } from "../../../constants";
import NameSlug from "models/EtkinlikIO/NameSlug";
import ResponseBase from "models/common/ResponseBase";
import Slices from "store/slices";

export const eventsApi = createApi({
  reducerPath: Slices.EtkinlikIO,
  baseQuery: fetchBaseQuery({
    baseUrl: `${GetAPI()}/api/v1`,
    prepareHeaders: (headers, { getState }) => {
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
