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
    <section className="text-gray-600  px-2 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex flex-wrap -m-4">
          <div className="p-4 lg:w-1/2 md:w-full teamButton">
            <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
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
                <h2 className="text-white text-6xl title-font font-2xl mb-3">
                  My Team
                </h2>
                <h1 className="leading-relaxed text-base">
                  Team Name : {teamDetails?.teamName}
                </h1>
                <p className="leading-relaxed text-base mb-5">
                  Team Leader: {teamDetails?.leader?.name}
                </p>
                <p className="leading-relaxed text-base mb-5">
                  Payment Status: {teamDetails?.payment ? "Paid" : "Not Paid"}
                </p>
                {teamDetails?.teamMemberConfirmation ? (
                  <p>Team Member: {teamDetails?.teamMember}</p>
                ) : (
                  <p>Team Member: Not Joined</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
