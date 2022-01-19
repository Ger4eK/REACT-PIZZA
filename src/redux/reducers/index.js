import { combineReducers } from "redux";
import filters from "./filters";
import pizzasReducer from "./pizzas";
import cartReducer from "./cart";

const rootReducer = combineReducers({
  //! якшо назви співпадають можна скоротити до 1 слова
  filters,
  pizzas: pizzasReducer,
  cart: cartReducer,
});

export default rootReducer;
