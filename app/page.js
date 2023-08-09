// import Nav from "@/components/Nav";
import Hero from "@components/HeroSection/Hero";
import About from "@components/About/About";
import Contact from "@/components/Contact/Contact";
import Details from "@/components/Details/Details";
import FAQ from "@/components/F&Q/FAQ";
import Footer from "@/components/Footer/Footer";
// import Hero from "@/components/Hero";
// import Loader from "@/components/Loader";
// import Navbar from "@/components/Navbar";
import Team from "@/components/Team/Team";
import Venue from "@/components/Venue/Venue";
import UserLanding from "@components/UserInterface/UserLanding";
import Marquee from "@components/Marquee/Marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />

      <Team />
      {/* <Contact /> */}
      <FAQ />
      {/* <UserLanding /> */}
      <h1 className="flex justify-center">Kodikas 2K23 - Home Page</h1>
    </>
  );
}
