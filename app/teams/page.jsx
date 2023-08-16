"use client";
import React, { useEffect, useState } from "react";
import "./page.css";
import Link from "next/link";
import { Preahvihear } from "next/font/google";
import Loader from "@components/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { setTeam, setTeamRequest } from "@Reducers/features/team";
import { setRequest } from "@Reducers/features/requests";
import { useRouter } from "next/navigation";

const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: ["400"],
});

const Teams = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { isAlreadyInTeam, team, sentRequestFromTheTeam } = useSelector(
    (state) => state.team
  );
  const user = useSelector((state) => state.user.user);
  const [qrData, setQrData] = useState();
  const [teamMemberEmail, setTeamMemberEmail] = useState("");
  //team qr not working
  const getQr = async () => {
    setLoading(true);
    const response = await fetch(`/api/test/${team?._id}`);
    const data = await response.json();
    setQrData(data);
    setLoading(false);
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/team/${team?._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        dispatch(setTeam(null));
        dispatch(setTeamRequest(null));
      }
      setLoading(false);
      console.log(isAlreadyInTeam);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveRequest = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/team/confirm/${sentRequestFromTheTeam?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const successData = await response.json();
      if (successData.success) {
        dispatch(setTeamRequest(null));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveMember = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/team/${team?._id}`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (data?.success) {
        console.log("here");
        dispatch(setTeamRequest(null));
        dispatch(setTeam(data.data));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLeaveTeam = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/team/${team?._id}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (data?.success) {
        dispatch(setTeam(null));
        dispatch(setTeamRequest(null));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSendRequest = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/team/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teamMemberEmail }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        dispatch(setTeamRequest(data.data));
        setTeamMemberEmail("");
      } else {
        alert(confirmation.message);
      }
      setLoading(false);
      router.push("/teams");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {isAlreadyInTeam ? (
            <section className="text-gray-600  body-font sm:mx-0 ">
              <div className="container py-24 mx-auto flex flex-wrap items-center justify-center w-screen">
                <div className="flex flex-wrap items-center justify-center md:w-full  lg:w-1/2 mainTeamButton">
                  <div className="p-2 lg:w-full md:w-full sm:w-full teamButton">
                    <div className="flex border-2 rounded-lg border-gray-200 teaminnerbutton border-opacity-50 p-8 sm:flex-row flex-col">
                      <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-8 h-8"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-headerText text-4xl title-font font-2xl mb-6">
                          <span className={preahvihear.className}>My Team</span>
                        </h2>
                        <h1 className="leading-relaxed text-base text-gray-200 mb-3 ">
                          <span className={preahvihear.className}>
                            {" "}
                            Team Name : {team?.teamName}
                          </span>
                        </h1>
                        <p className="leading-relaxed text-base text-gray-200 mb-3">
                          <span className={preahvihear.className}>
                            Team Leader: {team?.leader?.name}
                          </span>
                        </p>
                        <p className="leading-relaxed text-base text-gray-200 mb-3">
                          <span className={preahvihear.className}>
                            Payment Status:{" "}
                            {team?.payment ? "Paid" : "Not Paid"}
                          </span>
                        </p>
                        {team?.teamMemberConfirmation ? (
                          <p className="leading-relaxed text-base text-gray-200 mb-3">
                            <span className={preahvihear.className}>
                              Team Member: {team?.teamMember.name}
                            </span>{" "}
                          </p>
                        ) : (
                          <p className="leading-relaxed text-base text-gray-200 mb-3">
                            <span className={preahvihear.className}>
                              Team Member: Not Joined
                            </span>
                          </p>
                        )}
                        {!team?.teamMemberConfirmation &&
                          !sentRequestFromTheTeam && (
                            <form
                              className="space-y-8 "
                              onSubmit={handleSendRequest}
                            >
                              <div className="w-full flex items-center">
                                <label
                                  htmlFor="email"
                                  className="block text-md mr-2 text-gray-700 font-medium"
                                >
                                  <span className={preahvihear.className}>
                                    Add Team Member:
                                    <span className="text-red text-md"> </span>
                                  </span>{" "}
                                </label>
                                <div>
                                  <input
                                    type="text"
                                    id="email"
                                    className="shadow-sm bg-inputBgColor border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-500 focus:border-gray-50 block  p-1"
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
                                  className="relative text-center inline-flex items-center justify-center p-0.5 ml-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor "
                                >
                                  <span className="relative px-2.5 py-1.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                                    <span className={preahvihear.className}>
                                      Send
                                    </span>
                                  </span>
                                </button>
                              </div>
                            </form>
                          )}

                        {!team?.teamMemberConfirmation &&
                          sentRequestFromTheTeam && (
                            <h1 className={preahvihear.className}>
                              Request sent to:{" "}
                              <strong>
                                {sentRequestFromTheTeam?.teamMemberEmail}
                              </strong>
                            </h1>
                          )}
                      </div>
                    </div>
                    {/* {console.log(qrData)} */}

                    <div className="flex flex-row justify-center items-center p-5">
                      {/* qr code ui */}
                      {/* {qrData && (
                        <img
                          className="mb-5 n"
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${qrData}`}
                          width={200}
                          height={200}
                          alt="qr"
                        />
                      )} */}
                      {/* team code */}
                      {/* {team?.teamMemberConfirmation && (
                        <button
                          type="submit"
                          onClick={getQr}
                          className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                        >
                          <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                            <span className={preahvihear.className}>
                              Team Code
                            </span>
                          </span>
                        </button>
                      )} */}
                      {/* kick member */}
                      {user?.id === team?.leader?._id &&
                        !team.payment &&
                        team?.teamMemberConfirmation && (
                          <button
                            onClick={handleRemoveMember}
                            className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                          >
                            <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                              <span className={preahvihear.className}>
                                Kick Member
                              </span>
                            </span>
                          </button>
                        )}
                      {/* remove request */}
                      {!team?.teamMemberConfirmation &&
                        sentRequestFromTheTeam && (
                          <button
                            onClick={handleRemoveRequest}
                            className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                          >
                            <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                              <span className={preahvihear.className}>
                                Remove Request
                              </span>
                            </span>
                          </button>
                        )}
                      {/* delete team */}
                      {!team?.payment ? (
                        user?.id === team?.leader?._id ? (
                          <button
                            onClick={handleDelete}
                            className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                          >
                            <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                              <span className={preahvihear.className}>
                                Delete Team
                              </span>
                            </span>
                          </button>
                        ) : (
                          <button
                            type="submit"
                            onClick={handleLeaveTeam}
                            className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                          >
                            <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                              <span className={preahvihear.className}>
                                Leave Team
                              </span>
                            </span>
                          </button>
                        )
                      ) : null}
                    </div>
                  </div>

                  <div />
                  <div />
                </div>
              </div>
            </section>
          ) : (
            <section className="text-gray-600  px-2 body-font mainTeamButton">
              <div className="container px-5 py-24 mx-auto flex flex-wrap">
                <div className="flex flex-wrap gap-8 items-center justify-center -m-4">
                  <div className="p-4 lg:w-1/3 md:w-full teamButton">
                    <div className="flex border-2 rounded-lg border-gray-200 teaminnerbutton border-opacity-50 p-8 sm:flex-row flex-col">
                      <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-8 h-8"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                      </div>
                      <div className="flex-grow">
                        <h2
                          className="text-headerText text-3xl title-font font-2xl mb-3"
                          // style={{ color: "#6f7bd9 !important" }}
                        >
                          <span className={preahvihear.className}>
                            Join Team
                          </span>
                        </h2>

                        <p className="leading-relaxed text-base mb-5">
                          {/* Team Leader: {request.teamLeader.name} */}
                          <span className={preahvihear.className}>
                            Create your own team of member two including you by
                            clicking the button.
                          </span>
                        </p>
                        <Link href="teams/join-team">
                          <button
                            type="submit"
                            className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                          >
                            <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                              <span className={preahvihear.className}>
                                Join Team
                              </span>
                            </span>
                          </button>
                        </Link>
                        {/* <a className="mt-3 text-indigo-500 inline-flex me-2 items-center">
                    <Buttons title={"Cancel Request"} />
                  </a> */}

                        {/* <a className="mt-3 text-indigo-500 inline-flex ms-2 items-center">
                    <Buttons title={"Confirm Request"} />
                  </a> */}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 lg:w-1/3 md:w-full teamButton">
                    <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                      <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-10 h-10"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-headerText text-3xl title-font font-2xl mb-3">
                          <span className={preahvihear.className}>
                            Create Team
                          </span>
                        </h2>
                        <p className="leading-relaxed text-base mb-5">
                          <span className={preahvihear.className}>
                            Create your own team of member two including you by
                            clicking the button.
                          </span>
                        </p>
                        <Link href="/teams/create-team">
                          <button
                            type="submit"
                            className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                          >
                            <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                              <span className={preahvihear.className}>
                                Create Team
                              </span>
                            </span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default Teams;
