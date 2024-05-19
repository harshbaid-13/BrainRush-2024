"use client";
// import Buttons from "@components/Buttons/Buttons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Preahvihear } from "next/font/google";
import PreviousMap from "postcss/lib/previous-map";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@components/Loader/UniversalLoader";
import { setTeam, setTeamRequest } from "@Reducers/features/team";
import { useRouter } from "next/navigation";
import { setRequest } from "@Reducers/features/requests";
import axios from "axios";
import Navbar from "@components/Nav/RegNav";
import Button from "@components/Button";

const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: ["400"],
});
// import "./page.css";

function page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.user);
  const requests = useSelector((state) => state.requests.requests);
  const handleAcceptTeam = async (id) => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/confirm/${id}`
      );

      if (data.success) {
        dispatch(setTeam(data.data));
        dispatch(setTeamRequest(data?.requests));
        router.push("/teams");
      } else {
        alert(data?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRejectTeam = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team/confirm/${id}`
      );

      if (data.success) {
        let x = requests.filter((req) => req._id !== id);
        dispatch(setRequest(x));
      } else {
        alert(data?.message);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  function componentRender() {
    return loading ? (
      <Loader />
    ) : (
      <>
        {/* <Navbar /> */}
        {requests?.length === 0 ? (
          <h1 className="h-auto mt-80 font-bold text-white text-4xl mx-auto text-center">
            <span className={preahvihear.className}>
              You don't have any team requests.
            </span>
          </h1>
        ) : (
          <>
            <section className="text-white  px-2 body-font">
              <div className="containe mx-auto">
                <div className="flex flex-col -m- w-full items-center justify-center">
                  {requests &&
                    requests.map((request, ind) => (
                      <div
                        key={ind}
                        className="p-4 sm:w-full md:w-4/5 lg:w-2/3 mx-auto bg-background"
                      >
                        <div className="flex border-2 p-4 rounded-lg border-white  sm:p-3 lg:p-8 sm:flex-row flex-row items-center">
                          <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-white text-background text-indigo-500 flex-shrink-0 mr-3">
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-8 h-8 sm:hidden lg:inline"
                              viewBox="0 0 24 24"
                            >
                              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                          </div>
                          <div className="flex flex-row flex-wrap w-full items-center sm:justify-center md:justify-between">
                            <div>
                              <h1 className="leading-relaxed text-base">
                                <span className={preahvihear.className}>
                                  Team Name : {request?.team?.teamName}
                                </span>
                                {/* Team Name : Poogle */}
                              </h1>
                              <p className="leading-relaxed text-base">
                                <span className={preahvihear.className}>
                                  Team Leader: {request.teamLeader.name}
                                </span>
                                {/* Team Leader: Pratik Kumar Agarwal */}
                              </p>
                            </div>

                            <div className="flex flex:wrap gap-3 items-center justify-end">
                              {/* <a className="mt-3 text-indigo-500 inline-flex me-2 items-center">
                    <Buttons title={"Cancel Request"} />
                  </a> */}
                              <Button
                                text={"Confirm"}
                                onClick={() => {
                                  handleAcceptTeam(request._id);
                                }}
                              />
                              <Button
                                text={"Ignore"}
                                onClick={() => {
                                  handleRejectTeam(request._id);
                                }}
                              />
                            </div>

                            {/* <a className="mt-3 text-indigo-500 inline-flex ms-2 items-center">
                    <Buttons title={"Confirm Request"} />
                  </a> */}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          </>
        )}
      </>
    );
  }

  return <>{componentRender()}</>;
}

export default page;
