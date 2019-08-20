import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import config from "../config";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";
import { Provider } from "react-redux";

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <App title={_.get(config.textContent, "titleWeb")} />
  </Provider>,
  document.getElementById("app")
);

module.hot.accept();
