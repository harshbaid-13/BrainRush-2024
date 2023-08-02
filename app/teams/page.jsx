"use client"
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
    return (
        <>
            <h1 className="flex justify-center text-white">Kodikas 2K23 - Teams Page</h1>
            <h1 className="flex justify-center text-white">My Team QR</h1>
            {console.log(qrData)}
            <div className='flex flex-col justify-center'>
                {qrData && <img src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${qrData}`} width={400} height={400} alt="qr" />}
                <button className='text-white' onClick={getQr}>Get Team QR</button>
            </div>
        </>
    )
}

export default Teams