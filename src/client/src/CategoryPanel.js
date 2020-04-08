import React, { useState, useEffect, useContext, useReducer } from "react";
import { Button, Container, Row } from "reactstrap";

import { NewCategoryForm } from "./NewCategoryForm";
import { Category } from "./Category";
import { AuthContext } from "./App";

const actionTypes = {
  fetchCategories: "FETCH_CATEGORIES_REQ",
  fetchCategoriesSuccess: "FETCH_CATEGORIES_SUCCESS",
  fetchCategoriesFailure: "FETCH_CATEGORIES_FAILURE",
  deleteCategory: "DELETE_CATEGORY",
  addCategory: "ADD_CATEGORY",
};

const initialState = {
  categories: [],
  hasError: false,
  isFetching: false,
};

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

    case actionTypes.deleteCategory:
      // NOTE: If I put `categories` first, then `...state`, the categories
      // property will be overridden by the current state!
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== action.payload),
      };

    case actionTypes.addCategory:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };

    default:
      return state;
  }
};

const CategoryPanel = () => {
  const { state: authState } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch categories from server
  useEffect(() => {
    dispatch({ type: actionTypes.fetchCategories });

    fetch("/categories", {
      headers: { Authorization: `Bearer ${authState.token}` },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
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
  }, [authState.token]);

  const deleteCategory = (id) => {
    // TODO Write updated list of categories to file
    dispatch({ type: actionTypes.deleteCategory, payload: id });
  };

  return (
    <Container fluid="sm">
      <h2>Categories</h2>

      {state.categories &&
        state.categories.map((c) => (
          <Row key={c.id}>
            <Category name={c.name} />
            <Button color="warning" onClick={() => deleteCategory(c.id)}>
              Remove
            </Button>
          </Row>
        ))}

      <Row>
        {showForm && (
          <NewCategoryForm
            handleVisibility={setShowForm}
            dispatch={dispatch}
            // handleCategories={setCategories}
            // currentCategories={categories}
          />
        )}
      </Row>

      <Row>
        <Button color="primary" onClick={() => setShowForm(!showForm)}>
          New Category
        </Button>
      </Row>
    </Container>
  );
};

export { CategoryPanel };
