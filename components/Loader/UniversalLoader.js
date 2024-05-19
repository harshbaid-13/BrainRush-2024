import React from "react";
import Image from "next/image";
import logo_loader from "public/assets/images/LoaderDS.gif";
import "./Loader.css";

const UniversalLoader = () => {
  return (
    <div className="h-screen fixed top-0 left-0 w-full flex justify-center items-center bg-black">
      <Image className="" src={logo_loader} alt="logo" />
    </div>
  );
};

export default UniversalLoader;
