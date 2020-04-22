import React, { useState } from "react";

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
    <form onSubmit={handleCategorySubmit}>
      <div className="form-group">
        <label htmlFor="categoryName">Category Name</label>
        <input
          className="form-control"
          type="text"
          name="categoryName"
          value={categoryName}
          onChange={handleCategoryChange}
        ></input>
      </div>
      <button className="btn btn-primary">Add</button>
    </form>
  );
};

export { NewCategoryForm };
