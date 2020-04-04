import React from "react";

const ExpenseDetail = props => {
  return (
    <>
      <td>{props.date}</td>
      <td>{props.amount}</td>
      <td>{props.category}</td>
      <td>{props.toFrom}</td>
      <td>{props.description}</td>
    </>
  );
};

export { ExpenseDetail };
