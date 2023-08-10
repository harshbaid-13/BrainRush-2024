"use client";
import React from "react";
import Image from "next/image";
import Countdown from "./../Countdown/Countdown";
import logo from "./../../public/assets/images/kodikasLogo.png";
const Hero = () => {
  return (
    <section
      className=" "
      // style={{
      //   background:
      //     " linear-gradient(212deg, rgba(255,248,227,1) 3%, rgba(117,234,231,1) 46%, rgba(159,204,237,1) 95%);",
      // }}
    >
      <div className="grid max-w-screen-xl px-4  mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1
            className="-ml-4 mt-20 px-8 max-w-2xl text-headerText mx-auto flex justify-center items-center text-5xl font-bold sm:text-7xl text-center mb-20"
            // style={{ color: "rgb(9 64 94)" }}
          >
            {/* <Image
              draggable="false"
              src="https://see.fontimg.com/api/renderfont4/MV9ze/eyJyIjoiZnMiLCJoIjo4MSwidyI6MTI1MCwiZnMiOjY1LCJmZ2MiOiIjRkZGRkZGIiwiYmdjIjoiIzAwMDAwMCIsInQiOjF9/QnJhaW5SdXNoMksyMw/sunnyspells-regular.png"
              alt="heading"
              width={"480"}
              height={"72"}
            /> */}
            Kodikas-2K23
          </h1>
          <h1
            className="-ml-4 px-8 max-w-2xl mx-auto -mt-16  flex justify-center items-center text-pink-500 text-3xl font-bold sm:text-3xl text-center mb-20"
            style={{
              fontSize: "2.5rem",
              color: " #c40743",
              fontFamily: " 'Roboto', sans-serif",
            }}
          >
            {/* <Image
              draggable="false"
              src="https://see.fontimg.com/api/renderfont4/9Y5Xy/eyJyIjoiZnMiLCJoIjozNSwidyI6MTI1MCwiZnMiOjI4LCJmZ2MiOiIjRjZBMTNCIiwiYmdjIjoiIzAwMDAwMCIsInQiOjF9/QnJhaW4gb24gRmlyZSwgSW5ub3ZhdGUgYW5kIEluc3BpcmU/loftygoals-regular.png"
              alt="heading"
              width={"480"}
              height={"72"}
            /> */}
            Unlock Your Coding Potential{" "}
            <a id="play-video" class="video-play-button" href="#">
              <span></span>
            </a>
          </h1>
          <Countdown />
        </div>
        <div className="lg:mt-4 lg:col-span-5 lg:flex">
          {/* <VideoPlayer /> */}
          <Image src={logo} alt="logo" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
