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
import { useHistory } from "react-router-dom";

const LoginForm = (props) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const history = useHistory();

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    // console.log({ name, value });
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUserLogin = (event) => {
    event.preventDefault();

    // console.log("posting...", JSON.stringify(formData));

    fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        username: formData.email,
        password: formData.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(res.error);
        }
      })
      .then((resJson) => {
        // console.log("Logged in", { resJson });

        props.setAuthState({
          ...props.authState,
          isAuthenticated: true,
          token: resJson.token,
        });
        history.replace("/"); // Redirect to home
      })
      .catch((err) => {
        console.error(err);
        alert("Error logging in please try again");
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
                value={formData.email}
                onChange={handleInputChange}
                required
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
                value={formData.password}
                onChange={handleInputChange}
                required
              ></Input>
            </Col>
          </FormGroup>

          <Col sm={10}>
            {/* <Button color="primary" disabled={formData?.loading ?? false}> */}
            <Button color="primary">
              {/* TODO change the isAuthenticated state with the result*/}
              Log In
            </Button>
          </Col>
        </Form>
      </Card>
    </Container>
  );
};

export { LoginForm };
