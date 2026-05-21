'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
    ClipboardCheck,
    CalendarCheck,
    Trophy,
    Users
} from 'lucide-react'
import Link from 'next/link'

const steps = [
    {
        id: '01',
        title: 'Choose Your Favorite Facility',
        icon: <ClipboardCheck size={28} />,
    },

    {
        id: '02',
        title: 'Book Date & Time Instantly',
        icon: <CalendarCheck size={28} />,
    },

    {
        id: '03',
        title: 'Play on Premium Sports Courts',
        icon: <Trophy size={28} />,
    },

    {
        id: '04',
        title: 'Join the Sports Community',
        icon: <Users size={28} />,
    },
]

const HowItWorks = () => {
    return (
        <section className="bg-[#0b1220f5] py-24 overflow-hidden">

            <div className="max-w-7xl mx-auto px-5">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

                    {/* Left Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >

                        {/* Small Title */}
                        <p className="uppercase tracking-[5px] text-lime-400 font-semibold text-sm mb-5">
                            How It Works
                        </p>

                        {/* Heading */}
                        <h1 className="text-4xl md:text-6xl font-black leading-tight text-white">

                            Book Your <br />

                            <span className="text-lime-400">
                                Sports Facility
                            </span>{' '}

                            In Minutes
                        </h1>

                        {/* Description */}
                        <p className="text-gray-400 text-lg leading-relaxed mt-7 max-w-xl">
                            SportNest makes sports facility booking fast,
                            secure, and hassle-free. Explore football turfs,
                            badminton courts, swimming pools, and more with
                            instant online reservations.
                        </p>

                        {/* Button */}
                        <Link
                        href={'/facility'}
                        >
                        <button 
                        className="mt-10 bg-lime-400 hover:bg-lime-300 text-black font-bold px-8 py-4 rounded-full transition duration-300 hover:scale-105 cursor-pointer">
                            Explore Facilities
                        </button>
                            </Link>

                        {/* Big Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            className="mt-14"
                        >

                            <div className="relative overflow-hidden rounded-[32px] group">

                                <Image
                                    src="/assets/howWork1.png"
                                    alt="Sports Player"
                                    width={700}
                                    height={700}
                                    className="w-full h-[500px] object-cover group-hover:scale-110 transition duration-700"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/20"></div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >

                        {/* Top Image */}
                        <div className="relative overflow-hidden rounded-[32px] group">

                            <Image
                                src="/assets/howWork2.png"
                                alt="Sports Court"
                                width={700}
                                height={500}
                                className="w-full h-[400px] object-cover group-hover:scale-110 transition duration-700"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20"></div>
                        </div>

                        {/* Steps */}
                        <div className="mt-10 space-y-5">

                            {steps.map((step, index) => (

                                <motion.div
                                    key={step.id}
                                    initial={{
                                        opacity: 0,
                                        x: 50,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.2,
                                    }}
                                    viewport={{ once: true }}
                                    whileHover={{
                                        scale: 1.02,
                                    }}
                                    className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 flex items-center justify-between gap-5 hover:border-lime-400/40 transition duration-300"
                                >

                                    <div className="flex items-center gap-5">

                                        {/* Icon */}
                                        <div className="w-16 h-16 rounded-2xl bg-lime-400/10 text-lime-400 flex items-center justify-center border border-lime-400/20">

                                            {step.icon}
                                        </div>

                                        {/* Text */}
                                        <h3 className="text-lg md:text-xl font-bold text-white">
                                            {step.title}
                                        </h3>
                                    </div>

                                    {/* Number */}
                                    <h2 className="text-4xl font-black text-white/20">
                                        {step.id}
                                    </h2>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks