import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Images/v2/logo.png";
import "./header.scss";

function Header() {
  return (
    <header className="tl-header">
      <div className="tl-header__container">
        <Link to="/">
          <img className="logo" src={logo} alt="Logo" />
        </Link>
        <div className="tl-header__cta">
          <Link to="/login" className="tl-btn tl-btn--primary tl-btn--login-cta">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
export default Header;
