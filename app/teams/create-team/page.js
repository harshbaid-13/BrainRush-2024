"use client";
// import Buttons from "@components/Buttons/Buttons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "./page.css";

const createTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [teamMemberEmail, setTeamMemberEmail] = useState("");
  const [submit, setSubmit] = useState(false);

  const [createTeam, setCreateTeam] = useState(false);
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
          <form action="#" class="space-y-8" onSubmit={handleCreateTeamSubmit}>
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
};

export default createTeam;
