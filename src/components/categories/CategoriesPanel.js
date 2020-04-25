import React, { useState, useEffect, useReducer } from "react";

import { NewCategoryForm } from "./NewCategoryForm";
import { reducer } from "./reducer";
import {
  createDeleteAction,
  createFetchCategoriesAction,
  createFetchCategoriesFailureAction,
  createStartFetchAction,
  createRequestServerAction,
  createServerSuccessAction,
  createServerErrorAction,
} from "./actions";
import { actionTypes } from "./actionTypes";

const initialState = {
  categories: [],
  hasError: false,
  isFetching: false, // TODO Rename to "isRequesting/isLoading/..."
  idToDelete: null,
  categoryToSave: null,
};

const CategoriesPanel = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch categories from server
  useEffect(() => {
    dispatch(createStartFetchAction());

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
        dispatch(createFetchCategoriesAction(resJson));
      })
      .catch((err) => {
        console.log(err);
        dispatch(createFetchCategoriesFailureAction());
      });
  }, [props.authUser, props.authToken]);

  // Delete category
  useEffect(() => {
    if (!state.idToDelete) {
      return;
    }

    dispatch(createRequestServerAction());

    fetch(`/categories/${props.authUser}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.authToken}`,
      },
      body: JSON.stringify({ target: state.idToDelete }),
    }).then((res) => {
      if (res.status === 200) {
        console.log("Deleted");
        dispatch(createServerSuccessAction());
      } else {
        dispatch(createServerErrorAction());
      }
    });
  }, [props.authToken, props.authUser, state.idToDelete]);

  // Save category
  useEffect(() => {
    if (!state.categoryToSave) {
      return;
    }

    fetch(`/categories/${props.authUser}`, {
      method: "POST",
      body: JSON.stringify({
        category: state.categoryToSave,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.authToken}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("Saved");
        } else {
          throw new Error(res.error);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [props.authToken, props.authUser, state.categoryToSave]);

  const deleteCategory = (categoryName) => {
    dispatch(createDeleteAction(categoryName));
  };

  // console.log({ state: JSON.stringify(state) });

  return (
    <>
      {state.isFetching ? (
        <div className="card">
          <div className="card-body">
            <p className="card-text">LOADING...</p>
          </div>
        </div>
      ) : state.hasError ? (
        <div className="card">
          <div className="card-body">
            <p className="card-text">AN ERROR HAS OCCURRED</p>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
};

export { CategoriesPanel };
