import React from "react";
import "./hamburger.css";

function Hamburger({ handleSidebarToggle }) {
  return (
    <svg onClick={handleSidebarToggle} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#3bc9db" className="bi bi-list" viewBox="0 0 16 16">
      <path
        fillRule="evenodd"
        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
      />
    </svg>
  );
}

export default Hamburger;
