import React from 'react'
import { Nav, Navbar } from "react-bootstrap";
import logo from "../assets/images/logo.png";
import {Link} from 'react-router-dom'
import {
   AddToCart,
   Profile
} from "../assets/SVGs/headerSvg";
const Header = () => {
  return (
      <header>
        <div className="bg-dark  text-center py-2">
          <span className="text-white">You are in Home component</span>
        </div>
        <div className="container ">
          <Navbar expand="lg" className='nav'>
            <Navbar.Brand href="#" as={Link} to="/">
              <img src={logo} alt="Logo" style={{ height: "40px" }} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="ms-auto my-2 my-lg-0 " navbarScroll>
                <Nav.Link className="nav-link font-17 fw-6"  as={Link} to="/shop">
                  Mens
                </Nav.Link>
                <Nav.Link className="nav-link font-17 fw-6"  as={Link} to="/shop">
                  women's
                </Nav.Link>
                <Nav.Link className="nav-link font-17 fw-6"  as={Link} to="/shop">
                  kid's
                </Nav.Link>
                <div className="nav-right d-flex pd-b-px-3">
                  <Link
                    to="/cart"
                    className="text-black ms-3  d-flex align-items-center"
                  >
                  <AddToCart/>
                  </Link>
                  <Link
                    to="/"
                    className="text-black ms-3 d-flex align-items-center"
                  >
                  <Profile/>
                 
                  </Link>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </header>
  )
}

export default Header