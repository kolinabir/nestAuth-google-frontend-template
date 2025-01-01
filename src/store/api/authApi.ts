import { baseApi } from "./api";

interface User {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
}

interface AuthResponse {
  user: User | null;
  authenticated: boolean;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<AuthResponse, void>({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
      invalidatesTags: ["Auth"],
    }),
    protected: builder.query<unknown, void>({
      query: () => "/auth/protected",
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery, // Use this for lazy loading
  useLogoutMutation,
  useProtectedQuery,
} = authApi;
