import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import { CategoryPanel } from "./categories/CategoryPanel";
import { MonthHistoryPanel } from "./expenses/MonthHistoryPanel";
import { Navigation } from "./common/Navigation";
import { LoginForm } from "./login/LoginForm";
import { ProtectedRoute } from "./common/ProtectedRoute";

// TODO Use custom domain for Heroku app
// TODO Decide on DB (or just files in the beginning?) and store data in it -- keep using files as long as possible.

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const App = () => {
  const [state, setState] = useState(initialState);

  // console.log({ state });

  return (
    <div>
      <Navigation isAuthenticated={state.isAuthenticated} user={state.user} />

      <Switch>
        {/* TODO make path '/' point to /expenses */}
        <ProtectedRoute exact path="/" authState={state}>
          <MonthHistoryPanel authUser={state.user} authToken={state.token} />
        </ProtectedRoute>

        <ProtectedRoute path="/categories" authState={state}>
          <CategoryPanel authUser={state.user} authToken={state.token} />
        </ProtectedRoute>
        <Route
          path="/login"
          render={() => <LoginForm authState={state} setAuthState={setState} />}
        />
      </Switch>
    </div>
  );
};

export default App;
