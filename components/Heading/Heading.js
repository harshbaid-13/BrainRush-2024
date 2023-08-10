import React from "react";
import "./Heading.css";

function Heading(props) {
  return (
    <>
      <h1
        className="text-gray-50  font-bold  text-center mb-4 headingText"
        // style={{ fontFamily: "'Fira Code', monospace !important;" }}
      >
        {props.title}
        {props.subtitle}
      </h1>

      <div className="aboutHeader">
        <p>
          {props.subheader}
          <br />
          {props.subheaderspan1}
          <br />
          {props.subheaderspan2}
        </p>
      </div>
    </>
  );
}

export default Heading;
