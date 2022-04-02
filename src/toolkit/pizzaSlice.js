import { createSlice } from '@reduxjs/toolkit';

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: {
    items: [],
    isLoaded: false,
  },
  reducers: {
    setPizzas(state, action) {
      state.items = action.payload;
      state.isLoaded = true;
    },
    setLoaded(state, action) {
      state.isLoaded = action.payload;
    },
  },
});

export const fetchPizzas = (sortBy, category) => {
  return async (dispatch) => {
    dispatch(pizzaActions.setLoaded(false));
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3001/pizzas?${
          category !== null ? `category=${category}` : ''
        }&_sort=${sortBy.type}&_order=${sortBy.order}`
      );

      const data = await response.json();
      return data;
    };

    const pizzaData = await fetchData();
    dispatch(pizzaActions.setPizzas(pizzaData));
  };
};

export const pizzaActions = pizzaSlice.actions;
export default pizzaSlice.reducer;
