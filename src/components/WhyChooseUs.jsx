'use client'

import { motion } from 'framer-motion'
import {
    Users,
    ShieldCheck,
    CalendarClock,
    Trophy,
    ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const features = [
    {
        id: 1,
        icon: <Users size={45} />,
        title: '15K+ Active Players',
        description: 'Thousands of sports lovers trust SportNest daily.',
    },

    {
        id: 2,
        icon: <Trophy size={45} />,
        title: 'Premium Facilities',
        description: 'Discover top-rated football turfs and courts.',
    },

    {
        id: 3,
        icon: <CalendarClock size={45} />,
        title: '24/7 Booking Access',
        description: 'Reserve your favorite facility anytime instantly.',
    },

    {
        id: 4,
        icon: <ShieldCheck size={45} />,
        title: 'Secure Experience',
        description: 'Fast, safe, and reliable online booking system.',
    },
]

const WhyChooseUs = () => {
    return (
        <section className="bg-[#d9d6cbb2] py-24 overflow-hidden shadow-2xl">

            <div className="max-w-7xl mx-auto px-5">

                <div
                    className="relative rounded-[40px] overflow-hidden"
                    style={{
                        clipPath:
                            'polygon(0 8%, 48% 0, 52% 8%, 100% 0, 100% 92%, 52% 100%, 48% 92%, 0 100%)',
                    }}
                >

                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('/assets/whyChooseBanner.png')",
                        }}
                    ></div>

                    {/* Dark Overlay */}
                    <div className="absolute inset-0"></div>

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/0 to-black/0"></div>

                    {/* Content */}
                    <div className="relative z-10 px-6 md:px-14 py-24">

                        {/* Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-center max-w-4xl mx-auto"
                        >

                            {/* Icon */}
                            <div className="w-24 h-24 rounded-3xl bg-lime-400/20 border border-lime-400/20 backdrop-blur-xl flex items-center justify-center mx-auto mb-8">

                                <Trophy
                                    size={42}
                                    className="text-lime-400"
                                />
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black leading-tight text-white">

                                Your Ultimate <br />

                                <span className="text-lime-400">
                                    Sports Booking
                                </span>{' '}

                                Experience
                            </h1>

                            <p className="text-gray-300 text-lg leading-relaxed mt-6">
                                SportNest helps players discover, explore,
                                and instantly reserve premium sports
                                facilities with a modern and hassle-free
                                booking experience.
                            </p>
                        </motion.div>

                        {/* Feature Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-20">

                            {features.map((feature, index) => (

                                <motion.div
                                    key={feature.id}
                                    initial={{ opacity: 0, y: 70 }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.7,
                                        delay: index * 0.2,
                                    }}
                                    viewport={{ once: true }}
                                    whileHover={{
                                        y: -10,
                                        scale: 1.03,
                                    }}
                                    className="bg-black/35 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 text-center group transition duration-500 hover:border-lime-400/40"
                                >

                                    {/* Icon */}
                                    <div className="w-24 h-24 rounded-full border border-lime-400/30 flex items-center justify-center mx-auto text-lime-400 bg-lime-400/10 group-hover:scale-110 transition duration-500">

                                        {feature.icon}
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-3xl font-black text-white mt-8 leading-snug">
                                        {feature.title}
                                    </h2>

                                    {/* Description */}
                                    <p className="text-gray-300 mt-5 leading-relaxed">
                                        {feature.description}
                                    </p>

                                    {/* Bottom Line */}
                                    <div className="w-16 h-1 rounded-full bg-lime-400 mx-auto mt-7"></div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            className="flex justify-center mt-16"
                        >
                            <Link href={'/facility'}>
                            <button className="group bg-lime-400 hover:bg-lime-300 text-black font-bold px-10 py-5 rounded-full flex items-center gap-3 transition duration-300 hover:scale-105 cursor-pointer">

                                Explore Facilities

                                <ArrowRight
                                    size={22}
                                    className="group-hover:translate-x-1 transition duration-300"
                                    />
                            </button>
                                    </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs