import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Categories, SortPopup, PizzaBlock, PizzaLoader } from '../components';
import { filterActions } from '../toolkit/filterSlice';
import { cartActions } from '../toolkit/cartSlice';
import { fetchPizzas } from '../toolkit/pizzaSlice';

const categoryName = ['Мясні', 'Вегетаріанські', 'Гриль', 'Гострі', 'Закриті'];
const sortItems = [
  { name: 'популярністю', type: 'popular', order: 'desc' },
  { name: 'ціною', type: 'price', order: 'desc' },
  { name: 'алфавітом', type: 'name', order: 'asc' },
];

function Home() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.pizza.items);
  const isLoaded = useSelector((state) => state.pizza.isLoaded);
  const cartItems = useSelector((state) => state.cart.items);
  const { category, sortBy } = useSelector((state) => state.filter);

  React.useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
  }, [sortBy, category]);

  const onSelectCategory = React.useCallback(
    (index) => {
      dispatch(filterActions.setCategory(index));
    },
    [dispatch]
  );
  const onSelectSortType = React.useCallback(
    (type) => {
      dispatch(filterActions.setSortBy(type));
    },
    [dispatch]
  );

  const handleAddPizzaToCart = (obj) => {
    dispatch(cartActions.addPizzaToCart(obj));
  };

  return (
    <div className='container'>
      <div className='content__top'>
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
      <h2 className='content__title'>Всі піци</h2>
      <div className='content__items'>
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
        //! 2) І кожен елемент(undefined) перетворює(fill) його в <PizzaLoader />*/}
      </div>
    </div>
  );
}

export default Home;

//todo addedCount={cartItems[obj.id] && cartItems[obj.id].length}
//! дозволяє нам коло кнопки вказувати кількість доданих піц цього типу
