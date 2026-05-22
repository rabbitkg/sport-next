const loading = () => {
    return (
        <div className="min-h-screen bg-[#071018] flex flex-col items-center justify-center gap-6">

            <div className="relative">
     
                <div className="absolute inset-0 rounded-full bg-lime-400/20 blur-xl scale-150" />
                <span className="loading loading-spinner text-lime-400 relative z-10" style={{ width: 56, height: 56 }} />
            </div>

            <div className="flex flex-col items-center gap-1">
                <p className="text-white font-black text-lg tracking-tight">Loading</p>
                <p className="text-gray-500 text-sm">Fetching sports facilities...</p>
            </div>

        </div>
    )
}

export default loading