import React, { useState } from "react";

const NewExpenseLineForm = (props) => {
  const [formData, setFormData] = useState({
    date: `${new Date().toISOString().split("T")[0]}`,
    amount: "0",
    category: "",
    toFrom: "",
    description: "",
  });

  const handleInputChange = (event) => {
    // TODO input validation!
    const { value, name } = event.target;
    // console.log({ name, value });
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLineSubmit = (event) => {
    event.preventDefault();

    // Hide form
    props.handleVisibility(false);

    // console.log("dispatching new line", { formData });
    props.dispatch({ type: props.actionType, payload: formData });
  };

  return (
    <form onSubmit={handleLineSubmit}>
      <div className="form-group">
        <label htmlFor="expenseLineDate">Date</label>
        <input
          className="form-control"
          type="text"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        ></input>
      </div>

      <div className="form-group">
        <label htmlFor="expenseLineAmount">Amount</label>
        <input
          className="form-control"
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
        ></input>
      </div>

      <div className="form-group">
        <label htmlFor="expenseLineCategory">Category</label>
        <input
          className="form-control"
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        ></input>
      </div>

      <div className="form-group">
        <label htmlFor="expenseLineToFrom">To/From</label>
        <input
          className="form-control"
          type="text"
          name="toFrom"
          value={formData.toFrom}
          onChange={handleInputChange}
        ></input>
      </div>

      <div className="form-group">
        <label htmlFor="expenseLineDescription">Description</label>
        <input
          className="form-control"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        ></input>
      </div>

      <button className="btn btn-secondary">Add</button>
    </form>
  );
};

export { NewExpenseLineForm };
