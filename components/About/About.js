"use client";
import React from "react";
import Heading from "./../Heading/Heading";
import "./About.css";
import { useState } from "react";
import AboutMain from "./AboutMain";
import Venue from "@components/Venue/Venue";
// import Details from "@components/Details/Details";
import Team from "@components/Team/Team";
function About() {
  const [about, setAbout] = useState(true);
  const [venue, setVenue] = useState(false);
  const [schedule, setSchedule] = useState(false);
  // var headTitle = "About Us";
  function aboutRenderComponent() {
    if (about === true) {
      // headTitle = "About Us";
      return <AboutMain />;
    } else if (venue === true) {
      // headTitle = "Our Venue";
      return <Venue />;
    } else if (schedule === true) {
      // headTitle = "Our Schedule";
      return <Team />;
    }
  }
  return (
    <>
      <section
        className="overflow-hidden pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] px-5 sm:px-20  "
        // style={{
        //   // background: rgb(255,248,227);
        //   background:
        //     "linear-gradient(351deg, rgba(255,248,227,1) 3%, rgba(117,234,231,1) 46%, rgba(159,204,237,1) 95%);",
        // }}
      >
        <Heading
          title={about ? "About Us" : venue ? "Our Venue" : "Organising Team"}
          header={"Know more About"}
          hearerspan="Kodikas 2K23"
          subheader="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          subheaderspan1="In convallis tortor eros. Donec vitae tortor lacus."
          subheaderspan2="Phasellus aliquam ante in maximus."
        />

        <div>
          <div className="aboutbuttons">
            <div
              onClick={() => {
                setAbout(true);
                setSchedule(false);
                setVenue(false);
              }}
              className={
                about
                  ? "activeClass text-subHeaderText text-bold  text-2xl "
                  : "notActiveClass text-2xl  "
              }
            >
              About Us
            </div>
            <div
              onClick={() => {
                setAbout(false);
                setSchedule(false);
                setVenue(true);
              }}
              className={
                venue
                  ? "activeClass text-subHeaderText text-bold text-2xl"
                  : "notActiveClass  text-2xl  "
              }
            >
              Our Venue
            </div>
            <div
              onClick={() => {
                setAbout(false);
                setSchedule(true);
                setVenue(false);
              }}
              className={
                schedule
                  ? "activeClass text-subHeaderText text-bold hover:border-b-logoYellow text-xl focus:border-b-logoYellow"
                  : "notActiveClass hover:border-b-logoYellow text-xl  focus:border-b-logoYellow"
              }
            >
              Our Team
            </div>
          </div>
          <hr />
        </div>
        <div>{aboutRenderComponent()}</div>
      </section>
    </>
  );
}

export default About;
