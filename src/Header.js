import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";

import './Header.css'

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          Best Books of Every Summer since the 15th Century
        </Navbar.Brand>
        <div className='nav-items'>
        <NavItem>
          <Link to="/" className="nav-link">
            The Library
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/about" className="nav-link">
            About the (site) Author
          </Link>
        </NavItem>
        </div>
      </Navbar>
    )
  }
}

export default Header;
