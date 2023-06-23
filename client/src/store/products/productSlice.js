import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncThunks";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getNewProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getNewProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(actions.getNewProducts, (state) => {
      state.isLoading = false;
    });
  },
});

export default productSlice.reducer;
