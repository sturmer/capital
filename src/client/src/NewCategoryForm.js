import React, { useState } from "react";
import { Form, Label, Input, FormGroup, Col } from "reactstrap";
import { v4 as uuidV4 } from "uuid";

// FIXME This needs to be factored out -- it is in common with CategoryPanel!
const actionTypes = { addCategory: "ADD_CATEGORY" };

const NewCategoryForm = (props) => {
  const [categoryName, setCategoryName] = useState("");

  const handleCategoryChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleCategorySubmit = (event) => {
    // Hide form
    props.handleVisibility(false);

    // add row with category
    // addCategory(categoryName);

    props.dispatch({
      type: actionTypes.addCategory,
      payload: { id: uuidV4(), name: categoryName },
    });

    event.preventDefault(); // crucial, or the whole page would be reloaded
  };

  // const addCategory = (_event) => {
  //   props.handleCategories([
  //     ...props.currentCategories,
  //     { name: categoryName, value: null },
  //   ]);
  // };

  return (
    <Form onSubmit={handleCategorySubmit}>
      <FormGroup>
        <Col sm={10}>
          <Label htmlFor="categoryName">Category Name</Label>
          <Input
            type="text"
            name="categoryName"
            value={categoryName}
            onChange={handleCategoryChange}
          ></Input>
        </Col>
      </FormGroup>
      <button>Add</button>
    </Form>
  );
};

export { NewCategoryForm };
