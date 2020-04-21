import React, { useState } from "react";
import { Form, Label, Input, FormGroup, Col } from "reactstrap";

const NewCategoryForm = (props) => {
  const [categoryName, setCategoryName] = useState("");

  const handleCategoryChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleCategorySubmit = (event) => {
    // Hide form
    props.handleVisibility(false);

    props.dispatch({
      type: props.addCategoryType,
      payload: { name: categoryName },
    });

    event.preventDefault(); // crucial, or the whole page would be reloaded
  };

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
