import React, { useState } from "react";

import "./App.css";
import {NewCategoryForm} from "./NewCategoryForm";
import {CategoryPanel} from "./Category"

const initialCategories = [
  { name: "utilities", cost: 13.9 },
  { name: "housing", cost: 21.4 },
  { name: "foodDelivery", cost: 5.6 }
];

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

export default App;
