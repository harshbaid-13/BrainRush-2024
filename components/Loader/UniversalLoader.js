import React from "react";
import Image from "next/image";
import logo_loader from "public/assets/images/Loader_Website2.gif";
import "./Loader.css";

const UniversalLoader = () => {
  return (
    <>
      <div>
        <div className="" style={{ backgroundColor: "#FCFCFC !important" }}>
          <div className="bg-white w-screen h-screen flex items-center justify-center sm:h-2/3">
            <Image src={logo_loader} alt="logo" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UniversalLoader;
