import React from "react";
import Feature from "../Feature/Feature";
import featuresData from "./featuresData";
import "./features.scss";

function Features() {
  return (
    <div className="tl-wrapper tl-features__wrapper">
      {featuresData.map((feature) => (
        <Feature key={feature.id} {...feature} />
      ))}
    </div>
  );
}
export default Features;
