import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncThunks";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    categories: [],
    isLoading: false,
    isShowModal: false,
    modalChildren: null,
    isShowCart: false,
    subTotal: 0,
  },
  reducers: {
    showModal: (state, action) => {
      state.isShowModal = true;
      state.modalChildren = action.payload.modalChildren;
    },
    closeModal: (state, action) => {
      state.isShowModal = false;
      state.modalChildren = action.payload.modalChildren;
    },
    showCart: (state, action) => {
      if (action.payload?.toLowerCase() === "open") {
        state.isShowCart = true;
      } else {
        state.isShowCart = false;
      }
    },
    getSubTotal: (state, action) => {
      let totalPrice = action.payload?.reduce((sum, current) => {
        return +current.product.price * current.quantity + +sum;
      }, 0);
      console.log(totalPrice)
      state.subTotal = totalPrice;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(actions.getCategories.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export const { showModal, closeModal, showCart, getSubTotal } =
  appSlice.actions;
export default appSlice.reducer;
