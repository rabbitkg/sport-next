"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    FiArrowLeft,
    FiMapPin,
    FiUsers,
    FiDollarSign,
    FiClock,
    FiCalendar,
    FiCheckCircle,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

const sportColors = {
    Tennis: "bg-yellow-400 text-black",
    Swimming: "bg-cyan-400 text-black",
    Badminton: "bg-purple-400 text-black",
    Football: "bg-lime-500 text-black",
    Cricket: "bg-orange-400 text-black",
    Basketball: "bg-red-400 text-black",
    Gym: "bg-lime-500 text-black",
};

const inputClass =
    "w-full h-12 px-4 rounded-2xl bg-[#0B1622] border border-white/10 text-white placeholder-gray-500 outline-none focus:border-lime-500 transition-all duration-300 text-sm";

// ── Booking Form ───────────────────────────────────────────────────────────────
import { toast } from "sonner";
const BookingForm = ({ facility }) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const { name, pricePerHour, slots = [], imageUrl, location } = facility;
    const [date, setDate] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [duration, setDuration] = useState(1);
    const [loading, setLoading] = useState(false);
    const [confirmed, setConfirmed] = useState(false); // ✅ add this back

    const total = pricePerHour * duration;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookingData = {
            userId: user.id,
            userName: user.name,
            userImage: user.image,
            userEmail: user.email,
            facilityName: name,
            facilityImage: imageUrl,
            location,
            date,
            timeSlot,
            duration,
            total,
            status: "pending", // ✅ add status so MyBookings badge works
        };

        try {
            setLoading(true);
            const { data: tokenData } = await authClient.token();

            const res = await fetch("http://localhost:5000/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${tokenData?.token}`,
                },
                body: JSON.stringify(bookingData),
            });

            const data = await res.json();
            if (data.insertedId) {
                setConfirmed(true); // ✅ show confirmed state
                toast.success("Booking confirmed!");
                setTimeout(() => setConfirmed(false), 3000);
            }
        } catch (err) {
            toast.error("Booking failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,150,0.07)] p-6 md:p-8"
        >
            {/* glow accent */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-lime-500/10 blur-3xl rounded-full pointer-events-none" />

            <div className="relative ">
                <h2 className="text-2xl font-black text-white mb-1">Book This Facility</h2>
                <p className="text-gray-400 text-sm mb-7">Fill in your details to reserve this spot</p>

                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* facility name (readonly) */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Facility</label>
                        <input
                            type="text"
                            readOnly
                            value={name}
                            className={`${inputClass} opacity-60 cursor-not-allowed`}
                        />
                    </div>

                    {/* date */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                            <FiCalendar className="text-lime-400" /> Booking Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    {/* time slot */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                            <FiClock className="text-lime-400" /> Time Slot
                        </label>
                        <select
                            name="timeSlot"
                            required
                            value={timeSlot}
                            onChange={(e) => setTimeSlot(e.target.value)}
                            className={`${inputClass} appearance-none cursor-pointer`}
                        >
                            <option value="">Select a time slot</option>
                            {slots.map((slot, i) => (
                                <option key={i} value={slot} className="bg-[#0B1622]">{slot}</option>
                            ))}
                        </select>
                    </div>

                    {/* duration */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Duration (Hours)</label>
                        <input
                            type="number"
                            name="duration"
                            min={1}
                            max={8}
                            value={duration}
                            onChange={(e) => setDuration(Math.max(1, Number(e.target.value)))}
                            className={inputClass}
                        />
                    </div>

                    {/* price breakdown */}
                    <div className="rounded-2xl bg-lime-500/8 border border-lime-500/20 p-4 space-y-2">
                        <div className="flex justify-between text-sm text-gray-300">
                            <span>${pricePerHour}/hr × {duration} hr</span>
                            <span>${pricePerHour * duration}</span>
                        </div>
                        <div className="flex justify-between font-black text-base border-t border-lime-500/20 pt-2">
                            <span className="text-white">Total Price</span>
                            <span className="text-lime-400">${total}</span>
                        </div>
                    </div>

                    {/* submit */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full h-14 rounded-2xl bg-lime-500 hover:bg-lime-400 text-black font-black text-base transition-all duration-300 shadow-[0_0_30px_rgba(132,204,22,0.3)] cursor-pointer flex items-center justify-center gap-2"
                    >
                        {confirmed ? (
                            <>
                                <FiCheckCircle className="text-xl" /> Booking Confirmed!
                            </>
                        ) : (
                            "Confirm Booking"
                        )}
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
};

// ── Info Chip ──────────────────────────────────────────────────────────────────
const InfoChip = ({ icon: Icon, label, value }) => (
    <div className="flex flex-col gap-1 p-4 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-1.5 text-gray-400 text-xs font-semibold uppercase tracking-widest">
            <Icon className="text-lime-400" /> {label}
        </div>
        <p className="text-white font-bold text-sm">{value}</p>
    </div>
);

// ── Main Details Page ──────────────────────────────────────────────────────────
const FacilitiesDetailsPage = ({ facility }) => {
    const {
        name,
        sportType,
        imageUrl,
        location,
        pricePerHour,
        capacity,
        description,
        slots = [],
    } = facility;

    const badgeClass = sportColors[sportType] ?? "bg-lime-500 text-black";

    return (
        <section className="bg-[#071018] px-4 md:px-8 pt-35 pb-10">
            <div className="max-w-6xl mx-auto">

                {/* back link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-5"
                >
                    <Link
                        href="/facility"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-lime-400 transition-colors duration-300 text-sm font-semibold group"
                    >
                        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
                        Back to Facilities
                    </Link>
                </motion.div>

                {/* 2-col layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                    {/* ── LEFT COLUMN ── */}
                    <div className="space-y-5">

                        {/* image card */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative overflow-hidden rounded-[28px] border border-white/10"
                        >
                            <div className="relative h-[320px] md:h-[380px]">
                                <Image
                                    src={imageUrl}
                                    alt={name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#071018] via-black/10 to-transparent" />

                                {/* sport badge */}
                                <div className="absolute top-4 left-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg ${badgeClass}`}>
                                        {sportType}
                                    </span>
                                </div>

                                {/* price badge */}
                                <div className="absolute top-4 right-4">
                                    <div className="px-3 py-1.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
                                        <p className="text-lime-400 font-black text-base leading-none">
                                            ${pricePerHour}
                                            <span className="text-gray-400 text-xs font-medium">/hr</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* name below image inside card */}
                            <div className="p-5 pb-4">
                                <h1 className="text-3xl md:text-4xl font-black text-white">{name}</h1>
                            </div>
                        </motion.div>

                        {/* info chips grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.15 }}
                            className="grid grid-cols-2 gap-3"
                        >
                            <InfoChip icon={FiMapPin} label="Location" value={location} />
                            <InfoChip icon={FiUsers} label="Capacity" value={`Up to ${capacity} players`} />
                            <InfoChip icon={FiDollarSign} label="Price" value={`$${pricePerHour}/hour`} />
                            <InfoChip icon={FiClock} label="Slots" value={`${slots.length} available`} />
                        </motion.div>

                        {/* about */}
                        {description && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                className="rounded-[22px] border border-white/10 bg-white/5 p-4"
                            >
                                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-3">
                                    About this facility
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
                            </motion.div>
                        )}

                        {/* all slots */}
                        {slots.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.25 }}
                                className="rounded-[22px] border border-white/10 bg-white/5 p-4"
                            >
                                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-3">
                                    Available Slots
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {slots.map((slot, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1.5 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-400 text-xs font-semibold"
                                        >
                                            {slot}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* ── RIGHT COLUMN — booking form ── */}
                    <div className="lg:sticky lg:top-28">
                        <BookingForm facility={facility} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FacilitiesDetailsPage;