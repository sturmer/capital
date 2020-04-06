import React, { useState } from "react";
import { Button, Container, Row } from "reactstrap";

import { NewCategoryForm } from "./NewCategoryForm";
import { Category } from "./Category";

// TODO get categories from DB table
const initialCategories = [
  { id: 1, name: "utilities", cost: 13.9 },
  { id: 2, name: "housing", cost: 21.4 },
  { id: 3, name: "foodDelivery", cost: 5.6 },
];

const CategoryPanel = () => {
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState(initialCategories);

  const deleteCategory = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <Container fluid="sm">
      <h2>Categories</h2>

      {categories.map((c) => (
        <Row>
          <Category name={c.name} totalCost={c.cost ?? " - "} />
          <Button color="warning" onClick={() => deleteCategory(c.id)}>
            Remove
          </Button>
        </Row>
      ))}

      <Row>
        {showForm && (
          <NewCategoryForm
            handleVisibility={setShowForm}
            handleCategories={setCategories}
            currentCategories={categories}
          />
        )}
      </Row>

      <Row>
        <Button color="primary" onClick={() => setShowForm(!showForm)}>
          New
        </Button>
      </Row>
    </Container>
  );
};

export { CategoryPanel };
