import React, { useState } from "react";
import "./App.css";

const initialCategories = [
  { name: "utilities", cost: 13.9 },
  { name: "housing", cost: 21.4 },
  { name: "foodDelivery", cost: 5.6 }
];

function NewCategoryForm(props) {
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
      {name: categoryName, value: null}
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
}

function App() {
  // TODO get categories from DB table

  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState(initialCategories);

  return (
    <>
      <CategoryPanel categories={categories}/>
      { showForm && <NewCategoryForm handleVisibility={setShowForm} handleCategories={setCategories} currentCategories={categories}/> }
      <button onClick={() => setShowForm(!showForm)}>New</button>
    </>
  );
}

function CategoryPanel(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {props.categories.map(c => (
          <Category key={c.name} name={c.name} totalCost={c.cost ?? " - "} />
        ))}
      </tbody>
    </table>
  );
}

function Category(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.totalCost}</td>
    </tr>
  );
}

export default App;
