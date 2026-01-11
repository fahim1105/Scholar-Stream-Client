import React from "react";
import { motion } from "framer-motion";
import {
    Users,
    GraduationCap,
    Globe2,
    TrendingUp
} from "lucide-react";

const Highlights = () => {
    const stats = [
        {
            id: 1,
            label: "Global Students",
            value: "50K+",
            icon: <Users />,
            desc: "Empowering learners from 120+ countries."
        },
        {
            id: 2,
            label: "Total Scholarships",
            value: "$12M+",
            icon: <TrendingUp />,
            desc: "Financial aid processed annually."
        },
        {
            id: 3,
            label: "Partner Universities",
            value: "800+",
            icon: <Globe2 />,
            desc: "Collaborating with world-class institutions."
        },
        {
            id: 4,
            label: "Success Rate",
            value: "94%",
            icon: <GraduationCap />,
            desc: "Successful admissions in top-tier colleges."
        }
    ];

    return (
        <section className="py-24 bg-base-100">
            <div className="max-w-7xl mx-auto px-6">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left Side: Content */}
                    <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic"
                        >
                            Our Impact In Numbers
                        </motion.p>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black text-neutral italic uppercase tracking-tighter leading-none"
                        >
                            Changing Lives <br />
                            <span className="text-primary">One Scholarship</span> <br />
                            At A Time
                        </motion.h2>

                        <p className="text-neutral/50 text-[11px] font-bold uppercase tracking-widest leading-relaxed italic max-w-md mx-auto lg:mx-0">
                            We bridge the gap between ambitious students and global opportunities, ensuring talent never goes unsupported.
                        </p>
                    </div>

                    {/* Right Side: Stats Grid */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="p-8 bg-base-200/50 border border-base-300 rounded-[2.5rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500 shadow-2xl shadow-primary/5"
                            >
                                {/* Decorative Glow */}
                                <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 blur-[40px] rounded-full group-hover:bg-primary/10 transition-all"></div>

                                <div className="flex flex-col gap-4">
                                    <div className="w-12 h-12 bg-base-100 border border-base-300 rounded-xl flex items-center justify-center text-primary shadow-lg group-hover:bg-neutral group-hover:text-base-100 transition-all duration-500">
                                        {React.cloneElement(stat.icon, { size: 24, strokeWidth: 2.5 })}
                                    </div>

                                    <div>
                                        <h4 className="text-4xl font-black text-neutral italic tracking-tighter mb-1">
                                            {stat.value}
                                        </h4>
                                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic mb-3 pl-1">
                                            {stat.label}
                                        </p>
                                        <p className="text-neutral/40 text-[9px] font-bold uppercase tracking-wider leading-relaxed italic">
                                            {stat.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Highlights;