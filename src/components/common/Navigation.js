import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";

const Navigation = (props) => {
  const logout = () => {
    console.log("logging out...");
    props.setAuthState({
      isAuthenticated: false,
      token: null,
      user: null,
    });
  };

  return (
    <div>
      <Navbar color="faded" light expand="md">
        <NavbarBrand tag={Link} to="/">
          Budgeter
        </NavbarBrand>
        {props.state.isAuthenticated && (
          <Nav navbar>
            <NavItem>
              <NavLink tag={Link} to="/">
                Expenses
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/summary">
                Summary
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/categories">
                Categories
              </NavLink>
            </NavItem>

            <NavItem>
              <button className="btn btn-primary" onClick={logout}>
                Logout {props.state.user}
              </button>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    </div>
  );
};

export { Navigation };
