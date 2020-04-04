import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import { CategoryPanel } from "./CategoryPanel";
import { MonthHistoryPanel } from "./MonthHistoryPanel";

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/categories" component={CategoryPanel} />
        <Route path="/" component={MonthHistoryPanel} />
      </Switch>
    </>
  );
};

export default App;
