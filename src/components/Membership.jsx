'use client'

import { motion } from 'framer-motion'
import {
    Check,
    ArrowUpRight,
    Trophy,
    CalendarCheck,
    ShieldCheck
} from 'lucide-react'

const plans = [
    {
        id: 1,
        name: 'Starter Player',
        price: '$19',
        description:
            'Perfect for casual players who want affordable access to quality sports facilities.',
        features: [
            'Access to Standard Courts',
            'Easy Online Booking',
            'Weekend Slot Availability',
            'Basic Player Support',
        ],
        active: false,
    },

    {
        id: 2,
        name: 'Pro Athlete',
        price: '$39',
        description:
            'Designed for regular players who need priority booking and premium playing experience.',
        features: [
            'Priority Court Booking',
            'Premium Sports Facilities',
            'Exclusive Sports Events',
            'Weekly Coaching Sessions',
        ],
        active: true,
    },

    {
        id: 3,
        name: 'Elite Champion',
        price: '$59',
        description:
            'Best for competitive athletes looking for unlimited access and advanced features.',
        features: [
            'Unlimited Facility Access',
            'Private Coaching Access',
            'Tournament Discounts',
            'VIP Community Membership',
        ],
        active: false,
    },
]

const MembershipSection = () => {
    return (
        <section className="bg-[#F5F7F2] py-24 overflow-hidden">

            <div className="max-w-7xl mx-auto px-5">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center max-w-4xl mx-auto"
                >

                    <p className="uppercase tracking-[5px] text-lime-500 font-semibold text-sm mb-5">
                        SportNest Membership
                    </p>

                    <h1 className="text-4xl md:text-6xl font-black leading-tight text-[#07111F]">

                        Flexible Sports <br />

                        <span className="text-lime-500">
                            Membership Plans
                        </span>

                    </h1>

                    <p className="text-gray-500 text-lg leading-relaxed mt-6">
                        Choose the perfect membership plan to unlock premium
                        sports facilities, priority booking, coaching sessions,
                        and exclusive player benefits.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

                    {plans.map((plan, index) => (

                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 70 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.7,
                                delay: index * 0.2,
                            }}
                            viewport={{ once: true }}
                            whileHover={{
                                y: -10,
                            }}
                            className={`rounded-[32px] p-8 transition-all duration-500 border relative overflow-hidden
                                
                                ${plan.active
                                    ? 'bg-lime-400 text-[#07111F] border-lime-400 shadow-[0_0_40px_rgba(163,230,53,0.35)]'
                                    : 'bg-white text-[#07111F] border-gray-200'
                                }
                            `}
                        >

                            {/* Glow */}
                            {plan.active && (
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 blur-[80px] rounded-full"></div>
                            )}

                            {/* Plan Name */}
                            <h3 className="text-2xl font-black">
                                {plan.name}
                            </h3>

                            {/* Description */}
                            <p
                                className={`mt-4 leading-relaxed
                                    
                                    ${plan.active
                                        ? 'text-[#1B2A3A]'
                                        : 'text-gray-500'
                                    }
                                `}
                            >
                                {plan.description}
                            </p>

                            {/* Price */}
                            <div className="mt-8">

                                <h2 className="text-5xl font-black">
                                    {plan.price}

                                    <span className="text-xl font-semibold">
                                        /Month
                                    </span>
                                </h2>
                            </div>

                            {/* Divider */}
                            <div
                                className={`w-full h-[1px] my-8
                                    
                                    ${plan.active
                                        ? 'bg-[#07111F]/20'
                                        : 'bg-gray-200'
                                    }
                                `}
                            ></div>

                            {/* Features */}
                            <div className="space-y-5">

                                {plan.features.map((feature, i) => (

                                    <div
                                        key={i}
                                        className="flex items-center gap-3"
                                    >
                                        <div
                                            className={`w-6 h-6 rounded-full flex items-center justify-center
                                                
                                                ${plan.active
                                                    ? 'bg-[#07111F]/10'
                                                    : 'bg-lime-100'
                                                }
                                            `}
                                        >
                                            <Check size={15} />
                                        </div>

                                        <p className="font-medium">
                                            {feature}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Button */}
                            <button
                                className={`mt-10 px-7 py-4 rounded-full font-bold flex items-center gap-2 transition duration-300 cursor-pointer
                                    
                                    ${plan.active
                                        ? 'bg-[#07111F] text-white hover:bg-black'
                                        : 'bg-lime-400 text-[#07111F] hover:bg-lime-300'
                                    }
                                `}
                            >
                                Get Started

                                <ArrowUpRight size={18} />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Features */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-center justify-center gap-8 mt-16 text-gray-500"
                >

                    <div className="flex items-center gap-2">
                        <Trophy
                            size={18}
                            className="text-lime-500"
                        />

                        <p>
                            Premium Sports Experience
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <CalendarCheck
                            size={18}
                            className="text-lime-500"
                        />

                        <p>
                            Instant Online Booking
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <ShieldCheck
                            size={18}
                            className="text-lime-500"
                        />

                        <p>
                            Secure & Trusted Platform
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default MembershipSection