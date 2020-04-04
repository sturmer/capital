import React, { useState } from "react";
import { Link } from "react-router-dom";

import { NewExpenseLineForm } from "./NewExpenseLineForm";
import { ExpenseDetail } from "./ExpenseDetail";

const currency = "€";

const initialExpenses = [
  {
    id: 1,
    date: "2020-03-02",
    amount: `-${currency} 13.50`,
    category: "Utilities",
    toFrom: "Tele2",
    description: "Phone bill"
  },
  {
    id: 2,
    date: "2020-03-04",
    amount: `-${currency} 21`,
    category: "Food Delivery",
    toFrom: "Wolt",
    description: "Indian dinner"
  },
  {
    id: 3,
    date: "2020-03-04",
    amount: `${currency} 51.30`,
    category: "Charity",
    toFrom: "WWF",
    description: "Monthly donation to WWF"
  }
];

const MonthHistoryPanel = () => {
  // TODO init from DB
  const [expenses, setExpenses] = useState(initialExpenses);
  const [showForm, setShowForm] = useState(false);

  const deleteExpense = id => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  return (
    <>
      <h1>Expenses</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>To/From</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(e => (
            <tr key={e.id}>
              <ExpenseDetail
                date={e.date}
                amount={e.amount}
                category={e.category}
                toFrom={e.toFrom}
                description={e.description}
              />
              <td>
                <button onClick={() => deleteExpense(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <NewExpenseLineForm
          handleVisibility={setShowForm}
          handleExpenses={setExpenses}
          currentExpenses={expenses}
          currency={currency}
        />
      )}

      <button onClick={() => setShowForm(!showForm)}>Add line</button>
      {/* NOTE: `to` is the name of the route */}
      <Link to={"./categories"}>
        <button variant="raised">Go to Categories</button>
      </Link>
    </>
  );
};

export { MonthHistoryPanel };
