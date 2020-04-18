import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";

const gConstants = require("../../constants");

const Navigation = () => {
  return (
    <div>
      <Navbar color="faded" light expand="md">
        <NavbarBrand tag={Link} to="/">
          {gConstants.appname}
        </NavbarBrand>

        <Nav navbar>
          <NavItem>
            <NavLink tag={Link} to="/">
              Expenses
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/categories">
              Categories
            </NavLink>
          </NavItem>
          {/* Add "User: name" if logged in, and a logout button */}
          {/* {props.isAuthenticated ? (
            <div>
              <NavItem>
                <NavLink tag={Link} to="/">
                  Hi, {props.user.firstName}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/">
                  Hi, {props.user.firstName}
                </NavLink>
              </NavItem>
            </div>
          ) : null} */}
        </Nav>
      </Navbar>
    </div>
  );
};

export { Navigation };
