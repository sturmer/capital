import React, { useState, useEffect, useReducer } from "react";

import { NewCategoryForm } from "./NewCategoryForm";
import { reducer } from "./reducer";
import { actionTypes } from "./actionTypes";

const initialState = {
  categories: [],
  hasError: false,
  isFetching: false,
  authUser: null,
  authToken: null,
};

const CategoriesPanel = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch categories from server
  useEffect(() => {
    // Save user and token for next requests (add/remove category)
    dispatch({
      type: actionTypes.setAuth,
      payload: { user: props.authUser, token: props.authToken },
    });

    dispatch({ type: actionTypes.fetchCategories });

    fetch(`/categories/${props.authUser}`, {
      headers: { Authorization: `Bearer ${props.authToken}` },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then((resJson) => {
        console.log({ resJson });
        dispatch({
          type: actionTypes.fetchCategoriesSuccess,
          payload: resJson,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: actionTypes.fetchCategoriesFailure });
      });
  }, [props.authUser, props.authToken]);

  const deleteCategory = (categoryName) => {
    dispatch({ type: actionTypes.deleteCategory, payload: categoryName });
  };

  // console.log({ state: JSON.stringify(state) });

  return (
    <>
      <h2>Categories</h2>
      <table className="table table-striped table-bordered">
        <tbody>
          {state &&
            state.categories &&
            state.categories.map((c) => (
              <tr key={c}>
                <td>{c}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => deleteCategory(c)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showForm && (
        <NewCategoryForm
          handleVisibility={setShowForm}
          addCategoryType={actionTypes.addCategory}
          dispatch={dispatch}
        />
      )}

      <button
        className="btn btn-primary"
        onClick={() => setShowForm(!showForm)}
      >
        New Category
      </button>
    </>
  );
};

export { CategoriesPanel };
