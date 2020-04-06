import React from "react";
import { Col } from "reactstrap";

const ExpenseDetail = (props) => {
  return (
    <>
      <Col>{props.date}</Col>
      <Col>{props.amount}</Col>
      <Col>{props.category}</Col>
      <Col>{props.toFrom}</Col>
      <Col>{props.description}</Col>
    </>
  );
};

export { ExpenseDetail };
