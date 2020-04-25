import { actionTypes } from "./actionTypes";

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.fetchCategories:
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case actionTypes.fetchCategoriesFailure:
      return {
        ...state,
        isFetching: false,
        hasError: true,
      };
    case actionTypes.fetchCategoriesSuccess:
      return {
        ...state,
        isFetching: false,
        categories: action.payload,
      };

    case actionTypes.START_REQUEST_SERVER:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.SERVED_SUCCESSFUL:
      return {
        ...state,
        isFetching: false,
        idToDelete: null,
        categoryToSave: null,
      };

    case actionTypes.SERVER_ERROR:
      return {
        ...state,
        isFetching: false,
        hasError: true,
        idToDelete: null,
        categoryToSave: null,
      };

    case actionTypes.deleteCategory:
      return {
        ...state,
        categories: state.categories.filter((c) => c !== action.payload),
        idToDelete: action.payload,
      };

    case actionTypes.addCategory:
      return {
        ...state,
        categories: [...state.categories, action.payload.name],
        categoryToSave: action.payload.name,
      };

    default:
      return state;
  }
};

export { reducer };
