"use client";
// import Buttons from "@components/Buttons/Buttons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "./page.css";

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

  const handleCreateTeamSubmit = async () => {
    try {
      await Promise.all([
        fetch("/api/team/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teamName, userId }),
        }),
        fetch("/api/team/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teamMemberEmail, userId }),
        }),
      ]);
      setSubmit(true);
    } catch (err) {
      console.log(err);
    }
  };

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
    return (
      <>
        <section class="">
          <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
              Create Your Team
            </h2>

            <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
              Got a technical issue? Want to send feedback about a beta feature?
              Need details about our Business plan? Let us know.
            </p>
            <form
              action="#"
              class="space-y-8"
              onSubmit={handleCreateTeamSubmit}
            >
              <div>
                <label for="subject" class="block mb-2 text-sm font-medium ">
                  Team Name<span className="text-red text-2xl">*</span>
                </label>
                <input
                  type="text"
                  id="email"
                  class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="Team Name"
                  required
                  value={teamName}
                  onChange={(e) => {
                    setTeamName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label for="subject" class="block mb-2 text-sm font-medium ">
                  Team Member Email<span className="text-red text-2xl">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="Team Member Email"
                  required
                  value={teamMemberEmail}
                  onChange={(e) => {
                    setTeamMemberEmail(e.target.value);
                  }}
                />
              </div>
              <button
                type="submit"
                class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
              >
                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Submit Details
                </span>
              </button>
              {/* <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Purple to Pink</button> */}
            </form>
          </div>
          {/* {successSubmit()} */}
        </section>
      </>
    );
  }
  return (
    <>
      <section class="text-gray-600  px-2 body-font">
        <div class="container px-5 py-24 mx-auto flex flex-wrap">
          <div class="flex flex-wrap -m-4">
            {requests &&
              requests.map((request) => (
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
                      <h1 class="leading-relaxed text-base">
                        Team Name : {request.team}
                      </h1>
                      <p class="leading-relaxed text-base mb-5">
                        Team Leader: {request.teamLeader.name}
                      </p>
                      <button
                        type="submit"
                        class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                        onClick={() => {
                          handleRejectTeam(request.team);
                        }}
                      >
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          Cancel Request
                        </span>
                      </button>
                      {/* <a class="mt-3 text-indigo-500 inline-flex me-2 items-center">
                    <Buttons title={"Cancel Request"} />
                  </a> */}
                      <button
                        type="submit"
                        class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                        onClick={() => {
                          handleAcceptTeam(request.team);
                        }}
                      >
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          Confirm Request
                        </span>
                      </button>
                      {/* <a class="mt-3 text-indigo-500 inline-flex ms-2 items-center">
                    <Buttons title={"Confirm Request"} />
                  </a> */}
                    </div>
                  </div>
                </div>
              ))}
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
                  <button
                    type="submit"
                    class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                    onClick={() => {
                      setCreateTeam(true);
                    }}
                  >
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Create Team
                    </span>
                  </button>
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
