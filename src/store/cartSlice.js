import { createSlice } from '@reduxjs/toolkit';

const saved = JSON.parse(localStorage.getItem('cart') || '[]');

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: saved },
  reducers: {
    addItem: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.qty += 1;
      else state.items.push({ ...action.payload, qty: 1 });
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    increaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.qty += 1;
    },
    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.qty > 1) item.qty -= 1;
      else state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, increaseQty, decreaseQty, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalQty = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.qty, 0);
export const selectCartTotalPrice = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.qty * i.price, 0);

export default cartSlice.reducer;