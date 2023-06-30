import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncThunk";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
    isLoading: false,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getCurrentUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.current = action.payload;
    });
    builder.addCase(actions.getCurrentUser, (state) => {
      state.isLoading = false;
    });
  },
});

export const { login,logout } = userSlice.actions;
export default userSlice.reducer;
