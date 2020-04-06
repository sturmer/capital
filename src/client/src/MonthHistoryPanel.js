import React, { useState, useEffect } from "react";
import { Container, Button, Row } from "reactstrap";

import { NewExpenseLineForm } from "./NewExpenseLineForm";
import { ExpenseDetail } from "./ExpenseDetail";

const gConstants = require("./constants");

const MonthHistoryPanel = () => {
  const [showForm, setShowForm] = useState(false);
  const [expenses, setExpenses] = useState([]);

  // Use a side-effect to load from file using fetch (the load happens on the server's side).
  // See "Using Side Effect Hooks" in "React.js: Getting Started" on Pluralsight.
  useEffect(() => {
    const getInitialExpenses = async () => {
      const response = await fetch("/expenses");
      response
        .json()
        .then((res) => setExpenses(res.initialExpenses))
        .catch((err) => console.log(err));
    };

    if (!expenses || expenses.length === 0) {
      getInitialExpenses();
    }
  }, [expenses, setExpenses]);

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
    // TODO Write the changed expenses to file
  };

  return (
    <Container fluid="sm">
      <h2>Expenses</h2>
      {expenses.map((e) => (
        <Row>
          <ExpenseDetail
            date={e.date}
            amount={e.amount}
            category={e.category}
            toFrom={e.toFrom}
            description={e.description}
          />
          <Button color="warning" onClick={() => deleteExpense(e.id)}>
            Delete
          </Button>
        </Row>
      ))}
      <Row>
        {showForm && (
          <NewExpenseLineForm
            handleVisibility={setShowForm}
            handleExpenses={setExpenses}
            currentExpenses={expenses}
            currency={gConstants.currency}
          />
        )}
      </Row>
      <Row>
        <Button color="primary" onClick={() => setShowForm(!showForm)}>
          Add line
        </Button>
        {/* TODO Add cancel button (and/or use Esc to cancel) */}
      </Row>
    </Container>
  );
};

export { MonthHistoryPanel };
