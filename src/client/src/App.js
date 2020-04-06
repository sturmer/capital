import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import { CategoryPanel } from "./CategoryPanel";
import { MonthHistoryPanel } from "./MonthHistoryPanel";
import { Navigation } from "./Navigation";

// TODO Use custom domain for Heroku app
// TODO Decide on DB (or just files in the beginning?) and store data in it
// TODO Test!
const App = () => {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/categories" component={CategoryPanel} />
        <Route path="/" component={MonthHistoryPanel} />
      </Switch>
    </>
  );
};

export default App;
