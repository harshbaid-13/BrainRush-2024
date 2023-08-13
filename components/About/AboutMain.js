import React from "react";
import Image from "next/image";
// import 'animate.css';
import About1 from "public/assets/images/About1.JPG";
import About2 from "public/assets/images/About2.JPG";
import About3 from "public/assets/images/About3.JPG";
import { Preahvihear } from "next/font/google";

const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: ["400"],
});
export default function AboutMain() {
  return (
    <>
      <div className="container mx-auto my-7">
        <div className="-mx-4 flex flex-wrap items-center justify-between">
          <div className="w-full px-4 lg:w-6/12">
            <div className="-mx-3 flex items-center sm:-mx-4">
              <div className="w-full px-3 sm:px-4 xl:w-1/2">
                <div className="py-3 sm:py-4">
                  <Image
                    src={About1}
                    alt=""
                    className="w-full rounded-2xl animate__animated animate__zoomIn animate__faster"
                  />
                </div>
                <div className="py-3 sm:py-4">
                  <Image
                    src={About2}
                    alt=""
                    className="w-full rounded-2xl animate__animated animate__zoomIn animate__faster"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:px-4 xl:w-1/2">
                <div className="relative z-10 my-4">
                  <Image
                    src={About3}
                    alt=""
                    className="w-full rounded-2xl animate__animated animate__zoomIn animate__faster"
                  />
                  <span className="absolute -right-7 -bottom-7 z-[-1]">
                    <svg
                      width="134"
                      height="106"
                      viewBox="0 0 134 106"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="1.66667"
                        cy="104"
                        r="1.66667"
                        transform="rotate(-90 1.66667 104)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="16.3333"
                        cy="104"
                        r="1.66667"
                        transform="rotate(-90 16.3333 104)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="31"
                        cy="104"
                        r="1.66667"
                        transform="rotate(-90 31 104)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="45.6667"
                        cy="104"
                        r="1.66667"
                        transform="rotate(-90 45.6667 104)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="60.3334"
                        cy="104"
                        r="1.66667"
                        transform="rotate(-90 60.3334 104)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="88.6667"
                        cy="104"
                        r="1.66667"
                        transform="rotate(-90 88.6667 104)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="117.667"
                        cy="104"
                        r="1.66667"
                        transform="rotate(-90 117.667 104)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="74.6667"
                        cy="104"
                        r="1.66667"
                        transform="rotate(-90 74.6667 104)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="103"
                        cy="104"
                        r="1.66667"
                        transform="rotate(-90 103 104)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="132"
                        cy="104"
                        r="1.66667"
                        transform="rotate(-90 132 104)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="1.66667"
                        cy="89.3333"
                        r="1.66667"
                        transform="rotate(-90 1.66667 89.3333)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="16.3333"
                        cy="89.3333"
                        r="1.66667"
                        transform="rotate(-90 16.3333 89.3333)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="31"
                        cy="89.3333"
                        r="1.66667"
                        transform="rotate(-90 31 89.3333)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="45.6667"
                        cy="89.3333"
                        r="1.66667"
                        transform="rotate(-90 45.6667 89.3333)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="60.3333"
                        cy="89.3338"
                        r="1.66667"
                        transform="rotate(-90 60.3333 89.3338)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="88.6667"
                        cy="89.3338"
                        r="1.66667"
                        transform="rotate(-90 88.6667 89.3338)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="117.667"
                        cy="89.3338"
                        r="1.66667"
                        transform="rotate(-90 117.667 89.3338)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="74.6667"
                        cy="89.3338"
                        r="1.66667"
                        transform="rotate(-90 74.6667 89.3338)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="103"
                        cy="89.3338"
                        r="1.66667"
                        transform="rotate(-90 103 89.3338)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="132"
                        cy="89.3338"
                        r="1.66667"
                        transform="rotate(-90 132 89.3338)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="1.66667"
                        cy="74.6673"
                        r="1.66667"
                        transform="rotate(-90 1.66667 74.6673)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="1.66667"
                        cy="31.0003"
                        r="1.66667"
                        transform="rotate(-90 1.66667 31.0003)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="16.3333"
                        cy="74.6668"
                        r="1.66667"
                        transform="rotate(-90 16.3333 74.6668)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="16.3333"
                        cy="31.0003"
                        r="1.66667"
                        transform="rotate(-90 16.3333 31.0003)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="31"
                        cy="74.6668"
                        r="1.66667"
                        transform="rotate(-90 31 74.6668)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="31"
                        cy="31.0003"
                        r="1.66667"
                        transform="rotate(-90 31 31.0003)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="45.6667"
                        cy="74.6668"
                        r="1.66667"
                        transform="rotate(-90 45.6667 74.6668)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="45.6667"
                        cy="31.0003"
                        r="1.66667"
                        transform="rotate(-90 45.6667 31.0003)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="60.3333"
                        cy="74.6668"
                        r="1.66667"
                        transform="rotate(-90 60.3333 74.6668)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="60.3333"
                        cy="30.9998"
                        r="1.66667"
                        transform="rotate(-90 60.3333 30.9998)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="88.6667"
                        cy="74.6668"
                        r="1.66667"
                        transform="rotate(-90 88.6667 74.6668)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="88.6667"
                        cy="30.9998"
                        r="1.66667"
                        transform="rotate(-90 88.6667 30.9998)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="117.667"
                        cy="74.6668"
                        r="1.66667"
                        transform="rotate(-90 117.667 74.6668)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="117.667"
                        cy="30.9998"
                        r="1.66667"
                        transform="rotate(-90 117.667 30.9998)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="74.6667"
                        cy="74.6668"
                        r="1.66667"
                        transform="rotate(-90 74.6667 74.6668)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="74.6667"
                        cy="30.9998"
                        r="1.66667"
                        transform="rotate(-90 74.6667 30.9998)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="103"
                        cy="74.6668"
                        r="1.66667"
                        transform="rotate(-90 103 74.6668)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="103"
                        cy="30.9998"
                        r="1.66667"
                        transform="rotate(-90 103 30.9998)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="132"
                        cy="74.6668"
                        r="1.66667"
                        transform="rotate(-90 132 74.6668)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="132"
                        cy="30.9998"
                        r="1.66667"
                        transform="rotate(-90 132 30.9998)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="1.66667"
                        cy="60.0003"
                        r="1.66667"
                        transform="rotate(-90 1.66667 60.0003)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="1.66667"
                        cy="16.3333"
                        r="1.66667"
                        transform="rotate(-90 1.66667 16.3333)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="16.3333"
                        cy="60.0003"
                        r="1.66667"
                        transform="rotate(-90 16.3333 60.0003)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="16.3333"
                        cy="16.3333"
                        r="1.66667"
                        transform="rotate(-90 16.3333 16.3333)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="31"
                        cy="60.0003"
                        r="1.66667"
                        transform="rotate(-90 31 60.0003)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="31"
                        cy="16.3333"
                        r="1.66667"
                        transform="rotate(-90 31 16.3333)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="45.6667"
                        cy="60.0003"
                        r="1.66667"
                        transform="rotate(-90 45.6667 60.0003)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="45.6667"
                        cy="16.3333"
                        r="1.66667"
                        transform="rotate(-90 45.6667 16.3333)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="60.3333"
                        cy="60.0003"
                        r="1.66667"
                        transform="rotate(-90 60.3333 60.0003)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="60.3333"
                        cy="16.3333"
                        r="1.66667"
                        transform="rotate(-90 60.3333 16.3333)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="88.6667"
                        cy="60.0003"
                        r="1.66667"
                        transform="rotate(-90 88.6667 60.0003)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="88.6667"
                        cy="16.3333"
                        r="1.66667"
                        transform="rotate(-90 88.6667 16.3333)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="117.667"
                        cy="60.0003"
                        r="1.66667"
                        transform="rotate(-90 117.667 60.0003)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="117.667"
                        cy="16.3333"
                        r="1.66667"
                        transform="rotate(-90 117.667 16.3333)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="74.6667"
                        cy="60.0003"
                        r="1.66667"
                        transform="rotate(-90 74.6667 60.0003)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="74.6667"
                        cy="16.3333"
                        r="1.66667"
                        transform="rotate(-90 74.6667 16.3333)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="103"
                        cy="60.0003"
                        r="1.66667"
                        transform="rotate(-90 103 60.0003)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="103"
                        cy="16.3333"
                        r="1.66667"
                        transform="rotate(-90 103 16.3333)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="132"
                        cy="60.0003"
                        r="1.66667"
                        transform="rotate(-90 132 60.0003)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="132"
                        cy="16.3333"
                        r="1.66667"
                        transform="rotate(-90 132 16.3333)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="1.66667"
                        cy="45.3333"
                        r="1.66667"
                        transform="rotate(-90 1.66667 45.3333)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="1.66667"
                        cy="1.66683"
                        r="1.66667"
                        transform="rotate(-90 1.66667 1.66683)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="16.3333"
                        cy="45.3333"
                        r="1.66667"
                        transform="rotate(-90 16.3333 45.3333)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="16.3333"
                        cy="1.66683"
                        r="1.66667"
                        transform="rotate(-90 16.3333 1.66683)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="31"
                        cy="45.3333"
                        r="1.66667"
                        transform="rotate(-90 31 45.3333)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="31"
                        cy="1.66683"
                        r="1.66667"
                        transform="rotate(-90 31 1.66683)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="45.6667"
                        cy="45.3333"
                        r="1.66667"
                        transform="rotate(-90 45.6667 45.3333)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="45.6667"
                        cy="1.66683"
                        r="1.66667"
                        transform="rotate(-90 45.6667 1.66683)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="60.3333"
                        cy="45.3338"
                        r="1.66667"
                        transform="rotate(-90 60.3333 45.3338)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="60.3333"
                        cy="1.66683"
                        r="1.66667"
                        transform="rotate(-90 60.3333 1.66683)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="88.6667"
                        cy="45.3338"
                        r="1.66667"
                        transform="rotate(-90 88.6667 45.3338)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="88.6667"
                        cy="1.66683"
                        r="1.66667"
                        transform="rotate(-90 88.6667 1.66683)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="117.667"
                        cy="45.3338"
                        r="1.66667"
                        transform="rotate(-90 117.667 45.3338)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="117.667"
                        cy="1.66683"
                        r="1.66667"
                        transform="rotate(-90 117.667 1.66683)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="74.6667"
                        cy="45.3338"
                        r="1.66667"
                        transform="rotate(-90 74.6667 45.3338)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="74.6667"
                        cy="1.66683"
                        r="1.66667"
                        transform="rotate(-90 74.6667 1.66683)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="103"
                        cy="45.3338"
                        r="1.66667"
                        transform="rotate(-90 103 45.3338)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="103"
                        cy="1.66683"
                        r="1.66667"
                        transform="rotate(-90 103 1.66683)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="132"
                        cy="45.3338"
                        r="1.66667"
                        transform="rotate(-90 132 45.3338)"
                        fill="#FFBD59"
                      />
                      <circle
                        cx="132"
                        cy="1.66683"
                        r="1.66667"
                        transform="rotate(-90 132 1.66683)"
                        fill="#FFBD59"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
            <div className="mt-10 lg:mt-0">
              {/* <h1 className="text-gray-50 text-6xl font-bold sm:text-6xl mb-5">
                  About <span className="text-yellow-500">Event</span>
                </h1> */}
              {/* <h2 className="text-logoYellow mb-8 text-4xl  ">
                  About BRAINRUSH
            </h2> */}
              <p className="text-gray-800 mb-8 text-base">
                <span className={preahvihear.className}>
                  Presented by the esteemed Department of Computer Science and
                  Engineering at MCKV Institute of Engineering, in collaboration
                  with IIC, MCKVIE, KODIKAS 🧩 is not just a coding competition;
                  it's an exploration of innovation 🚀 and problem-solving 🧠.
                </span>
              </p>
              <p className="text-gray-800 mb-12 text-base">
                <span className={preahvihear.className}>
                  Get ready to unlock your coding potential 💻🔓 and challenge
                  your intellect 🧐 at KODIKAS-23. This annual coding
                  extravaganza is a melting pot 🍲 of talent 🌟, camaraderie 🤝,
                  and skill enhancement 📈.
                </span>
              </p>
              <p className="text-gray-800 mb-12 text-base">
                <span className={preahvihear.className}>
                  With thrilling rounds ⚡ that push your coding boundaries
                  ⌨️🔍, KODIKAS-23 promises to be an exciting journey 🌄 filled
                  with learning 📚 and triumph 🏆.
                </span>
              </p>
              <h1 className="text-subHeaderText font-bold sm:text-4xl text-2xl date ">
                <span className={preahvihear.className}>
                  Date: 24th August, 2023
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
