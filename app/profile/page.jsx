"use client";
import React, { useEffect, useState } from "react";
import "./page.css";
import { Preahvihear } from "next/font/google";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "@Reducers/features/profile";
import { useRouter } from "next/navigation";
import Loader from "@components/Loader/Loader";
import axios from "axios";

const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: ["400"],
});

const Profile = () => {
  // todo ek useeffect likhna hai to get user details jb profile pe ayega
  const dispatch = useDispatch();
  const router = useRouter();
  const profileData = useSelector((state) => state.profile.profile);
  const user = useSelector((state) => state.user.user);
  const [name, setName] = useState(profileData?.name);
  const email = profileData?.email;
  const [department, setDepartment] = useState(profileData?.department);
  const [year, setYear] = useState(profileData?.year);
  const [contact, setContact] = useState(profileData?.phoneNumber);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(profileData?.name);
    setDepartment(profileData?.department);
    setYear(profileData?.year);
    setContact(profileData?.phoneNumber);
  }, [profileData]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const submitHandler = async (event) => {
    event.preventDefault();
    if (!name.length || !department.length || !year || !contact) {
      alert("Fill the form completely!");
      return;
    }
    const phoneNumberPattern = /^\d{10}$/; // Validates a 10-digit number
    if (!phoneNumberPattern.test(contact))
      return alert("Enter a valid phone number!");
    if (department == "Select")
      return alert("Select your department!");
    if (year == "Select")
      return alert("Select your batch!");
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
        {
          name,
          department,
          year,
          contact,
        }
      );
      // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     name,
      //     department,
      //     year,
      //     contact,
      //   }),
      // });
      // const data = await res.json();
      // console.log(data);
      if (data.success) {
        dispatch(setProfile(data.data));
        router.push("/teams");
      } else {
        alert(data?.message);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-headerText ">
              <span className={preahvihear.className}>
                Complete Your Profile
              </span>
            </h2>

            <p className="mb-8 lg:mb-16 text-center font-medium text-subHeaderText sm:text-xl">
              <span className={preahvihear.className}>
                Build Your Profile and Shine in KODIKAS-2K23.
              </span>
            </p>
            <form className="space-y-8" onSubmit={submitHandler}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-700 font-medium"
                >
                  <span className={preahvihear.className}>
                    Your Name<span className="text-red text-2xl">*</span>
                  </span>{" "}
                </label>
                <input
                  type="text"
                  id="email"
                  className="profileInput shadow-sm bg-inputBgColor border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-500 focus:border-gray-50 block w-full p-2.5 "
                  placeholder="Your Name"
                  required
                  value={name || ""}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm text-gray-600 font-medium "
                >
                  <span className={preahvihear.className}>
                    {/* Your Name<span className="text-red text-2xl">*</span> */}
                    Your Email<span className="text-red text-2xl">*</span>
                  </span>{" "}
                </label>
                <input
                  type="email"
                  id="email"
                  className="profileInput shadow-sm bg-inputBgColor border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-500 focus:border-gray-50 block w-full p-2.5 "
                  placeholder="Your Email ID"
                  required
                  disabled
                  value={email || ""}
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-gray-600 text-sm font-medium "
                >
                  <span className={preahvihear.className}>
                    {/* Your Name<span className="text-red text-2xl">*</span> */}
                    Contact Number<span className="text-red text-2xl">*</span>
                  </span>{" "}
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="1234567890"
                  maxLength={10}
                  minLength={10}
                  required
                  className="profileInput shadow-sm bg-inputBgColor border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-500 focus:border-gray-50 block w-full p-2.5 "
                  value={contact == "1234567890" ? "" : contact || ""}
                  onChange={(e) => {
                    setContact(e.target.value);
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="Department"
                  className="block mb-2 text-gray-600 text-sm font-medium "
                >
                  <span className={preahvihear.className}>
                    {/* Your Name<span className="text-red text-2xl">*</span> */}
                    Department<span className="text-red text-2xl">*</span>
                  </span>{" "}
                </label>

                <select
                  id="Department"
                  name="Department"
                  className="profileInput shadow-sm bg-inputBgColor border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-500 focus:border-gray-50 block w-full p-2.5 "
                  value={department || ""}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                  required
                >
                  <option value="">Select</option>
                  <option value="CSE">CSE</option>
                  <option value="CSE-DS">CSE-DS</option>
                  <option value="CSE AIML">CSE AIML</option>
                  <option value="IT">IT</option>
                  <option value="IT AIML">IT AIML</option>
                  <option value="AUE">AUE</option>
                  <option value="ECE">ECE</option>
                  <option value="ECE VLSI">ECE VLSI</option>
                  <option value="EE">EE</option>
                  <option value="ME">ME</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="Year"
                  className="block mb-2 text-gray-600 text-sm font-medium "
                >
                  <span className={preahvihear.className}>
                    {/* Your Name<span className="text-red text-2xl">*</span> */}
                    Batch<span className="text-red text-2xl">*</span>
                  </span>{" "}
                </label>

                <select
                  id="Year"
                  name="Year"
                  className="profileInput shadow-sm bg-inputBgColor border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-500 focus:border-gray-50 block w-full p-2.5 "
                  value={year || ""}
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                  required
                >
                  <option value="">Select</option>
                  {/* <option value={2027}></option> */}
                  <option value={2024}>2020-24</option>
                  <option value={2025}>2021-25</option>
                  <option value={2026}>2022-26</option>
                </select>
              </div>
              <button
                type="submit"
                className="relative mt-5 text-center inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-btnColorDark to-btnColor hover:text-white  focus:ring-4 focus:outline-none focus:ring-purple-200 "
              >
                <span className="relative px-5 py-2.5 transition-all ease-in bg-white text-gray-700 duration-75 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                  <span className={preahvihear.className}>Submit Details</span>
                </span>
              </button>

              {/* <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Purple to Pink</button> */}
            </form>
          </>
        )}
      </div>
    </section>
    // <h1 className="flex justify-center">{session?.user?.name}</h1>
  );
};

export default Profile;
