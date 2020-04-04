import React from "react";

import "./App.css";
import { CategoryPanel } from "./Category";
import { MonthHistory } from "./MonthHistory";

const App = () => {
  return (
    <>
      <CategoryPanel />
      <MonthHistory />
    </>
  );
};

export default App;
