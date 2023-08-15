"use client";
// import Buttons from "@components/Buttons/Buttons";
import React, { useEffect, useState } from "react";
import "./page.css";
import { Preahvihear } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setTeam, setTeamRequest } from "@Reducers/features/team";
import Loader from "@components/Loader/Loader";

const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: ["400"],
});

const createTeam = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamMemberEmail, setTeamMemberEmail] = useState("");
  const handleCreateTeamSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teamName, teamMemberEmail }),
      });
      const data = await res.json();
      if (data.success) {
        dispatch(setTeam(data.data));
        dispatch(
          setTeamRequest(
            data.confirmationRequest ? data.confirmationRequest : null
          )
        );
        alert(
          "Your team created successfully Your partner need to confirm only"
        );
      } else {
        alert(confirmation.message);
      }
      setLoading(false);
      router.push("/teams");
    } catch (err) {
      console.log(err);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <section>
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-headerText ">
            <span className={preahvihear.className}>Create Your Team</span>
          </h2>

          <p className="mb-8 lg:mb-16 font-medium text-center text-subHeaderText sm:text-xl">
            <span className={preahvihear.className}>
              Got a technical issue? Want to send feedback about a beta feature?
              Need details about our Business plan? Let us know.
            </span>
          </p>
          <form className="space-y-8" onSubmit={handleCreateTeamSubmit}>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-gray-600 text-lg font-medium "
              >
                <span className={preahvihear.className}>
                  {/* Your Name<span className="text-red text-2xl">*</span> */}
                  Team Name<span className="text-red text-2xl">*</span>
                </span>{" "}
              </label>
              <input
                type="text"
                id="email"
                className="shadow-sm bg-inputBgColor border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-500 focus:border-gray-50 block w-full p-2.5 placeholder-gray-700"
                placeholder="Team Name"
                required
                value={teamName}
                onChange={(e) => {
                  setTeamName(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-gray-600 text-xl font-medium "
              >
                <span className={preahvihear.className}>
                  {/* Your Name<span className="text-red text-2xl">*</span> */}
                  Team Member Email<span className="text-red text-2xl">*</span>
                </span>{" "}
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-inputBgColor border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-500 focus:border-gray-50 block w-full p-2.5 placeholder-gray-700"
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
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gradient-to-br from-btnColorDark to-btnColor rounded-md group-hover:bg-opacity-0">
                <span className={preahvihear.className}>
                  {/* Your Name<span className="text-red text-2xl">*</span> */}
                  Submit Details
                </span>{" "}
              </span>
            </button>
            {/* <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Purple to Pink</button> */}
          </form>
        </div>
        {/* {successSubmit()} */}
      </section>
    </>
  );
};

export default createTeam;
