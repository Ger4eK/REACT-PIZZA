import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
    totalCount: 0,
  },
  reducers: {
    addPizzaToCart(state, action) {
      const id = action.payload.id;
      const currentPizzaItems = !state.items[id]
        ? [action.payload]
        : [...state.items[id].items, action.payload];

      const newItems = {
        ...state.items,
        [id]: {
          items: currentPizzaItems,
          totalPrice: currentPizzaItems.reduce(
            (sum, obj) => obj.price + sum,
            0
          ),
        },
      };

      const items = Object.values(newItems).map((obj) => obj.items);
      const totalCount = [].concat.apply([], items);
      const totalPrice = totalCount.reduce((sum, obj) => obj.price + sum, 0);

      state.items = newItems;
      state.totalCount = totalCount.length;
      state.totalPrice = totalPrice;
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
    plusCartItem(state, action) {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];

      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: newObjItems.reduce((sum, obj) => obj.price + sum, 0),
        },
      };

      const items = Object.values(newItems).map((obj) => obj.items);
      const totalCount = [].concat.apply([], items);
      const totalPrice = totalCount.reduce((sum, obj) => obj.price + sum, 0);
      state.items = newItems;
      state.totalCount = totalCount.length;
      state.totalPrice = totalPrice;
    },
    minusCartItem(state, action) {
      const oldItems = state.items[action.payload].items;
      const newObjItems =
        oldItems.length > 1
          ? state.items[action.payload].items.slice(1)
          : oldItems;

      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: newObjItems.reduce((sum, obj) => obj.price + sum, 0),
        },
      };

      const items = Object.values(newItems).map((obj) => obj.items);
      const totalCount = [].concat.apply([], items);
      const totalPrice = totalCount.reduce((sum, obj) => obj.price + sum, 0);
      state.items = newItems;
      state.totalCount = totalCount.length;
      state.totalPrice = totalPrice;
    },
    removeCartItem(state, action) {
      const currentTotalPrice = state.items[action.payload].totalPrice;
      const currentTotalCount = state.items[action.payload].items.length;

      delete state.items[action.payload];
      state.totalPrice = state.totalPrice - currentTotalPrice;
      state.totalCount = state.totalCount - currentTotalCount;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
