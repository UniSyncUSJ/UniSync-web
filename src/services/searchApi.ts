// src/services/searchApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define an interface for the event object
export interface Event {
  id: string;
  title: string;
  date: string;
  category: string;
  // Add other fields as needed
}

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // adjust base URL
  endpoints: (builder) => ({
    searchEvents: builder.query<Event[], { query: string; category: string }>({
      query: ({ query, category }) => ({
        url: "/events/search",
        params: {
          query,
          category,
        },
      }),
    }),
  }),
});

export const { useSearchEventsQuery } = searchApi;
