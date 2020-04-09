import * as types from "./action-types";

const deleteExpense = (id) => {
  return { type: types.deleteExpense, payload: id };
};

export { deleteExpense };
