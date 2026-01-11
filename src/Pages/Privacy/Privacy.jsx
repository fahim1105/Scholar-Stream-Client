import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, Globe, Bell, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Privacy = () => {
    const sections = [
        {
            title: "Data Collection",
            desc: "We collect information that you provide directly to us, including academic credentials and contact details to match you with global scholarships.",
            icon: <Eye className="text-primary" size={24} />
        },
        {
            title: "How We Use Data",
            desc: "Your data is primarily used to personalize your scholarship search and improve our AI-driven matching engine for better accuracy.",
            icon: <FileText className="text-secondary" size={24} />
        },
        {
            title: "Security Measures",
            desc: "We implement industry-standard AES-256 encryption to protect your documents from unauthorized access and cyber threats.",
            icon: <Lock className="text-accent" size={24} />
        },
        {
            title: "Third-Party Sharing",
            desc: "We do not sell your data. Information is only shared with verified universities only when you explicitly choose to apply.",
            icon: <Globe className="text-info" size={24} />
        }
    ];

    return (
        <div className="min-h-screen bg-base-100 font-sans selection:bg-primary/20 transition-colors duration-300">

            {/* --- 1. HEADER --- */}
            <header className="pt-32 pb-16 border-b border-base-300/10 bg-base-200/30">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-base-100 px-5 py-2 rounded-full shadow-sm border border-base-300/10"
                    >
                        <ShieldCheck size={16} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/50">Trust & Safety Protocol</span>
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black text-neutral tracking-tighter">
                        Privacy <span className="text-primary italic">Policy.</span>
                    </h1>
                    <p className="text-base-content/40 font-black uppercase tracking-[0.3em] text-[10px]">
                        Last Updated: January 2026 • Version 2.1
                    </p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-24 space-y-24">

                {/* --- 2. CORE PRINCIPLE --- */}
                <section className="p-12 md:p-16 bg-neutral rounded-[3.5rem] text-base-100 relative overflow-hidden shadow-2xl shadow-primary/5">
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-2xl font-black uppercase tracking-[0.2em] italic text-primary">Our Commitment</h2>
                        <p className="text-xl md:text-2xl text-base-100/80 leading-relaxed font-bold italic">
                            "At ScholarStream, we believe your data belongs to you. Our mission is to protect your academic journey with the highest level of transparency and integrity."
                        </p>
                    </div>
                    {/* Decorative Background Element */}
                    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
                </section>

                {/* --- 3. POLICY SECTIONS --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sections.map((item, idx) => (
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

                {/* --- 4. DETAILED CONTENT --- */}
                <section className="space-y-12 pt-12 border-t border-base-300/10">
                    <div className="space-y-6">
                        <h3 className="text-3xl font-black text-neutral uppercase tracking-tighter flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary"><Bell size={24} /></div> 
                            Data Rights
                        </h3>
                        <p className="text-lg text-base-content/70 leading-relaxed font-bold italic pl-4 border-l-4 border-primary/20">
                            You have the right to access, rectify, or delete your personal data at any time through your dashboard settings. If you choose to deactivate your account, all your uploaded documents will be permanently purged from our primary servers within 30 days.
                        </p>
                    </div>

                    <div className="p-10 border-2 border-dashed border-base-300/20 rounded-[3rem] bg-base-200/30">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">Important Disclosure</p>
                        <p className="text-sm text-base-content/50 font-bold italic leading-relaxed">
                            By using ScholarStream, you agree to the collection and use of information in accordance with this policy. We recommend checking this page periodically for any updates as we continue to evolve our security protocols.
                        </p>
                    </div>
                </section>

                {/* --- 5. CONTACT --- */}
                <div className="text-center pt-10 space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-base-content/20">Questions regarding privacy?</p>
                    <a 
                        href="mailto:privacy@scholarstream.org" 
                        className="inline-flex items-center gap-3 text-sm font-black text-primary border-b-2 border-primary/20 pb-1 hover:border-primary transition-all group"
                    >
                        <Mail size={16} /> privacy@scholarstream.org
                    </a>
                </div>

            </main>

            {/* --- FOOTER --- */}
            <footer className="pb-16 text-center">
                <div className="w-16 h-1 bg-primary/20 mx-auto mb-8 rounded-full"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.6em] text-base-content/10">
                    ScholarStream Data Protection • 2026
                </p>
            </footer>
        </div>
    );
};

export default Privacy;