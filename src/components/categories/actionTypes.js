const actionTypes = {
  fetchCategories: "FETCH_CATEGORIES_REQ",
  fetchCategoriesSuccess: "FETCH_CATEGORIES_SUCCESS",
  fetchCategoriesFailure: "FETCH_CATEGORIES_FAILURE",
  deleteCategory: "DELETE_CATEGORY",
  addCategory: "ADD_CATEGORY",

  // TODO Consiger only using these, remove fetchCategories/Success/Failure
  START_REQUEST_SERVER: "START_REQUEST_SERVER",
  SERVED_SUCCESSFUL: "SERVED_SUCCESSFUL",
  SERVER_ERROR: "SERVER_ERROR",
};

// TODO Make single file actiontypes for categories and expenses
export { actionTypes };
