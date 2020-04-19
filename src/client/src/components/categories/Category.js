import React from "react";
import { Col } from "reactstrap";

const Category = (props) => {
  return (
    <>
      <Col>{props.name}</Col>
    </>
  );
};

export { Category };
