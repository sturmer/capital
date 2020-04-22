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

    // const {
    //   date,
    //   amount,
    //   category,
    //   toFrom,
    //   description,
    // } = state.formData;
    // const newLine =
    // console.log("dispatching new line", { newLine });
    props.dispatch({ type: props.actionType, payload: formData });
  };

  return (
    <form onSubmit={handleLineSubmit}>
      <div className="form-group">
        <label htmlFor="expenseLineDate">Date</label>
        <input
          className="form-control"
          type="text"
          name="expenseLineDate"
          value={formData.date}
          onChange={handleInputChange}
        ></input>
      </div>

      <div className="form-group">
        <label htmlFor="expenseLineAmount">Amount</label>
        <input
          className="form-control"
          type="text"
          name="expenseLineAmount"
          value={formData.amount}
          onChange={handleInputChange}
        ></input>
      </div>

      <div className="form-group">
        <label htmlFor="expenseLineCategory">Category</label>
        <input
          className="form-control"
          type="text"
          name="expenseLineCategory"
          value={formData.category}
          onChange={handleInputChange}
        ></input>
      </div>

      <div className="form-group">
        <label htmlFor="expenseLineToFrom">To/From</label>
        <input
          className="form-control"
          type="text"
          name="expenseLineToFrom"
          value={formData.toFrom}
          onChange={handleInputChange}
        ></input>
      </div>

      <div className="form-group">
        <label htmlFor="expenseLineDescription">Description</label>
        <input
          className="form-control"
          type="text"
          name="expenseLineDescription"
          value={formData.description}
          onChange={handleInputChange}
        ></input>
      </div>

      <button className="btn btn-secondary">Add</button>
    </form>
  );
};

export { NewExpenseLineForm };
