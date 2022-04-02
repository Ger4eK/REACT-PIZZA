import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import filterSlice from './filterSlice';
import pizzaSlice from './pizzaSlice';

const store = configureStore({
  reducer: {
    filter: filterSlice,
    pizza: pizzaSlice,
    cart: cartSlice,
  },
});

export default store;
