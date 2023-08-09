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

      <header className="text-white body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a
            href="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <Image
              src={"/assets/images/logo.png"}
              width={40}
              height={30}
              alt="Logo"
              className="object-contain"
            />
            <span className="ml-3 text-xl">Kodikas</span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link href={"/profile"} className="mr-5 hover:text-logoYellow">
              Profile
            </Link>
            <Link href={"/teams"} className="mr-5 hover:text-logoYellow">
              Teams
            </Link>
            {/* <Link href={"#venue"} className="mr-5 hover:text-logoYellow">Venue</Link> */}
          </nav>
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link href="/teams/join-team">
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  alt="Profile"
                  className="rounded-full"
                />
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
