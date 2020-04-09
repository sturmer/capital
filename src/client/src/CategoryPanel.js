import React, { useState } from "react";
import { Button, Container, Row } from "reactstrap";
// import { createStore } from "redux";

import { NewCategoryForm } from "./NewCategoryForm";
import { Category } from "./Category";

import { store } from "./store";

// const store = createStore(categoryPanelReducer);

const CategoryPanel = (props) => {
  const [showForm, setShowForm] = useState(false);

  // Fetch categories from server
  // useEffect(() => {
  //   store.dispatch({ type: actionTypes.fetchCategories });

  //   fetch("/categories", {
  //     // headers: { Authorization: `Bearer ${authState.token}` },
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       throw res;
  //     })
  //     .then((resJson) => {
  //       console.log({ resJson });
  //       store.dispatch({
  //         type: actionTypes.fetchCategoriesSuccess,
  //         payload: resJson,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       store.dispatch({ type: actionTypes.fetchCategoriesFailure });
  //     });
  // }, [authState.token]);

  const deleteCategory = (id) => {
    // TODO Write updated list of categories to file
    // FIXME
    // store.dispatch({ type: actionTypes.deleteCategory, payload: id });
  };

  return (
    <Container fluid="sm">
      <h2>Categories</h2>

      {props.categories &&
        props.categories.map((c) => (
          <Row key={c.id}>
            <Category name={c.name} />
            <Button color="warning" onClick={() => deleteCategory(c.id)}>
              Remove
            </Button>
          </Row>
        ))}

      {/*FIXME*/}
      {/* <Row>
        {showForm && (
          <NewCategoryForm
            handleVisibility={setShowForm}
            addCategoryType={actionTypes.addCategory}
            store={store}
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
