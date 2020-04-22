const actionTypes = {
  fetchExpenses: "FETCH_EXPENSES_REQUEST",
  fetchExpensesSuccess: "FETCH_EXPENSES_SUCCESS",
  fetchExpensesFail: "FETCH_EXPENSES_FAILURE",
  deleteExpense: "DELETE_EXPENSE",
  addExpense: "ADD_EXPENSE",
  SET_AUTH: "SET_AUTH", // Consider https://www.npmjs.com/package/express-basic-auth [?]
  savingSuccess: "SAVING_SUCCESS",
  savingFailed: "SAVING_FAILED",
  updateTotal: "UPDATE_TOTAL",
};

export { actionTypes };
