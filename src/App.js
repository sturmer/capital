import React from "react";

import "./App.css";
import { CategoryPanel } from "./Category";
import { MonthHistoryPanel } from "./MonthHistoryPanel";

const App = () => {
  return (
    <>
      <CategoryPanel />
      <MonthHistoryPanel />
    </>
  );
};

export default App;
