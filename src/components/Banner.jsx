'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, PlayCircle } from 'lucide-react'

const images = [
    '/assets/banner1.png',
    '/assets/banner2.png',
]

const Banner = () => {
    const [currentImage, setCurrentImage] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
            )
        }, 60000)

        return () => clearInterval(interval)
    }, [])

    return (
        <section className="relative h-screen overflow-hidden">

            {/* Background Images */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0"
                >
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${images[currentImage]})`,
                        }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/65 z-10"></div>

            {/* Gradient Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/70 via-black/30 to-black/70 z-10"></div>

            {/* Floating Blur Effect */}
            <div className="absolute top-32 left-20 w-72 h-72 bg-lime-400/20 blur-[120px] rounded-full z-10"></div>

            <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full z-10"></div>

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-5 h-full flex items-center">

                <div className="max-w-3xl">

                    {/* Small Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md px-5 py-2 rounded-full text-sm text-lime-300 mb-6"
                    >
                        ⚽ Book Premium Sports Facilities Anytime
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-black leading-tight text-white"
                    >
                        Play Smarter <br />

                        <span className="text-lime-400">
                            Book Faster
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-lg md:text-xl text-gray-300 mt-6 leading-relaxed max-w-2xl"
                    >
                        Discover football turfs, badminton courts, swimming pools,
                        tennis arenas, and more. Reserve your favorite sports
                        facility instantly with SportNest.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                        className="flex flex-col sm:flex-row gap-5 mt-10"
                    >
                        <Link href="/facilities">
                            <button className="group bg-lime-400 hover:bg-lime-300 text-black font-bold px-8 py-4 rounded-full flex items-center gap-2 transition duration-300 hover:scale-105 cursor-pointer">
                                Explore Facilities

                                <ArrowRight
                                    size={20}
                                    className="group-hover:translate-x-1 transition duration-300"
                                />
                            </button>
                        </Link>

                        <button className="group border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold px-8 py-4 rounded-full flex items-center gap-3 transition duration-300 cursor-pointer">
                            <PlayCircle
                                size={22}
                                className="group-hover:scale-110 transition duration-300"
                            />

                            Watch Preview
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.4 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-14"
                    >
                        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-5">
                            <h2 className="text-3xl font-black text-lime-400">
                                50+
                            </h2>

                            <p className="text-gray-300 text-sm mt-1">
                                Sports Venues
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-5">
                            <h2 className="text-3xl font-black text-lime-400">
                                10K+
                            </h2>

                            <p className="text-gray-300 text-sm mt-1">
                                Happy Players
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-5">
                            <h2 className="text-3xl font-black text-lime-400">
                                24/7
                            </h2>

                            <p className="text-gray-300 text-sm mt-1">
                                Booking Access
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-5">
                            <h2 className="text-3xl font-black text-lime-400">
                                99%
                            </h2>

                            <p className="text-gray-300 text-sm mt-1">
                                Positive Reviews
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Banner