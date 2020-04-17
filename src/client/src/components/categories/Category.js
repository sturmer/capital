import React from "react";
import { Col } from "reactstrap";

// TODO Need to show categories with totals by week/month/year/grand total
const Category = (props) => {
  return (
    <>
      <Col>{props.name}</Col>
    </>
  );
};

export { Category };
