import React from "react";

// TODO Understand what this is for
import { BrowserRouter, Route } from "react-router-dom";

import { ExpenseListContainer } from "./expense-list-container";
// import { CategoryPanel } from "./CategoryPanel";

const router = (
  <BrowserRouter>
    <div>
      {/* <Route path="/categories" component={CategoryPanel}></Route> */}
      <Route path="/" component={ExpenseListContainer}></Route>
    </div>
  </BrowserRouter>
);

export { router };
