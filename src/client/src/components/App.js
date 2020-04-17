import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import { CategoryPanel } from "./categories/CategoryPanel";
import { MonthHistoryPanel } from "./expenses/MonthHistoryPanel";
import { Navigation } from "./common/Navigation";
import { LoginForm } from "./login/LoginForm";

// TODO Use custom domain for Heroku app
// TODO Decide on DB (or just files in the beginning?) and store data in it -- keep using files as long as possible.

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const App = () => {
  const [state, setState] = React.useState(initialState);

  return (
    <div>
      <Navigation isAuthenticated={state.isAuthenticated} user={state.user} />

      {!state.isAuthenticated ? (
        <LoginForm authState={state} setAuthState={setState} />
      ) : (
        <Switch>
          {/* TODO make path '/' point to /expenses */}
          <Route
            exact
            path="/"
            render={() => <MonthHistoryPanel authToken={state.token} />}
          />
          <Route
            path="/categories"
            render={() => <CategoryPanel authToken={state.token} />}
          />
        </Switch>
      )}
    </div>
  );
};

export default App;
