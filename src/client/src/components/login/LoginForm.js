import React, { useState } from "react";
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

    // console.log("posting...", JSON.stringify(formData))

    // TODO Am I sending the data in clear text? Can a malicious user attack my server?
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
          user: formData.email,
        });
        history.replace("/"); // Redirect to home
      })
      .catch((err) => {
        console.error(err);
        alert("Error logging in please try again");
      });
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
            <button className="btn btn-primary">Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { LoginForm };
