import React, { useState, useEffect, useReducer } from "react";
import { Button, Container, Row } from "reactstrap";

import { NewCategoryForm } from "./NewCategoryForm";
import { Category } from "./Category";

const actionTypes = {
  fetchCategories: "FETCH_CATEGORIES_REQ",
  fetchCategoriesSuccess: "FETCH_CATEGORIES_SUCCESS",
  fetchCategoriesFailure: "FETCH_CATEGORIES_FAILURE",
  deleteCategory: "DELETE_CATEGORY",
  addCategory: "ADD_CATEGORY",
  SET_AUTH: "SET_AUTH",
};

const initialState = {
  categories: [],
  hasError: false,
  isFetching: false,
  authUser: null,
  authToken: null,
};

// TODO Remove reducer shit
const reducer = (state, action) => {
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
      // NOTE: If I put `categories` first, then `...state`, the categories
      // property will be overridden by the current state!
      return {
        ...state,
        categories: state.categories.filter((c) => c !== action.payload),
      };

    case actionTypes.addCategory:
      console.log({ action });
      const newState = {
        ...state,
        categories: [...state.categories, action.payload.name],
      };

      // TODO Persist category
      // ...  Post /categories to server
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
        .then((resJson) => {
          console.log("Saved", { resJson });
        })
        .catch((err) => {
          console.error(err);
          alert("Error saving category please try again");
        });

      return newState;

    default:
      return state;
  }
};

const CategoryPanel = (props) => {
  const [showForm, setShowForm] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch categories from server
  useEffect(() => {
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
    // TODO Write updated list of categories to file
    dispatch({ type: actionTypes.deleteCategory, payload: categoryName });
  };

  console.log({ state: JSON.stringify(state) });

  return (
    <Container fluid="sm">
      <h2>Categories</h2>

      {state &&
        state.categories &&
        state.categories.map((c) => (
          <Row key={c}>
            <Category name={c} />
            <Button color="warning" onClick={() => deleteCategory(c)}>
              Remove
            </Button>
          </Row>
        ))}

      <Row>
        {showForm && (
          <NewCategoryForm
            handleVisibility={setShowForm}
            addCategoryType={actionTypes.addCategory}
            dispatch={dispatch}
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
