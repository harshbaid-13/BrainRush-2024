"use client"
import Buttons from '@components/Buttons/Buttons';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Teams = () => {
    const { data: session } = useSession();
    const [qrData, setQrData] = useState();
    const getQr = async () => {
        const response = await fetch(`/api/test/${session?.user?.id}`);
        const data = await response.json();
        setQrData(data);
    }
    const [creatTeam, setCreatTeam] = useState(false)
    function teamForm() {
        return (
            <>
                <section class="text-gray-400 body-font relative">
                    <div class="container px-5 py-24 mx-auto">
                        <div class="flex flex-col text-center w-full mb-12">
                            <h1 class="sm:text-3xl text-white text-6xl title-font font-2xl mb-3">Create Your Team</h1>
                            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
                        </div>
                        <div class="lg:w-1/2 md:w-2/3 mx-auto">
                            <div class="flex flex-wrap -m-2">
                                <div class="p-2 w-1/2">
                                    <div class="relative">
                                        <label for="name" class="leading-7 text-sm text-gray-400">Other's Name</label>
                                        <input type="text" id="name" name="name" class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                </div>
                                <div class="p-2 w-1/2">
                                    <div class="relative">
                                        <label for="email" class="leading-7 text-sm text-gray-400">Other's Email</label>
                                        <input type="email" id="email" name="email" class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                </div>
                                <div class="p-2 w-full">
                                    <div class="relative">
                                        <label for="message" class="leading-7 text-sm text-gray-400">Team Name</label>
                                        <input type="text" id="teamName" name="teamName" class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                </div>
                                <div class="p-2 w-full">
                                    <button class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"><Buttons title={"Send Request"} /></button>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
    return (
        <>
            <section class="text-gray-600  px-2 body-font" style={
                {
                    // height: "90vh"
                }
            }>
                <div class="container px-5 py-24 mx-auto flex flex-wrap">
                    <div class="flex flex-wrap -m-4">
                        <div class="p-4 lg:w-1/2 md:w-full">
                            <div class="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                                <div class="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                                    {/* <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-8 h-8" viewBox="0 0 24 24">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                    </svg> */}
                                </div>
                                <div class="flex-grow">
                                    <h2 class="text-white text-6xl title-font font-2xl mb-3">Join Team</h2>
                                    <h1 class="leading-relaxed text-base">Team : Poogle</h1>
                                    <p class="leading-relaxed text-base">Other Member: Pratik Kumar Agarwal</p>
                                    <a class="mt-3 text-indigo-500 inline-flex me-2 items-center">
                                        <Buttons title={"Cancel Request"} />
                                    </a>
                                    <a class="mt-3 text-indigo-500 inline-flex ms-2 items-center">
                                        <Buttons title={"Confirm Request"} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="p-4 lg:w-1/2 md:w-full">
                            <div class="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                                <div class="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                                <div class="flex-grow">
                                    <h2 class="text-white text-6xl title-font font-2xl mb-3">Create Team</h2>
                                    <p class="leading-relaxed text-base">Create your own team of member two including you by clicking the button.</p>
                                    <a class="mt-3 text-indigo-500 inline-flex items-center" onClick={() => {
                                        setCreatTeam(true)
                                    }}>
                                        <Buttons title={"Create Team"} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=''>
                    {creatTeam ? teamForm() : ""}
                </div>
            </section>



            {/* <h1 className="flex justify-center text-white">Kodikas 2K23 - Teams Page</h1>
            <h1 className="flex justify-center text-white">My Team QR</h1> */}
            {console.log(qrData)}
            <div className='flex flex-col justify-center'>
                {qrData && <img src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${qrData}`} width={400} height={400} alt="qr" />}
                <button className='text-white' onClick={getQr}>Get Team QR</button>
            </div>
        </>
    )
}

export default Teams