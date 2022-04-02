const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

//const _get = (obj, path) => {
//  const [firstKey, ...keys] = path.split(".");
//  return keys.reduce((val, key) => {
//    return val[key];
//  }, obj[firstKey]);
//};
//const getTotalSum = (obj, path) => {
//  return Object.values(obj).reduce((sum, obj) => {
//    const value = _get(obj, path);
//    return sum + value;
//  }, 0);
//};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_CART': {
      //! з допомогою цього currentPizzaItems ми знаєм звідки брати актуальні данні, бо так воно буде завжди посилатись на initialState
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };

      //! є Object, берем всі його ключі keys(), потім беру кожен ключ і з newItems витягую з нього по ключу([key]) items і його length

      //todo простий спосіб
      const items = Object.values(newItems).map((obj) => obj.items);
      const allPizzas = [].concat.apply([], items);
      const totalPrice = getTotalPrice(allPizzas);

      //todo складнйи спосіб
      //const totalCount = getTotalSum(newItems, "items.length");
      //const totalPrice = getTotalSum(newItems, "totalPrice");

      return {
        ...state,
        items: newItems,
        totalCount: allPizzas.length,
        totalPrice,
      };
    }
    case 'CLEAR_CART': {
      return {
        ...state,
        items: {},
        totalPrice: 0,
        totalCount: 0,
      };
    }
    case 'REMOVE_CART_ITEM': {
      //! цим ми клонуєм state.items
      const newItems = {
        ...state.items,
      };
      //! перед тим як видаляти дізнаємось totalPrice і зберігаєм його в currentTotalPrice
      const currentTotalPrice = newItems[action.payload].totalPrice;
      const currentTotalCount = newItems[action.payload].items.length;
      //! в клоні видаляєм піци
      delete newItems[action.payload];

      return {
        ...state,
        items: newItems,
        //! для того щоб після видалення піц з корзини змінювався totalPrice
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
    }
    case 'PLUS_CART_ITEM': {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      //todo простий спосіб
      const items = Object.values(newItems).map((obj) => obj.items);
      const allPizzas = [].concat.apply([], items);
      const totalPrice = getTotalPrice(allPizzas);

      //todo складний спосіб
      //const totalCount = getTotalSum(newItems, "items.length");
      //const totalPrice = getTotalSum(newItems, "totalPrice");

      return {
        ...state,
        items: newItems,
        totalCount: allPizzas.length,
        totalPrice,
      };
    }

    case 'MINUS_CART_ITEM': {
      const oldItems = state.items[action.payload].items;
      const newObjItems =
        oldItems.length > 1
          ? state.items[action.payload].items.slice(1)
          : oldItems;

      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      //todo простий спосіб
      const items = Object.values(newItems).map((obj) => obj.items);
      const allPizzas = [].concat.apply([], items);
      const totalPrice = getTotalPrice(allPizzas);

      //todo складний спосіб
      //const totalCount = getTotalSum(newItems, "items.length");
      //const totalPrice = getTotalSum(newItems, "totalPrice");

      return {
        ...state,
        items: newItems,
        totalCount: allPizzas.length,
        totalPrice,
      };
    }
    default:
      return state;
  }
};

export default cart;

//todo що робить ADD_PIZZA_CART
//! він бере весь initialState і коли прийде action ADD_PIZZA_CART створює повністю новий об'єкт, він бере все зі старого об'єкту (...state) і у властивості items створює новий об'єкт в цьому об'єкті бере старі данні з items (...state.items,) включає action.payload.id (айдішки піц) -  їх огортає в масив [] бо ми передаєм динамічний ключ. І в цей ключ передаєм масив і коли буде передаватися масив у властивість action.payload.id буде братись старий масив ...state.items[action.payload.id] і він буде запхатись новий масив. В кінці масиву добавиться об'єкт з піцою action.payload  9 урок 50:40

//todo також ми робимо умову
//! Якщо нічого немає  !state.items[action.payload.id]
//! то створи масив  ? [action.payload]
//! якщо є то будем робити все як написано вище  : [...state.items[action.payload.id], action.payload]

//! [action.payload.id] ми огортаєм в дужки бо ми передаєм динамічне значення (id)
