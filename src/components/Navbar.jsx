'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, CalendarDays, PlusSquare, LayoutDashboard, LogOut } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)
    const pathname = usePathname()

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

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/facility', label: 'All Facilities' },
        ...(user ? [
            { href: '/my-bookings', label: 'My Bookings' },
            { href: '/add-facility', label: 'Add Facility' },
            { href: '/manage-facilities', label: 'Manage Facilities' },
        ] : [])
    ]

    return (
        <header className="fixed top-0 left-0 w-full z-50">
            <nav className="max-w-7xl mx-auto px-4 md:px-6 pt-3">

                {/* Main Bar */}
                <div className="flex items-center justify-between bg-[#080f1c]/40 backdrop-blur-2xl border border-white/8 rounded-2xl px-4 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 shrink-0">
                        <div className="relative w-12 h-12">
                            <Image
                                src="/assets/logoSport.png"
                                alt="SportNest Logo"
                                fill
                                className="object-contain drop-shadow-lg"
                            />
                            <div className="absolute inset-0 bg-lime-400/15 blur-xl rounded-full" />
                        </div>
                        <div className="leading-tight">
                            <span className="text-[28px] font-black italic tracking-tight">
                                <span className="text-lime-400">Sport</span>
                                <span className="text-white">Nest</span>
                            </span>
                            <p className="text-[9px] text-gray-400 uppercase tracking-[0.12em] font-medium leading-none mt-0.5">
                                Sports Booking
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Nav Links */}
                    <ul className="hidden lg:flex items-center gap-1">
                        {navLinks.map(({ href, label }) => {
                            const isActive = pathname === href
                            return (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className={`relative px-3.5 py-2 text-[15px] rounded-lg hover:bg-white/5 transition-all duration-200 block
                    ${isActive
                                                ? 'text-lime-400 font-bold bg-white/5'
                                                : 'font-medium text-gray-300 hover:text-lime-400'
                                            }`}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>

                    {/* Desktop Right */}
                    <div className="hidden lg:flex items-center gap-2">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(v => !v)}
                                    className="flex items-center gap-2 bg-white/5 hover:bg-white/8 border border-white/10 hover:border-lime-400/30 rounded-xl px-3 py-2 transition-all duration-200 cursor-pointer"
                                >
                                    {/* Avatar */}
                                    <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-lime-400/40 shrink-0">
                                        {user?.image ? (
                                            <img
                                                src={user.image}
                                                alt={user.name}
                                                referrerPolicy="no-referrer"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-lime-400/20 flex items-center justify-center text-lime-400 text-[10px] font-bold">
                                                {user.name?.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-white text-[15px] font-semibold max-w-[100px] truncate">
                                        {user.name || user.email}
                                    </span>
                                    <ChevronDown
                                        size={12}
                                        className={`text-gray-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {/* Dropdown */}
                                {dropdownOpen && (
                                    <div className="absolute top-[calc(100%+8px)] right-0 w-52 bg-[#080f1c]/98 backdrop-blur-2xl border border-white/10 rounded-xl p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
                                        {/* User info */}
                                        <div className="px-3 py-2 border-b border-white/6 mb-1">
                                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Signed in as</p>
                                            <p className="text-[15px] text-gray-200 mt-0.5 truncate">{user.email}</p>
                                        </div>

                                        {[
                                            { href: '/my-bookings', label: 'My Bookings', Icon: CalendarDays },
                                            { href: '/add-facility', label: 'Add Facility', Icon: PlusSquare },
                                            { href: '/manage-facilities', label: 'Manage Facilities', Icon: LayoutDashboard },
                                        ].map(({ href, label, Icon }) => (
                                            <Link
                                                key={href}
                                                href={href}
                                                onClick={() => setDropdownOpen(false)}
                                                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-150 group"
                                            >
                                                <Icon size={13} className="text-gray-600 group-hover:text-lime-400 transition-colors shrink-0" />
                                                {label}
                                            </Link>
                                        ))}

                                        <div className="h-px bg-white/6 my-1" />

                                        <button
                                            onClick={handleSignOut}
                                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[12px] text-red-400/80 hover:text-red-400 hover:bg-red-500/6 transition-all duration-150 group cursor-pointer"
                                        >
                                            <LogOut size={13} className="shrink-0" />
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5">
                                <Link href="/login">
                                    <button className="cursor-pointer text-gray-300 hover:text-white font-medium text-[15px] px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-200">
                                        Login
                                    </button>
                                </Link>
                                <Link href="/signup">
                                    <button className="cursor-pointer bg-lime-400 text-black font-bold text-[15px] px-4 py-2 rounded-xl transition-all duration-200 hover:bg-lime-300 hover:shadow-[0_0_20px_rgba(163,230,53,0.5)]">
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden text-white p-1"
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden mt-2 bg-[#080f1c]/98 backdrop-blur-2xl border border-white/8 rounded-2xl p-4 shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
                        <ul className="flex flex-col gap-1">
                            {navLinks.map(({ href, label }) => {
                                const isActive = pathname === href
                                return (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            onClick={() => setIsOpen(false)}
                                            className={`block px-3 py-2 text-[13px] rounded-lg transition-all duration-150
                    ${isActive
                                                    ? 'text-white font-bold bg-white/5'
                                                    : 'font-medium text-gray-400 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>

                        <div className="mt-3 pt-3 border-t border-white/8">
                            {user ? (
                                <>
                                    <div className="flex items-center gap-2.5 mb-3 px-1">
                                        <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-lime-400/40 shrink-0">
                                            {user?.image ? (
                                                <img src={user.image} alt={user.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-lime-400/20 flex items-center justify-center text-lime-400 text-xs font-bold">
                                                    {user.name?.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold text-[13px]">{user.name}</p>
                                            <p className="text-gray-500 text-[11px]">{user.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { handleSignOut(); setIsOpen(false) }}
                                        className="flex items-center justify-center gap-2 w-full bg-red-500/8 border border-red-500/15 text-red-400 font-medium text-[13px] py-2.5 rounded-xl hover:bg-red-500/12 transition duration-200 cursor-pointer"
                                    >
                                        <LogOut size={13} />
                                        Log Out
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Link href="/login" onClick={() => setIsOpen(false)}>
                                        <button className="w-full border border-white/10 text-gray-300 font-medium text-[13px] py-2.5 rounded-xl hover:border-white/20 hover:text-white transition duration-200 cursor-pointer">
                                            Login
                                        </button>
                                    </Link>
                                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                                        <button className="w-full bg-lime-400 text-black font-bold text-[13px] py-2.5 rounded-xl hover:bg-lime-300 transition duration-200 cursor-pointer">
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