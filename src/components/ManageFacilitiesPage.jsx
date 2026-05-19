"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    FiMapPin,
    FiDollarSign,
    FiUsers,
    FiEdit2,
    FiTrash2,
    FiPlus,
    FiCalendar,
    FiAlertTriangle,
} from "react-icons/fi";

const sportColors = {
    Tennis:     "bg-yellow-400 text-black",
    Swimming:   "bg-cyan-400 text-black",
    Badminton:  "bg-purple-400 text-black",
    Football:   "bg-lime-500 text-black",
    Cricket:    "bg-orange-400 text-black",
    Basketball: "bg-red-400 text-black",
    Gym:        "bg-lime-500 text-black",
};

// ── Delete Confirm Modal ───────────────────────────────────────────────────────
const DeleteModal = ({ facility, onCancel, onConfirm, loading }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
    >
        <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-md rounded-[28px] border border-white/10 bg-[#0B1622] shadow-[0_0_60px_rgba(0,0,0,0.6)] p-8"
        >
            <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <FiAlertTriangle className="text-red-400 text-2xl" />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white mb-1">Delete Facility?</h3>
                    <p className="text-gray-400 text-sm">
                        Are you sure you want to delete <span className="text-white font-semibold">{facility?.name}</span>? This action cannot be undone.
                    </p>
                </div>
                <div className="flex gap-3 w-full mt-2">
                    <button
                        onClick={onCancel}
                        className="flex-1 h-12 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:border-white/30 transition-all duration-300 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 h-12 rounded-2xl bg-red-500 hover:bg-red-400 text-white font-bold transition-all duration-300 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                        {loading ? "Deleting..." : <><FiTrash2 /> Delete</>}
                    </button>
                </div>
            </div>
        </motion.div>
    </motion.div>
);

// ── Facility Row Card ──────────────────────────────────────────────────────────
const FacilityRow = ({ facility, index, onDeleteClick }) => {
    const { _id, name, sportType, imageUrl, location, pricePerHour, capacity, bookingCount = 0 } = facility;
    const badgeClass = sportColors[sportType] ?? "bg-lime-500 text-black";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-white/5 backdrop-blur-xl hover:border-white/20 transition-all duration-300"
        >
            {/* hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-lime-500/8 blur-3xl rounded-full" />
            </div>

            <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 p-4">
                {/* image */}
                <div className="relative w-full sm:w-24 h-24 shrink-0 rounded-2xl overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                {/* info */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h3 className="text-white font-black text-lg leading-tight">{name}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-widest ${badgeClass}`}>
                            {sportType}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                            <FiMapPin className="text-lime-400 shrink-0" /> {location}
                        </span>
                        <span className="flex items-center gap-1">
                            <FiDollarSign className="text-lime-400 shrink-0" /> ${pricePerHour}/hr
                        </span>
                        <span className="flex items-center gap-1">
                            <FiUsers className="text-lime-400 shrink-0" /> {capacity} players
                        </span>
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-400 text-xs font-bold">
                            <FiCalendar className="shrink-0" /> {bookingCount} Bookings
                        </span>
                    </div>
                </div>

                {/* actions */}
                <div className="flex sm:flex-col gap-2 sm:items-end shrink-0">
                    <Link
                        href={`/facility/edit/${_id}`}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-lime-400 hover:border-lime-500/40 transition-all duration-300 text-sm font-semibold"
                    >
                        <FiEdit2 className="text-sm" /> Edit
                    </Link>
                    <button
                        onClick={() => onDeleteClick(facility)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/5 border border-red-500/20 text-red-400 hover:bg-red-500/15 hover:border-red-500/40 transition-all duration-300 text-sm font-semibold cursor-pointer"
                    >
                        <FiTrash2 className="text-sm" /> Delete
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

// ── Main Component ─────────────────────────────────────────────────────────────
const ManageFacilitiesPage = ({ facilities: initialFacilities = [] }) => {
    const [facilities, setFacilities] = useState(initialFacilities);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const router = useRouter();

    const handleDeleteClick = (facility) => setDeleteTarget(facility);
    const handleDeleteCancel = () => setDeleteTarget(null);

    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return;
        setDeleteLoading(true);
        try {
            await fetch(`http://localhost:5000/facility/${deleteTarget._id}`, {
                method: "DELETE",
            });
            setFacilities((prev) => prev.filter((f) => f._id !== deleteTarget._id));
            setDeleteTarget(null);
            router.refresh();
        } catch (err) {
            console.error("Delete failed:", err);
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <>
            <section className="bg-[#071018] min-h-screen px-4 md:px-8 pt-32 pb-16">
                <div className="max-w-5xl mx-auto">

                    {/* heading row */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-start justify-between gap-4 mb-10"
                    >
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-white">
                                Manage My Facilities
                            </h1>
                            <p className="text-gray-400 mt-2 text-sm">
                                Edit or remove your listed venues
                            </p>
                        </div>

                        <Link
                            href="/add-facility"
                            className="shrink-0 flex items-center gap-2 h-12 px-5 rounded-2xl bg-lime-500 hover:bg-lime-400 text-black font-black text-sm transition-all duration-300 shadow-[0_0_25px_rgba(132,204,22,0.25)]"
                        >
                            <FiPlus className="text-lg" /> Add New
                        </Link>
                    </motion.div>

                    {/* list */}
                    <AnimatePresence mode="popLayout">
                        {facilities.length > 0 ? (
                            <div className="space-y-4">
                                {facilities.map((facility, i) => (
                                    <FacilityRow
                                        key={facility._id}
                                        facility={facility}
                                        index={i}
                                        onDeleteClick={handleDeleteClick}
                                    />
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-28 text-center"
                            >
                                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                                    <FiPlus className="text-3xl text-gray-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">No facilities yet</h3>
                                <p className="text-gray-500 text-sm mb-6">Add your first venue to get started.</p>
                                <Link
                                    href="/add-facility"
                                    className="flex items-center gap-2 h-12 px-6 rounded-2xl bg-lime-500 hover:bg-lime-400 text-black font-black text-sm transition-all duration-300"
                                >
                                    <FiPlus /> Add Facility
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* delete modal */}
            <AnimatePresence>
                {deleteTarget && (
                    <DeleteModal
                        facility={deleteTarget}
                        onCancel={handleDeleteCancel}
                        onConfirm={handleDeleteConfirm}
                        loading={deleteLoading}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default ManageFacilitiesPage;