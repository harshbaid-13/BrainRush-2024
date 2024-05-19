"use client";
// import Buttons from "@components/Buttons/Buttons";
import React, { useEffect, useState } from "react";
import "./page.css";
import { Preahvihear } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setTeam, setTeamRequest } from "@Reducers/features/team";
import Loader from "@components/Loader/UniversalLoader";
import axios from "axios";
import Button from "@components/Button";
import Navbar from "@components/Nav/RegNav";

const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: ["400"],
});

const createTeam = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const profileData = useSelector((state) => state.profile.profile);
  const email = profileData?.email;
  const [loading, setLoading] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamMember1Email, setTeamMember1Email] = useState("");
  const [teamMember2Email, setTeamMember2Email] = useState("");
  const handleCreateTeamSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/team`,
        { teamName, teamMemberEmail }
      );

      if (data.success) {
        dispatch(setTeam(data.data));
        dispatch(
          setTeamRequest(
            data.confirmationRequest ? data.confirmationRequest : null
          )
        );
        alert(
          "Your team has been created successfully! Ask your teammate login and join team!"
        );
      } else {
        alert(data?.message);
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
      <Navbar />
      <section>
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-white ">
            <span className={preahvihear.className}>Create Your Team</span>
          </h2>

          <p className="mb-8 lg:mb-16 font-medium text-center text-bgGray sm:text-xl">
            <span className={preahvihear.className}>
              Create your own team by entering your team name and your team
              mate's email!
            </span>
          </p>
          <form className="space-y-8" onSubmit={handleCreateTeamSubmit}>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-white text-lg font-medium "
              >
                <span className={preahvihear.className}>
                  {/* Your Name<span className="text-red text-2xl">*</span> */}
                  Team Name<span className="text-red text-2xl">*</span>
                </span>{" "}
              </label>
              <input
                type="text"
                id="email"
                className="profileInput shadow-sm bg-inputBgColor border-gray-300 text-white text-xl rounded-lg focus:ring-primary-500 focus:border-gray-50 block w-full p-2.5 "
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
                className="block mb-2 text-sm text-white font-medium "
              >
                <span className={preahvihear.className}>
                  {/* Your Name<span className="text-red text-2xl">*</span> */}
                  Your Leader Email<span className="text-red text-2xl">*</span>
                </span>{" "}
              </label>
              <input
                type="email"
                id="email"
                className="profileInput shadow-sm bg-inputBgColor border-gray-300 text-white text-xl rounded-lg focus:ring-primary-500 focus:border-gray-50 block w-full p-2.5 "
                placeholder="Your Email ID"
                required
                disabled
                value={email || ""}
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-white text-xl font-medium "
              >
                <span className={preahvihear.className}>
                  {/* Your Name<span className="text-red text-2xl">*</span> */}
                  Team Member 1 Email
                  <span className="text-red text-2xl">*</span>
                </span>{" "}
              </label>
              <input
                type="email"
                id="email"
                className="profileInput shadow-sm bg-inputBgColor border-gray-300 text-white text-xl rounded-lg focus:ring-primary-500 focus:border-gray-50 block w-full p-2.5 "
                placeholder="Team Member Email"
                required
                value={teamMember1Email}
                onChange={(e) => {
                  setTeamMember1Email(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-white text-xl font-medium "
              >
                <span className={preahvihear.className}>
                  {/* Your Name<span className="text-red text-2xl">*</span> */}
                  Team Member 2 Email
                  <span className="text-red text-2xl">*</span>
                </span>{" "}
              </label>
              <input
                type="email"
                id="email"
                className="profileInput shadow-sm bg-inputBgColor border-gray-300 text-white text-xl rounded-lg focus:ring-primary-500 focus:border-gray-50 block w-full p-2.5 "
                placeholder="Team Member Email"
                required
                value={teamMember2Email}
                onChange={(e) => {
                  setTeamMember2Email(e.target.value);
                }}
              />
            </div>

            <Button text={"Submit"} />
          </form>
        </div>
        {/* {successSubmit()} */}
      </section>
    </>
  );
};

export default createTeam;
