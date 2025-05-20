import { ACCESS_TOKEN_KEY } from "@/constant/auth.constant";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
// import { signOut } from "next-auth/react";

const initialState = {
  user: null,
  token: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;

      // Set token to cookie for middleware accessibility
      Cookies.set(ACCESS_TOKEN_KEY, token, { path: "/" });
    },

    logout: (state) => {
      Cookies.remove(ACCESS_TOKEN_KEY, { path: "/" });
      // signOut();

      state.user = null;
      state.token = null;
    }
  }
});

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
