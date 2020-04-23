import { actionTypes } from "./actionTypes";

const reducer = (state, action) => {
  let newState = null;
  switch (action.type) {
    case actionTypes.savingSuccess:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
        expenseToAdd: null,
      };
    case actionTypes.savingFailed:
      return {
        ...state,
        hasError: true,
        expenseToAdd: null,
      };
    case actionTypes.SET_AUTH:
      return {
        ...state,
        authUser: action.payload.user,
        authToken: action.payload.token,
      };
    case actionTypes.fetchExpenses:
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case actionTypes.fetchExpensesSuccess:
      // console.log({ payload: action.payload });
      newState = {
        ...state,
        isFetching: false,
        expenses: action.payload,
      };
      return newState;
    case actionTypes.fetchExpensesFail:
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };
    case actionTypes.deleteExpense:
      return {
        ...state,
        expenses: state.expenses.filter((e) => e.id !== action.payload),
        idToDelete: action.payload,
      };

    case actionTypes.addExpense:
      console.log("adding expense...");
      return {
        ...state,
        expenseToAdd: action.payload, // triggers effect
      };

    case actionTypes.updateTotal:
      return {
        ...state,
        total: action.payload,
      };

    default:
      return state;
  }
};

export { reducer, actionTypes };
