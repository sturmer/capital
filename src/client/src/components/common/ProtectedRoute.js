import React from "react";
import { Route, Redirect } from "react-router-dom";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const ProtectedRoute = ({ children, authState, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authState.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export { ProtectedRoute };
