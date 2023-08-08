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

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
          </tr>
        </thead>
        <tbody>
          {teams &&
            teams.map((team) => (
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {team.teamName}
                </td>
                <td className="px-6 py-4">{team.leader.name}</td>
                <td className="px-6 py-4">
                  {team?.teamMember?.name ? team.teamMember.name : "Join me"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTeams;
