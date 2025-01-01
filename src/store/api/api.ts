import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000", // Replace with your API base URL
    credentials: "include",
  }),
  tagTypes: ["Auth", "reviews"], // Add other tagTypes as needed
  endpoints: () => ({}), // Placeholder, individual APIs will extend this
});
