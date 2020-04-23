import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import { CategoriesPanel } from "./categories/CategoriesPanel";
import { ExpensesPanel } from "./expenses/ExpensesPanel";
import { Navigation } from "./common/Navigation";
import { LoginForm } from "./login/LoginForm";
import { ProtectedRoute } from "./common/ProtectedRoute";

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
          <ExpensesPanel authUser={state.user} authToken={state.token} />
        </ProtectedRoute>

        <ProtectedRoute path="/categories" authState={state}>
          <CategoriesPanel authUser={state.user} authToken={state.token} />
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