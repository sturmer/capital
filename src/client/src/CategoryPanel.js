import React, { useState, useEffect, useContext, useReducer } from "react";
import { Button, Container, Row } from "reactstrap";

// import { NewCategoryForm } from "./NewCategoryForm";
import { Category } from "./Category";
import { AuthContext } from "./App";

const initialState = {
  categories: [],
  hasError: false,
  isFetching: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_CATEGORIES_REQ":
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case "FETCH_CATEGORIES_FAIL":
      return {
        ...state,
        isFetching: false,
        hasError: true,
      };
    case "FETCH_CATEGORIES_SUCCESS":
      return {
        ...state,
        isFetching: false,
        categories: action.payload,
      };
    default:
      return state;
  }
};

const CategoryPanel = () => {
  const { state: authState } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  // const [categories, setCategories] = useState([]);

  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch categories from server
  useEffect(() => {
    dispatch({ type: "FETCH_CATEGORIES_REQ" });

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
        dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: resJson });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "FETCH_CATEGORIES_FAIL" });
      });
  }, [authState.token]);

  const deleteCategory = (id) => {
    // setCategories(categories.filter((c) => c.id !== id));
    // TODO Write updated list of categories to file
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

      {/* FIXME */}
      {/* <Row>
        {showForm && (
          <NewCategoryForm
            handleVisibility={setShowForm}
            handleCategories={setCategories}
            currentCategories={categories}
          />
        )}
      </Row> */}

      <Row>
        <Button color="primary" onClick={() => setShowForm(!showForm)}>
          New Category
        </Button>
      </Row>
    </Container>
  );
};

export { CategoryPanel };
