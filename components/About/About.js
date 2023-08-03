"use client"
import React from "react";
import Heading from "./../Heading/Heading";
import "./About.css"
import { useState } from "react";
import AboutMain from "./AboutMain";
import Venue from "@components/Venue/Venue";
import Details from "@components/Details/Details";

function About() {
  const[about, setAbout] = useState(true);
  const[venue, setVenue] = useState(false);
  const[schedule, setSchedule] = useState(false);
  // var headTitle = "About Us";
  function aboutRenderComponent(){
    if(about === true){
      // headTitle = "About Us";
      return <AboutMain/>
    }
    else if(venue === true) {
      // headTitle = "Our Venue";
      return <Venue/>
    }
    else if(schedule === true){
      // headTitle = "Our Schedule";
      return <Details/>
    }
  }
  return (
    <>
      <section className="overflow-hidden pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] px-5 sm:px-20">
        <Heading title = {about?"About Us":venue?"Our Venue":"Our Schedule"} header ={"Know Details About"} hearerspan="Kodikas-2K23" subheader="Lorem ipsum dolor sit amet, consectetur adipiscing elit."subheaderspan1="In convallis tortor eros. Donec vitae tortor lacus." subheaderspan2="Phasellus aliquam ante in maximus." />
        

        <div>
          <div className="aboutbuttons">
            <div onClick={()=>{
              setAbout(true);
              setSchedule(false);
              setVenue(false);
            }} className={about?"activeClass":"notActiveClass"}>About Us</div>
            <div onClick={()=>{
              setAbout(false);
              setSchedule(false);
              setVenue(true);}}className={venue?"activeClass":"notActiveClass"}>Our Venue</div>
            <div onClick={()=>{
              setAbout(false);
              setSchedule(true);
              setVenue(false);
            }} className={schedule?"activeClass":"notActiveClass"}>Our Schedule</div>
          </div>
          <hr/>
        </div>
        <div>
          {aboutRenderComponent()}
        </div>
      </section>
    </>
  );
}

export default About;
