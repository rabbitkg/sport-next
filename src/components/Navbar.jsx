'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { Menu, X, ChevronDown, CalendarDays, PlusSquare, LayoutDashboard, LogOut } from 'lucide-react'
import { Avatar } from '@heroui/react'
import { authClient } from '@/lib/auth-client'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const { data: session } = authClient.useSession()
    const user = session?.user

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleSignOut = async () => {
        await authClient.signOut()
        setDropdownOpen(false)
    }

    return (
        <header className="fixed top-0 left-0 w-full z-50">
            <nav className="max-w-7xl mx-auto px-4 md:px-8 py-5">

                <div className="flex items-center justify-between bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-6 py-4 shadow-2xl">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
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
                                <span className="text-lime-400">Sport</span>
                                <span className="text-white">Nest</span>
                            </h1>
                            <p className="text-sm text-gray-300 uppercase">Sports Booking Platform</p>
                        </div>
                    </Link>

                    {/* Desktop Nav Links */}
                    <ul className="hidden lg:flex items-center gap-10 text-white font-medium text-sm">
                        <li>
                            <Link href="/" className="relative group">
                                Home
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/facility" className="relative group">
                                All Facilities
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                        {user && (
                            <>
                                <li>
                                    <Link href="/my-bookings" className="relative group">
                                        My Bookings
                                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/add-facility" className="relative group">
                                        Add Facility
                                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/manage-facilities" className="relative group">
                                        Manage Facilities
                                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Desktop Right */}
                    <div className="hidden lg:flex items-center gap-3">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                {/* Profile Button */}
                                <button
                                    onClick={() => setDropdownOpen(v => !v)}
                                    className="flex items-center gap-2 border border-white/20 hover:border-lime-400/50 rounded-full px-3 py-1.5 transition-all duration-200 cursor-pointer"
                                >
                                    <Avatar>
        <Avatar.Image referrerPolicy="no-referrer" alt="John Doe" src={user?.image} />
        <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
      </Avatar>
                                    <span className="text-white text-sm font-semibold max-w-[110px] truncate">
                                        {user.name || user.email}
                                    </span>
                                    <ChevronDown
                                        size={14}
                                        className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {/* Dropdown */}
                                {dropdownOpen && (
                                    <div className="absolute top-[calc(100%+10px)] right-0 w-56 bg-[#0B1220]/98 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                                        {/* User info */}
                                        <div className="px-3 py-2.5 border-b border-white/8 mb-1">
                                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Signed in as</p>
                                            <p className="text-xs text-gray-300 mt-0.5 truncate">{user.email}</p>
                                        </div>

                                        <Link
                                            href="/my-bookings"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/6 transition-all duration-150 group"
                                        >
                                            <CalendarDays size={14} className="text-gray-500 group-hover:text-lime-400 transition-colors" />
                                            My Bookings
                                        </Link>

                                        <Link
                                            href="/add-facility"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/6 transition-all duration-150 group"
                                        >
                                            <PlusSquare size={14} className="text-gray-500 group-hover:text-lime-400 transition-colors" />
                                            Add Facility
                                        </Link>

                                        <Link
                                            href="/manage-facilities"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/6 transition-all duration-150 group"
                                        >
                                            <LayoutDashboard size={14} className="text-gray-500 group-hover:text-lime-400 transition-colors" />
                                            Manage Facilities
                                        </Link>

                                        <div className="h-px bg-white/8 my-1" />

                                        <button
                                            onClick={handleSignOut}
                                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/8 transition-all duration-150 group cursor-pointer"
                                        >
                                            <LogOut size={14} className="text-red-400/60 group-hover:text-red-300 transition-colors" />
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link href="/login">
                                    <button className="cursor-pointer text-white font-semibold text-sm px-5 py-2.5 rounded-full border border-white/20 hover:border-lime-400/50 hover:text-lime-400 transition-all duration-200">
                                        Login
                                    </button>
                                </Link>
                                <Link href="/signup">
                                    <button className="cursor-pointer bg-lime-400 text-black font-bold px-7 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(163,230,53,0.7)]">
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden text-white"
                    >
                        {isOpen ? <X size={30} /> : <Menu size={30} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden mt-4 bg-[#0B1220]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                        <ul className="flex flex-col gap-5 text-white font-medium">
                            <li>
                                <Link href="/" onClick={() => setIsOpen(false)} className="relative group">
                                    Home
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/facility" onClick={() => setIsOpen(false)} className="relative group">
                                    All Facilities
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                            {user && (
                                <>
                                    <li>
                                        <Link href="/my-bookings" onClick={() => setIsOpen(false)} className="relative group">
                                            My Bookings
                                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/add-facility" onClick={() => setIsOpen(false)} className="relative group">
                                            Add Facility
                                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/manage-facilities" onClick={() => setIsOpen(false)} className="relative group">
                                            Manage Facilities
                                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>

                        <div className="mt-6 pt-5 border-t border-white/10">
                            {user ? (
                                <>
                                    <div className="flex items-center gap-3 mb-4">
                                        <Avatar>
        <Avatar.Image referrerPolicy="no-referrer" alt="John Doe" src={user?.image} />
        <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
      </Avatar>
                                        <div>
                                            <p className="text-white font-semibold text-sm">{user.name}</p>
                                            <p className="text-gray-400 text-xs">{user.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { handleSignOut(); setIsOpen(false) }}
                                        className="flex items-center justify-center gap-2 w-full bg-red-500/10 border border-red-500/20 text-red-400 font-semibold py-3 rounded-2xl hover:bg-red-500/18 transition duration-300 cursor-pointer"
                                    >
                                        <LogOut size={15} />
                                        Log Out
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <Link href="/login" onClick={() => setIsOpen(false)}>
                                        <button className="w-full border border-white/20 text-white font-bold py-3 rounded-2xl hover:border-lime-400/50 hover:text-lime-400 transition duration-300 cursor-pointer">
                                            Login
                                        </button>
                                    </Link>
                                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                                        <button className="w-full bg-lime-400 text-black font-bold py-3 rounded-2xl hover:bg-lime-300 transition duration-300 cursor-pointer">
                                            Sign Up
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar