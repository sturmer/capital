// FIXME This becomes useless

import React from "react";
import { Route, Switch } from "react-router-dom";
// import { createStore, combineReducers } from "redux";
// import {connect } from "react-redux";

import "./App.css";
import { CategoryPanel } from "./CategoryPanel";
import { MonthHistoryPanel } from "./ExpenseListContainer";
import { Navigation } from "./Navigation";
import { LoginForm } from "./LoginForm";

// export const AuthContext = React.createContext();

// TODO Use custom domain for Heroku app
// TODO Decide on DB (or just files in the beginning?) and store data in it -- keep using files as long as possible.

const App = () => {
  // const [state, dispatch] = React.useReducer(reducer, initialState);

  console.log("Is Authenticated?", store.getState().isAuthenticated);

  return (
    <>
      <Navigation />
      {!store.getState().isAuthenticated ? (
        <LoginForm />
      ) : (
        <Switch>
          <Route path="/categories" component={CategoryPanel} />
          <Route path="/" component={MonthHistoryPanel} />
        </Switch>
      )}
    </>
  );
};

export default App;
