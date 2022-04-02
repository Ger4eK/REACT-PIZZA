import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    category: null,
    sortBy: {
      type: 'popular',
      order: 'desc',
    },
  },
  reducers: {
    setSortBy(state, action) {
      const newSortBy = action.payload;
      state.sortBy = {
        type: newSortBy.type,
        order: newSortBy.order,
      };
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const filterActions = filterSlice.actions;
export default filterSlice.reducer;
