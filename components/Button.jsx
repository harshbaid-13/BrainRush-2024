import React from 'react'
import { Preahvihear } from "next/font/google";

const preahvihear = Preahvihear({
    subsets: ["latin"],
    weight: ["400"],
});

const Button = ({ text, onClick = null, small = false }) => {
    return (
        <button
            className={`relative inline-flex items-center justify-center  ${small && "py-px"}  mb-0  overflow-hidden text-md font-medium text-white rounded-lg group focus:ring-4 focus:outline-none focus:ring-bgGray border-2 border-white hover:border-white hover:text-background hover:bg-white transition-all ease-in duration-75`}
            onClick={onClick}
        >
            <span className="relative px-3  py-2 rounded-md">
                <span className={preahvihear.className}>{text}</span>
            </span>
        </button>
    )
}

export default Button