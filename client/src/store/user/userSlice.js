import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      console.log(action);
      state.isLoggedIn = action.payload.isLoggedIn;
      state.current = action.payload.userData;
      state.token = action.payload.token;
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(actions.getNewProducts.pending, (state) => {
  //       state.isLoading = true;
  //     });
  //     builder.addCase(actions.getNewProducts.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.products = action.payload;
  //     });
  //     builder.addCase(actions.getNewProducts, (state) => {
  //       state.isLoading = false;
  //     });
  //   },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
