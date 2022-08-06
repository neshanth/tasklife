import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../Images/Logo.svg";
import "./header.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/">
            <img className="logo" src={Logo} alt="Logo" />
          </Link>
          <Nav className="mr-auto">
            <Link to="/login">
              <Button className="btn--primary">Login</Button>
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
