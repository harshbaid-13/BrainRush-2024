import React from "react";
import "./Marquee.css";

const Marquee = () => {
  return (
    <>
      <div class="marquee">
        <div class="track">
          <div class="content" style={{ color: "white" }}>
            &nbsp;<span></span>Create Your Team{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default Marquee;
