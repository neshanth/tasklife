import React from "react";
import Feature from "../Feature/Feature";
import featuresData from "./featuresData";

function Features() {
  return (
    <>
      {featuresData.map((feature) => (
        <Feature key={feature.id} text={feature.text} title={feature.title} alt={feature.alt} />
      ))}
    </>
  );
}
export default Features;
