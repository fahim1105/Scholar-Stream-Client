import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, HelpCircle } from "lucide-react";
import { Link } from "react-router";

const CTA = () => {
    return (
        <section className="py-20 bg-base-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-base-200 border-2 border-primary/10 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/5">

                    {/* Background Decorative Glow */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-[120px] -mr-40 -mt-40 rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 blur-[120px] -ml-40 -mb-40 rounded-full"></div>

                    <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                        {/* Small Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full border border-primary/20"
                        >
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">Limited Opportunities</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-7xl font-black text-neutral italic uppercase tracking-tighter leading-none"
                        >
                            Your Future Is <br />
                            <span className="text-primary italic">Waiting For You</span>
                        </motion.h2>

                        <p className="text-neutral opacity-50 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] italic leading-relaxed max-w-2xl mx-auto">
                            Stop dreaming and start applying. Join thousands of students who have already secured their academic future with our elite scholarship programs.
                        </p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-5 pt-8">
                            {/* Primary Action */}
                            <Link
                                to="/all-scholarships"
                                className="w-full md:w-auto px-10 py-5 bg-neutral hover:bg-primary text-base-100 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] italic flex items-center justify-center gap-2 transition-all shadow-xl hover:-translate-y-1 active:scale-95"
                            >
                                Explore Now <ArrowUpRight size={18} />
                            </Link>

                            {/* Secondary Action - Changed from Talk to Expert */}
                            <Link
                                to="/about-us"
                                className="w-full md:w-auto px-10 py-5 bg-base-100 border border-base-300 hover:border-primary text-neutral font-black text-[10px] uppercase tracking-[0.3em] italic flex items-center justify-center gap-2 rounded-2xl transition-all hover:bg-primary/5"
                            >
                                <HelpCircle size={16} className="text-primary" /> About Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;