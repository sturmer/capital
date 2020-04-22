import { actionTypes } from "./actionTypes";

const reducer = (state, action) => {
  let newState = null;
  switch (action.type) {
    case action.SET_AUTH:
      return {
        ...state,
        authToken: action.payload.token,
        authUser: action.payload.user,
      };
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

    case actionTypes.deleteCategory:
      newState = {
        ...state,
        categories: state.categories.filter((c) => c !== action.payload),
      };

      fetch(`/categories/${state.authUser}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.authToken}`,
        },
        body: JSON.stringify({ target: action.payload }),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error(res.error);
          }
        })
        .then((_resJson) => {
          console.log("Deleted");
        })
        .catch((err) => {
          console.error(err);
        });

      return newState;

    case actionTypes.addCategory:
      console.log({ action });
      newState = {
        ...state,
        categories: [...state.categories, action.payload.name],
      };

      // Persist new category
      fetch(`/categories/${state.authUser}`, {
        method: "POST",
        body: JSON.stringify({
          category: action.payload.name,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.authToken}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error(res.error);
          }
        })
        .then((_resJson) => {
          console.log("Saved");
          // TODO Remove this whole .then? (also in delete category)
        })
        .catch((err) => {
          console.error(err);
        });

      return newState;

    default:
      return state;
  }
};

export { reducer };
