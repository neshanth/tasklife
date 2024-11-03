import React from "react";
import Feature from "../Feature/Feature";
import featuresData from "./featuresData";

function Features() {
  return (
    <>
      {featuresData.map((feature) => (
        <Feature {...feature} />
      ))}
    </>
  );
}
export default Features;
