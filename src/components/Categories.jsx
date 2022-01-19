import React from "react";
import PropTypes from "prop-types";

//! за допомогою memo наша компонента не робить непотрібний ререндер коли пропси не змінились. Це потрібно для того коли у вас є якісь динамічні дані і їх може бути тисячі і це буде впливати на слабкі машини і для того щоб таке оптимізувати ми використовуємо memo
const Categories = React.memo(({ activeCategory, items, onClickCategory }) => {
  //todo для тесту чи рендериться зайвий раз компонента (перевіряєм через window.test в app.js)

  return (
    <div className="categories">
      <ul>
        <li
          className={activeCategory === null ? "active" : ""}
          onClick={() => onClickCategory(null)}
        >
          Всі
        </li>
        {items && //! говорить якшо items є то робить map, якшо нема items (тобто undefined) то нічого не показує
          items.map((name, index) => (
            <li
              className={activeCategory === index ? "active" : ""}
              onClick={() => onClickCategory(index)}
              key={`${name}_${index}`}
            >
              {name}
            </li>
          ))}
      </ul>
    </div>
  );
});

Categories.propTypes = {
  //activeCategory: PropTypes.oneOf([PropTypes.number, null]),
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickCategory: PropTypes.func.isRequired,
};

//! встновлюємо за замовчуванням значення які бьудуть в нашому об'єкті
Categories.defaultProps = { activeCategory: null, items: [] };

export default Categories;
//class Categories extends React.Component {
//  state = {
//    activeItem: null,
//  };

//  onSelectItem = (index) => {
//    this.setState({
//      activeItem: index,
//    });
//  };

//  render() {
//    const { items, onClickItem } = this.props;
//    return (
//      <div className="categories">
//        <ul>
//          <li>Всі</li>
//          {/*//!index - має перераховує категорії від 0 1 2 3 ...*/}
//          {items.map((name, index) => (
//            <li
//              className={this.state.activeItem === index ? "active" : ""}
//              onClick={() => this.onSelectItem(index)}
//              key={`${name}_${index}`}
//            >
//              {name}
//            </li>
//          ))}
//        </ul>
//      </div>
//    );
//  }
//}
