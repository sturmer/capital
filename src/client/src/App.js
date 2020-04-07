import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import { CategoryPanel } from "./CategoryPanel";
import { MonthHistoryPanel } from "./MonthHistoryPanel";
import { Navigation } from "./Navigation";
import { LoginForm } from "./LoginForm";

export const AuthContext = React.createContext();

// TODO Use custom domain for Heroku app
// TODO Decide on DB (or just files in the beginning?) and store data in it -- keep using files as long as possible.

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state, action) => {
  console.log("App::reducer", { state, action });
  switch (action.type) {
    case "LOGIN":
      console.log("LOGIN received", { state, action });
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };

    // TODO Add logout button
    case "LOGOUT":
      console.log("LOGOUT received", { state, action });
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  console.log("Is Authenticated?", state.isAuthenticated);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Navigation />

      {!state.isAuthenticated ? (
        <LoginForm />
      ) : (
        <Switch>
          <Route path="/categories" component={CategoryPanel} />
          <Route path="/" component={MonthHistoryPanel} />
        </Switch>
      )}
    </AuthContext.Provider>
  );
};

export default App;
