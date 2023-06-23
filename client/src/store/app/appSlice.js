import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncThunks";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    categories: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(actions.getCategories, (state) => {
      state.isLoading = false;
    });
  },
});

export default appSlice.reducer;
