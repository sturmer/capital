import { actionTypes } from "./actionTypes";

const createStartFetchAction = () => ({ type: actionTypes.fetchCategories });
const createFetchCategoriesAction = (categories) => ({
  type: actionTypes.fetchCategoriesSuccess,
  payload: categories,
});

const createDeleteAction = (categoryName) => {
  return { type: actionTypes.deleteCategory, payload: categoryName };
};

const createFetchCategoriesFailureAction = () => ({
  type: actionTypes.fetchCategoriesFailure,
});

const createRequestServerAction = () => ({
  type: actionTypes.START_REQUEST_SERVER,
});
const createServerSuccessAction = () => ({
  type: actionTypes.SERVED_SUCCESSFUL,
});
const createServerErrorAction = () => ({ type: actionTypes.SERVER_ERROR });

export {
  createStartFetchAction,
  createFetchCategoriesAction,
  createFetchCategoriesFailureAction,
  createDeleteAction,
  createRequestServerAction,
  createServerSuccessAction,
  createServerErrorAction,
};
