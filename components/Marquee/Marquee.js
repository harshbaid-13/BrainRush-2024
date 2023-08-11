import React from "react";
import "./Marquee.css";

const Marquee = () => {
  return (
    <>
      <div className="marquee">
        <div className="track">
          <div className="content" style={{ color: "white" }}>
            &nbsp; Create Your Team &nbsp; Create Your Team &nbsp; Create Your
            Team &nbsp; Create Your Team &nbsp; Create Your Team &nbsp; Create
            Your Team &nbsp; Create Your Team &nbsp; Create Your Team &nbsp;
            Create Your Team &nbsp; Create Your Team &nbsp; Create Your Team
            &nbsp; Create Your Team &nbsp; Create Your Team &nbsp; Create Your
            Team &nbsp; Create Your Team{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default Marquee;
