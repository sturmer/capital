import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { NewExpenseLineForm } from "./NewExpenseLineForm";
import { ExpenseDetail } from "./ExpenseDetail";
import { Button, ListGroup, ListGroupItem } from "reactstrap";

const currency = "€";

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
    <>
      <h1>Expenses</h1>
      <ListGroup>
        {expenses.map((e) => (
          <ListGroupItem>
            <ExpenseDetail
              date={e.date}
              amount={e.amount}
              category={e.category}
              toFrom={e.toFrom}
              description={e.description}
            />
          </ListGroupItem>
        ))}
      </ListGroup>

      {showForm && (
        <NewExpenseLineForm
          handleVisibility={setShowForm}
          handleExpenses={setExpenses}
          currentExpenses={expenses}
          currency={currency}
        />
      )}

      <Button color="primary" onClick={() => setShowForm(!showForm)}>
        Add line
      </Button>
      {/* TODO Add cancel button (and/or use Esc to cancel) */}

      {/* NOTE: `to`'s value is the name of the route */}
      <Link to={"./categories"}>
        <Button color="info">Go to Categories</Button>
      </Link>
    </>
  );
};

export { MonthHistoryPanel };
