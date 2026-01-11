import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, CheckCircle, X } from "lucide-react";
import toast from "react-hot-toast";

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();

        // --- Custom Premium Toast (Top-Center) ---
        toast.custom((t) => (
            <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                } max-w-md w-full bg-base-100 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-3xl pointer-events-auto flex border border-primary/20 overflow-hidden`}
            >
                <div className="flex-1 p-4">
                    <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                            <CheckCircle className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                            <p className="text-[11px] font-black text-neutral uppercase italic tracking-tighter">
                                Subscription Successful!
                            </p>
                            <p className="text-[9px] font-bold text-neutral/50 uppercase italic tracking-widest mt-0.5">
                                Welcome to our elite community.
                            </p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="border-l border-base-300 px-4 flex items-center justify-center text-neutral/20 hover:text-primary transition-colors"
                >
                    <X size={18} />
                </button>
            </motion.div>
        ), { position: "top-center", duration: 4000 });

        setEmail(""); // সাবমিট করার পর ইনপুট ক্লিয়ার হবে
    };

    return (
        <section className="py-12 md:py-24 bg-base-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="relative overflow-hidden bg-base-200 border border-base-300 rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 lg:p-24 shadow-2xl shadow-primary/5">
                    
                    {/* Background Glows */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 blur-[100px] rounded-full"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 blur-[100px] rounded-full"></div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                        
                        {/* Left Side: Content */}
                        <div className="text-center lg:text-left space-y-4 md:space-y-6">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full border border-primary/20"
                            >
                                <Mail size={12} />
                                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest italic">Weekly Updates</span>
                            </motion.div>
                            
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-3xl md:text-5xl lg:text-6xl font-black text-neutral italic uppercase tracking-tighter leading-tight"
                            >
                                Stay Ahead Of <br />
                                <span className="text-primary">The Curve</span>
                            </motion.h2>
                            
                            <p className="text-neutral/50 text-[10px] md:text-[11px] font-bold tracking-widest leading-relaxed italic max-w-md mx-auto lg:mx-0">
                                Get the latest scholarship opportunities, application tips, and university news delivered straight to your inbox.
                            </p>
                        </div>

                        {/* Right Side: Form */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-md mx-auto"
                        >
                            <form onSubmit={handleSubscribe} className="relative flex flex-col md:flex-row gap-3 md:gap-0 group">
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full bg-base-100 border-2 border-base-300 rounded-2xl md:rounded-[2rem] px-6 md:px-8 py-4 md:py-6 text-sm font-bold text-neutral focus:outline-none focus:border-primary transition-all shadow-inner italic"
                                    required
                                />
                                <button 
                                    type="submit"
                                    className="md:absolute md:right-2 md:top-2 md:bottom-2 px-6 md:px-8 py-4 md:py-0 bg-neutral hover:bg-primary text-base-100 rounded-xl md:rounded-[1.5rem] transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl"
                                >
                                    <span className="md:hidden lg:block text-[10px] font-black uppercase tracking-widest italic">Join Now</span>
                                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                            <p className="mt-4 text-[8px] md:text-[9px] font-black text-neutral/30 uppercase tracking-[0.2em] text-center italic">
                                * No spam, only premium scholarship insights.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;