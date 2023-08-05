"use client"
import React from 'react'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import "./page.css"

const Profile = () => {
    // todo ek useeffect likhna hai to get user details jb profile pe ayega 
    const { data: session }= useSession();
    const [name, setName] = useState(session?.user?.name)
    const email = session?.user?.email;
    const [department, setDepartment] = useState(null)
    const [year, setYear] = useState(null)
    const [contact, setContact] = useState("")
    const[submit, setSubmit] = useState(false)
    // const getQr = async () => {
    //     const response = await fetch(`/api/test/${session?.user?.id}`);
    //     const data = await response.json();
    //     setQrData(data);
    // }
    // console.log(session.user)

    const userId = session?.user?.id;
    // console.log(userId);
    const submitHandler = async () => {
        // console.log(userData)
        await fetch("/api/user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, department, year, userId }),
        })
    }
    const successSubmit=()=>{
        if(submit === true){
            return (<>
            <div id="alert-4" class="flex items-center p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
  <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span class="sr-only">Info</span>
  <div class="ml-3 text-sm font-medium">
    Thank you, Your profile have been successfully updated.
  </div>
  <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700" data-dismiss-target="#alert-4" aria-label="Close">
    <span class="sr-only">Close</span>
    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
    </svg>
  </button>
</div>
            </>)
        }
    }
console.log(userId)
console.log(name)
console.log(year)
console.log(department)

    return (
        <section class="">
            <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Complete Your Profile</h2>
                <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
                <form action="#" class="space-y-8">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium" >Your Name</label>
                        <input type="text" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Your Name" required value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }} />
                    </div>
                    <div>
                        <label for="subject" class="block mb-2 text-sm font-medium ">Your Email</label>
                        <input type="email" id="email" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Your Email ID" required value={session?.user?.email} />
                    </div>
                    <div>
                        <label for="subject" class="block mb-2 text-sm font-medium ">Contact Number</label>
                        <input type="tel" id="email" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Your Contact Number" value={contact}  onChange={(e) => {
                                setContact(e.target.value);
                            }} required />
                    </div>
                    <div>
                        <label for="Department" class="block mb-2 text-sm font-medium ">Department</label>

                        <select id="Department" name="Department" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" value={department}  onChange={(e) => {
                                setDepartment(e.target.value);
                            }} >
                            {/* <option disabled >Select</option> */}
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
                        <label for="Year" class="block mb-2 text-sm font-medium ">Year</label>

                        <select id="Year" name="Year" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        value={year}
                        onChange={(e)=>{
                            setYear(e.target.value)
                        }}
                        >
                            {/* <option disabled >Select</option> */}
                            <option value={2027}>1st</option>
                            <option value={2026}>2nd</option>
                            <option value={2025}>3rd</option>
                            <option value={2024}>4th</option>
                        </select>
                        
                    </div>
                    <button type='submit' class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800" onClick={()=>{
                        submitHandler;
                        setSubmit(true);
                    }
                                       
                    }>
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Submit Details
                        </span>
                    </button>
                    {/* <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Purple to Pink</button> */}
                </form>
            </div>
            {successSubmit}
        </section>
        // <h1 className="flex justify-center">{session?.user?.name}</h1>

    )
}

export default Profile