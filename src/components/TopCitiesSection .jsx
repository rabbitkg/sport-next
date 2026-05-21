"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMapPin, FiChevronDown, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

// flagcdn.com — works on ALL operating systems including Windows
const flagUrl = (code) => `https://flagcdn.com/w40/${code}.png`;

const cities = [
    { name: "Dhaka",       countryCode: "bd", sports: ["Football Grounds", "Badminton Courts", "Swimming Pools", "Cricket Grounds", "Tennis Courts", "Basketball Courts"] },
    { name: "Chittagong",  countryCode: "bd", sports: ["Football Grounds", "Cricket Grounds", "Swimming Pools", "Badminton Courts"] },
    { name: "Sylhet",      countryCode: "bd", sports: ["Cricket Grounds", "Football Grounds", "Tennis Courts", "Badminton Courts"] },
    { name: "Rajshahi",    countryCode: "bd", sports: ["Football Grounds", "Badminton Courts", "Basketball Courts"] },
    { name: "Khulna",      countryCode: "bd", sports: ["Football Grounds", "Swimming Pools", "Cricket Grounds"] },
    { name: "Mymensingh",  countryCode: "bd", sports: ["Football Grounds", "Badminton Courts", "Cricket Grounds"] },
    { name: "Comilla",     countryCode: "bd", sports: ["Cricket Grounds", "Football Grounds", "Badminton Courts"] },
    { name: "Narayanganj", countryCode: "bd", sports: ["Football Grounds", "Swimming Pools", "Badminton Courts"] },
    { name: "Dubai",       countryCode: "ae", sports: ["Tennis Courts", "Swimming Pools", "Football Grounds", "Basketball Courts", "Badminton Courts"] },
    { name: "London",      countryCode: "gb", sports: ["Football Grounds", "Tennis Courts", "Swimming Pools", "Basketball Courts"] },
    { name: "Toronto",     countryCode: "ca", sports: ["Ice Rinks", "Basketball Courts", "Swimming Pools", "Tennis Courts"] },
    { name: "Singapore",   countryCode: "sg", sports: ["Swimming Pools", "Badminton Courts", "Tennis Courts", "Football Grounds"] },
];

// ── Animation variants ─────────────────────────────────────────────────────────
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

const sportTagVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (i) => ({
        opacity: 1, scale: 1,
        transition: { duration: 0.2, delay: i * 0.04, ease: "easeOut" },
    }),
};

// ── City Card ──────────────────────────────────────────────────────────────────
const CityCard = ({ city }) => {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            layout
            variants={cardVariants}
            whileHover={{ scale: 1.015, borderColor: "rgba(163,230,53,0.3)" }}
            transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
            className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden cursor-pointer transition-colors duration-200"
            onClick={() => setOpen(v => !v)}
        >
            <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">

                    <motion.div
                        animate={{ rotate: open ? [0, -10, 10, 0] : 0 }}
                        transition={{ duration: 0.4 }}
                        className="shrink-0 w-6 h-[18px] rounded-sm overflow-hidden shadow-md"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={flagUrl(city.countryCode)}
                            alt={city.countryCode.toUpperCase()}
                            width={40}
                            height={27}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    <span className="text-white font-semibold text-sm">{city.name}</span>

                    {/* venue count pill — fades out when open */}
                    <AnimatePresence>
                        {!open && (
                            <motion.span
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                className="px-2 py-0.5 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-400 text-[10px] font-bold"
                            >
                                {city.sports.length} venues
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                    <FiChevronDown className="text-gray-400" size={16} />
                </motion.div>
            </div>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-5 pb-4 pt-3 border-t border-white/8">
                            <motion.div
                                className="flex flex-wrap gap-x-1 gap-y-2"
                                initial="hidden"
                                animate="visible"
                            >
                                {city.sports.map((sport, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={sportTagVariants}
                                        className="inline-flex items-center"
                                    >
                                        <Link
                                            href={`/facility?location=${encodeURIComponent(city.name)}&type=${encodeURIComponent(sport)}`}
                                            onClick={e => e.stopPropagation()}
                                            className="text-lime-400 hover:text-lime-300 hover:underline underline-offset-2 text-xs font-medium transition-colors duration-150"
                                        >
                                            {sport} in {city.name}
                                        </Link>
                                        {i < city.sports.length - 1 && (
                                            <span className="text-white/20 text-xs mx-1">|</span>
                                        )}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// ── Main Section ───────────────────────────────────────────────────────────────
const TopCitiesSection = () => {
    return (
        <section className="bg-[#071018] px-4 md:px-8 py-20 overflow-hidden">
            <div className="max-w-6xl mx-auto">

                {/* App banner */}
                <motion.div
                    initial={{ opacity: 0, y: 32, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative overflow-hidden rounded-3xl bg-lime-500 px-8 py-8 mb-14 flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    {/* animated dot pattern */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.06 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                            backgroundSize: "22px 22px",
                        }}
                    />

                    {/* floating orb */}
                    <motion.div
                        animate={{ x: [0, 20, 0], y: [0, -12, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-black/10 blur-3xl pointer-events-none"
                    />

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                    >
                        <h3 className="text-2xl font-black text-black leading-tight">
                            Book sports facilities<br />
                            <span className="font-normal">wherever you are</span>
                        </h3>
                        <p className="text-black/60 text-sm mt-1">Available across Bangladesh and internationally</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="relative flex items-center gap-3 flex-shrink-0"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <FiMapPin size={18} className="text-black/60" />
                        </motion.div>
                        <span className="text-black font-semibold text-sm">12 cities · 100+ facilities</span>
                    </motion.div>
                </motion.div>

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                    className="mb-8 flex items-end justify-between"
                >
                    <div>
                        <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="text-lime-400 text-xs font-bold uppercase tracking-widest mb-2"
                        >
                            Explore by location
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.15 }}
                            className="text-3xl md:text-4xl font-black text-white tracking-tight"
                        >
                            Top Sports Facilities<br />by City
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.25 }}
                    >
                        <Link
                            href="/facility"
                            className="hidden md:flex items-center gap-2 text-sm text-gray-400 hover:text-lime-400 transition-colors duration-200 font-medium group"
                        >
                            View all
                            <motion.span
                                className="inline-block"
                                whileHover={{ x: 4 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                                <FiArrowRight size={14} />
                            </motion.span>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* City grid — staggered */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                >
                    {cities.map((city) => (
                        <CityCard key={city.name} city={city} />
                    ))}
                </motion.div>

                {/* Mobile view all */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="mt-8 md:hidden"
                >
                    <Link href="/facility">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full flex items-center justify-center gap-2 border border-white/15 text-white font-semibold py-3.5 rounded-2xl hover:border-lime-400/40 hover:text-lime-400 transition-all duration-200 text-sm cursor-pointer"
                        >
                            View all facilities
                            <FiArrowRight size={14} />
                        </motion.button>
                    </Link>
                </motion.div>

            </div>
        </section>
    );
};

export default TopCitiesSection;