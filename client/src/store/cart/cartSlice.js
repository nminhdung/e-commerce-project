import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
  name: "user",
  initialState: {
    cartItems: [],
    isShow: false,
    total: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const { _id, color, price, title, thumb, quantity } = action.payload;
      const alreadyProduct = state.cartItems.find((item) => item._id === _id);
      if (alreadyProduct) {
        if (alreadyProduct.color !== color) {
          alreadyProduct.color = color;
          alreadyProduct.quantity = quantity;
        } else {
          alreadyProduct.quantity = quantity;
        }
      } else {
        state.cartItems.push({ _id, title, thumb, price, color, quantity });
      }
      let totalPrice = state.cartItems.reduce((sum, current) => {
        return +current.price * current.quantity + sum;
      }, 0);
      state.total = totalPrice;
    },
    removeItem: (state, action) => {
      const { _id, color } = action.payload;
      const itemFilter = state.cartItems.find(
        (item) => item._id === _id && item.color === color
      );

      state.cartItems = state.cartItems.filter(
        (item) => item._id !== itemFilter._id
      );
      let totalPrice = state.cartItems.reduce((sum, current) => {
        return +current.price * current.quantity + sum;
      }, 0);
      state.total = totalPrice;
    },
    removeAllItems: (state) => {
      state.cartItems = [];
      state.total = 0;
    },
    handleQuantity: (state, action) => {
      const { _id, type } = action.payload;
      const productSelect = state.cartItems.find((item) => item._id === _id);
      if (type?.toLowerCase() === "inc") {
        productSelect.quantity++;
      } else {
        if (productSelect.quantity === 1) {
          state.cartItems = state.cartItems.filter(
            (item) => item._id !== productSelect._id
          );
        } else {
          productSelect.quantity--;
        }
      }
      let totalPrice = state.cartItems.reduce((sum, current) => {
        return +current.price * current.quantity + sum;
      }, 0);
      state.total = totalPrice;
    },
    showCartUi: (state, action) => {
      if (action.payload.toLowerCase() === "open") {
        state.isShow = true;
      } else {
        state.isShow = false;
      }
    },
  },
});
export const {
  addItem,
  removeItem,
  handleQuantity,
  showCartUi,
  removeAllItems,
} = cartSlice.actions;

export default cartSlice.reducer;
