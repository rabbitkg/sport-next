import Link from 'next/link'
import Image from 'next/image'
import { FiArrowRight, FiMapPin, FiUsers, FiZap } from 'react-icons/fi'
import AnimatedFeaturedSection from './AnimatedFeaturedSection'

// ── Sport accent colors ───────────────────────────────────────────────────────
const sportColors = {
    Tennis:     'bg-yellow-400 text-black',
    Swimming:   'bg-cyan-400 text-black',
    Badminton:  'bg-purple-400 text-black',
    Football:   'bg-lime-500 text-black',
    Cricket:    'bg-orange-400 text-black',
    Basketball: 'bg-red-400 text-black',
}

// ── FacilityCard ──────────────────────────────────────────────────────────────
const FacilityCard = ({ facility, index }) => {
    const { name, sportType, imageUrl, location, pricePerHour, capacity, description, _id } = facility
    const badgeClass = sportColors[sportType] ?? 'bg-lime-500 text-black'

    return (
        <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col shadow-[0_0_40px_rgba(0,255,150,0.04)] hover:shadow-[0_0_60px_rgba(132,204,22,0.12)] hover:-translate-y-2 transition-all duration-500 [box-shadow:0_0_40px_rgba(0,255,150,0.04),0_25px_50px_-12px_rgba(0,0,0,0.8)]">
            {/* Image */}
            <div className="relative overflow-hidden h-[220px] shrink-0">
                {imageUrl ? (
                    <Image src={imageUrl} alt={name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                    <div className="w-full h-full bg-white/3 flex items-center justify-center">
                        <FiZap className="text-4xl text-white/10" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071018] via-black/20 to-transparent" />

                {sportType && (
                    <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg ${badgeClass}`}>
                            {sportType}
                        </span>
                    </div>
                )}

                {pricePerHour && (
                    <div className="absolute top-4 right-4">
                        <div className="px-3 py-1.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
                            <p className="text-lime-400 font-black text-base leading-none">
                                ${pricePerHour}<span className="text-gray-400 text-xs font-medium">/hr</span>
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-black text-white mb-1 line-clamp-1">{name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                    {description || 'Premium sports facility available for booking.'}
                </p>

                <div className="space-y-2 mb-4">
                    {location && (
                        <div className="flex items-center gap-2 text-gray-300">
                            <FiMapPin className="text-lime-400 shrink-0" />
                            <span className="text-sm truncate">{location}</span>
                        </div>
                    )}
                    {capacity && (
                        <div className="flex items-center gap-2 text-gray-300">
                            <FiUsers className="text-lime-400 shrink-0" />
                            <span className="text-sm">Up to {capacity} players</span>
                        </div>
                    )}
                </div>

                <Link href={`/facility/${_id}`} className="mt-auto">
                    <button className="w-full h-12 rounded-2xl bg-lime-500 hover:bg-lime-400 active:scale-95 transition-all duration-300 text-black font-bold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(132,204,22,0.2)] cursor-pointer">
                        Book Now <FiArrowRight className="text-lg" />
                    </button>
                </Link>
            </div>

            {/* Hover glow orb */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-lime-500/10 blur-3xl rounded-full" />
            </div>
        </div>
    )
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
    <div className="rounded-[28px] border border-white/10 overflow-hidden animate-pulse">
        <div className="h-[220px] bg-white/5" />
        <div className="p-5 space-y-3">
            <div className="h-4 bg-white/8 rounded-xl w-3/4" />
            <div className="h-3 bg-white/5 rounded-xl w-full" />
            <div className="h-3 bg-white/5 rounded-xl w-2/3" />
            <div className="mt-4 h-12 bg-white/5 rounded-2xl" />
        </div>
    </div>
)

// ── Main Server Component ─────────────────────────────────────────────────────
const Featured = async () => {
    let facilities = []
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`, {
            next: { revalidate: 60 },
        })
        facilities = await res.json()
    } catch {
        facilities = []
    }

    const cards = facilities.length > 0
        ? facilities.map((facility, index) => (
            <FacilityCard key={facility._id} facility={facility} index={index} />
        ))
        : [...Array(3)].map((_, i) => <SkeletonCard key={i} />)

    return (
        <AnimatedFeaturedSection facilityCount={facilities.length}>
            {cards}
        </AnimatedFeaturedSection>
    )
}

export default Featured