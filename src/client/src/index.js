// TODO rename to app.js
// TODO npm eject!
import React from "react";
import { render } from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.css";

import { store } from "./store";
import { router } from "./router";
import "./index.css";

// TODO App.js no longer used, just delete?
render(
  <Provider store={store}>{router}</Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
