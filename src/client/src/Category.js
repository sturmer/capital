import React from "react";

const Category = props => {
  return (
    <>
      <td>{props.name}</td>
      <td>{props.totalCost}</td>
    </>
  );
};

export { Category };
