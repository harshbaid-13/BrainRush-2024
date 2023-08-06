"use client";
import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import page from "@app/teams/page.jsx";
import "./page.css";

const Profile = () => {
  // todo ek useeffect likhna hai to get user details jb profile pe ayega
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name);
  const email = session?.user?.email;
  const [department, setDepartment] = useState(null);
  const [year, setYear] = useState(null);
  const [contact, setContact] = useState("");
  const [submit, setSubmit] = useState(false);
  // const getQr = async () => {
  //     const response = await fetch(`/api/test/${session?.user?.id}`);
  //     const data = await response.json();
  //     setQrData(data);
  // }
  // console.log(session.user)

  const userId = session?.user?.id;
  const submitHandler = async () => {
    try {
      await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, department, year, userId, contact }),
      });
      setSubmit(true);
    } catch (err) {
      console.log(err);
    }
  };
  const successSubmit = () => {
    if (submit) {
      return <page />;
    }
  };

  return (
    <section class="">
      <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Complete Your Profile
        </h2>

        <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>
        <form action="#" class="space-y-8" onSubmit={submitHandler}>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium">
              Your Name<span className="text-red text-2xl">*</span>
            </label>
            <input
              type="text"
              id="email"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Your Name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <label for="subject" class="block mb-2 text-sm font-medium ">
              Your Email<span className="text-red text-2xl">*</span>
            </label>
            <input
              type="email"
              id="email"
              class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Your Email ID"
              required
              value={email}
            />
          </div>
          <div>
            <label for="subject" class="block mb-2 text-sm font-medium ">
              Contact Number<span className="text-red text-2xl">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="123-456-7890"
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              required
              class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              value={contact}
              onChange={(e) => {
                setContact(e.target.value);
              }}
            />
          </div>
          <div>
            <label for="Department" class="block mb-2 text-sm font-medium ">
              Department<span className="text-red text-2xl">*</span>
            </label>

            <select
              id="Department"
              name="Department"
              class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
              required
            >
              <option>Select</option>
              <option value="CSE">CSE</option>
              <option value="CSE-DS">CSE-DS</option>
              <option value="AIML">AIML</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EE">EE</option>
              <option value="ME">ME</option>
            </select>
          </div>
          <div>
            <label for="Year" class="block mb-2 text-sm font-medium ">
              Year<span className="text-red text-2xl">*</span>
            </label>

            <select
              id="Year"
              name="Year"
              class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
              required
            >
              <option>Select</option>
              <option value={2027}>1st</option>
              <option value={2026}>2nd</option>
              <option value={2025}>3rd</option>
              <option value={2024}>4th</option>
            </select>
          </div>
          <button
            type="submit"
            class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            // onClick={() => {
            //   submitHandler;
            //   setSubmit(true);
            // }}
          >
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Submit Details
            </span>
          </button>
          {/* <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Purple to Pink</button> */}
        </form>
      </div>
      {successSubmit()}
    </section>
    // <h1 className="flex justify-center">{session?.user?.name}</h1>
  );
};

export default Profile;
