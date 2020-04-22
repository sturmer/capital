import React, { useReducer, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { reducer } from "./reducer";
import * as actionTypes from "./actionTypes";

const LoginForm = (props) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [state, dispatch] = useReducer(reducer, {
    isProcessing: false,
    submittedData: {},
    result: null,
    error: null,
  });
  const history = useHistory();

  useEffect(() => {
    if (!state.submittedData || !state.isProcessing) {
      return;
    }

    fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        username: state.submittedData.email,
        password: state.submittedData.password,
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
        console.log("Logged in", { resJson });

        props.setAuthState({
          ...props.authState,
          isAuthenticated: true,
          token: resJson.token,
          user: state.submittedData.email,
        });
        // dispatch({ type: actionTypes.REQUEST_SUCCESSFUL });
        history.replace("/"); // Redirect to home
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: actionTypes.REQUEST_FAILED });
      });
  }, [history, state.isProcessing, state.submittedData, props]);

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUserLogin = (event) => {
    event.preventDefault();

    // console.log("posting...", JSON.stringify(formData))

    // TODO Am I sending the data in clear text? Can a malicious user attack my server?
    dispatch({ type: actionTypes.SEND_LOGIN_REQUEST, payload: formData });
  };

  return (
    <div className="container">
      <div className="card">
        <form onSubmit={handleUserLogin}>
          <div className="form-group">
            <div className="col" sm={10}>
              <label htmlFor="email">E-mail</label>
            </div>
            <div className="col" sm={10}>
              <input
                className="form-control"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              ></input>
            </div>
          </div>

          <div className="form-group">
            <div className="col" sm={10}>
              <label htmlFor="password">Password</label>
            </div>
            <div className="col" sm={10}>
              <input
                className="form-control"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              ></input>
            </div>
          </div>

          <div className="col" sm={10}>
            <button className="btn btn-primary" disabled={state.isProcessing}>
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { LoginForm };
