import React from 'react'
import LoginPage from '@components/LoginPage';
import { useSelector } from "react-redux";


const page = () => {
    // const user = useSelector((state) => state.user.user);
    // if (user)
    //     router.push("/profile")
    return (
        <div className='flex flex-col mx-5 gap-5 mt-36 h-full items-center justify-center'>
            <LoginPage textSize={"4xl"} gap={"mb-5"} />
        </div >
    )
}

export default page