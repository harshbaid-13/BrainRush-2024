"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const AllTeams = () => {
  const [teams, setTeams] = useState([]);

  const getTeams = async () => {
    const response = await fetch(`/api/team/all`);
    const data = await response.json();
    setTeams(data.data);
  };

  console.log(teams);

  useEffect(() => {
    getTeams();
  }, []);

  return (
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
  );
};

export default AllTeams;
