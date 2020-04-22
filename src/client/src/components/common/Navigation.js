import React from "react";
// This seems one of those cases where Bootstrap uses jQuery under the hood,
// and forces us to use a dedicated library in order to co-exist with React.
import { Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";

const gConstants = require("../../constants");

const Navigation = () => {
  return (
    <div>
      <Navbar color="faded" light expand="md">
        <NavbarBrand tag={Link} to="/">
          {gConstants.appname}
        </NavbarBrand>

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
        {/* TODO Add "User: name" if logged in, and a logout button */}
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
      </Navbar>
    </div>
  );
};

export { Navigation };
