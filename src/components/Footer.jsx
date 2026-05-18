import Link from 'next/link'
import Image from 'next/image'
import {    
    MapPin,
    Phone,
    Mail,
} from 'lucide-react'

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
    FaXTwitter
} from 'react-icons/fa6'

const Footer = () => {
    return (
        <footer className="relative bg-[#07111F] text-white overflow-hidden">

            {/* Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-lime-400/10 blur-[120px]"></div>

            <div className="max-w-7xl mx-auto px-5 py-16 relative z-10">

                {/* Main Footer */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Logo + About */}
                    <div>
                        <div className="flex items-center gap-3">

                            <Image
                                src="/assets/logoSport.png"
                                alt="SportNest Logo"
                                width={55}
                                height={55}
                            />

                            <div>
                                <h1 className="text-3xl font-black italic">
                                    <span className="text-lime-400">
                                        Sport
                                    </span>

                                    <span className="text-white">
                                        Nest
                                    </span>
                                </h1>

                                <p className="text-xs text-gray-400 tracking-[2px] uppercase">
                                    Sports Booking Platform
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-400 leading-relaxed mt-5">
                            SportNest helps players discover and book premium
                            sports facilities including football turfs,
                            badminton courts, swimming pools, and more.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 mt-6">

                            <Link
                                href="/"
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-lime-400 hover:text-black transition duration-300 flex items-center justify-center"
                            >
                                <FaFacebookF size={18} />
                            </Link>

                            <Link
                                href="/"
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-lime-400 hover:text-black transition duration-300 flex items-center justify-center"
                            >
                                <FaInstagram size={18} />
                            </Link>

                            <Link
                                href="/"
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-lime-400 hover:text-black transition duration-300 flex items-center justify-center"
                            >
                                <FaLinkedinIn size={18} />
                            </Link>

                            <Link
                                href="/"
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-lime-400 hover:text-black transition duration-300 flex items-center justify-center"
                            >
                                <FaYoutube size={18} />
                            </Link>

                            {/* New X Logo */}
                            <Link
                                href="/"
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-lime-400 hover:text-black transition duration-300 flex items-center justify-center"
                            >
                                <FaXTwitter size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h2 className="text-xl font-bold mb-6">
                            Quick Links
                        </h2>

                        <ul className="space-y-4 text-gray-400">

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
                                    Manage Facilities
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-xl font-bold mb-6">
                            Contact Info
                        </h2>

                        <div className="space-y-5 text-gray-400">

                            <div className="flex items-start gap-3">
                                <MapPin
                                    size={20}
                                    className="text-lime-400 mt-1"
                                />

                                <p>
                                    Dhaka, Bangladesh
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone
                                    size={20}
                                    className="text-lime-400"
                                />

                                <p>
                                    +880 1750-642449
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail
                                    size={20}
                                    className="text-lime-400"
                                />

                                <p>
                                    rabbitkgbd@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h2 className="text-xl font-bold mb-6">
                            Stay Updated
                        </h2>

                        <p className="text-gray-400 mb-5">
                            Get the latest updates, sports events, and exclusive
                            offers directly in your inbox.
                        </p>

                        <div className="space-y-4">

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-lime-400 text-white"
                            />

                            <button className="w-full bg-lime-400 hover:bg-lime-300 text-black font-bold py-4 rounded-2xl transition duration-300 cursor-pointer">
                                Subscribe Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-white/10 mt-14 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">

                    <p>
                        © 2026 SportNest. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">

                        <Link
                            href="/"
                            className="hover:text-lime-400 transition duration-300"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/"
                            className="hover:text-lime-400 transition duration-300"
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer