import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: { cart: cartReducer },
});

// save the cart to localStorage every time it changes
store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cart.items));
});