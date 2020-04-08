import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Button, Form, FormGroup, Label, Col, Input } from "reactstrap";

const NewExpenseLineForm = (props) => {
  // TODO input validation!

  // TODO Use reducer to manage state uniformly
  const [date, setDate] = useState(`${new Date().toISOString().split("T")[0]}`);
  const [amount, setAmount] = useState("0");
  const [category, setCategory] = useState(""); // TODO need to check the category belongs to the existing ones
  const [toFrom, setToFrom] = useState("");
  const [description, setDescription] = useState("");

  // TODO refactor and don't repeat handleXXX = event => setXXX(event.target.value)
  // See LoginForm for a smart solution

  const handleDateChange = (event) => {
    // TODO format date
    setDate(event.target.value);
  };

  const handleAmountChange = (event) => {
    // format amount with currency
    setAmount(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleToFromChange = (event) => {
    setToFrom(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleLineSubmit = (event) => {
    // Hide form
    props.handleVisibility(false);

    addExpenseToHistory(date, amount, category, toFrom, description);

    // TODO: Write expenses to file (use timer + save button?)

    event.preventDefault(); // crucial, or the whole page would be reloaded
  };

  const addExpenseToHistory = (_event) => {
    const isExpense = amount[0] === "-";
    props.handleExpenses([
      ...props.currentExpenses,
      {
        id: uuidV4(),
        date,
        amount: `${
          isExpense
            ? "-" + props.currency + amount.slice(1)
            : props.currency + " " + amount
        }`,
        category,
        toFrom,
        description,
      },
    ]);
  };

  return (
    <Form onSubmit={handleLineSubmit}>
      <FormGroup>
        <Col sm={10}>
          <Label for="expenseLineDate">Date</Label>
        </Col>
        <Col sm={10}>
          <Input
            type="text"
            name="expenseLineDate"
            value={date}
            onChange={handleDateChange}
          ></Input>
        </Col>
      </FormGroup>

      <FormGroup>
        <Col sm={10}>
          <Label for="expenseLineAmount">Amount</Label>
        </Col>
        <Col sm={10}>
          <Input
            type="text"
            name="expenseLineAmount"
            value={amount}
            onChange={handleAmountChange}
          ></Input>
        </Col>
      </FormGroup>

      <FormGroup>
        <Col sm={10}>
          <Label for="expenseLineCategory">Category</Label>
        </Col>
        <Col sm={10}>
          <Input
            type="text"
            name="expenseLineCategory"
            value={category}
            onChange={handleCategoryChange}
          ></Input>
        </Col>
      </FormGroup>

      <FormGroup>
        <Col sm={10}>
          <Label for="expenseLineToFrom">To/From</Label>
        </Col>
        <Col sm={10}>
          <Input
            type="text"
            name="expenseLineToFrom"
            value={toFrom}
            onChange={handleToFromChange}
          ></Input>
        </Col>
      </FormGroup>

      <FormGroup>
        <Col sm={10}>
          <Label for="expenseLineDescription">Description</Label>
        </Col>
        <Col sm={10}>
          <Input
            type="text"
            name="expenseLineDescription"
            value={description}
            onChange={handleDescriptionChange}
          ></Input>
        </Col>
      </FormGroup>

      <Button color="secondary">Add</Button>
    </Form>
  );
};

export { NewExpenseLineForm };
