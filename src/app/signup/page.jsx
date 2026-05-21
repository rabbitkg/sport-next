"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FiUser, FiMail, FiLock, FiLink, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4" />
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853" />
        <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05" />
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335" />
    </svg>
);

const Field = ({ label, icon: Icon, delay, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay }}
        className="flex flex-col gap-1.5"
    >
        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</label>
        <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <Icon size={15} />
            </span>
            {children}
        </div>
    </motion.div>
);

const inputBase =
    "w-full h-14 pl-10 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-lime-500/60 transition-all duration-300";

// Password rules
const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) errors.push("At least 6 characters");
    if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("One lowercase letter");
    return errors;
};

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordErrors, setPasswordErrors] = useState([]);
    const router = useRouter();

    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setPassword(val);
        if (val) setPasswordErrors(validatePassword(val));
        else setPasswordErrors([]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData.entries());

        // Client-side password validation
        const errors = validatePassword(values.password);
        if (errors.length > 0) {
            errors.forEach(err => toast.error(err, { theme: "dark", position: "top-right" }));
            return;
        }

        setIsLoading(true);

        const { data, error } = await authClient.signUp.email({
            email: values.email,
            password: values.password,
            name: values.name,
            image: values.photoURL || undefined,
            fetchOptions: {
                query: {
                    autoSignIn: "false"
                }
            }
        });

        setIsLoading(false);

        if (data) {
            await authClient.signOut();
            toast.success("Account created! Please sign in.", {
                theme: "dark",
                position: "top-right",
                autoClose: 2000,
            });
            setTimeout(() => router.push("/login"), 2000);
        }

        if (error) {
            toast.error(error.message || "Registration failed. Please try again.", {
                theme: "dark",
                position: "top-right",
            });
        }
    };

    const handleGoogleSignin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    // Live password rule indicators
    const rules = [
        { label: "At least 6 characters", pass: password.length >= 6 },
        { label: "One uppercase letter", pass: /[A-Z]/.test(password) },
        { label: "One lowercase letter", pass: /[a-z]/.test(password) },
    ];

    return (
        <section className="bg-[#071018] flex items-center justify-center px-4 pt-35 pb-10 relative overflow-hidden">

            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-lime-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-lime-500/6 blur-[100px] rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/3 blur-[140px] rounded-full" />
            </div>

            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
            />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-md"
            >
                <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_rgba(132,204,22,0.08)]">
                    <div className="absolute -top-10 right-0 w-56 h-56 bg-lime-500/10 blur-3xl rounded-full pointer-events-none" />

                    {/* Header */}
                    <div className="relative px-8 pt-10 pb-8 text-center border-b border-white/8">
                        <motion.div
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1, type: "spring", bounce: 0.4 }}
                            className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-lime-500/15 border border-lime-500/30 flex items-center justify-center shadow-[0_0_24px_rgba(132,204,22,0.2)]"
                        >
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                                <circle cx="13" cy="13" r="4" fill="#84cc16" />
                                <path d="M13 2v3M13 21v3M2 13h3M21 13h3M4.93 4.93l2.12 2.12M18.95 18.95l2.12 2.12M4.93 21.07l2.12-2.12M18.95 7.05l2.12-2.12" stroke="#84cc16" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </motion.div>
                        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.18 }} className="text-3xl font-black text-white tracking-tight">
                            Create Account
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.24 }} className="text-gray-400 text-sm mt-1.5">
                            Join SportNest for free today
                        </motion.p>
                    </div>

                    {/* Form */}
                    <div className="relative px-8 pt-7 pb-8">
                        <form onSubmit={onSubmit} className="space-y-4">

                            <Field label="Full Name" icon={FiUser} delay={0.28}>
                                <input type="text" name="name" required autoComplete="name" placeholder="Your full name" className={inputBase} />
                            </Field>

                            <Field label="Email Address" icon={FiMail} delay={0.34}>
                                <input type="email" name="email" required autoComplete="email" placeholder="you@email.com" className={inputBase} />
                            </Field>

                            <Field label="Photo URL (optional)" icon={FiLink} delay={0.4}>
                                <input type="url" name="photoURL" autoComplete="off" placeholder="https://..." className={inputBase} />
                            </Field>

                            <Field label="Password" icon={FiLock} delay={0.46}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    autoComplete="new-password"
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className={inputBase + " pr-12"}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(v => !v)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-lime-400 transition-colors duration-200 cursor-pointer"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                                </button>
                            </Field>

                            {/* Live password rules */}
                            {password && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="rounded-2xl bg-white/4 border border-white/8 px-4 py-3 space-y-1.5"
                                >
                                    {rules.map((rule, i) => (
                                        <div key={i} className={`flex items-center gap-2 text-xs font-medium transition-colors duration-200 ${rule.pass ? "text-lime-400" : "text-gray-500"}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${rule.pass ? "bg-lime-400" : "bg-gray-600"}`} />
                                            {rule.label}
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.52 }} className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-13 rounded-2xl bg-lime-500 hover:bg-lime-400 disabled:opacity-60 text-black font-black text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(132,204,22,0.25)] cursor-pointer"
                                >
                                    {isLoading
                                        ? <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                        : "Create Account"
                                    }
                                </button>
                            </motion.div>
                        </form>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.58 }} className="flex items-center gap-3 my-5">
                            <div className="flex-1 h-px bg-white/8" />
                            <span className="text-xs text-gray-500">or continue with</span>
                            <div className="flex-1 h-px bg-white/8" />
                        </motion.div>

                        <motion.button
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.62 }}
                            type="button"
                            onClick={handleGoogleSignin}
                            className="w-full h-12 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8 text-gray-300 hover:text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
                        >
                            <GoogleIcon />
                            Continue with Google
                        </motion.button>

                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.68 }} className="text-center text-sm text-gray-500 mt-6">
                            Already have an account?{" "}
                            <Link href="/login" className="text-lime-400 font-bold hover:text-lime-300 transition-colors duration-200">
                                Sign In
                            </Link>
                        </motion.p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default SignUpPage;