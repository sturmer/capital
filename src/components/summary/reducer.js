import { actionTypes } from "./actionTypes";

const reducer = (state, action) => {
  switch (action.type) {
    // FIXME Start duplicated logic from ExpensePanel's reducer...
    case actionTypes.fetchExpenses:
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case actionTypes.fetchExpensesSuccess:
      return {
        ...state,
        isFetching: false,
        expenses: action.payload,
      };
    case actionTypes.fetchExpensesFail:
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };
    // FIXME End duplicated logic from ExpensePanel's reducer
    case actionTypes.updateTotal:
      const { total, totalsByCategory, totalsByMonth } = action.payload;
      console.log({ totalsByCategory });
      return {
        ...state,
        total,
        totalsByCategory,
        totalsByMonth,
      };

    default:
      return state;
  }
};

export { reducer };
