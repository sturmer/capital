import React, { useState } from "react";
import { Link } from "react-router-dom";

import { NewCategoryForm } from "./NewCategoryForm";
import { Category } from "./Category";

// TODO get categories from DB table
const initialCategories = [
  { id: 1, name: "utilities", cost: 13.9 },
  { id: 2, name: "housing", cost: 21.4 },
  { id: 3, name: "foodDelivery", cost: 5.6 }
];

const CategoryPanel = () => {
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState(initialCategories);

  const deleteCategory = id => {
    setCategories(categories.filter(c => c.id !== id));
  };

  return (
    <>
      <h1>Categories</h1>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(c => (
            <tr key={c.id}>
              <Category name={c.name} totalCost={c.cost ?? " - "} />
              <td>
                <button onClick={() => deleteCategory(c.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <NewCategoryForm
          handleVisibility={setShowForm}
          handleCategories={setCategories}
          currentCategories={categories}
        />
      )}
      <button onClick={() => setShowForm(!showForm)}>New</button>
      <Link to={"./"}>
        <button variant="raised">Go to Expenses</button>
      </Link>
    </>
  );
};

export { CategoryPanel };
