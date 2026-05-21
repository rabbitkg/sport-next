"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiMapPin, FiCalendar, FiClock, FiDollarSign,
    FiTrash2, FiPackage, FiUsers
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

// ── Status Badge ───────────────────────────────────────────────────────────────
const statusStyles = {
    pending: "bg-yellow-400/15 text-yellow-400 border border-yellow-400/30",
    confirmed: "bg-lime-400/15 text-lime-400 border border-lime-400/30",
    cancelled: "bg-red-400/15 text-red-400 border border-red-400/30",
};

const StatusBadge = ({ status = "pending" }) => (
    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-widest ${statusStyles[status] ?? statusStyles.pending}`}>
        {status}
    </span>
);

// ── Booking Card ───────────────────────────────────────────────────────────────
const BookingCard = ({ booking, index, onCancel }) => {
    const {
        _id, facilityName, facilityImage, location,
        date, timeSlot, duration, total, status = "pending",
    } = booking;

    const [cancelling, setCancelling] = useState(false);

    const handleCancel = async () => {
        if (!confirm("Cancel this booking?")) return;
        setCancelling(true);
        await onCancel(_id);
        setCancelling(false);
    };

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
                <div className="relative w-full sm:w-24 h-24 shrink-0 rounded-2xl overflow-hidden bg-white/5">
                    {facilityImage ? (
                        <Image
                            src={facilityImage}
                            alt={facilityName}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                            <FiPackage size={28} />
                        </div>
                    )}
                </div>

                {/* info */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h3 className="text-white font-black text-lg leading-tight truncate">{facilityName}</h3>
                        <StatusBadge status={status} />
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
                        {location && (
                            <span className="flex items-center gap-1">
                                <FiMapPin className="text-lime-400 shrink-0" /> {location}
                            </span>
                        )}
                        {date && (
                            <span className="flex items-center gap-1">
                                <FiCalendar className="text-lime-400 shrink-0" />
                                {new Date(date).toLocaleDateString("en-US", {
                                    month: "short", day: "numeric", year: "numeric",
                                })}
                            </span>
                        )}
                        {timeSlot && (
                            <span className="flex items-center gap-1">
                                <FiClock className="text-lime-400 shrink-0" />
                                {timeSlot} ({duration}h)
                            </span>
                        )}
                        {total !== undefined && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-400 text-xs font-bold">
                                <FiDollarSign className="shrink-0" /> ${total}
                            </span>
                        )}
                    </div>
                </div>

                {/* cancel button */}
                {status !== "cancelled" && (
                    <div className="flex sm:flex-col gap-2 sm:items-end shrink-0">
                        <button
                            onClick={handleCancel}
                            disabled={cancelling}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/5 border border-red-500/20 text-red-400 hover:bg-red-500/15 hover:border-red-500/40 transition-all duration-300 text-sm font-semibold cursor-pointer disabled:opacity-50"
                        >
                            <FiTrash2 className="text-sm" />
                            {cancelling ? "Cancelling…" : "Cancel"}
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

// ── Empty State ────────────────────────────────────────────────────────────────
const EmptyState = () => (
    <motion.div
        key="empty"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-28 text-center"
    >
        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5">
            <FiCalendar className="text-3xl text-gray-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No bookings yet</h3>
        <p className="text-gray-500 text-sm">Your facility bookings will appear here once you book a venue.</p>
    </motion.div>
);

// ── Skeleton Loader ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
    <div className="rounded-[22px] border border-white/10 bg-white/5 p-4 flex gap-4 animate-pulse">
        <div className="w-24 h-24 rounded-2xl bg-white/10 shrink-0" />
        <div className="flex-1 space-y-3 py-1">
            <div className="h-5 bg-white/10 rounded-lg w-2/5" />
            <div className="h-4 bg-white/10 rounded-lg w-3/5" />
            <div className="h-4 bg-white/10 rounded-lg w-1/3" />
        </div>
    </div>
);

// ── My Bookings Page ───────────────────────────────────────────────────────────
const MyBookings = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) return;

        const fetchBookings = async () => {
            try {
                const { data: tokenData } = await authClient.token();
                const res = await fetch(`http://localhost:5000/booking?userId=${user.id}`, {
                    headers: { authorization: `Bearer ${tokenData?.token}` },
                });
                const data = await res.json();
                setBookings(Array.isArray(data) ? data : []);
            } catch {
                toast.error("Failed to load bookings.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user?.id]);

    const handleCancel = async (bookingId) => {
        try {
            const { data: tokenData } = await authClient.token();
            const res = await fetch(`http://localhost:5000/booking/${bookingId}`, {
                method: "DELETE",
                headers: { authorization: `Bearer ${tokenData?.token}` },
            });
            const data = await res.json();
            if (data.deletedCount > 0) {
                setBookings((prev) => prev.filter((b) => b._id !== bookingId));
                toast.success("Booking cancelled.");
            }
        } catch {
            toast.error("Failed to cancel. Try again.");
        }
    };

    return (
        <section className="bg-[#071018] min-h-[calc(70vh-80px)] px-4 md:px-8 pt-35 pb-16">
            <div className="max-w-5xl mx-auto">

                {/* header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-start justify-between gap-4 mb-6"
                >
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-white">My Bookings</h1>
                        <p className="text-gray-400 mt-2 text-sm">View and manage all your facility bookings</p>
                    </div>

                    {/* booking count pill */}
                    {!loading && bookings.length > 0 && (
                        <div className="shrink-0 flex items-center gap-2 h-12 px-5 rounded-2xl bg-white/5 border border-white/10 text-gray-300 font-black text-sm">
                            <FiUsers className="text-lime-400" />
                            {bookings.length} {bookings.length === 1 ? "Booking" : "Bookings"}
                        </div>
                    )}
                </motion.div>

                {/* content */}
                <AnimatePresence mode="popLayout">
                    {loading ? (
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
                        </div>
                    ) : bookings.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="space-y-4">
                            {bookings.map((booking, i) => (
                                <BookingCard
                                    key={booking._id}
                                    booking={booking}
                                    index={i}
                                    onCancel={handleCancel}
                                />
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default MyBookings;