'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

const AnimatedFeaturedSection = ({ children, facilityCount }) => {
    return (
        <section className="relative bg-[#071018] px-4 md:px-8 py-24 overflow-hidden shadow-3xl">

            {/* ── Background atmosphere ── */}
            {/* Top-center lime glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-lime-500/5 blur-[120px] rounded-full pointer-events-none" />
            {/* Bottom-left accent */}
            <div className="absolute bottom-10 left-0 w-[400px] h-[250px] bg-lime-400/3 blur-[100px] rounded-full pointer-events-none" />
            {/* Subtle grid texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(132,204,22,0.4) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(132,204,22,0.4) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="max-w-6xl mx-auto relative">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
                >
                    <div>
                        {/* Eyebrow */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="flex items-center gap-3 mb-4"
                        >
                            <span className="inline-block w-8 h-[2px] bg-lime-500 rounded-full" />
                            <span className="text-lime-400 text-xs font-black uppercase tracking-[0.2em]">Top Picks</span>
                            <span className="inline-block w-8 h-[2px] bg-lime-500/30 rounded-full" />
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                            Featured{' '}
                            <span className="relative inline-block">
                                <span className="text-lime-400">Facilities</span>
                                {/* Underline accent */}
                                <motion.span
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                                    className="absolute -bottom-1 left-0 w-full h-[3px] bg-lime-500/50 rounded-full origin-left block"
                                />
                            </span>
                        </h2>

                        <p className="text-gray-400 mt-3 text-sm md:text-base max-w-md">
                            Browse {facilityCount > 0 ? facilityCount : 'premium'} hand-picked sports venues — book instantly, play today.
                        </p>
                    </div>

                    {/* Desktop CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="hidden sm:block shrink-0"
                    >
                        <Link href="/facility">
                            <button className="group flex items-center gap-2 h-12 px-6 rounded-2xl border border-white/10 hover:border-lime-500/50 bg-white/5 hover:bg-lime-500/10 text-white hover:text-lime-400 text-sm font-bold transition-all duration-300 cursor-pointer">
                                All Facilities
                                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* ── Cards Grid ── */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1 } },
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {Array.isArray(children)
                        ? children.map((child, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 40 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                                }}
                            >
                                {child}
                            </motion.div>
                        ))
                        : children
                    }
                </motion.div>

                {/* ── Mobile CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="sm:hidden mt-10"
                >
                    <Link href="/facility">
                        <button className="w-full h-14 rounded-2xl bg-lime-500 hover:bg-lime-400 active:scale-95 transition-all duration-300 text-black font-bold flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(132,204,22,0.25)] cursor-pointer text-base">
                            View All Facilities <FiArrowRight className="text-lg" />
                        </button>
                    </Link>
                </motion.div>

            </div>
        </section>
    )
}

export default AnimatedFeaturedSection