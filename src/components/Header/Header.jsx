import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./header.css";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import Hamburger from "../Hamburger/Hamburger";
import { UserContext } from "../../context";
import logo from "../../assets/Images/tasklife__logo.png";

function Header() {
  let authStatus = localStorage.getItem("isAuth");
  const { handleSidebarToggle, authLoader } = useContext(UserContext);
  let location = useLocation();
  return (
    <>
      <Navbar variant="light">
        <Container>
          <Link to="/">
            <img className="logo" src={logo} width="100" alt="Logo" />
          </Link>
          <Nav className="mr-auto">
            {authStatus === "true" ? (
              <>{location.pathname !== "/" && <Hamburger handleSidebarToggle={handleSidebarToggle} />}</>
            ) : (
              <Link to="/login" className={`btn btn--primary header-cta ${authLoader ? "disabled-link" : ""}`}>
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
