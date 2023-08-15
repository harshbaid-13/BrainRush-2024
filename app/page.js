"use client";
// import Nav from "@/components/Nav";
import Hero from "@components/HeroSection/Hero";
import About from "@components/About/About";
// import Contact from "@/components/Contact/Contact";
// import Details from "@/components/Details/Details";
import FAQ from "@/components/F&Q/FAQ";
import Footer from "@/components/Footer/Footer";
// import Hero from "@/components/Hero";
// import Loader from "@/components/Loader";
// import Navbar from "@/components/Navbar";
import Team from "@/components/Team/Team";
import Venue from "@/components/Venue/Venue";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { setUser } from "@Reducers/features/user";
import { setTeam } from "@Reducers/features/team";
import { setProfile } from "@Reducers/features/profile";
import Schedule from "@components/Schedule/Schedule";
import Loader from "@components/Loader/Loader";
// import { logo_loader } from "@/assets/images/logo_loader.mp4";
// import { useEffect, useState } from "react";

// import UserLanding from "@components/UserInterface/UserLanding";
// import Marquee from "@components/Marquee/Marquee";
// import Proccess from "@components/Details/Proccess";
// import Details from "@/components/Details/Details";

export default function Home() {
  return (
    <>
      {/* <Loader />
      {loading ? (
        <Loader />
      ) : ( */}
      {/* <> */}
      <Hero />
      <About />
      <Schedule />
      {/* <Details /> */}
      {/* <Proccess /> */}
      <FAQ />
      {/* </> */}
      {/* )} */}
    </>
  );
}
