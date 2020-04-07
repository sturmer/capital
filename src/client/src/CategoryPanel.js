import React, { useState, useEffect } from "react";
import { Button, Container, Row } from "reactstrap";

import { NewCategoryForm } from "./NewCategoryForm";
import { Category } from "./Category";

const CategoryPanel = () => {
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getInitialCategories = async () => {
      const response = await fetch("/categories");
      response
        .json()
        .then((res) => setCategories(res.categories))
        .catch((err) => console.log(err));
    };

    if (!categories || categories.length === 0) {
      getInitialCategories();
    }
  }, [categories, setCategories]);

  const deleteCategory = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
    // TODO Write updated list of categories to file
  };

  return (
    <Container fluid="sm">
      <h2>Categories</h2>

      {categories &&
        categories.map((c) => (
          <Row key={c.id}>
            <Category name={c.name} />
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
          New Category
        </Button>
      </Row>
    </Container>
  );
};

export { CategoryPanel };
