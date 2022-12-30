import React from "react";
import "./feature.css";

function Feature({ title, text, alt, label }) {
  return (
    <>
      {alt && (
        <div className="feature row justify-content-around">
          <div className={`feature-img col-md-5 ${label}`}></div>
          <div className="feature-text align-self-center col-md-5">
            <p className="feature-title">{title}</p>
            <p>{text}</p>
          </div>
        </div>
      )}
      {!alt && (
        <div className="feature row justify-content-around">
          <div className="feature-text align-self-center col-md-5">
            <p className="feature-title">{title}</p>
            <p>{text}</p>
          </div>
          <div className={`feature-img col-md-5 ${label}`}></div>
        </div>
      )}
    </>
  );
}

export default Feature;
