import React, { useState } from "react";

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

const MonthHistory = () => {
  // TODO init from DB
  const [expenses, setExpenses] = useState(initialExpenses);

  return (
    <>
      <div>Month</div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(e => (
            <ExpenseDetail
              key={e.id}
              date={e.date}
              amount={e.amount}
              category={e.category}
              toFrom={e.toFrom}
              description={e.description}
            />
          ))}
        </tbody>
      </table>
      <button>Add line</button>
    </>
  );
};

const ExpenseDetail = props => {
  return (
    <tr>
      <td>{props.date}</td>
      <td>{props.amount}</td>
      <td>{props.category}</td>
      <td>{props.toFrom}</td>
      <td>{props.description}</td>
    </tr>
  );
};

export { MonthHistory };
