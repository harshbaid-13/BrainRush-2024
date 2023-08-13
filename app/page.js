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
import { useEffect } from "react";
import { setUser } from "@Reducers/features/user";
import { setTeam } from "@Reducers/features/team";
import { setProfile } from "@Reducers/features/profile";

// import UserLanding from "@components/UserInterface/UserLanding";
// import Marquee from "@components/Marquee/Marquee";
// import Proccess from "@components/Details/Proccess";
// import Details from "@/components/Details/Details";

export default function Home() {
  const user = useSelector((state) => state.user.user);
  const team = useSelector((state) => state.team.team);
  const profile = useSelector((state) => state.profile.profile);
  // const isProfileCompleted = useSelector(
  //   (state) => state.profile.isProfileCompleted
  // );
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const setUserdata = () => {
    dispatch(setUser(session?.user));
  };
  const getTeamDetails = async () => {
    const res = await fetch(`/api/team/${user?.id}/displayoneteam`);
    const { data } = await res.json();
    dispatch(setTeam(data));
  };
  const getProfileDetails = async () => {
    const res = await fetch(`/api/user/${user?.id}`);
    const { data } = await res.json();
    dispatch(setProfile(data));
  };
  useEffect(() => {
    setUserdata();
    // getTeamDetails();
    getProfileDetails();
  }, [session]);

  return (
    <>
      {console.log("hello reducer1: " + profile?.id)}
      {/* {console.log("hello reducer2: " + isProfileCompleted)} */}
      {console.log("hello reducer3: " + profile?.year)}
      <Hero />
      <About />
      {/* <Details /> */}
      {/* <Proccess /> */}
      <FAQ />
      {/* <Footer /> */}
    </>
  );
}
