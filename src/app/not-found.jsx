'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowRight, FiHome } from 'react-icons/fi'

// Floating particle
const Particle = ({ style }) => (
    <motion.div
        className="absolute rounded-full bg-lime-400/20 pointer-events-none"
        animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: style.duration, repeat: Infinity, delay: style.delay, ease: 'easeInOut' }}
        style={style}
    />
)

const particles = Array.from({ length: 12 }, (_, i) => ({
    width: Math.random() * 8 + 3,
    height: Math.random() * 8 + 3,
    left: `${Math.random() * 90 + 5}%`,
    top: `${Math.random() * 80 + 10}%`,
    duration: Math.random() * 3 + 3,
    delay: Math.random() * 3,
}))

const NotFoundPage = () => {
    return (
        <div className="relative min-h-screen bg-[#071018] flex items-center justify-center overflow-hidden px-4">

            {/* ── Background atmosphere ── */}
            {/* Big lime glow behind the 404 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-lime-500/6 blur-[140px] rounded-full pointer-events-none" />
            {/* Top-right accent */}
            <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-lime-400/4 blur-[100px] rounded-full pointer-events-none" />
            {/* Bottom-left accent */}
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/4 blur-[100px] rounded-full pointer-events-none" />

            {/* Grid texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.025]"
                style={{
                    backgroundImage: `linear-gradient(rgba(132,204,22,0.5) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(132,204,22,0.5) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Floating particles */}
            {particles.map((p, i) => <Particle key={i} style={p} />)}

            {/* ── Main Content ── */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-lg">

                {/* Sport icon ring */}
                <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                    className="relative mb-8"
                >
                    {/* Outer pulsing ring */}
                    <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute inset-0 rounded-full border border-lime-400/30"
                        style={{ margin: '-16px' }}
                    />
                    {/* Inner ring */}
                    <motion.div
                        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.2, 0.5] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                        className="absolute inset-0 rounded-full border border-lime-400/20"
                        style={{ margin: '-8px' }}
                    />

                    <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(132,204,22,0.15)]">
                        {/* Soccer ball SVG */}
                        <svg viewBox="0 0 64 64" className="w-12 h-12 opacity-60" fill="none">
                            <circle cx="32" cy="32" r="28" stroke="rgba(132,204,22,0.6)" strokeWidth="2" />
                            <polygon points="32,10 40,20 36,30 28,30 24,20" stroke="rgba(132,204,22,0.4)" strokeWidth="1.5" fill="rgba(132,204,22,0.08)" />
                            <polygon points="40,20 52,22 54,34 44,40 36,30" stroke="rgba(132,204,22,0.4)" strokeWidth="1.5" fill="rgba(132,204,22,0.06)" />
                            <polygon points="28,30 36,30 44,40 38,52 22,52 16,40" stroke="rgba(132,204,22,0.4)" strokeWidth="1.5" fill="rgba(132,204,22,0.08)" />
                            <polygon points="24,20 12,22 10,34 16,40 28,30" stroke="rgba(132,204,22,0.4)" strokeWidth="1.5" fill="rgba(132,204,22,0.06)" />
                            <polygon points="52,22 58,36 54,34" stroke="rgba(132,204,22,0.3)" strokeWidth="1.5" fill="none" />
                        </svg>
                    </div>
                </motion.div>

                {/* 404 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative mb-4"
                >
                    <span className="text-[120px] md:text-[160px] font-black leading-none tracking-tighter select-none"
                        style={{
                            background: 'linear-gradient(135deg, rgba(132,204,22,0.15) 0%, rgba(132,204,22,0.05) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 40px rgba(132,204,22,0.2))',
                        }}
                    >
                        404
                    </span>
                    {/* Outlined stroke version layered on top */}
                    <span
                        className="absolute inset-0 text-[120px] md:text-[160px] font-black leading-none tracking-tighter select-none flex items-center justify-center"
                        style={{
                            WebkitTextStroke: '1px rgba(132,204,22,0.25)',
                            color: 'transparent',
                        }}
                    >
                        404
                    </span>
                </motion.div>

                {/* Eyebrow tag */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="flex items-center gap-2 mb-5"
                >
                    <span className="inline-block w-6 h-[2px] bg-lime-500 rounded-full" />
                    <span className="text-lime-400 text-xs font-black uppercase tracking-[0.2em]">Page Not Found</span>
                    <span className="inline-block w-6 h-[2px] bg-lime-500/30 rounded-full" />
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                    className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight"
                >
                    Looks like you missed the goal
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                    className="text-gray-400 text-sm md:text-base leading-relaxed mb-10 max-w-sm"
                >
                    The page you are looking for has been moved, deleted, or never existed. Lets get you back to the field.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.65 }}
                    className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
                >
                    <Link href="/" className="w-full sm:w-auto">
                        <button className="group w-full sm:w-auto flex items-center justify-center gap-2 h-13 px-8 py-3.5 rounded-2xl bg-lime-500 hover:bg-lime-400 active:scale-95 text-black font-black text-sm transition-all duration-300 shadow-[0_0_30px_rgba(132,204,22,0.3)] hover:shadow-[0_0_45px_rgba(132,204,22,0.5)] cursor-pointer">
                            <FiHome className="text-base" />
                            Back to Home
                            <FiArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </Link>

                    <Link href="/facility" className="w-full sm:w-auto">
                        <button className="group w-full sm:w-auto flex items-center justify-center gap-2 h-13 px-8 py-3.5 rounded-2xl border border-white/10 hover:border-lime-500/40 bg-white/5 hover:bg-lime-500/8 text-white hover:text-lime-400 font-bold text-sm transition-all duration-300 cursor-pointer">
                            Browse Facilities
                            <FiArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </Link>
                </motion.div>

                {/* Bottom divider line */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                    className="mt-16 w-24 h-[2px] bg-gradient-to-r from-transparent via-lime-500/40 to-transparent rounded-full"
                />
            </div>
        </div>
    )
}

export default NotFoundPage