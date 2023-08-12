import Image from "next/image";
import Link from "next/link";
import React from "react";
import data from "team_data.js";
import { Preahvihear } from "next/font/google";

const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: ["400"],
});

const Team = () => {
  return (
    <>
      <section className="">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
          <div className="grid gap-8 lg:gap-16 grid-cols-2  lg:grid-cols-4 md:grid-cols-3 ">
            {data.map((e) => {
              return (
                <div className="text-center text-gray-500 p-3 dark:text-gray-400  relativet">
                  <img
                    className="object-contain mx-auto p-1 ring-4 ring-subHeaderText  rounded-full"
                    src={e.photo}
                    alt=""
                  />

                  <h3 className="mt-4 md:text-2xl font-bold tracking-tight text-headerText hover:underline decoration-logoYellow ">
                    <Link
                      href={e.whatsapp}
                      target="_blank"
                      className={preahvihear.className}
                    >
                      {e.name}
                    </Link>
                  </h3>
                  <p className="md:text-xl text-xs text-subHeaderText">
                    <span className={preahvihear.className}>{e.year}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
