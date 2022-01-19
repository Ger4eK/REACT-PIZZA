import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";

import "./scss/app.scss";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    {/*//! provider дозволєя нам пркидувати store будь якому компоненту в app*/}
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
