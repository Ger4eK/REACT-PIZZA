import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Categories, SortPopup, PizzaBlock, PizzaLoader } from "../components";
import { setCategory, setSortBy } from "../redux/actions/filters";
import { fetchPizzas } from "../redux/actions/pizzas";
import { addPizzaToCart } from "../redux/actions/cart";

const categoryName = ["Мясні", "Вегетаріанські", "Гриль", "Гострі", "Закриті"];
const sortItems = [
  { name: "популярністю", type: "popular", order: "desc" },
  { name: "ціною", type: "price", order: "desc" },
  { name: "алфавітом", type: "name", order: "asc" },
];

function Home() {
  const dispatch = useDispatch();

  const items = useSelector(({ pizzas }) => pizzas.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const cartItems = useSelector(({ cart }) => cart.items);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  React.useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
  }, [sortBy, category]);

 
  //! useCallback - говорить - Home коли ти створюєш onSelectCategory, створи його 1 раз і силку на цю функцію не змінюй зовсім, навіть якщо ти зробиш ререндер силку не міняй
  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);
  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  const handleAddPizzaToCart = (obj) => {
    dispatch(addPizzaToCart(obj));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryName}
        />
        <SortPopup
          activeSortType={sortBy.type}
          items={sortItems}
          onClickSortType={onSelectSortType}
        />
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
        {isLoaded
          ? items.map((obj) => (
              //! {...obj} - говорить, що всі властивості які є в об'єкті obj автоматично будуть перекидані в нашу компоненту
              <PizzaBlock
                onClickAddPizza={handleAddPizzaToCart}
                key={obj.id}
                addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                {...obj}
              />
            ))
          : Array(12)
              .fill(0)
              .map((_, index) => <PizzaLoader key={index} />)}
        {/*//! 1) Array створює 12 елементів в масиві 
        //! 2) і зразу візьми кожен елемент(undefined) перетвори(fill) його в <PizzaLoader />*/}
      </div>
    </div>
  );
}

export default Home;

//todo addedCount={cartItems[obj.id] && cartItems[obj.id].length}
//! дозволяє нам коло кнопки вказувати кількість доданих піц цього типу
