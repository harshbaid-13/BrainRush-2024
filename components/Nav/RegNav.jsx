"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { setUser } from "@Reducers/features/user";
import { useDispatch, useSelector } from "react-redux";
import { setTeam, setTeamRequest } from "@Reducers/features/team";
import { setProfile } from "@Reducers/features/profile";
import { setRequest } from "@Reducers/features/requests";
import "./Nav.css";

import { Preahvihear } from "next/font/google";
import { useRouter } from "next/navigation";
import axios from "axios";
import Button from "@components/Button";
// import { logo } from ".@/public";

const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: ["400"],
});

function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const profileCompleted = useSelector(
    (state) => state.profile.isProfileCompleted
  );
  const user = useSelector((state) => state.user.user);

  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    const setProvidersFunc = async () => {
      const response = await getProviders();
      // console.log(response);
      setProviders(response);
    };
    setProvidersFunc();
  }, []);

  const getRequests = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/confirm`
      );
      dispatch(setRequest(data.data));
    } catch (err) {
      console.log(err);
    }
  };
  const setUserdata = () => {
    dispatch(setUser(session?.user));
  };
  const getTeamDetails = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team`
      );
      dispatch(setTeam(data.data === undefined ? null : data.data));
      dispatch(setTeamRequest(data.request === undefined ? [] : data.request));
    } catch (err) {
      console.log(err);
    }
  };
  const getProfileDetails = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`
      );
      // const { data } = await res.json();
      dispatch(setProfile(data.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (session) {
      setUserdata();
      getTeamDetails();
      getProfileDetails();
      getRequests();
    } else {
      dispatch(setUser(null));
    }
  }, [session]);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    if (isMainMenuOpen) {
      setIsMainMenuOpen(false);
    }
  };

  const toggleMainMenu = () => {
    setIsMainMenuOpen(!isMainMenuOpen);
    if (isUserDropdownOpen) {
      setIsUserDropdownOpen(false);
    }
  };

  const navbarRef = useRef(null);

  const handleDocumentClick = (event) => {
    // console.log("clicked");
    if (
      !navbarRef.current?.contains(event.target) &&
      (isUserDropdownOpen || isMainMenuOpen)
    ) {
      setIsUserDropdownOpen(false);
      setIsMainMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [navbarRef, isUserDropdownOpen, isMainMenuOpen]);

  // useEffect(() => {
  //   getRequests();
  // }, [userId]);

  return (
    <nav className="z-20 text-white body-font">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/images/logo.png"
            alt="BrainRush Logo"
            height={58}
            width={200}
          />
        </Link>
        <div className="flex items-center gap-3 sm:gap-8 md:order-2">
          <div className="relative">
            {session && (
              <Link href="/profile" className="flex items-center">
                <Image
                  className="rounded-full cursor-pointer border-2 border-background"
                  src={user?.image}
                  alt="user photo"
                  height={55}
                  width={55}
                />
              </Link>
            )}
          </div>
          {session && (
            <Button
              text={"Exit"}
              small={true}
              onClick={() => {
                signOut("/login");
              }}
            />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
