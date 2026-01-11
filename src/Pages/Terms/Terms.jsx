import React from 'react';
import { Scale, CheckCircle2, AlertCircle, Ban, RefreshCw, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';

const Terms = () => {
    const termsSections = [
        {
            title: "User Eligibility",
            desc: "To use ScholarStream, you must be at least 16 years old or have legal guardian consent. You agree to provide accurate and truthful academic information.",
            icon: <CheckCircle2 className="text-primary" size={24} />
        },
        {
            title: "Prohibited Conduct",
            desc: "Users are strictly forbidden from uploading fraudulent documents, impersonating others, or attempting to scrape data from our platform.",
            icon: <Ban className="text-secondary" size={24} />
        },
        {
            title: "Intellectual Property",
            desc: "All content, including the matching algorithm and interface design, is the exclusive property of ScholarStream and protected by law.",
            icon: <Scale className="text-accent" size={24} />
        },
        {
            title: "Service Changes",
            desc: "We reserve the right to modify or discontinue any part of our service at any time. We will notify users of major changes via email.",
            icon: <RefreshCw className="text-info" size={24} />
        }
    ];

    return (
        <div className="min-h-screen bg-base-100 font-sans selection:bg-primary/20 transition-colors duration-300">

            {/* --- 1. HEADER --- */}
            <header className="pt-32 pb-16 bg-base-200/30 border-b border-base-300/10">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-base-100 px-5 py-2 rounded-full shadow-sm border border-base-300/10"
                    >
                        <Handshake size={16} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/50">Legal Agreement</span>
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black text-neutral tracking-tighter">
                        Terms of <span className="text-primary italic">Service.</span>
                    </h1>
                    <p className="text-base-content/40 font-black uppercase tracking-[0.3em] text-[10px]">
                        Effective Date: January 1, 2026 • v3.0
                    </p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-24 space-y-24">

                {/* --- 2. ACCEPTANCE CARD --- */}
                <section className="p-12 md:p-16 bg-neutral rounded-[3.5rem] text-base-100 relative overflow-hidden shadow-2xl shadow-primary/5 group">
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-primary italic">General Agreement</h2>
                        <p className="text-xl md:text-2xl text-base-100/80 leading-relaxed font-bold italic">
                            "By accessing or using ScholarStream, you agree to be bound by these terms. If you do not agree with any part of these terms, you may not use our services."
                        </p>
                    </div>
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                </section>

                {/* --- 3. TERMS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {termsSections.map((item, idx) => (
                        <motion.div 
                            key={idx} 
                            whileHover={{ y: -5 }}
                            className="p-10 bg-base-200 rounded-[3rem] border border-base-300/10 hover:border-primary/20 hover:bg-base-100 transition-all duration-500 group"
                        >
                            <div className="w-14 h-14 bg-base-100 rounded-2xl flex items-center justify-center shadow-inner mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-black text-neutral uppercase tracking-widest mb-4">{item.title}</h3>
                            <p className="text-base text-base-content/60 leading-relaxed font-bold italic">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* --- 4. DETAILED LIMITATION OF LIABILITY --- */}
                <section className="space-y-12 pt-12 border-t border-base-300/10">
                    <div className="space-y-6">
                        <h3 className="text-3xl font-black text-neutral uppercase tracking-tighter flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary"><AlertCircle size={26} /></div> 
                            Limitation of Liability
                        </h3>
                        <p className="text-lg text-base-content/70 leading-relaxed font-bold italic pl-4 border-l-4 border-primary/20">
                            ScholarStream provides a platform to connect students with opportunities. We do not guarantee scholarship awards, university admissions, or visa approvals. Use of our service is at your own risk. ScholarStream shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the platform.
                        </p>
                    </div>

                    <div className="p-10 bg-primary/5 rounded-[3rem] border-2 border-dashed border-primary/20">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">Governing Law</p>
                        <p className="text-sm text-base-content/60 font-bold italic leading-relaxed">
                            These terms are governed by and construed in accordance with the international digital service laws. Any disputes arising from the use of ScholarStream will be resolved through binding arbitration in the relevant legal jurisdiction.
                        </p>
                    </div>
                </section>

                {/* --- 5. TERMINATION --- */}
                <div className="text-center space-y-6 pt-10">
                    <h4 className="text-2xl font-black text-neutral uppercase tracking-widest">Account Termination</h4>
                    <p className="text-base text-base-content/50 max-w-lg mx-auto italic font-bold leading-relaxed">
                        We may suspend or terminate your access immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to our ecosystem.
                    </p>
                </div>

            </main>

            {/* --- FOOTER --- */}
            <footer className="pb-16 text-center">
                <div className="w-16 h-1 bg-primary/20 mx-auto mb-8 rounded-full"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.6em] text-base-content/10">
                    ScholarStream Legal Framework • 2026
                </p>
            </footer>
        </div>
    );
};

export default Terms;