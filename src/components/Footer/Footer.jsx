import React from "react";
import "./footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">&copy; {new Date().getFullYear()} TaskLife. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
