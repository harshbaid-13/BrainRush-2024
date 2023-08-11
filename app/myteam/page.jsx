"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  console.log({ userId });
  const [teamDetails, setTeamDetails] = useState({});

  //   const getTeamDetails = async () => {
  //     let response = await fetch(`api/team/${userId}/displayoneteam`);
  //     const data = await response.json();
  //     console.log({ data });
  //     setTeamDetails(data.data);
  //   };
  const getTeamDetails = async () => {
    try {
      const response = await fetch(`api/team/${userId}/displayoneteam`);
      if (!response.ok) {
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
    console.log({ teamDetails });
  }, [userId, teamDetails]);

  return (
    <>
      <section class="text-gray-600  px-2 body-font mx-20">
        <div class="container px-5 py-24 mx-auto flex flex-wrap">
          <div class="flex flex-wrap -m-4">
            <div class="p-4 lg:w-1/2 md:w-full teamButton">
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
                    class="text-pink-500 text-6xl title-font font-2xl mb-3"
                    // style={{ color: "#6f7bd9 !important" }}
                  >
                    Join Team
                  </h2>

                  <p class="leading-relaxed text-base mb-5">
                    {/* Team Leader: {request.teamLeader.name} */}
                    Create your own team of member two including you by clicking
                    the button.
                  </p>
                  <Link href="teams/join-team">
                    <button
                      type="submit"
                      class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-headerText to-subHeaderText group-hover:from-headerText group-hover:to-subHeaderText hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                    >
                      <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Team Request
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
            <div class="p-4 lg:w-1/2 md:w-full teamButton">
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
                  <h2 class="text-pink-500 text-6xl title-font font-2xl mb-3">
                    Create Team
                  </h2>
                  <p class="leading-relaxed text-base mb-5">
                    Create your own team of member two including you by clicking
                    the button.
                  </p>
                  <Link href="/teams/create-team">
                    <button
                      type="submit"
                      class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-headerText to-subHeaderText group-hover:from-headerText group-hover:to-subHeaderText hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                    >
                      <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Create Team
                      </span>
                    </button>
                  </Link>
                  {/* <a class="mt-3 text-indigo-500 inline-flex items-center" onClick={() => {
                                        setCreateTeam(true)
                                    }}>
                                        <Buttons title={"Create Team"} />
                                    </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">{createTeam ? teamForm() : ""}</div>
      </section>
      // original code
      <section class="text-gray-600  px-2 body-font">
        <div class="container px-5 py-24 mx-auto flex flex-wrap">
          <div class="flex flex-wrap -m-4">
            <div class="p-4 lg:w-1/2 md:w-full ">
              <divs class="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
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
                  <h2 class="text-white text-6xl title-font font-2xl mb-3">
                    My Team
                  </h2>
                  <h1 class="leading-relaxed text-base">
                    Team Name : {teamDetails?.teamName}
                  </h1>
                  <p class="leading-relaxed text-base mb-5">
                    Team Leader: {teamDetails?.leader?.name}
                  </p>
                  <p class="leading-relaxed text-base mb-5">
                    Payment Status: {teamDetails?.payment ? "Paid" : "Not Paid"}
                  </p>
                  {teamDetails?.teamMemberConfirmation ? (
                    <p>Team Member: {teamDetails?.teamMember}</p>
                  ) : (
                    <p>Team Member: Not Joined</p>
                  )}
                </div>
              </divs>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
