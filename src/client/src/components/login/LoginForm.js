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

const LoginForm = (props) => {
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  };
  const [formData, setFormData] = useState(initialState);

  const handleUserLogin = (event) => {
    event.preventDefault();

    setFormData({
      ...formData,
      isSubmitting: true,
      errorMessage: null,
    });

    // Call server API
    fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.email,
        password: formData.password,
      }),
    })
      .then((res) => {
        console.log({ res });
        if (res.ok) {
          return res.json();
        }
        console.log("Error when calling /login API, throwing...");
        throw res;
      })
      .then((resJson) => {
        console.log({ resJson });

        // Update authentication data
        props.setAuthState({
          isAuthenticated: true,
          user: resJson.user,
          token: resJson.token,
        });

        // Update login form
        setFormData({
          ...formData,
          isSubmitting: false,
          errorMessage: null,
        });
      })
      .catch((error) => {
        setFormData({
          ...formData,
          isSubmitting: false,
          errorMessage: error.message || error.statusText,
        });
      });
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // NOTE: The expenses and the categories are PER-USER.
  // TODO Introduce multi-user

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
              ></Input>
            </Col>
          </FormGroup>

          {formData.errorMessage && (
            <span className="form-error">{formData.errorMessage}</span>
          )}

          <Col sm={10}>
            <Button color="primary" disabled={formData.isSubmitting}>
              {formData.isSubmitting ? "Loading..." : "Login"}
            </Button>
          </Col>
        </Form>
      </Card>
    </Container>
  );
};

export { LoginForm };
