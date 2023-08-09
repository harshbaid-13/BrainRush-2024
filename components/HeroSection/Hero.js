"use client";
import React from "react";
import Image from "next/image";
import Countdown from "./../Countdown/Countdown";
import VideoPlayer from "./../VideoPlayer";
import logo from "./../../public/assets/images/kodikasLogo.png";
const Hero = () => {
  return (
    <section
      className=" ml-3 "
      // style={{
      //   backgroundImage:
      //     "linear-gradient(135deg,hsl(27deg 97% 44%) 0%,hsl(344deg 60% 46%) 0%,hsl(304deg 38% 30%) 0%,hsl(224deg 42% 19%) 0%,hsl(203deg 50% 3%) 0%,hsl(199deg 67% 4%) 1%,hsl(198deg 76% 5%) 2%,hsl(197deg 83% 6%) 3%,hsl(197deg 94% 7%) 5%,hsl(214deg 63% 10%) 8%,hsl(266deg 38% 12%) 12%,hsl(322deg 60% 12%) 19%,hsl(348deg 78% 13%) 32%,hsl(328deg 61% 12%) 58%,hsl(289deg 35% 11%) 79%,hsl(240deg 26% 11%) 91%,hsl(212deg 32% 8%) 100%)",
      // }}
    >
      <div className="grid max-w-screen-xl px-4 py-6 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="-ml-4 mt-20 px-8 max-w-2xl mx-auto flex justify-center items-center  text-gray-50 text-5xl font-bold sm:text-7xl text-center mb-20">
            <Image
              draggable="false"
              src="https://see.fontimg.com/api/renderfont4/MV9ze/eyJyIjoiZnMiLCJoIjo4MSwidyI6MTI1MCwiZnMiOjY1LCJmZ2MiOiIjRkZGRkZGIiwiYmdjIjoiIzAwMDAwMCIsInQiOjF9/QnJhaW5SdXNoMksyMw/sunnyspells-regular.png"
              alt="heading"
              width={"480"}
              height={"72"}
            />
          </h1>
          <h1 className="-ml-4 px-8 max-w-2xl mx-auto -mt-16  flex justify-center items-center text-logoYellow text-4xl font-bold sm:text-6xl text-center mb-20">
            <Image
              draggable="false"
              src="https://see.fontimg.com/api/renderfont4/9Y5Xy/eyJyIjoiZnMiLCJoIjozNSwidyI6MTI1MCwiZnMiOjI4LCJmZ2MiOiIjRjZBMTNCIiwiYmdjIjoiIzAwMDAwMCIsInQiOjF9/QnJhaW4gb24gRmlyZSwgSW5ub3ZhdGUgYW5kIEluc3BpcmU/loftygoals-regular.png"
              alt="heading"
              width={"480"}
              height={"72"}
            />
          </h1>
          <Countdown />
        </div>
        <div className="lg:mt-4 lg:col-span-5 lg:flex">
          {/* <VideoPlayer /> */}
          <Image src={logo} alt="logo" height={700} width={700} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
