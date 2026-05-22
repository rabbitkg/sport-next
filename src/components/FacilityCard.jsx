"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiArrowRight,
    FiClock,
    FiMapPin,
    FiUsers,
    FiSearch,
    FiFilter,
    FiArrowUp,
    FiArrowDown,
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

const ALL_SPORTS = ["All Sports", "Football", "Cricket", "Badminton", "Basketball", "Swimming", "Tennis"];

const sportColors = {
    Tennis:     "bg-yellow-400 text-black",
    Swimming:   "bg-cyan-400 text-black",
    Badminton:  "bg-purple-400 text-black",
    Football:   "bg-lime-500 text-black",
    Cricket:    "bg-orange-400 text-black",
    Basketball: "bg-red-400 text-black",
};

const CARDS_PER_PAGE = 9;

// ── FacilityCard ───────────────────────────────────────────────────────────────
const FacilityCard = ({ facility, index }) => {
    const { name, sportType, imageUrl, location, pricePerHour, capacity, description, slots, _id } = facility;
    const badgeClass = sportColors[sportType] ?? "bg-lime-500 text-black";

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,150,0.05)] flex flex-col"
        >
            {/* image */}
            <div className="relative overflow-hidden h-[220px] shrink-0">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071018] via-black/20 to-transparent" />

                {/* sport badge */}
                <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg ${badgeClass}`}>
                        {sportType}
                    </span>
                </div>

                {/* price */}
                <div className="absolute top-4 right-4">
                    <div className="px-3 py-1.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
                        <p className="text-lime-400 font-black text-base leading-none">
                            ${pricePerHour}
                            <span className="text-gray-400 text-xs font-medium">/hr</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* content */}
            <div className="p-5 flex flex-col flex-1">
                <h2 className="text-xl font-black text-white mb-1 line-clamp-1">{name}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">{description}</p>

                {/* meta */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                        <FiMapPin className="text-lime-400 shrink-0" />
                        <span className="text-sm truncate">{location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                        <FiUsers className="text-lime-400 shrink-0" />
                        <span className="text-sm">Up to {capacity} players</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                        <FiClock className="text-lime-400 shrink-0" />
                        <span className="text-sm">{slots?.length} slot{slots?.length !== 1 ? "s" : ""} available</span>
                    </div>
                </div>

                {/* slot pills */}
                {slots?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {slots.slice(0, 2).map((slot, i) => (
                            <span key={i} className="px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-400 text-xs">
                                {slot}
                            </span>
                        ))}
                        {slots.length > 2 && (
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs">
                                +{slots.length - 2} more
                            </span>
                        )}
                    </div>
                )}

                {/* button */}
                <Link
                href={`/facility/${_id}`}
                >
                <button className="mt-auto w-full h-12 rounded-2xl bg-lime-500 hover:bg-lime-400 active:scale-95 transition-all duration-300 text-black font-bold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(132,204,22,0.2)] cursor-pointer">
                    Book Now <FiArrowRight className="text-lg" />
                </button></Link>
            </div>

            {/* hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-lime-500/10 blur-3xl rounded-full" />
            </div>
        </motion.div>
    );
};

// ── Pagination Controls ────────────────────────────────────────────────────────
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center gap-2 mt-12">
            {/* Prev */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center hover:border-lime-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            >
                <FiChevronLeft />
            </button>

            {/* Page numbers */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 rounded-xl border text-sm font-bold flex items-center justify-center transition-all duration-300 cursor-pointer ${
                        page === currentPage
                            ? "bg-lime-500 border-lime-500 text-black shadow-[0_0_20px_rgba(132,204,22,0.3)]"
                            : "bg-white/5 border-white/10 text-white hover:border-lime-500/50"
                    }`}
                >
                    {page}
                </button>
            ))}

            {/* Next */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center hover:border-lime-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            >
                <FiChevronRight />
            </button>
        </div>
    );
};

// ── Main Component ─────────────────────────────────────────────────────────────
const AllFacilitiesPage = ({ facilities = [] }) => {
    const [search, setSearch] = useState("");
    const [selectedSport, setSelectedSport] = useState("All Sports");
    const [priceSort, setPriceSort] = useState(null); // null | 'asc' | 'desc'
    const [currentPage, setCurrentPage] = useState(1);

    // Filter + sort
    const filtered = useMemo(() => {
        let list = [...facilities];

        if (search.trim()) {
            list = list.filter((f) =>
                f.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (selectedSport !== "All Sports") {
            list = list.filter((f) => f.sportType === selectedSport);
        }

        if (priceSort === "asc") list.sort((a, b) => a.pricePerHour - b.pricePerHour);
        if (priceSort === "desc") list.sort((a, b) => b.pricePerHour - a.pricePerHour);

        return list;
    }, [facilities, search, selectedSport, priceSort]);

    // Reset to page 1 whenever filters change
    const handleFilterChange = (fn) => (...args) => {
        fn(...args);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE);

    // Slice for current page
    const paginated = useMemo(() => {
        const start = (currentPage - 1) * CARDS_PER_PAGE;
        return filtered.slice(start, start + CARDS_PER_PAGE);
    }, [filtered, currentPage]);

    const toggleSort = (dir) => {
        setPriceSort((prev) => (prev === dir ? null : dir));
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Scroll back to top of section smoothly
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section className="bg-[#071018] min-h-screen px-4 md:px-8 pt-31 pb-16">
            <div className="max-w-6xl mx-auto">

                {/* heading */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >
                    <h1 className="text-4xl md:text-5xl font-black text-white">
                        All Facilities
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm md:text-base">
                        Browse {facilities.length} sports venues available for booking
                    </p>
                </motion.div>

                {/* filters bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-col md:flex-row gap-3 mb-10"
                >
                    {/* search */}
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search by facility name..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                            className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-lime-500 transition-all duration-300 text-sm"
                        />
                    </div>

                    {/* sport filter */}
                    <div className="relative">
                        <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <select
                            value={selectedSport}
                            onChange={(e) => { setSelectedSport(e.target.value); setCurrentPage(1); }}
                            className="h-12 pl-10 pr-5 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-lime-500 transition-all duration-300 text-sm appearance-none cursor-pointer"
                        >
                            {ALL_SPORTS.map((s) => (
                                <option key={s} value={s} className="bg-[#0B1622]">{s}</option>
                            ))}
                        </select>
                    </div>

                    {/* price sort */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => toggleSort("asc")}
                            className={`h-12 px-5 rounded-2xl border text-sm font-semibold flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                                priceSort === "asc"
                                    ? "bg-lime-500 border-lime-500 text-black"
                                    : "bg-white/5 border-white/10 text-white hover:border-lime-500/50"
                            }`}
                        >
                            <FiArrowUp /> Price
                        </button>
                        <button
                            onClick={() => toggleSort("desc")}
                            className={`h-12 px-5 rounded-2xl border text-sm font-semibold flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                                priceSort === "desc"
                                    ? "bg-lime-500 border-lime-500 text-black"
                                    : "bg-white/5 border-white/10 text-white hover:border-lime-500/50"
                            }`}
                        >
                            <FiArrowDown /> Price
                        </button>
                    </div>
                </motion.div>

                

                {/* grid */}
                <AnimatePresence mode="wait">
                    {paginated.length > 0 ? (
                        <motion.div
                            key={`page-${currentPage}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {paginated.map((facility, i) => (
                                <FacilityCard key={facility._id} facility={facility} index={i} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-24 text-center"
                        >
                            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                                <FiSearch className="text-3xl text-gray-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No facilities found</h3>
                            <p className="text-gray-500 text-sm">Try adjusting your search or filters.</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* pagination */}
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </section>
    );
};

export default AllFacilitiesPage;