import React from "react";
import "./feature.scss";
import { Link } from "react-router-dom";

function Feature({ title, text, alt, label, id, img }) {
  return (
    <>
      <div className="tl-feature" key={id}>
        <img className={label} src={img} alt={alt} />
        <div className="tl-feature__feature-text">
          <p className="tl-feature__feature-title">{title}</p>
          <p>{text}</p>
          <Link to="/login" className="tl-btn tl-btn--primary">
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}

export default Feature;
