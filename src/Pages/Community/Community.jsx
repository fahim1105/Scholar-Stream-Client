import React from 'react';
import {
    Users, MessageSquare, Heart, Share2,
    Award, Globe, ShieldCheck, UserCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

const Community = () => {
    const forumTopics = [
        {
            author: "Alex Johnson",
            role: "Oxford Scholar",
            title: "How I secured 100% funding for my PhD",
            likes: "1.2k",
            comments: "45",
            time: "2 hours ago"
        },
        {
            author: "Maria Garcia",
            role: "MIT Student",
            title: "Tips for passing the IELTS with 8.5 band score",
            likes: "890",
            comments: "32",
            time: "5 hours ago"
        },
        {
            author: "Rahim Ahmed",
            role: "Global Mentor",
            title: "The best universities in Europe for Data Science",
            likes: "2.1k",
            comments: "120",
            time: "Yesterday"
        }
    ];

    return (
        <div className="min-h-screen bg-base-100 selection:bg-primary/20 transition-colors duration-300">

            {/* --- 1. HERO HEADER --- */}
            <header className="pt-32 pb-20 border-b border-base-300/10">
                <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20"
                    >
                        <Users size={14} /> Join the Global Network
                    </motion.div>
                    <h1 className="text-5xl md:text-8xl font-black text-neutral tracking-tighter leading-none">
                        Our <span className="text-primary italic">Community.</span>
                    </h1>
                    <p className="text-xl text-base-content/60 font-bold max-w-2xl mx-auto italic leading-relaxed">
                        "Connect with thousands of scholars worldwide, share your journey, and find the support you need to succeed."
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-24 space-y-32">

                {/* --- 2. COMMUNITY STATS --- */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { label: "Active Scholars", count: "50,000+", icon: <Users className="text-primary" /> },
                        { label: "Countries Represented", count: "120+", icon: <Globe className="text-secondary" /> },
                        { label: "Expert Mentors", count: "500+", icon: <Award className="text-accent" /> }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="p-10 bg-base-200 border border-base-300/10 rounded-[3rem] shadow-xl shadow-primary/5 flex flex-col items-center text-center space-y-4 transition-all"
                        >
                            <div className="p-5 bg-base-100 rounded-[1.5rem] border border-base-300/10 shadow-inner">
                                {React.cloneElement(stat.icon, { size: 32 })}
                            </div>
                            <h3 className="text-4xl font-black text-neutral tracking-tighter">{stat.count}</h3>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40">{stat.label}</p>
                        </motion.div>
                    ))}
                </section>

                {/* --- 3. TRENDING DISCUSSIONS --- */}
                <section className="space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div className="space-y-3">
                            <h2 className="text-4xl font-black text-neutral tracking-tight uppercase">Trending Discussions</h2>
                            <p className="text-base-content/50 font-bold italic text-lg">Join the most active conversations in the community today.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {forumTopics.map((topic, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="group p-8 md:p-12 bg-base-200 rounded-[3rem] border border-base-300/10 hover:border-primary/30 transition-all duration-500 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-sm hover:shadow-2xl hover:shadow-primary/5"
                            >
                                <div className="flex gap-6 items-center">
                                    <div className="w-16 h-16 bg-base-100 rounded-2xl flex items-center justify-center shadow-inner border border-base-300/10">
                                        <UserCircle2 size={32} className="text-base-content/20 group-hover:text-primary transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black text-neutral uppercase tracking-widest">{topic.author}</span>
                                            <span className="px-3 py-1 bg-primary/10 text-primary text-[8px] font-black rounded-lg uppercase tracking-widest border border-primary/20">{topic.role}</span>
                                        </div>
                                        <h4 className="text-xl md:text-3xl font-black text-neutral group-hover:text-primary transition-colors leading-tight">{topic.title}</h4>
                                        <p className="text-[10px] text-base-content/30 font-black uppercase tracking-widest">{topic.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="flex flex-col items-center gap-1 text-base-content/40 font-black">
                                        <Heart size={20} className="group-hover:text-red-500 transition-colors" />
                                        <span className="text-[10px]">{topic.likes}</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 text-base-content/40 font-black">
                                        <MessageSquare size={20} className="group-hover:text-primary transition-colors" />
                                        <span className="text-[10px]">{topic.comments}</span>
                                    </div>
                                    <button className="p-5 bg-base-100 rounded-2xl border border-base-300/10 text-base-content/40 hover:text-primary hover:border-primary transition-all shadow-sm">
                                        <Share2 size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- 4. SAFETY & GUIDELINES --- */}
                <section className="bg-neutral p-8 md:p-24 rounded-[3.5rem] md:rounded-[5rem] text-base-100 relative overflow-hidden shadow-2xl shadow-primary/10">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-1/2 space-y-10">
                            <div className="p-4 bg-base-100/10 w-fit rounded-2xl backdrop-blur-md border border-base-100/10">
                                <ShieldCheck size={32} className="text-primary" />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                                A Safe Space for <span className="text-primary italic">Everyone.</span>
                            </h2>
                            <p className="text-base-100/60 text-xl leading-relaxed font-bold italic">
                                Our community is strictly moderated to ensure a respectful and helpful environment for all international students.
                            </p>
                            <ul className="space-y-5 text-xs font-black uppercase tracking-[0.2em]">
                                {["No Spam or Self-Promotion", "Verified Academic Mentors", "24/7 Moderation Team"].map((rule, idx) => (
                                    <li key={idx} className="flex items-center gap-4">
                                        <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div className="relative rounded-[3rem] overflow-hidden border-[12px] border-base-100/5 shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200"
                                    alt="Community Safety"
                                    className="w-full h-[450px] object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            {/* --- FOOTER --- */}
            <footer className="py-20 text-center border-t border-base-300/10">
                <div className="w-16 h-1 bg-primary/20 mx-auto mb-8 rounded-full"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-base-content/20">
                    ScholarStream Global Community 2026
                </p>
            </footer>
        </div>
    );
};

export default Community;