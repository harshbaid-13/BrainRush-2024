"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import "./page.css";
import Link from "next/link";
import { Preahvihear } from "next/font/google";

const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: ["400"],
});

const Teams = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [qrData, setQrData] = useState();
  const getQr = async () => {
    const response = await fetch(`/api/test/${userId}`);
    const data = await response.json();
    setQrData(data);
  };

  const [isTeam, setIsTeam] = useState(true);
  const [teamDetails, setTeamDetails] = useState({});

  const getTeamDetails = async () => {
    try {
      const response = await fetch(`api/team/${userId}/displayoneteam`);
      if (!response.ok) {
        setIsTeam(false);
        throw new Error("Failed to fetch team details");
      }

      const data = await response.json();
      setTeamDetails(data.data);
    } catch (error) {
      console.error("Error fetching team details:", error);
    }
  };

  useEffect(() => {
    getTeamDetails();
  }, []);

  return (
    <>
      {isTeam ? (
        <section className="text-gray-600  body-font sm:mx-0 ">
          <div className="container py-24 mx-auto flex flex-wrap items-center justify-center w-screen">
            <div className="flex flex-wrap items-center justify-center md:w-full  lg:w-1/2 mainTeamButton">
              <div className="p-2 lg:w-full md:w-full sm:w-full teamButton">
                <div className="flex border-2 rounded-lg border-gray-200 teaminnerbutton border-opacity-50 p-8 sm:flex-row flex-col">
                  <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-8 h-8"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-headerText text-4xl title-font font-2xl mb-3">
                      <span className={preahvihear.className}>My Team</span>
                    </h2>
                    <h1 className="leading-relaxed text-base text-gray-200 mb-5 ">
                      <span className={preahvihear.className}>
                        {" "}
                        Team Name : {teamDetails?.teamName}
                      </span>
                    </h1>
                    <p className="leading-relaxed text-base text-gray-200 mb-5">
                      <span className={preahvihear.className}>
                        Team Leader: {teamDetails?.leader?.name}
                      </span>
                    </p>
                    <p className="leading-relaxed text-base text-gray-200 mb-5">
                      <span className={preahvihear.className}>
                        Payment Status:{" "}
                        {teamDetails?.payment ? "Paid" : "Not Paid"}
                      </span>
                    </p>
                    {teamDetails?.teamMemberConfirmation ? (
                      <p>
                        <span className={preahvihear.className}>
                          Team Member: {teamDetails?.teamMember}
                        </span>{" "}
                        {teamDetails?.leader && teamDetails?.payment}?(
                        <span class=" ml-2 bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                          Red
                        </span>
                        ):""
                      </p>
                    ) : (
                      <p>
                        <span className={preahvihear.className}>
                          Team Member: Not Joined
                        </span>
                      </p>
                    )}
                  </div>
                </div>
                {/* {console.log(qrData)} */}
                <div className="flex flex-row justify-center items-center p-5">
                  {qrData && (
                    <img
                      className="mb-5 n"
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${qrData}`}
                      width={200}
                      height={200}
                      alt="qr"
                    />
                  )}

                  <button
                    type="submit"
                    onClick={getQr}
                    className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                      <span className={preahvihear.className}>Team Code</span>
                    </span>
                  </button>
                  <button
                    type="submit"
                    onClick={getQr}
                    className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                      <span className={preahvihear.className}>Delete Team</span>
                    </span>
                  </button>
                </div>
              </div>

              <div />
              <div />
            </div>
          </div>
        </section>
      ) : (
        <section class="text-gray-600  px-2 body-font mainTeamButton">
          <div class="container px-5 py-24 mx-auto flex flex-wrap">
            <div class="flex flex-wrap gap-8 items-center justify-center -m-4">
              <div class="p-4 lg:w-1/3 md:w-full teamButton">
                <div class="flex border-2 rounded-lg border-gray-200 teaminnerbutton border-opacity-50 p-8 sm:flex-row flex-col">
                  <div class="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-8 h-8"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <div class="flex-grow">
                    <h2
                      class="text-headerText text-4xl title-font font-2xl mb-3"
                      // style={{ color: "#6f7bd9 !important" }}
                    >
                      <span className={preahvihear.className}>Join Team</span>
                    </h2>

                    <p class="leading-relaxed text-base mb-5">
                      {/* Team Leader: {request.teamLeader.name} */}
                      <span className={preahvihear.className}>
                        Create your own team of member two including you by
                        clicking the button.
                      </span>
                    </p>
                    <Link href="teams/join-team">
                      <button
                        type="submit"
                        className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                      >
                        <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                          <span className={preahvihear.className}>
                            Join Team
                          </span>
                        </span>
                      </button>
                    </Link>
                    {/* <a class="mt-3 text-indigo-500 inline-flex me-2 items-center">
                    <Buttons title={"Cancel Request"} />
                  </a> */}

                    {/* <a class="mt-3 text-indigo-500 inline-flex ms-2 items-center">
                    <Buttons title={"Confirm Request"} />
                  </a> */}
                  </div>
                </div>
              </div>
              <div class="p-4 lg:w-1/3 md:w-full teamButton">
                <div class="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                  <div class="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-10 h-10"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div class="flex-grow">
                    <h2 class="text-headerText text-4xl title-font font-2xl mb-3">
                      <span className={preahvihear.className}>Create Team</span>
                    </h2>
                    <p class="leading-relaxed text-base mb-5">
                      <span className={preahvihear.className}>
                        Create your own team of member two including you by
                        clicking the button.
                      </span>
                    </p>
                    <Link href="/teams/create-team">
                      <button
                        type="submit"
                        className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                      >
                        <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                          <span className={preahvihear.className}>
                            Create Team
                          </span>
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Teams;
