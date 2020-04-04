import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";

const NewExpenseLineForm = props => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("0");
  const [category, setCategory] = useState(""); // TODO need to check the category belongs to the existing ones
  const [toFrom, setToFrom] = useState("");
  const [description, setDescription] = useState("");

  // TODO refactor and don't repeat handleXXX = event => setXXX(event.target.value)
  //   const handlers = {
  //     date: setDate,
  //     amount: setAmount
  //   };

  //   const handle = (propName, event) => {
  //     handlers[propName](event.target.value);
  //   };

  const handleDateChange = event => {
    // TODO format date
    setDate(event.target.value);
  };

  const handleAmountChange = event => {
    // format amount with currency
    setAmount(event.target.value);
  };

  const handleCategoryChange = event => {
    setCategory(event.target.value);
  };

  const handleToFromChange = event => {
    setToFrom(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handleLineSubmit = event => {
    // Hide form
    props.handleVisibility(false);

    // add row with category
    addExpenseToHistory(date, amount, category, toFrom, description);

    event.preventDefault(); // crucial, or the whole page would be reloaded
  };

  const addExpenseToHistory = _event => {
    props.handleExpenses([
      ...props.currentExpenses,
      { id: uuidV4(), date, amount, category, toFrom, description }
    ]);
  };

  return (
    <form onSubmit={handleLineSubmit}>
      <label htmlFor="expenseLineDate">Date</label>
      <input
        type="text"
        name="expenseLineDate"
        value={date}
        onChange={handleDateChange}
      ></input>

      <label htmlFor="expenseLineAmount">Amount</label>
      <input
        type="text"
        name="expenseLineAmount"
        value={amount}
        onChange={handleAmountChange}
      ></input>

      <label htmlFor="expenseLineCategory">Category</label>
      <input
        type="text"
        name="expenseLineCategory"
        value={category}
        onChange={handleCategoryChange}
      ></input>

      <label htmlFor="expenseLineToFrom">To/From</label>
      <input
        type="text"
        name="expenseLineToFrom"
        value={toFrom}
        onChange={handleToFromChange}
      ></input>

      <label htmlFor="expenseLineDescription">Description</label>
      <input
        type="text"
        name="expenseLineDescription"
        value={description}
        onChange={handleDescriptionChange}
      ></input>

      <button>Add</button>
    </form>
  );
};

export { NewExpenseLineForm };
