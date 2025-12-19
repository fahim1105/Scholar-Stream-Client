import React from "react";
import { motion } from "framer-motion";
import { Sparkles, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router"; // react-router-dom hole link change hobe
import CountUp from "react-countup";

const Banner = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-base-100">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-50 rounded-full blur-[120px]" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto px-6 relative z-10 text-center"
            >
                {/* Animated Badge */}
                <motion.div
                    variants={itemVariants}
                    className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-full mb-8"
                >
                    <Sparkles size={14} className="text-primary animate-pulse" />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500">
                        Discover Your Academic Potential
                    </span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    variants={itemVariants}
                    className="text-4xl md:text-7xl font-black text-gray-900 mb-6 leading-tight"
                >
                    Find Your Path to <br />
                    <span className="relative inline-block">
                        Global Success
                        <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 9C118.957 4.47226 238.957 2.97226 355 9" stroke="#00AEEF" strokeWidth="5" strokeLinecap="round" />
                        </svg>
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="max-w-xl mx-auto text-gray-500 text-base md:text-lg mb-10 leading-relaxed"
                >
                    Explore thousands of fully funded scholarships. Scholar Stream connects
                    talented students with top universities worldwide.
                </motion.p>

                {/* Redirect Button Section */}
                <motion.div variants={itemVariants} className="flex justify-center">
                    <Link to="/all-scholarships">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all shadow-lg shadow-primary/20"
                        >
                            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                            <GraduationCap size={22} />
                            Search Scholarship
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Stats Section with CountUp */}
                <motion.div
                    variants={itemVariants}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-10 max-w-4xl mx-auto bg-gray-50/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-100"
                >
                    {[
                        { label: "Total Scholarships", value: 5000, suffix: "+" },
                        { label: "Partner Universities", value: 120, suffix: "+" },
                        { label: "Success Stories", value: 15, suffix: "k+" },
                        { label: "Application Fee", value: 0, prefix: "$", suffix: "" },
                    ].map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <span className="text-3xl font-black text-gray-800 flex">
                                {stat.prefix}
                                <CountUp
                                    end={stat.value}
                                    duration={3}
                                    enableScrollSpy={true}
                                    scrollSpyOnce={true}
                                />
                                {stat.suffix}
                            </span>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-tighter mt-1">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Banner;