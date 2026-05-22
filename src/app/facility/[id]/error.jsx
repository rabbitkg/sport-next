'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowRight, FiHome, FiRefreshCw, FiAlertTriangle } from 'react-icons/fi'

const particles = Array.from({ length: 10 }, (_, i) => ({
    width: Math.random() * 7 + 3,
    height: Math.random() * 7 + 3,
    left: `${Math.random() * 90 + 5}%`,
    top: `${Math.random() * 80 + 10}%`,
    duration: Math.random() * 3 + 3,
    delay: Math.random() * 3,
}))

const Particle = ({ style }) => (
    <motion.div
        className="absolute rounded-full bg-red-400/15 pointer-events-none"
        animate={{ y: [0, -25, 0], opacity: [0.15, 0.5, 0.15] }}
        transition={{ duration: style.duration, repeat: Infinity, delay: style.delay, ease: 'easeInOut' }}
        style={style}
    />
)

const ErrorPage = ({ error, reset }) => {
    return (
        <div className="relative min-h-screen bg-[#071018] flex items-center justify-center overflow-hidden px-4">

            {/* ── Background atmosphere ── */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-500/5 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-orange-500/4 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-600/4 blur-[100px] rounded-full pointer-events-none" />

            {/* Grid texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.025]"
                style={{
                    backgroundImage: `linear-gradient(rgba(239,68,68,0.5) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(239,68,68,0.5) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Particles */}
            {particles.map((p, i) => <Particle key={i} style={p} />)}

            {/* ── Content ── */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-lg">

                {/* Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                    className="relative mb-8"
                >
                    {/* Pulsing rings */}
                    <motion.div
                        animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.08, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute inset-0 rounded-full border border-red-400/30"
                        style={{ margin: '-16px' }}
                    />
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.15, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                        className="absolute inset-0 rounded-full border border-red-400/20"
                        style={{ margin: '-8px' }}
                    />

                    {/* Shake animation on the icon box */}
                    <motion.div
                        animate={{ rotate: [0, -4, 4, -4, 4, 0] }}
                        transition={{ duration: 0.6, delay: 1, repeat: Infinity, repeatDelay: 4 }}
                        className="w-24 h-24 rounded-full bg-white/5 border border-red-500/20 flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.15)]"
                    >
                        <FiAlertTriangle className="text-4xl text-red-400/70" />
                    </motion.div>
                </motion.div>

                {/* Error code */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative mb-4"
                >
                    <span
                        className="text-[120px] md:text-[160px] font-black leading-none tracking-tighter select-none"
                        style={{
                            background: 'linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0.04) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 40px rgba(239,68,68,0.2))',
                        }}
                    >
                        500
                    </span>
                    <span
                        className="absolute inset-0 text-[120px] md:text-[160px] font-black leading-none tracking-tighter select-none flex items-center justify-center"
                        style={{
                            WebkitTextStroke: '1px rgba(239,68,68,0.2)',
                            color: 'transparent',
                        }}
                    >
                        500
                    </span>
                </motion.div>

                {/* Eyebrow */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="flex items-center gap-2 mb-5"
                >
                    <span className="inline-block w-6 h-[2px] bg-red-500 rounded-full" />
                    <span className="text-red-400 text-xs font-black uppercase tracking-[0.2em]">Something Went Wrong</span>
                    <span className="inline-block w-6 h-[2px] bg-red-500/30 rounded-full" />
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                    className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight"
                >
                    The pitch has a problem
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                    className="text-gray-400 text-sm md:text-base leading-relaxed mb-4 max-w-sm"
                >
                    An unexpected error occurred on our end. Our team is already on it — try refreshing or head back home.
                </motion.p>

                {/* Error message detail */}
                {error?.message && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                        className="mb-8 px-4 py-3 rounded-2xl bg-red-500/8 border border-red-500/15 max-w-sm w-full"
                    >
                        <p className="text-red-400/70 text-xs font-mono text-left truncate">
                            {error.message}
                        </p>
                    </motion.div>
                )}

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.65 }}
                    className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-2"
                >
                    {/* Try Again */}
                    {reset && (
                        <button
                            onClick={reset}
                            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-red-500 hover:bg-red-400 active:scale-95 text-white font-black text-sm transition-all duration-300 shadow-[0_0_30px_rgba(239,68,68,0.25)] hover:shadow-[0_0_45px_rgba(239,68,68,0.4)] cursor-pointer"
                        >
                            <motion.span
                                className="flex items-center gap-2"
                                whileTap={{ rotate: 360 }}
                                transition={{ duration: 0.4 }}
                            >
                                <FiRefreshCw className="text-base" />
                                Try Again
                            </motion.span>
                        </button>
                    )}

                    {/* Back Home */}
                    <Link href="/" className="w-full sm:w-auto">
                        <button className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl border border-white/10 hover:border-lime-500/40 bg-white/5 hover:bg-lime-500/8 text-white hover:text-lime-400 font-bold text-sm transition-all duration-300 cursor-pointer">
                            <FiHome className="text-base" />
                            Back to Home
                            <FiArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </Link>
                </motion.div>

                {/* Bottom divider */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                    className="mt-16 w-24 h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent rounded-full"
                />
            </div>
        </div>
    )
}

export default ErrorPage