import React from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components";
import { Home, Cart } from "./pages";

const App = () => {
  
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

//todo КЛАСОВА КОМОНЕНТА

//  React.useEffect(() => {
//    axios.get("http://localhost:3000/db.json").then(({ data }) => {
//      setPizzas(data.pizzas);
//    });
//    //fetch("http://localhost:3000/db.json")
//    //  .then((resp) => resp.json())
//    //  .then((json) => {
//    //    setPizzas(json.pizzas);
//    //  });
//  }, []);

//class App extends React.Component {
//  componentDidMount() {
//    axios.get("http://localhost:3000/db.json").then(({ data }) => {
//      this.props.setPizzas(data.pizzas);
//    });
//  }

//  render() {
//    return (
//      <div className="wrapper">
//        <Header />
//        <div className="content">
//          <Routes>
//            <Route path="/" element={<Home items={this.props.items} />} />
//            <Route path="/cart" element={<Cart />} />
//          </Routes>
//        </div>
//      </div>
//    );
//  }
//}

////! даємо доступ до items app компоненті (в пропсах)
//const mapStateToProps = (state) => {
//  return {
//    items: state.pizzas.items,
//  };
//};

////! в пропси прокидуєм setPizzas і setPizzas має викликати dispatch(setPizzasAction) і брати items і прокидувати і setPizzasAction
////TODO якщо наш action має одинакову назву ми можем скоротити цей запис
////const mapDispatchToProps = (dispatch) => {
////  return {
////    setPizzas: (items) => dispatch(setPizzas(items)),
////  };
////};
////TODO і написати ось так
//const mapDispatchToProps = {
//  setPizzas,
//};

//export default connect(mapStateToProps, mapDispatchToProps)(App);
