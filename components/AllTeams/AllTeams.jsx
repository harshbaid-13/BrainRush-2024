"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const AllTeams = () => {
  const [teams, setTeams] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [limit, setLimit] = useState(0);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");

  const getTeams = async () => {
    try {
      const response = await fetch(
        `/api/team/all?search=${search}&page=${pageNum}`
      );
      const data = await response.json();
      setTeams(data.teams);
      setLimit(data.limit);
      setCount(data.count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeams();
    console.log({ teams });
  }, [pageNum, search]);

  return (
    <>
      <div className="sm:flex">
        <div className="items-center mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
          <div className="lg:pr-3">
            <label htmlFor="teams-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1 lg:w-64 xl:w-96">
              <input
                type="text"
                name="email"
                id="teams-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search for teams"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="relative overflow-x-auto shadow-md sm:rounded-lg mx-20 pb-5"
        style={{
          boxShadow:
            " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;",
        }}
      >
        <table className="w-full h-10 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead
            className="h-20 text-xs text-gray-50 uppercase  dark:bg-gray-50 dark:text-gray-50"
            style={{ background: "#6f7bd9" }}
          >
            <tr>
              <th scope="col" className="px-6 py-3">
                Team Name
              </th>
              <th scope="col" className="px-6 py-3">
                Team Leader
              </th>
              <th scope="col" className="px-6 py-3">
                Team Member
              </th>
              {/* <th scope="col" className="px-6 py-3">
              Payment Status
            </th> */}
            </tr>
          </thead>
          <tbody>
            {teams &&
              teams.map((team) => (
                <tr className=" border-b 0 dark:border-gray-700">
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {team.teamName}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    <span className="text-gray-900">{team.leader.name}</span>
                    <br />
                    {team.leader.email}
                  </td>
                  <td className="px-6 py-4 ">
                    <span className="text-gray-900">
                      {team?.teamMember?.name
                        ? team.teamMember.name
                        : "Not Selected"}
                    </span>
                    <br />

                    {team?.teamMember?.name ? team.teamMember.email : ""}
                  </td>
                  {/* <td className="px-6 py-4">{team?.payment ? "✅" : "❌"}</td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div
        className="flex flex-col items-center justify-center fixed mb-10 right-0 bottom-0 mr-20"
        style={{ background: "#6f7bd9" }}
      >
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {Math.min(count, (pageNum - 1) * limit + 1)}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {Math.min(count, pageNum * limit)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {count}
          </span>{" "}
          Entries
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            onClick={() => {
              setPageNum((prev) => {
                return Math.max(prev - 1, 1);
              });
            }}
          >
            <svg
              className="w-3.5 h-3.5 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            Prev
          </button>
          <button
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            onClick={() => {
              setPageNum((prev) => {
                return Math.min(prev + 1, Math.floor((count - 1) / limit) + 1);
              });
            }}
          >
            Next
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default AllTeams;
