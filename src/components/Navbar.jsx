'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    // later i replace this with auth
    const user = null

    const navLinks = (
        <>
            <li>
                <Link
                    href="/"
                    className="hover:text-lime-400 transition duration-300"
                >
                    Home
                </Link>
            </li>

            <li>
                <Link
                    href="/facilities"
                    className="hover:text-lime-400 transition duration-300"
                >
                    All Facilities
                </Link>
            </li>

          
                    <li>
                        <Link
                            href="/my-bookings"
                            className="hover:text-lime-400 transition duration-300"
                        >
                            My Bookings
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/add-facility"
                            className="hover:text-lime-400 transition duration-300"
                        >
                            Add Facility
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/manage-facilities"
                            className="hover:text-lime-400 transition duration-300"
                        >
                            Manage My Facilities
                        </Link>
                    </li>
                
            
        </>
    )

    return (
        <header className="fixed top-0 left-0 w-full z-50">
            <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4">
                <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl px-5 py-3 flex items-center justify-between shadow-lg">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/assets/logoSport.png"
                            alt="SportNest Logo"
                            width={50}
                            height={50}
                            className="object-contain"
                        />

                        <div>
                            <h1 className="text-green-600 text-3xl font-extrabold italic">
                                Sport<span className='text-blue-600'>Nest</span>
                            </h1>

                            <p className="text-gray-400 text-xs">
                                --Sports Booking Platform--
                            </p>
                        </div>
                    </Link>

                    <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-white">
                        {navLinks}
                    </ul>

                    <div className="hidden lg:flex items-center gap-4">
                        {!user && (
                            <Link href="/login">
                                <button className="bg-lime-400 hover:bg-lime-300 text-black font-semibold px-6 py-3 rounded-full transition duration-300">
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden text-white"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {isOpen && (
                    <div className="lg:hidden mt-3 backdrop-blur-md bg-[#0f172a]/90 border border-white/10 rounded-2xl p-5 text-white">
                        <ul className="space-y-4 font-medium">
                            {navLinks}

                            <div className="border-t border-white/10 pt-4">
                                {!user && (
                                    <Link href="/login">
                                        <button className="w-full bg-lime-400 hover:bg-lime-300 text-black transition duration-300 py-3 rounded-xl font-semibold">
                                            Login
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar