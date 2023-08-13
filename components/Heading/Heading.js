import React from "react";
import "./Heading.css";
import { Preahvihear } from "next/font/google";

const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: ["400"],
});

function Heading(props) {
  return (
    <>
      <h1
        className="text-headerText  font-bold  text-center mb-4 headingText "
        // style={{ fontFamily: "'Fira Code', monospace !important;" }}
      >
        <p className={preahvihear.className}>
          {props.title}
          {props.subtitle}
        </p>
      </h1>
    </>
  );
}

export default Heading;
