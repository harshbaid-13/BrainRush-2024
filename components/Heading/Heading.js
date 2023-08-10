import React from "react";
import "./Heading.css";

function Heading(props) {
  return (
    <>
      <h1
        className="text-headerText  font-bold  text-center mb-4 headingText "
        // style={{ fontFamily: "'Fira Code', monospace !important;" }}
      >
        {props.title}
        {props.subtitle}
      </h1>
    </>
  );
}

export default Heading;
