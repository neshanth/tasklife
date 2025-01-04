import React from "react";
import "./spinner.css";

function Spinner() {
  return (
    // <div className="d-flex justify-content-center spinner align-items-center">
    //   <div className="spinner-border" role="status"></div>
    // </div>
    <div className="spinner__container">
      <div className="spinner"></div>
    </div>
  );
}

export default Spinner;
