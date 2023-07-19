import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncThunk";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
    isLoading: false,
    mes: "",
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.token = null;
      state.current = null;
      state.mes = "";
    },
    clearMess: (state) => {
      state.mes = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getCurrentUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.current = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(actions.getCurrentUser.rejected, (state) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.current = null;
      state.token = null;
      state.mes = "Login session has expired.Please login again.";
    });
  },
});

export const { login, logout, clearMess } = userSlice.actions;
export default userSlice.reducer;
