import React, { useState } from "react";
import {
  Card,
  Container,
  Button,
  Form,
  FormGroup,
  Col,
  Input,
  Label,
} from "reactstrap";

import { AuthContext } from "./App";

const LoginForm = () => {
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  };
  const [data, setData] = useState(initialState);

  const { dispatch } = React.useContext(AuthContext);

  const handleUserLogin = (event) => {
    event.preventDefault();

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.email,
        password: data.password,
      }),
    })
      .then((res) => {
        console.log({ res });
        if (res.ok) {
          console.log("Result OK");
          return res.json();
        }
        console.log("Uh-oh");
        throw res;
      })
      .then((resJson) => {
        console.log({ resJson });
        dispatch({
          type: "LOGIN",
          payload: resJson,
        });
      })
      .catch((error) => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText,
        });
      });
  };

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container>
      <Card>
        <Form onSubmit={handleUserLogin}>
          <FormGroup>
            <Col sm={10}>
              <Label for="email">E-mail</Label>
            </Col>
            <Col sm={10}>
              <Input
                type="text"
                name="email"
                value={data.email}
                onChange={handleInputChange}
              ></Input>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={10}>
              <Label for="password">Password</Label>
            </Col>
            <Col sm={10}>
              <Input
                type="password"
                name="password"
                value={data.password}
                onChange={handleInputChange}
              ></Input>
            </Col>
          </FormGroup>

          {data.errorMessage && (
            <span className="form-error">{data.errorMessage}</span>
          )}

          <Col sm={10}>
            <Button color="primary" disabled={data.isSubmitting}>
              {data.isSubmitting ? "Loading..." : "Login"}
            </Button>
          </Col>
        </Form>
      </Card>
    </Container>
  );
};

export { LoginForm };
