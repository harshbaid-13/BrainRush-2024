"use client";
import React from "react";
import "./UserLanding.css";
import Buttons from "@components/Buttons/Buttons";
import { useState } from "react";
import Team from "@models/team";
import Home from "@app/page";

export default function UserLanding() {
  const [isReject, setIsReject] = useState(false);
  const [isconfirm, setIsConfirm] = useState(false);
  function render() {
    if (isReject === true) {
      return <Home />;
    } else if (isconfirm == true) {
      return <Team />;
    }
  }
  return (
    <>
      <section
        class="text-gray-400 body-font teamRequestcontainer"
        style={{ height: "20vh !important", backgroundColor: "#111722" }}
      >
        <div className="teamRequest">
          <h1 className="text-3xl text-white my-5 px-5">
            Team:<span> Poogle</span>
          </h1>
          <h3 className="text-xl text-white  px-5">
            Other member:<span> Pratik Kumar Agarwal</span>
          </h3>
        </div>
        <div className="requestButton">
          <a
            onClick={() => {
              setIsReject(true);
            }}
          >
            <Buttons title="Reject" />
          </a>
          <a
            onClick={() => {
              setIsConfirm(true);
            }}
          >
            <Buttons title="Confirm" />
          </a>
        </div>
      </section>
      {render()}
    </>
  );
}
