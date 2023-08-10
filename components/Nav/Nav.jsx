"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  useEffect(() => {
    const setProvidersFunc = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvidersFunc();
  }, []);
  return (
    <>
      <header className="text-white body-font" style={{ padding: "0 3.5rem" }}>
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a
            href="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <Image
              src={"/assets/images/logo.png"}
              width={50}
              height={40}
              alt="Logo"
              className="object-contain"
            />
            <span className="ml-3 text-3xl text-gray-800 font-bold">
              Kodikas-2K23
            </span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link
              href={"/profile"}
              className="mr-5 font-bold text-2xl text-gray-600 hover:underline decoration-pink-500 hover:text-pink-500"
            >
              Profile
            </Link>
            <Link
              href={"/teams"}
              className="mr-5 font-bold text-2xl text-gray-600 hover:text-pink-500 hover:underline decoration-pink-500"
            >
              Teams
            </Link>
            {/* <Link href={"#venue"} className="mr-5 hover:text-logoYellow">Venue</Link> */}
          </nav>
          {session?.user ? (
            // <button type="button" class="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            //   <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
            //     <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
            //     <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
            //   </svg>
            //   <span class="sr-only">Notifications</span>
            //   <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">20</div>
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
                <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-pink-500 top-2 right-29 ">
                  20
                </div>
              </Link>
              <button
                onClick={signOut}
                class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
              >
                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
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
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                  >
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
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
