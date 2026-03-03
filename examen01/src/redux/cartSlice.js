import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'Cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(
        item => item.id === action.payload.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );
    },

    clearCart: (state) => {
      state.items = [];
    },

    setCart: (state, action) => {
      state.items = action.payload;
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  setCart
} = cartSlice.actions;

export default cartSlice.reducer;