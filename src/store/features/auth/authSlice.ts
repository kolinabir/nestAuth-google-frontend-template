import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../../api/authApi";
import Cookies from "js-cookie";

interface User {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const COOKIE_NAME = "auth_user";
const COOKIE_EXPIRATION_DAYS = 7;

// Helper function to save user to cookies
const saveUserToCookies = (user: User | null) => {
  if (user) {
    try {
      Cookies.set(COOKIE_NAME, JSON.stringify(user), {
        expires: COOKIE_EXPIRATION_DAYS,
        sameSite: "strict", // For enhanced security
      });
    } catch (error) {
      console.error("Failed to save user to cookies:", error);
    }
  } else {
    Cookies.remove(COOKIE_NAME);
  }
};

// Helper function to get user from cookies
const getUserFromCookies = (): User | null => {
  try {
    const userCookie = Cookies.get(COOKIE_NAME);
    return userCookie ? JSON.parse(userCookie) : null;
  } catch (error) {
    console.error("Failed to parse user from cookies:", error);
    return null;
  }
};

const initialState: AuthState = {
  user: getUserFromCookies(),
  isAuthenticated: !!getUserFromCookies(),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      saveUserToCookies(action.payload);
    },
    setCredentials: (state, action: PayloadAction<{ user: User | null }>) => {
      console.log(action.payload, "user");
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.user;
      state.error = null;
      // Save user to cookies
      saveUserToCookies(action.payload.user);
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      // Remove user from cookies
      saveUserToCookies(null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.getCurrentUser.matchFulfilled,
        (state, { payload }) => {
          // Improved type checking and null handling
          if (payload && payload.user) {
            state.user = payload.user;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
            saveUserToCookies(payload.user);
          } else {
            state.user = null;
            state.isAuthenticated = false;
            state.error = "No user data received";
          }
        }
      )
      .addMatcher(authApi.endpoints.getCurrentUser.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(
        authApi.endpoints.getCurrentUser.matchRejected,
        (state, action) => {
          // Improved error handling
          const errorMessage = action.error.message || "Authentication failed";
          console.error("Authentication error:", errorMessage);

          state.isLoading = false;
          state.isAuthenticated = false; 
          state.user = null;
          state.error = errorMessage;

          saveUserToCookies(null);
        }
      );
  },
});

export const {
  setUser,
  setCredentials,
  logout: logOutLocal,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
