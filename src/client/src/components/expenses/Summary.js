import React from "react";
import { Container, Row, Col } from "reactstrap";

const Summary = (props) => {
  return (
    <Container fluid="sm">
      <h2>Summary</h2>
      <Row>
        <Col>Total</Col>
        <Col>{props.total}</Col>
      </Row>
    </Container>
  );
};

export { Summary };
