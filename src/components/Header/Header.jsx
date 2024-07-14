import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import Hamburger from "../Hamburger/Hamburger";
import logo from "../../assets/Images/tasklife__logo.png";
import useAppContext from "../../hooks/useAppContext";
import "./header.css";

function Header() {
  const { auth, handleSidebarToggle } = useAppContext();
  let authStatus = auth;
  let location = useLocation();
  return (
    <>
      <Navbar>
        <Container>
          <Link to="/">
            <img className="logo" src={logo} alt="Logo" />
          </Link>
          <Nav className="mr-auto">
            {authStatus === "true" ? (
              <>{location.pathname !== "/" && <Hamburger handleSidebarToggle={handleSidebarToggle} />}</>
            ) : (
              <Link to="/login" className="btn btn--primary header-cta">
                Login
              </Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
