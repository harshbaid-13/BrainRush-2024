import React from "react";

function Heading(props) {
  return (
    <>
    
    <h1
      className="text-gray-50 text-8xl font-bold sm:text-9xl text-center mb-20"
      // style={{ fontFamily: "'Fira Code', monospace !important;" }}
      style={{
        fontFamily: " 'Source Code Pro', monospace !important;",
        color: "#131B2C",
        textTransform: "uppercase",
        // textShadow:" -1px 3px 6px rgba(227,112,41,0.79); !important"
      }}
    >
      {props.title}
      {props.subtitle}
    </h1>

    <div className="aboutHeader">
          <h2>{props.header}<br/>{props.hearerspan}</h2>
          <p>{props.subheader}<br/>{props.subheaderspan1}<br/>{props.subheaderspan2}
          </p>
        </div>
    </>
  );
}

export default Heading;
