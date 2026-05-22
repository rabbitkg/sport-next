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
    FiX,
    FiSave,
    FiAlertTriangle,
    FiClock,
    FiPlusCircle,
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

const SPORT_TYPES = ["Tennis", "Swimming", "Badminton", "Football", "Cricket", "Basketball", "Gym"];


// ── Delete Confirmation Modal ─────────────────────────────────────────────────
const DeleteModal = ({ facility, onConfirm, onCancel, isLoading }) => (
    <AnimatePresence>
        {facility && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                onClick={onCancel}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 20 }}
                    transition={{ duration: 0.25 }}
                    className="w-full max-w-md bg-[#0e1c29] border border-white/10 rounded-[24px] p-6 shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                            <FiAlertTriangle className="text-red-400 text-xl" />
                        </div>
                        <div>
                            <h2 className="text-white font-black text-lg">Delete Facility?</h2>
                            <p className="text-gray-400 text-sm">This action cannot be undone.</p>
                        </div>
                    </div>

                    <div className="rounded-xl bg-white/5 border border-white/10 p-3 mb-6 flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                            <Image src={facility.imageUrl} alt={facility.name} fill className="object-cover" />
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm">{facility.name}</p>
                            <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                                <FiMapPin className="text-lime-400" /> {facility.location}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            disabled={isLoading}
                            className="flex-1 h-11 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:border-white/20 font-bold text-sm transition-all duration-200 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="flex-1 h-11 rounded-xl bg-red-500 hover:bg-red-400 disabled:opacity-60 text-white font-black text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {isLoading ? (
                                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            ) : (
                                <><FiTrash2 /> Delete</>
                            )}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

// ── Edit Modal ────────────────────────────────────────────────────────────────
const EditModal = ({ facility, onSave, onCancel, isLoading }) => {
    const [form, setForm] = useState({
        name: facility?.name ?? "",
        sportType: facility?.sportType ?? "",
        location: facility?.location ?? "",
        pricePerHour: facility?.pricePerHour ?? "",
        capacity: facility?.capacity ?? "",
        imageUrl: facility?.imageUrl ?? "",
        description: facility?.description ?? "",
        availableSlots: facility?.slots ?? facility?.availableSlots ?? [],
    });
    const [newSlot, setNewSlot] = useState("");

    if (!facility) return null;

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleAddSlot = () => {
        const trimmed = newSlot.trim();
        if (!trimmed) return;
        if (form.availableSlots.includes(trimmed)) return;
        setForm((prev) => ({ ...prev, availableSlots: [...prev.availableSlots, trimmed] }));
        setNewSlot("");
    };

    const handleRemoveSlot = (slot) => {
        setForm((prev) => ({
            ...prev,
            availableSlots: prev.availableSlots.filter((s) => s !== slot),
        }));
    };

    const handleSlotKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddSlot();
        }
    };

    const handleSubmit = () => {
        onSave({
            ...form,
            slots: form.availableSlots,      // backend uses "slots"
            pricePerHour: Number(form.pricePerHour),
            capacity: Number(form.capacity),
        });
    };

    const inputClass =
        "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-lime-500/50 focus:bg-white/8 transition-all duration-200";
    const labelClass = "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5";

    return (
        <AnimatePresence>
            {facility && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
                    onClick={onCancel}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 20 }}
                        transition={{ duration: 0.25 }}
                        className="w-full max-w-lg bg-[#0e1c29] border border-white/10 rounded-[24px] p-6 shadow-2xl my-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-white font-black text-xl">Edit Facility</h2>
                                <p className="text-gray-400 text-sm mt-0.5">Update facility details</p>
                            </div>
                            <button
                                onClick={onCancel}
                                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer"
                            >
                                <FiX />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className={labelClass}>Facility Name</label>
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Green Court Tennis"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Sport Type</label>
                                    <select
                                        name="sportType"
                                        value={form.sportType}
                                        onChange={handleChange}
                                        className={inputClass + " cursor-pointer"}
                                    >
                                        <option value="" disabled className="bg-[#0e1c29]">Select sport</option>
                                        {SPORT_TYPES.map((s) => (
                                            <option key={s} value={s} className="bg-[#0e1c29]">{s}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={labelClass}>Location</label>
                                    <input
                                        name="location"
                                        value={form.location}
                                        onChange={handleChange}
                                        placeholder="City, Area"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Price / Hour ($)</label>
                                    <input
                                        name="pricePerHour"
                                        type="number"
                                        value={form.pricePerHour}
                                        onChange={handleChange}
                                        placeholder="25"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Capacity (players)</label>
                                    <input
                                        name="capacity"
                                        type="number"
                                        value={form.capacity}
                                        onChange={handleChange}
                                        placeholder="10"
                                        className={inputClass}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className={labelClass}>Image URL</label>
                                    <input
                                        name="imageUrl"
                                        value={form.imageUrl}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                        className={inputClass}
                                    />
                                </div>

                                {/* ── Available Slots ── */}
                                <div className="col-span-2">
                                    <label className={labelClass}>
                                        <span className="flex items-center gap-1.5">
                                            <FiClock className="text-lime-400" /> Available Slots
                                        </span>
                                    </label>

                                    {/* Add slot input row */}
                                    <div className="flex gap-2 mb-3">
                                        <input
                                            value={newSlot}
                                            onChange={(e) => setNewSlot(e.target.value)}
                                            onKeyDown={handleSlotKeyDown}
                                            placeholder="e.g. 09:00 AM – 10:00 AM"
                                            className={inputClass}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddSlot}
                                            disabled={!newSlot.trim()}
                                            className="shrink-0 h-[42px] px-4 rounded-xl bg-lime-500/10 border border-lime-500/30 text-lime-400 hover:bg-lime-500/20 hover:border-lime-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-1.5 text-sm font-bold cursor-pointer"
                                        >
                                            <FiPlusCircle /> Add
                                        </button>
                                    </div>

                                    {/* Slot tags — shown below the input, click × to remove */}
                                    <AnimatePresence>
                                        {form.availableSlots.length > 0 ? (
                                            <motion.div
                                                initial={{ opacity: 0, y: -4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex flex-wrap gap-2"
                                            >
                                                {form.availableSlots.map((slot) => (
                                                    <motion.span
                                                        key={slot}
                                                        initial={{ opacity: 0, scale: 0.85 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.75 }}
                                                        transition={{ duration: 0.15 }}
                                                        className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-lg bg-lime-500/10 border border-lime-500/25 text-lime-300 text-xs font-semibold"
                                                    >
                                                        <FiClock className="shrink-0 text-lime-400 text-[11px]" />
                                                        {slot}
                                                        {/* ✕ remove button */}
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveSlot(slot)}
                                                            title="Remove slot"
                                                            className="ml-0.5 w-4 h-4 rounded-full flex items-center justify-center bg-lime-500/20 hover:bg-red-500/30 text-lime-400 hover:text-red-400 transition-all duration-150 cursor-pointer"
                                                        >
                                                            <FiX className="text-[10px]" />
                                                        </button>
                                                    </motion.span>
                                                ))}
                                            </motion.div>
                                        ) : (
                                            <p className="text-xs text-gray-600 italic">
                                                No slots added yet. Type a time range and press Add or Enter.
                                            </p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="col-span-2">
                                    <label className={labelClass}>Description</label>
                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Short description of the facility..."
                                        className={inputClass + " resize-none"}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={onCancel}
                                disabled={isLoading}
                                className="flex-1 h-11 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:border-white/20 font-bold text-sm transition-all duration-200 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="flex-1 h-11 rounded-xl bg-lime-500 hover:bg-lime-400 disabled:opacity-60 text-black font-black text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(132,204,22,0.2)]"
                            >
                                {isLoading ? (
                                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                ) : (
                                    <><FiSave /> Save Changes</>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// ── Facility Row Card ──────────────────────────────────────────────────────────
const FacilityRow = ({ facility, index, onEditClick, onDeleteClick }) => {
    const { name, sportType, imageUrl, location, pricePerHour, capacity, bookingCount = 0 } = facility;
    const badgeClass = sportColors[sportType] ?? "bg-lime-500 text-black";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-white/5 backdrop-blur-xl hover:border-white/20 transition-all duration-300"
        >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-lime-500/8 blur-3xl rounded-full" />
            </div>

            <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 p-4">
                <div className="relative w-full sm:w-24 h-24 shrink-0 rounded-2xl overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

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

                <div className="flex sm:flex-col gap-2 sm:items-end shrink-0">
                    <button
                        onClick={() => onEditClick(facility)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-lime-400 hover:border-lime-500/40 transition-all duration-300 text-sm font-semibold cursor-pointer"
                    >
                        <FiEdit2 className="text-sm" /> Edit
                    </button>

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
    const [editTarget, setEditTarget] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const router = useRouter();

    const handleEditClick = (facility) => setEditTarget(facility);

    const handleEditSave = async (updatedData) => {
        setIsEditLoading(true);
        try {
            const { data: tokenData } = await authClient.token();
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facility/${editTarget._id}`, {
                method: "PATCH",
                headers: { 
                    "Content-Type": "application/json",
                    authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify(updatedData),
            });
            setFacilities((prev) =>
                prev.map((f) =>
                    f._id === editTarget._id
                        ? { ...f, ...updatedData, slots: updatedData.slots ?? f.slots }
                        : f
                )
            );
            setEditTarget(null);
            router.refresh();
        } catch (err) {
            console.error("Edit failed:", err);
        } finally {
            setIsEditLoading(false);
        }
    };

    const handleDeleteClick = (facility) => setDeleteTarget(facility);

    const handleDeleteConfirm = async () => {
        setIsDeleteLoading(true);
        try {
            const { data: tokenData } = await authClient.token();
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facility/${deleteTarget._id}`, {
                method: "DELETE",
                headers: { 
                    authorization: `Bearer ${tokenData?.token}`
                },
            });
            setFacilities((prev) => prev.filter((f) => f._id !== deleteTarget._id));
            setDeleteTarget(null);
            router.refresh();
        } catch (err) {
            console.error("Delete failed:", err);
        } finally {
            setIsDeleteLoading(false);
        }
    };

    return (
        <section className="bg-[#071018] min-h-screen px-4 md:px-8 pt-30 pb-16">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-start justify-between gap-4 mb-6"
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

                <AnimatePresence mode="popLayout">
                    {facilities.length > 0 ? (
                        <div className="space-y-4">
                            {facilities.map((facility, i) => (
                                <FacilityRow
                                    key={facility._id}
                                    facility={facility}
                                    index={i}
                                    onEditClick={handleEditClick}
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

            <EditModal
                key={editTarget?._id}
                facility={editTarget}
                onSave={handleEditSave}
                onCancel={() => setEditTarget(null)}
                isLoading={isEditLoading}
            />

            <DeleteModal
                facility={deleteTarget}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteTarget(null)}
                isLoading={isDeleteLoading}
            />
        </section>
    );
};

export default ManageFacilitiesPage;