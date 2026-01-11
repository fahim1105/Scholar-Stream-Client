import React from "react";
import { motion } from "framer-motion";
import {
    Zap,
    ShieldCheck,
    Globe,
    Clock,
    Award,
    Search
} from "lucide-react";

const Features = () => {
    const featureList = [
        {
            id: 1,
            title: "Quick Discovery",
            desc: "Find the best scholarships matching your profile in seconds with our AI-driven search.",
            icon: <Search className="text-primary" />,
            borderColor: "border-primary/20"
        },
        {
            id: 2,
            title: "Secure Payments",
            desc: "Your transaction details are encrypted and protected with industry-leading security protocols.",
            icon: <ShieldCheck className="text-primary" />,
            borderColor: "border-base-300"
        },
        {
            id: 3,
            title: "Global Reach",
            desc: "Access thousands of international scholarships from top universities across the globe.",
            icon: <Globe className="text-primary" />,
            borderColor: "border-base-300"
        },
        {
            id: 4,
            title: "Real-time Tracking",
            desc: "Get instant updates on your application status through our dedicated student dashboard.",
            icon: <Zap className="text-primary" />,
            borderColor: "border-base-300"
        },
        {
            id: 5,
            title: "Verified Sources",
            desc: "We only list scholarships from officially recognized universities and organizations.",
            icon: <Award className="text-primary" />,
            borderColor: "border-base-300"
        },
        {
            id: 6,
            title: "24/7 Support",
            desc: "Our dedicated support team is always ready to assist you throughout your journey.",
            icon: <Clock className="text-primary" />,
            borderColor: "border-primary/20"
        }
    ];

    return (
        <section className="py-24 bg-base-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
                    <div className="max-w-2xl">
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 italic"
                        >
                            Why Choose Us
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black text-neutral italic uppercase tracking-tighter leading-none"
                        >
                            Premium Features for <br />
                            <span className="text-primary">Future Leaders</span>
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="hidden md:block bg-base-200 p-6 rounded-[2rem] border border-base-300"
                    >
                        <p className="text-[11px] font-bold text-neutral/50 uppercase tracking-widest leading-relaxed italic max-w-[200px]">
                            Streamlining your path to academic excellence.
                        </p>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featureList.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className={`p-10 bg-base-200/50 rounded-[2.5rem] border ${feature.borderColor} hover:border-primary/40 transition-all duration-500 group relative overflow-hidden shadow-2xl shadow-primary/5`}
                        >
                            {/* Icon Container */}
                            <div className="bg-base-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
                                {React.cloneElement(feature.icon, {
                                    size: 32,
                                    className: "group-hover:text-base-100 transition-colors duration-500"
                                })}
                            </div>

                            {/* Text Content */}
                            <h3 className="text-2xl font-black text-neutral italic uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-neutral/60 text-sm font-bold leading-relaxed uppercase tracking-wide opacity-80 italic">
                                {feature.desc}
                            </p>

                            {/* Background Glow Effect */}
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 blur-[50px] rounded-full group-hover:bg-primary/10 transition-all"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;