"use client";
// import Buttons from "@components/Buttons/Buttons";
// import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "./page.css";
import Link from "next/link";

const Teams = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [qrData, setQrData] = useState();
  const getQr = async () => {
    const response = await fetch(`/api/test/${userId}`);
    const data = await response.json();
    setQrData(data);
  };
  const [createTeam, setCreateTeam] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [teamMemberEmail, setTeamMemberEmail] = useState("");
  const [submit, setSubmit] = useState(false);

  const [requests, setRequests] = useState([]);

  const handleAcceptTeam = async (teamId) => {
    try {
      await fetch("/api/team/confirm", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, teamId }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleRejectTeam = async (teamId) => {
    try {
      await fetch("/api/team/confirm", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, teamId }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getRequests = async () => {
    const response = await fetch(`/api/team/confirm/${userId}`);
    const data = await response.json();
    setRequests(data.data);
  };

  const successSubmit = () => {
    if (submit) {
      return <page />;
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  function teamForm() {
    return <></>;
  }
  return (
    <>
      <section class="text-gray-600  px-2 body-font">
        <div class="container px-5 py-24 mx-auto flex flex-wrap">
          <div class="flex flex-wrap -m-4">
            <div class="p-4 lg:w-1/2 md:w-full teamButton">
              <div class="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
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
                      class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
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
                  <h2 class="text-white text-6xl title-font font-2xl mb-3">
                    Create Team
                  </h2>
                  <p class="leading-relaxed text-base mb-5">
                    Create your own team of member two including you by clicking
                    the button.
                  </p>
                  <Link href="/teams/create-team">
                    <button
                      type="submit"
                      class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
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

      {/* <h1 className="flex justify-center text-white">Kodikas 2K23 - Teams Page</h1>
            <h1 className="flex justify-center text-white">My Team QR</h1> */}
      {console.log(qrData)}
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
          class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          onClick={getQr}
        >
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Get Team QR
          </span>
        </button>
        {/* <button className="text-white"></button> */}
      </div>
    </>
  );
};

export default Teams;
