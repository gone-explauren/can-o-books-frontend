import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          Best Books of Every Summer since the 15th Century
        </Navbar.Brand>
        <NavItem>
          <Link to="/" className="nav-link">
            The Library
          </Link>
        </NavItem>
        <NavItem>
          <Link to="./About" className="nav-link">
            About the (site) Author
          </Link>
        </NavItem>
      </Navbar>
    )
  }
}

export default Header;
