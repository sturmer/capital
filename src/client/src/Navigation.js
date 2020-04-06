import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

const gConstants = require("./constants");

const Navigation = () => {
  return (
    <div>
      <Navbar color="faded" light expand="md">
        <NavbarBrand href="/">{gConstants.appname}</NavbarBrand>

        <Nav navbar>
          <NavItem>
            <NavLink href="/">Expenses</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/categories">Categories</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export { Navigation };
