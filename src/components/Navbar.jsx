'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    // later replace with auth
    const user = null

    const navLinks = (
        <>
            <li>
                <Link
                    href="/"
                    className="relative group"
                >
                    Home

                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
            </li>

            <li>
                <Link
                    href="/facility"
                    className="relative group"
                >
                    All Facilities

                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
            </li>

            <li>
                <Link
                    href="/my-bookings"
                    className="relative group"
                >
                    My Bookings

                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
            </li>

            <li>
                <Link
                    href="/add-facility"
                    className="relative group"
                >
                    Add Facility

                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
            </li>

            <li>
                <Link
                    href="/manage-facilities"
                    className="relative group"
                >
                    Manage Facilities

                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
            </li>
        </>
    )

    return (
        <header className="fixed top-0 left-0 w-full z-50">
            <nav className="max-w-7xl mx-auto px-4 md:px-8 py-5">

                <div className="flex items-center justify-between bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-6 py-4 shadow-2xl">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3"
                    >
                        <div className="relative">
                            <Image
                                src="/assets/logoSport.png"
                                alt="SportNest Logo"
                                width={55}
                                height={55}
                                className="object-contain drop-shadow-lg"
                            />

                            <div className="absolute inset-0 bg-lime-400/20 blur-2xl rounded-full"></div>
                        </div>

                        <div>
                            <h1 className="text-3xl font-black italic tracking-wide">
                                <span className="text-lime-400">
                                    Sport
                                </span>

                                <span className="text-blue-600">
                                    Nest
                                </span>
                            </h1>

                            <p className="text-sm text-gray-300 tracking-[1px] uppercase">
                                Sports Booking Platform
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden lg:flex items-center gap-10 text-white font-medium text-sm">
                        {navLinks}
                    </ul>

                    {/* Login Button */}
                    <div className="hidden lg:flex">
                        {!user && (
                            <Link href="/login">
                                <button className="cursor-pointer relative overflow-hidden bg-lime-400 text-black font-bold px-7 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(163,230,53,0.7)]">

                                    <span className="relative z-10">
                                        Login
                                    </span>

                                </button>
                            </Link>
                        )}
                    </div>
                    {/* Sign up Button */}
                    <div className="hidden lg:flex">
                        {!user && (
                            <Link href="/signup">
                                <button className="cursor-pointer relative overflow-hidden bg-lime-400 text-black font-bold px-7 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(163,230,53,0.7)]">

                                    <span className="relative z-10">
                                        Sign Up
                                    </span>

                                </button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden text-white"
                    >
                        {isOpen ? (
                            <X size={30} />
                        ) : (
                            <Menu size={30} />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden mt-4 bg-[#0B1220]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">

                        <ul className="flex flex-col gap-5 text-white font-medium">
                            {navLinks}
                        </ul>

                        {!user && (
                            <Link href="/login">
                                <button className="w-full mt-6 bg-lime-400 text-black font-bold py-3 rounded-2xl hover:bg-lime-300 transition duration-300 cursor-pointer">
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar