"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const AllTeams = () => {
  const [teams, setTeams] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [limit, setLimit] = useState(0);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [notSelected, setNotSelected] = useState(null);

  const getTeams = async () => {
    try {
      const response = await fetch(
        `/api/team/all?search=${search}&page=${pageNum}&selected=${notSelected}`
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
  }, [pageNum, notSelected]);

  return (
    <>
      <div className="sm:flex">
        <div className="items-center mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
          <div className="lg:pr-3 ml-20">
            <label htmlFor=="teams-search" className="sr-only">
            Search
          </label>
          <div className="flex flex-row my-2 lg:w-64 xl:w-96 ">
            <input
              type="text"
              name="email"
              id="teams-search"
              className="bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-50  dark:placeholder-gray-400 dark:text-headerText dark:focus:ring-primary-500 "
              placeholder="Search for teams"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button
              type="submit"
              className="bg-primary-orange p-2 ml-2 text-white rounded-md"
              onClick={getTeams}
            >
              Submit
            </button>
          </div>
          {/* <label className="flex my-2">
              <input
                className="mr-2 w-6 h-6"
                type="checkbox"
                name="notSelected"
                onClick={() => {
                  setNotSelected((prev) => (prev ? null : true));
                }}
              />
              <span>Not Selected</span>
            </label> */}
        </div>
      </div>
    </div >
      <div
        className="relative overflow-x-auto shadow-md sm:rounded-lg mx-20 pb-5"
        style={{
          boxShadow:
            " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;",
        }}
      >
        <table className="w-full h-10 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead
            className="h-20 text-xs text-gray-50 uppercase  bg-headerText"
            // style={{ background: "#6f7bd9" }}
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
                <tr className=" border-b 0 dark:border-gray-700" key={team._id}>
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
      <div className="relative flex flex-col items-center justify-center fixed mb-10 right-0 -bottom-20 mr-20">
        <span className="text-sm text-gray-900 dark:text-gray-900 font-medium">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-headerText">
            {Math.min(count, (pageNum - 1) * limit + 1)}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-headerText">
            {Math.min(count, pageNum * limit)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-headerText">
            {count}
          </span>{" "}
          Entries
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-subHeaderText bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
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
            className="flex items-center justify-center px-4 h-10 text-base ml-1 font-medium text-white bg-subHeaderText bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
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
