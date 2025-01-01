import { baseApi } from "../api";

const UserApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserProfile: build.query<any, string>({
      query: (userId) => ({
        url: `/auth/user/${userId}`,
      }),
    }),
    updateUserProfile: build.mutation({
      query: (userData) => ({
        url: "/auth/update-profile",
        method: "PUT",
        body: userData,
      }),
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = UserApi;
