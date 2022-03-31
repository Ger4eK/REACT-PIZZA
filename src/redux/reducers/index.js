import { combineReducers } from "redux";
import filters from "./filters";
import pizzasReducer from "./pizzas";
import cartReducer from "./cart";

const rootReducer = combineReducers({
  filters,
  pizzas: pizzasReducer,
  cart: cartReducer,
});

export default rootReducer;
