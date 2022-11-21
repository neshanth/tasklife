import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../Images/Logo.svg";
import "./header.css";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import Hamburger from "../Hamburger/Hamburger";
import { UserContext } from "../../context";

function Header() {
  let authStatus = localStorage.getItem("isAuth");
  const { handleSidebarToggle, loading } = useContext(UserContext);
  let location = useLocation();
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/">
            <img className="logo" src={Logo} alt="Logo" />
          </Link>
          <Nav className="mr-auto">
            {authStatus === "true" ? (
              <>{location.pathname !== "/" && <Hamburger handleSidebarToggle={handleSidebarToggle} />}</>
            ) : (
              <Link to="/login">{!loading && <Button className="btn--primary">Login</Button>}</Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
