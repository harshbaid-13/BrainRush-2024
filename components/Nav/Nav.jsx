"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import "./Nav.css";

const Nav = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [requests, setRequests] = useState([]);
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    const setProvidersFunc = async () => {
      const response = await getProviders();
      console.log(response);
      setProviders(response);
    };
    console.log(session);
    setProvidersFunc();
  }, []);

  const getRequests = async () => {
    const response = await fetch(`/api/team/confirm/${userId}`);
    const data = await response.json();
    setRequests(data.data);
  };
  useEffect(() => {
    getRequests();
  }, [userId]);
  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-20 bg-white text-white body-font"
        id="navHeader"
      >
        <div className="container mx-auto flex  p-5  md:flex-row items-center">
          <a
            href="/"
            className="flex title-font  font-medium items-center text-gray-900 mb-1 md:mb-0"
          >
            <Image
              src={"/assets/images/logo.png"}
              width={50}
              height={40}
              alt="Logo"
              className="object-contain"
            />
            <span
              className="ml-3 text-2xl text-headerText font-bold "
              id="logoTag"
            >
              Kodikas-2K23
            </span>
          </a>
          <nav
            className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center "
            id="navMenu"
          >
            <Link
              href={"/profile"}
              className="mx-2 font-bold text-2xl text-headerText hover:underline decoration-subHeaderText hover:text-subHeaderText "
            >
              Profile
            </Link>
            <Link
              href={"/teams"}
              className="mx-2 font-bold text-2xl text-headerText hover:text-subHeaderText hover:underline decoration-subHeaderText"
            >
              Teams
            </Link>
            {/* <Link href={"#venue"} className="mr-5 hover:text-logoYellow">Venue</Link> */}
          </nav>
          {session?.user ? (
            // <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            //   <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
            //     <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
            //     <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
            //   </svg>
            //   <span className="sr-only">Notifications</span>
            //   <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">20</div>
            // </button>

            <div className="flex gap-3 md:gap-5">
              <Link href="/teams/join-team">
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  alt="Profile"
                  className="rounded-full relative"
                />
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-pink-500 top-2 right-29 ">
                  {requests?.length === 0 ? 0 : requests?.length}
                </div>
              </Link>
              <button
                onClick={signOut}
                className="relative inline-flex items-center justify-center p-0.5 pr-2 mb-2  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor group-hover:from-btnColorDark group-hover:to-btnColor hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
              >
                <span className="relative px-3 py-2 transition-all ease-in duration-75 bg-white text-gray-700 rounded-md hover:text-gray-100 group-hover:bg-opacity-0">
                  Sign Out
                </span>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    className="relative inline-flex items-center justify-center p-0.5 pr-2 mb-2  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor group-hover:from-btnColorDark group-hover:to-btnColor hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                  >
                    <span className="relative px-3 py-2 transition-all ease-in duration-75 bg-white text-gray-700 rounded-md hover:text-gray-100 group-hover:bg-opacity-0">
                      Sign In
                    </span>

                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                ))}
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Nav;
