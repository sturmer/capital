import React from "react";
import { Col } from "reactstrap";

const CategoryDetail = (props) => {
  return (
    <>
      <Col>{props.name}</Col>
    </>
  );
};

export { CategoryDetail as Category };
