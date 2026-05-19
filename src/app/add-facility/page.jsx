"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

const sports = [
    "Football",
    "Cricket",
    "Badminton",
    "Basketball",
    "Swimming",
    "Tennis",
];

const inputClass =
    "bg-[#0B1622] border border-white/10 text-white outline-none focus:border-lime-500 transition-all duration-300";

const AddFacilityPage = () => {
    const [slots, setSlots] = useState([]);
    const [slotInput, setSlotInput] = useState("");

    const handleAddSlot = () => {
        if (!slotInput) return;
        setSlots([...slots, slotInput]);
        setSlotInput("");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const facility = Object.fromEntries(formData.entries());

        // Attach slots from state since they're not a regular input field
        facility.slots = slots;

        console.log(facility);
    };

    return (
        <section className="bg-[#071018] pt-35 px-4 md:px-8 pb-10">
            <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto"
            >
                {/* heading */}
                <div className="mb-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                        Add New Facility
                    </h2>
                    <p className="text-gray-400 mt-3 max-w-xl">
                        Create and manage your sports venue with real-time booking support.
                    </p>
                </div>

                {/* form card */}
                <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,150,0.08)]">
                    {/* glow */}
                    <div className="absolute top-0 right-0 w-72 h-72 bg-green-500/10 blur-3xl rounded-full"></div>

                    <div className="relative p-6 md:p-10">
                        <form onSubmit={onSubmit} className="space-y-8">
                            {/* top grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                {/* Facility Name */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm text-gray-300">Facility Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter facility name"
                                        className={`w-full h-14 px-4 rounded-2xl ${inputClass}`}
                                    />
                                </div>

                                {/* Sport Type */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm text-gray-300">Sport Type</label>
                                    <select
                                        name="sportType"
                                        className={`w-full h-14 px-4 rounded-2xl ${inputClass}`}
                                    >
                                        <option value="">Select Sport Type</option>
                                        {sports.map((sport) => (
                                            <option key={sport} value={sport} className="bg-[#0B1622]">
                                                {sport}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Image URL */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm text-gray-300">Image URL</label>
                                    <input
                                        type="text"
                                        name="imageUrl"
                                        placeholder="Paste image link"
                                        className={`w-full h-14 px-4 rounded-2xl ${inputClass}`}
                                    />
                                </div>

                                {/* Location */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm text-gray-300">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="Enter location"
                                        className={`w-full h-14 px-4 rounded-2xl ${inputClass}`}
                                    />
                                </div>

                                {/* Price Per Hour */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm text-gray-300">Price Per Hour ($)</label>
                                    <input
                                        type="number"
                                        name="pricePerHour"
                                        placeholder="50"
                                        className={`w-full h-14 px-4 rounded-2xl ${inputClass}`}
                                    />
                                </div>

                                {/* Capacity */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm text-gray-300">Capacity</label>
                                    <input
                                        type="number"
                                        name="capacity"
                                        placeholder="20 Players"
                                        className={`w-full h-14 px-4 rounded-2xl ${inputClass}`}
                                    />
                                </div>
                            </div>

                            {/* slots */}
                            <div>
                                <label className="text-sm text-gray-300 mb-3 block">
                                    Available Time Slots
                                </label>

                                <div className="flex flex-col md:flex-row gap-4">
                                    <input
                                        type="text"
                                        value={slotInput}
                                        onChange={(e) => setSlotInput(e.target.value)}
                                        placeholder="08:00 AM - 09:00 AM"
                                        className={`w-full h-14 px-4 rounded-2xl ${inputClass}`}
                                    />

                                    <button
                                        type="button"
                                        onClick={handleAddSlot}
                                        className="h-13 w-13 rounded-2xl bg-lime-500 hover:bg-lime-400 transition-all duration-300 flex items-center justify-center text-white text-xl shadow-lg shadow-green-500/30 cursor-pointer"
                                    >
                                        <FiPlus />
                                    </button>
                                </div>

                                {/* slot tags */}
                                <div className="flex flex-wrap gap-3 mt-3">
                                    {slots.map((slot, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ scale: 0.7, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="px-4 py-2 rounded-full bg-green-500/15 border border-green-500/20 text-lime-400 text-sm"
                                        >
                                            {slot}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* description */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm text-gray-300">Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Write detailed information about your sports facility..."
                                    rows={3}
                                    className={`w-full px-4 py-3 rounded-2xl ${inputClass} resize-none`}
                                ></textarea>
                            </div>

                            {/* button */}
                            <div>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-4 rounded-2xl bg-lime-500 hover:bg-lime-400 text-black font-bold text-lg transition-all duration-300 shadow-[0_0_30px_rgba(34,197,94,0.35)] cursor-pointer"
                                >
                                    Add Facility
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default AddFacilityPage;
