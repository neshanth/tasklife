import React from "react";
import Feature from "../Feature/Feature";
import features from "./features";

function Features() {
  return (
    <>
      {features.map((feature) => (
        <Feature key={feature.id} text={feature.text} title={feature.title} alt={feature.alt} />
      ))}
    </>
  );
}
export default Features;
