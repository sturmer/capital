import { combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";

import { loginReducer } from "./loginReducer";
import { expensesReducer } from "./expensesReducer";
import { categoriesReducer } from "./categoriesReducer";

const reducers = combineReducers({
  loginState: loginReducer,
  expensesState: expensesReducer,
  categoriesState: categoriesReducer,
  // form: formReducer,
  // TODO others
});

export { reducers };
