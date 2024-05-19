"use client"
import React from 'react'
import { signIn, signOut, session } from "next-auth/react";
import Image from 'next/image';
import { Preahvihear } from "next/font/google";

const preahvihear = Preahvihear({
    subsets: ["latin"],
    weight: ["400"],
});

const LoginPage = ({ textSize, gap }) => {
    return (
        < div className='flex flex-col mx-5 mt-5 gap-5 h-full items-center justify-center' >
            <Image
                src="/assets/images/logo.png"
                className={gap}
                alt="BrainRush Logo"
                height={145}
                width={500}
            />
            {
                true ?
                    < button
                        className="relative inline-flex items-center justify-center p-1 pr-2 mb-0  overflow-hidden text-sm font-medium text-white rounded-lg hover:underline"
                        onClick={() => signIn("google", { callbackUrl: "/profile" })}
                    >
                        <span className={`relative px-3 text-2xl py-2 rounded-md ${textSize}`}>
                            <span className={preahvihear.className}>Enter the Arena</span>
                        </span>

                        <svg
                            fill="none"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-8 h-8 ml-2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button> : < button
                        className="relative inline-flex items-center justify-center p-1 pr-2 mb-0  overflow-hidden text-sm font-medium text-background rounded-lg group focus:ring-4 focus:outline-none focus:ring-bgGray "
                        onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                        <span className={`relative px-3 py-2 transition-all ease-in duration-75 bg-white hover:bg-gray-100 rounded-md ${textSize}`}>
                            <span className={preahvihear.className}>Sign Out</span>
                        </span>

                        <svg
                            fill="none"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-8 h-8 ml-2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
            }
        </div >
    )
}

export default LoginPage