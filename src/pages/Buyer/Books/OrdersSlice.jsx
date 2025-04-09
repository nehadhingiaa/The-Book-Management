import { createSlice } from "@reduxjs/toolkit";

const cartDataSlice = createSlice({
  name: "cartData",
  initialState: { cartData: [] },
  reducers: {
    setData: (state, action) => {
      state.cartData = [...state.cartData, action.payload];
    },
    increaseQuantity: (state, action) => {
      const item = state.cartData.find((item) => item?.id === action.payload);

      if (item) {
        if (!item.quantity) {
          item.quantity = 1;
        }

        if (item.quantity < item.stockCount) {
          item.quantity += 1;
        }
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartData.find((item) => item?.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.stockCount += 1;
      }
    },

    removeItem: (state, action) => {
      state.cartData = state.cartData.filter(
        (item) => item?.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartData = []; 
    },
  },
});

export const {
  setData,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartDataSlice.actions;
export default cartDataSlice.reducer;
