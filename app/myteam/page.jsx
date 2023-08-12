"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Preahvihear } from "next/font/google";

const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Page() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  console.log({ userId });
  const [teamDetails, setTeamDetails] = useState({});
  const [qrData, setQrData] = useState();
  const getQr = async () => {
    const response = await fetch(`/api/test/${userId}`);
    const data = await response.json();
    setQrData(data);
  };

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
      <section className="text-gray-600  body-font sm:mx-0 ">
        <div className="container py-24 mx-auto flex flex-wrap items-center justify-center w-screen">
          <div className="flex flex-wrap items-center justify-center md:w-full  lg:w-1/2">
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
                    <h2 className={preahvihear.className}>My Team</h2>
                  </h2>
                  <h1 className="leading-relaxed text-base text-gray-200 mb-5 ">
                    Team Name : {teamDetails?.teamName}
                  </h1>
                  <p className="leading-relaxed text-base text-gray-200 mb-5">
                    Team Leader: {teamDetails?.leader?.name}
                  </p>
                  <p className="leading-relaxed text-base text-gray-200 mb-5">
                    Payment Status: {teamDetails?.payment ? "Paid" : "Not Paid"}
                  </p>
                  {teamDetails?.teamMemberConfirmation ? (
                    <p>Team Member: {teamDetails?.teamMember}</p>
                  ) : (
                    <p>Team Member: Not Joined</p>
                  )}
                </div>
              </div>
              {/* {console.log(qrData)} */}
              <div className="flex flex-col justify-center items-center p-5">
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
                    Team QR Code
                  </span>
                </button>
              </div>
            </div>

            {/* <Link href="/teams/create-team">
                    <button
                      type="submit"
                      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                    >
                      <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                        Create Team
                      </span>
                    </button>
                  </Link> */}
            {/* <a className="mt-3 text-indigo-500 inline-flex items-center" onClick={() => {
                                        setCreateTeam(true)
                                    }}>
                                        <Buttons title={"Create Team"} />
                                    </a> */}
            <div />
          </div>
        </div>
        {/* <div className="">{createTeam ? teamForm() : ""}</div> */}
      </section>
    </>
  );
}
