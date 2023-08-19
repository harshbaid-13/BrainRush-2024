import Heading from "@components/Heading/Heading";
import React from "react";
// import sponsor1 from "";
import Image from "next/image";
import sponsor1 from "public/assets/images/ardent_logo.png";
import sponsor2 from "public/assets/images/unit.png";
import { Preahvihear } from "next/font/google";

const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: ["400"],
});

const Sponsor = () => {
  return (
    <>
      <Heading title="Our Sponsors" />
      <div className="container mx-auto my-7">
        <div className=" flex flex-wrap md:flex md:flex-row items-center justify-center">
          <div className="w-full sm:px-4 md:px-0 lg:w-6/12">
            <div className=" flex flex-col md:flex gap-8 md:flex-row items-center sm:-mx-4">
              <div className=" md:px-0 sm:px-4 md:py-12 md:w-1/2 xl:w-1/2 ">
                <a href="https://www.ardentcollaborations.com/" target="blank">
                  <div className="sm:px-2 shadow-sm hover:shadow-2xl hover:shadow-gray-300  sm:py-2 px-5 md:py-0 mt-10 ">
                    <Image
                      src={sponsor1}
                      alt=""
                      className="w-full p-5 animate__animated animate__zoomIn animate__faster"
                    />
                    {/* <div className=" text-gray-700 text-center text-bold text-xl py-2 md:py-3 ">
                      {" "}
                      Sponsors since 2019
                    </div> */}
                    <div className="text-center  py-3 md:py-3 ">
                      <button
                        type="submit"
                        className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white  focus:ring-4 focus:outline-none focus:ring-purple-200 "
                      >
                        <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                          <span className={preahvihear.className}>
                            Visit Website
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </a>
              </div>
              <div className=" px-3 sm:px-4 md:w-1/2 xl:w-1/2">
                <a href="https://www.uniterpacademy.com/" target="blank">
                  <div className=" sm:px-2 md:py-4 shadow-sm hover:shadow-2xl hover:shadow-gray-300   sm:py-4 mt-10">
                    <Image
                      src={sponsor2}
                      alt=""
                      className="w-full px-3 mb-16 md:py-1 animate__animated animate__zoomIn animate__slow"
                    />
                    {/* <div className=" text-gray-700 text-center text-bold text-xl py-2 md:py-3 ">
                      {" "}
                      Sponsors since 2023
                    </div> */}
                    <div className="text-center  py-3 md:py-3 ">
                      <button
                        type="submit"
                        className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white  focus:ring-4 focus:outline-none focus:ring-purple-200 "
                      >
                        <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                          <span className={preahvihear.className}>
                            Visit Website
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sponsor;
