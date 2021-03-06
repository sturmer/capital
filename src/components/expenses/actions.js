import { actionTypes } from "./actionTypes";

// TODO Create the other actions and use them in the panel.
// dispatch({ type: actionTypes.fetchExpenses });

// dispatch({
//   type: actionTypes.fetchExpensesSuccess,
//   payload: resJson,
// });

// dispatch({ type: actionTypes.fetchExpensesFail });
// // TODO Remove this whole .then? (also in delete category)

// dispatch({
//   type: actionTypes.savingSuccess,
//   payload: persistedExpense,
// });

// dispatch({ type: actionTypes.savingFailed });

// dispatch({ type: actionTypes.updateTotal, payload: resJson.total });

// dispatch({ type: actionTypes.fetchExpensesFail }); // TODO Anything that fails -- Just use one "failed request on server" action

const deleteExpenseAction = (id) => {
  return { type: actionTypes.deleteExpense, payload: id };
};

export { deleteExpenseAction };
