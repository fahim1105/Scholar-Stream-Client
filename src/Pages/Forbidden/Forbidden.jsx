import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Lock, Home, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

const ForbiddenPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-5 overflow-hidden relative">

            {/* Background Aesthetic Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/20 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-900/10 blur-[120px] rounded-full"></div>

            <div className="max-w-2xl w-full text-center z-10">
                {/* Icon Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative inline-block mb-8"
                >
                    <div className="absolute inset-0 bg-red-600 blur-[50px] opacity-20 animate-pulse"></div>
                    <div className="relative bg-neutral-900 p-8 rounded-[2.5rem] border border-red-900/30 shadow-2xl">
                        <ShieldAlert size={80} className="text-red-500" strokeWidth={1.5} />
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="absolute -top-2 -right-2 bg-red-600 p-3 rounded-2xl shadow-lg"
                        >
                            <Lock size={20} className="text-white" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-7xl md:text-9xl font-black text-white mb-4 tracking-tighter opacity-10 select-none">
                        403
                    </h1>
                    <h2 className="text-4xl md:text-5xl font-black text-white mt-[-50px] mb-6 tracking-tight">
                        ACCESS <span className="text-red-600 underline decoration-red-900/50">FORBIDDEN</span>
                    </h2>
                    <p className="text-neutral-400 text-lg md:text-xl max-w-md mx-auto leading-relaxed mb-10 font-medium">
                        You've reached a high-security perimeter. Your current credentials lack the clearance level required for this sector.
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white rounded-2xl font-bold border border-neutral-800 hover:bg-neutral-800 transition-all active:scale-95"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Return Back
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="group flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-2xl font-bold shadow-lg shadow-red-900/40 hover:bg-red-500 transition-all active:scale-95"
                    >
                        <Home size={20} />
                        Go to Home
                    </button>
                </motion.div>

                {/* Footer Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-neutral-500 text-xs font-bold uppercase tracking-[0.3em]"
                >
                    Security Protocol: Alpha-X9 // Restricted Area
                </motion.p>
            </div>
        </div>
    );
};

export default ForbiddenPage;