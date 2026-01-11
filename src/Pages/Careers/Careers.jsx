import React from 'react';
import { Briefcase, MapPin, GraduationCap, Users, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Careers = () => {
    const roles = [
        { title: "Scholarship Director", dept: "Academic", loc: "Remote", icon: <GraduationCap size={20} /> },
        { title: "Student Consultant", dept: "Success", loc: "Dhaka", icon: <Users size={20} /> },
        { title: "Funding Researcher", dept: "Data", loc: "Remote", icon: <Briefcase size={20} /> },
        { title: "Visa Specialist", dept: "Legal", loc: "Hybrid", icon: <Shield size={20} /> }
    ];

    return (
        <div className="min-h-screen bg-base-100 py-32 px-6 transition-colors duration-300">
            <div className="max-w-4xl mx-auto space-y-24">

                {/* --- Header Section --- */}
                <div className="text-center space-y-6">
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/10 border border-primary/20 px-6 py-2 rounded-full shadow-sm"
                    >
                        Our Core Team
                    </motion.span>
                    <h1 className="text-5xl md:text-7xl font-black text-neutral tracking-tighter leading-tight">
                        People Behind <br /> <span className="text-primary italic">ScholarStream.</span>
                    </h1>
                    <p className="text-base-content/60 font-bold italic max-w-xl mx-auto text-lg leading-relaxed">
                        "Dedicated experts working to bridge the gap between students and global education funding."
                    </p>
                </div>

                {/* --- Role Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {roles.map((role, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5 }}
                            className="p-8 bg-base-200 rounded-[2.5rem] flex items-center gap-6 border border-base-300/10 hover:border-primary/30 hover:bg-base-100 transition-all duration-500 group shadow-sm hover:shadow-2xl hover:shadow-primary/5"
                        >
                            <div className="w-14 h-14 bg-base-100 rounded-2xl flex items-center justify-center text-primary shadow-inner border border-base-300/10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                {role.icon}
                            </div>
                            <div>
                                <h3 className="font-black text-neutral uppercase text-sm tracking-widest leading-tight">{role.title}</h3>
                                <div className="flex gap-3 text-[10px] font-black text-base-content/30 uppercase tracking-[0.2em] mt-2">
                                    <span className="text-secondary">{role.dept}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1.5"><MapPin size={12} className="text-primary" /> {role.loc}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* --- Join Mission Info Box --- */}
                <section className="p-12 md:p-20 bg-neutral rounded-[4rem] text-center space-y-8 relative overflow-hidden shadow-2xl shadow-primary/10 group">
                    <div className="relative z-10 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-base-100 uppercase tracking-tighter italic">
                            Join Our <span className="text-primary">Mission</span>
                        </h2>
                        <p className="text-base-100/50 text-base md:text-lg italic font-bold max-w-md mx-auto leading-relaxed">
                            We are currently building our core team. While we don't have open applications right now, we are always looking for passionate educators.
                        </p>
                    </div>

                    {/* Background Decorative Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
                </section>

                {/* --- Footer --- */}
                <footer className="text-center pt-20">
                    <div className="w-12 h-1 bg-primary/20 mx-auto mb-8 rounded-full"></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-base-content/20">
                        ScholarStream Org • Official Careers 2026
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Careers;