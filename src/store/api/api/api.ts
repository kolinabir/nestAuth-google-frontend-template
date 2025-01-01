import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

/**
 * The base API configuration.
 */
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dsiqhip3ye.ap-southeast-1.awsapprunner.com",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      // const { token } = (getState() as RootState).auth;
      const serializedState = localStorage.getItem("authState");
      const token =
        JSON.parse(serializedState as string).user?.data?.token || null;
      console.log("token", token);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
