import React, { useState } from "react";

const NewCategoryForm = props => {
  const [categoryName, setCategoryName] = useState("");

  const handleCategoryChange = event => {
    setCategoryName(event.target.value);
  };

  const handleCategorySubmit = event => {
    // Hide form
    props.handleVisibility(false);

    // add row with category
    addCategory(categoryName);

    event.preventDefault(); // crucial, or the whole page would be reloaded
  };

  const addCategory = _event => {
    props.handleCategories([
      ...props.currentCategories,
      { name: categoryName, value: null }
    ]);
  };

  return (
    <form onSubmit={handleCategorySubmit}>
      <label htmlFor="categoryName">Category Name</label>
      <input
        type="text"
        name="categoryName"
        value={categoryName}
        onChange={handleCategoryChange}
      ></input>
      <button>Add</button>
    </form>
  );
};

export { NewCategoryForm };
