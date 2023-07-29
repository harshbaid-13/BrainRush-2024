"use client";
import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useEffect, useState } from 'react';

const Nav = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    useEffect(() => {
        const setProvidersFunc = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setProvidersFunc();
    }, [])
    return (
        <>
            { }
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a href='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <Image src={"/assets/images/logo.png"} width={40} height={30} alt='Logo' className='object-contain' />
                        <span className="ml-3 text-xl">Kodikas</span>
                    </a>
                    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                        <Link href={"/profile"} className="mr-5 hover:text-logoYellow">Profile</Link>
                        <Link href={"/teams"} className="mr-5 hover:text-logoYellow">Teams</Link>
                        {/* <Link href={"#venue"} className="mr-5 hover:text-logoYellow">Venue</Link> */}
                    </nav>
                    {session?.user ? (
                        <div className="flex gap-3 md:gap-5">
                            <Link href='/profile'>
                                <Image src={session?.user.image} width={37} height={37} alt='Profile' className='rounded-full' />
                            </Link>
                            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" onClick={signOut} >Sign Out
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>
                    ) : (<>
                        {providers && Object.values(providers).map((provider) => (
                            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" key={provider.name}
                                onClick={() => signIn(provider.id)} >Sign In
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </button>))}
                    </>)}
                </div>
            </header>
        </>
    )
}

export default Nav