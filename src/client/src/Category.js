import React, { useState } from "react";
import { NewCategoryForm } from "./NewCategoryForm";

// TODO get categories from DB table
const initialCategories = [
  { name: "utilities", cost: 13.9 },
  { name: "housing", cost: 21.4 },
  { name: "foodDelivery", cost: 5.6 }
];

const CategoryPanel = () => {
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState(initialCategories);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(c => (
            <Category key={c.name} name={c.name} totalCost={c.cost ?? " - "} />
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
    </>
  );
};

const Category = props => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.totalCost}</td>
    </tr>
  );
};

export { CategoryPanel };
