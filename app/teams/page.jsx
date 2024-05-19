"use client";
import React, { useEffect, useRef, useState } from "react";
import "./page.css";
import Link from "next/link";
import Loader from "@components/Loader/UniversalLoader";
import { useSelector, useDispatch } from "react-redux";
import { setTeam, setTeamRequest } from "@Reducers/features/team";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Preahvihear } from "next/font/google";
import Button from "@components/Button";
import Navbar from "@components/Nav/RegNav";

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
  console.log(team);
  const user = useSelector((state) => state.user.user);
  const [teamMemberEmail1, setTeamMemberEmail1] = useState("");
  const [teamMemberEmail2, setTeamMemberEmail2] = useState("");
  const handleDelete = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/${team?._id}`
      );
      if (data.success) {
        dispatch(setTeam(null));
        dispatch(setTeamRequest(null));
      } else {
        alert(data?.message);
      }
      setTimeout(() => setLoading(false), 3000);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveRequest = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/confirm/${id}`
      );
      if (data.success) {
        dispatch(setTeamRequest(data?.requests));
        dispatch(setTeam(data?.data));
      } else {
        alert(data?.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveMember = async (memberId) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/${team?._id}`,
        { memberId }
      );
      if (data?.success) {
        dispatch(setTeamRequest(data?.requests));
        dispatch(setTeam(data.data));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  // const handleLeaveTeam = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.put(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/${team?._id}`
  //     );
  //     if (data?.success) {
  //       dispatch(setTeam(null));
  //       dispatch(setTeamRequest(null));
  //     }
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleSendRequest = async (teamMemberEmail) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/confirm`,
        {
          teamMemberEmail,
        }
      );

      if (data.success) {
        dispatch(setTeamRequest(data?.data));
        dispatch(setTeam(data?.team));
        setTeamMemberEmail1("");
        setTeamMemberEmail2("");
      } else {
        alert(data?.message);
      }
      setLoading(false);
      router.push("/teams");
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message);
      setLoading(false);
      router.push("/teams");
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  /* SHOW QR STARTS */
  const [isImageVisible, setImageVisible] = useState(false);
  const handleQr = () => {
    setImageVisible(true);
  };
  const posterRef = useRef(null);

  const handleDocumentClick = (event) => {
    if (!posterRef.current?.contains(event.target) && isImageVisible) {
      setImageVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [posterRef, isImageVisible]);

  /* SHOW QR ENDS */
  return (
    <>
      {
        <div
          className={`z-50 fixed inset-0 flex justify-center items-center transition-opacity duration-300 ${isImageVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            } backdrop-blur-md`}
        >
          <div className="bg-white p-8 rounded-lg shadow-md w-auto">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${team?._id}`}
              alt="Centered Image"
              className="block mx-auto max-w-full"
            />
          </div>
        </div>
      }
      {/* qr ends */}
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* <Navbar /> */}

          {isAlreadyInTeam ? (
            <section className="text-gray-600  body-font sm:mx-0 ">
              <div className="container py-15 mx-auto flex flex-wrap items-center justify-center w-screen">
                <div className="flex flex-wrap items-center justify-center md:w-full  lg:w-1/2 mainTeamButton">
                  <div className="p-2 lg:w-full md:w-full sm:w-full">
                    <div className="flex border-2 rounded-lg border-white teaminnerbutton border-opacity-50 p-8 sm:flex-row flex-col ">
                      <div className="flex-grow">
                        <h2 className="text-white text-4xl title-font font-2xl mb-6">
                          <span className={preahvihear.className}>My Team</span>
                        </h2>
                        <h1 className="leading-relaxed text-base text-white mb-3 ">
                          <span className={preahvihear.className}>
                            {" "}
                            Team Name: {team?.teamName}
                          </span>
                        </h1>
                        <p className="leading-relaxed text-base text-white mb-3">
                          <span className={preahvihear.className}>
                            Team Leader: {team?.leader?.name}
                          </span>
                        </p>

                        <>
                          <p className="leading-relaxed text-base text-white mb-3">
                            <span className={`${preahvihear.className} mr-3`}>
                              Team Member 1:{" "}
                              {team?.members.length >= 1
                                ? team?.members[0]?.name
                                : "Not Joined"}
                            </span>
                            {user?.id === team?.leader?._id &&
                              !team.payment &&
                              team?.members.length >= 1 && (
                                <Button
                                  text={"Kick Member"}
                                  onClick={() =>
                                    handleRemoveMember(team?.members[0]?._id)
                                  }
                                  small={true}
                                />
                              )}
                          </p>
                          <p className="leading-relaxed text-base text-white mb-3">
                            <span className={`${preahvihear.className} mr-3`}>
                              Team Member 2:{" "}
                              {team?.members.length > 1
                                ? team?.members[1]?.name
                                : "Not Joined"}
                            </span>{" "}
                            {user?.id === team?.leader?._id &&
                              !team.payment &&
                              team?.members.length > 1 && (
                                <Button
                                  text={"Kick Member"}
                                  onClick={() =>
                                    handleRemoveMember(team?.members[1]?._id)
                                  }
                                  small={true}
                                />
                              )}
                          </p>
                        </>
                        <p className="leading-relaxed text-base text-white mb-3">
                          <span className={preahvihear.className}>
                            Payment Status:{" "}
                            {team?.payment ? "Paid" : "Not Paid"}
                          </span>
                        </p>

                        {team?.members.length < 2 && (
                          <>
                            {sentRequestFromTheTeam.map((request) => (
                              <div
                                className="flex items-center text-white mb-2"
                                key={request._id}
                              >
                                <h1 className={`${preahvihear.className} mr-3`}>
                                  Request1 sent to:{" "}
                                  <strong>{request?.teamMemberEmail}</strong>
                                </h1>

                                {user.id === team?.leader?._id && (
                                  <Button
                                    text={"Remove Request"}
                                    onClick={() =>
                                      handleRemoveRequest(request?._id)
                                    }
                                    small={true}
                                  />
                                )}
                              </div>
                            ))}
                          </>
                        )}
                        {user.id === team?.leader?._id &&
                          (team?.members?.length === 2
                            ? []
                            : team?.members?.length === 1
                              ? sentRequestFromTheTeam.length == 0
                                ? [1]
                                : []
                              : sentRequestFromTheTeam.length === 0
                                ? [1, 2]
                                : sentRequestFromTheTeam.length === 1
                                  ? [1]
                                  : []
                          ).map((item) => (
                            <form className="space-y-8 mb-3" key={item}>
                              <div className="w-full flex flex-wrap items-center">
                                <label
                                  htmlFor="email"
                                  className="block text-md mr-2 text-gray-700 font-medium"
                                >
                                  <span className={preahvihear.className}>
                                    Add Team Member:
                                    <span className="text-red text-md"> </span>
                                  </span>{" "}
                                </label>
                                <div className="mr-3">
                                  <input
                                    type="text"
                                    id="email"
                                    className="shadow-sm bg-inputBgColor border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-500 focus:border-gray-50 block  p-1"
                                    placeholder="Team Member Email"
                                    required
                                    value={
                                      item === 1
                                        ? teamMemberEmail1
                                        : teamMemberEmail2
                                    }
                                    onChange={(e) => {
                                      item === 1
                                        ? setTeamMemberEmail1(e.target.value)
                                        : setTeamMemberEmail2(e.target.value);
                                    }}
                                  />
                                </div>
                                <Button
                                  text={"Send"}
                                  onClick={() =>
                                    handleSendRequest(
                                      item === 1
                                        ? teamMemberEmail1
                                        : teamMemberEmail2
                                    )
                                  }
                                  small={true}
                                />
                              </div>
                            </form>
                          ))}
                        {/* {!team?.members.length < 2 &&
                          sentRequestFromTheTeam && (
                            <h1 className={preahvihear.className}>
                              Request sent to:{" "}
                              <strong>
                                {sentRequestFromTheTeam?.teamMemberEmail}
                              </strong>
                            </h1>
                          )} */}
                      </div>
                    </div>
                    {/* {console.log(qrData)} */}

                    <div className="flex flex-row justify-center items-center p-5 gap-2">
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
                          className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white  focus:ring-4 focus:outline-none focus:ring-purple-200"
                        >
                          <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                            <span className={preahvihear.className}>
                              Team Code
                            </span>
                          </span>
                        </button>
                      )} */}

                      {team?.members?.length === 2 && (
                        <Button text={"Team QR"} onClick={handleQr} />
                      )}

                      {/* delete team */}
                      {!team?.payment
                        ? user?.id === team?.leader?._id && (
                          <Button
                            text={"Delete Team"}
                            onClick={handleDelete}
                          />
                        )
                        : null}
                    </div>
                  </div>

                  <div />
                  <div />
                </div>
              </div>
            </section>
          ) : (
            <section className="text-background max-h-full flex items-center px-2 body-font mainTeamButton">
              <div className="container px-5 py-16 mx-auto">
                <div className="flex flex-wrap gap-8 items-center justify-center -m-4">
                  <div className="p-4 lg:w-1/3 md:w-full">
                    <div className="flex border-2 rounded-lg border-white teaminnerbutton border-opacity-50 p-8 sm:flex-row flex-col">
                      <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-white text-indigo-500 flex-shrink-0">
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
                          className="text-white text-4xl title-font font-2xl mb-3"
                        // style={{ color: "#6f7bd9 !important" }}
                        >
                          <span className={preahvihear.className}>
                            Join Team
                          </span>
                        </h2>

                        <p className="leading-relaxed text-base text-white mb-5">
                          {/* Team Leader: {request.teamLeader.name} */}
                          <span className={preahvihear.className}>
                            Join a team made by a friend of yours!
                          </span>
                        </p>
                        <Link href="teams/join-team">
                          <Button text={"Join Team"} />
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
                  <div className="p-4 lg:w-1/3 md:w-full">
                    <div className="flex border-2 rounded-lg border-white border-opacity-50 p-8 sm:flex-row flex-col">
                      <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-white text-indigo-500 flex-shrink-0">
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
                        <h2 className="text-white text-3xl title-font font-2xl mb-3">
                          <span className={preahvihear.className}>
                            Create Team
                          </span>
                        </h2>
                        <p className="leading-relaxed text-base text-white mb-5">
                          <span className={preahvihear.className}>
                            Create your own team, and invite your friend!
                          </span>
                        </p>
                        <Link href="/teams/create-team">
                          <Button text={"Create Team"} />
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
