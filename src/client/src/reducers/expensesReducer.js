import * as types from "../actions/action-types";

const initialState = {
  expenses: [],
  isFetching: false,
  hasError: false,
};

const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.fetchExpenses:
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case types.fetchExpensesSuccess:
      return {
        ...state,
        isFetching: false,
        expenses: action.payload,
      };
    case types.fetchExpensesFail:
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };
    case types.deleteExpense:
      return {
        ...state,
        expenses: state.expenses.filter((e) => e.id !== action.payload),
      };
    case types.addExpense:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
  }
  return state;
};

export { expensesReducer };
