import * as types from "../actions/action-types";

const initialState = {
  categories: [],
  hasError: false,
  isFetching: false,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.fetchCategories:
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case types.fetchCategoriesFailure:
      return {
        ...state,
        isFetching: false,
        hasError: true,
      };
    case types.fetchCategoriesSuccess:
      return {
        ...state,
        isFetching: false,
        categories: action.payload,
      };

    case types.deleteCategory:
      // NOTE: If I put `categories` first, then `...state`, the categories
      // property will be overridden by the current state!
      return Object.assign({}, state, {
        categories: state.categories.filter((c) => c.id !== action.payload),
      });

    case types.addCategory:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
  }
  return state;
};

export { categoriesReducer };
