import axios from "axios";

//! цей action буде передавати true or false який буде міняти статус загрузки
export const setLoaded = (payload) => ({
  type: "SET_LOADED",
  payload,
});

//! коли є деякий спеціальний метод яким буде звертатись до сервера ми пишемо fetch (шось), в нас fetchPizza
//! thunk в нас є асинхронний action (тобто функція повертає другу функцію)
export const fetchPizzas = (sortBy, category) => (dispatch) => {
  //! перед запитом піц ми завжди ставимо setLoaded(false)
  dispatch(setLoaded(false));
  axios
    .get(
      `/pizzas?${category !== null ? `category=${category}` : " "}&_sort=${
        sortBy.type
      }&_order=${sortBy.order}`
    )
    .then(({ data }) => {
      dispatch(setPizzas(data));
    });
};

export const setPizzas = (items) => ({
  type: "SET_PIZZAS",
  payload: items,
});
