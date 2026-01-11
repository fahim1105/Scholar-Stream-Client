import React from 'react';
import {
    Award, Users, BookOpen, Globe, CheckCircle2,
    Target, ShieldCheck, Zap, Rocket, Heart,
    Handshake, BarChart3, PlayCircle
} from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const AboutUs = () => {
    const stats = [
        { label: "Global Partners", value: "150+", icon: <Globe className="text-primary" /> },
        { label: "Scholarships Awarded", value: "$25M+", icon: <Award className="text-secondary" /> },
        { label: "Success Stories", value: "12,000+", icon: <Users className="text-accent" /> },
        { label: "Partner Universities", value: "300+", icon: <BookOpen className="text-info" /> },
    ];

    const values = [
        {
            title: "Student First",
            desc: "Every decision we make starts with the student's best interest and future success.",
            icon: <Heart size={32} className="text-red-500" />
        },
        {
            title: "Transparency",
            desc: "We maintain 100% transparency in scholarship criteria and application processes.",
            icon: <ShieldCheck size={32} className="text-green-500" />
        },
        {
            title: "Innovation",
            desc: "Using AI and data to match the right student with the perfect global opportunity.",
            icon: <Zap size={32} className="text-amber-500" />
        }
    ];

    return (
        <div className="w-full bg-base-100 transition-colors duration-300 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* --- 1. HERO SECTION --- */}
                <section className="relative min-h-[70vh] lg:min-h-[85vh] flex items-center pt-24 lg:pt-32 pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6 lg:space-y-8 text-center lg:text-left"
                        >
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20 shadow-sm shadow-primary/5">
                                <Rocket size={16} />
                                <span className="text-[10px] lg:text-xs font-black uppercase tracking-[0.2em]">Welcome to the Future</span>
                            </div>
                            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-neutral leading-[1.1] tracking-tighter">
                                Your Dreams, <br className="hidden sm:block" />
                                <span className="text-primary italic">Our Mission.</span>
                            </h1>
                            <p className="text-base sm:text-xl text-base-content/60 font-bold max-w-lg mx-auto lg:mx-0 leading-relaxed italic">
                                ScholarStream isn't just a platform; it's a bridge to your global future. Since 2020, we’ve been breaking down financial barriers.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button className="inline-flex items-center justify-center gap-3 bg-neutral text-base-100 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary transition-all shadow-xl active:scale-95 group">
                                    Watch Journey <PlayCircle size={18} className="group-hover:scale-110 transition-transform" />
                                </button>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative mt-8 lg:mt-0"
                        >
                            <div className="rounded-[2.5rem] lg:rounded-[4.5rem] overflow-hidden shadow-2xl border-[10px] border-base-200 ring-1 ring-base-300/10">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                    alt="Team"
                                />
                            </div>
                            {/* Stats Badge */}
                            <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-base-100 p-6 rounded-[2rem] shadow-2xl border border-base-300/10 items-center gap-4">
                                <div className="p-4 bg-green-500/10 text-green-500 rounded-2xl shadow-inner"><Handshake size={24} /></div>
                                <div>
                                    <span className="text-2xl font-black block text-neutral">98%</span>
                                    <p className="text-[8px] font-black text-base-content/40 uppercase tracking-[0.2em]">Satisfaction Rate</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* --- 2. IMPACT STATS --- */}
                <section className="py-16 lg:py-24">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                        {stats.map((stat, i) => (
                            <motion.div 
                                key={i} 
                                whileHover={{ y: -10 }}
                                className="group p-10 lg:p-14 bg-base-200 rounded-[2.5rem] lg:rounded-[3.5rem] text-center border border-base-300/5 hover:bg-neutral hover:text-base-100 transition-all duration-500 shadow-xl shadow-primary/5"
                            >
                                <div className="inline-flex p-4 bg-base-100 rounded-2xl mb-6 shadow-md border border-base-300/10 group-hover:bg-primary group-hover:text-white transition-all">
                                    {React.cloneElement(stat.icon, { size: 30 })}
                                </div>
                                <div className="text-4xl lg:text-6xl font-black mb-2 tracking-tighter">{stat.value}</div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-base-content/40 group-hover:text-base-100/60">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- 3. VISION & MISSION --- */}
                <section className="py-20 lg:py-32 bg-neutral text-base-100 rounded-[3rem] lg:rounded-[6rem] overflow-hidden relative shadow-2xl shadow-primary/10">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full"></div>
                    <div className="px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
                        <div className="space-y-10 lg:space-y-14">
                            <h2 className="text-4xl lg:text-7xl font-black leading-[1.1] italic text-center lg:text-left tracking-tighter">Revolutionizing global education access.</h2>
                            <div className="grid grid-cols-1 gap-10">
                                <div className="flex flex-col sm:flex-row gap-6 items-center lg:items-start text-center lg:text-left group">
                                    <div className="flex-shrink-0 w-16 h-16 bg-base-100/10 border border-base-100/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <Target size={30} />
                                    </div>
                                    <div className="max-w-md">
                                        <h4 className="text-xl font-black mb-2 uppercase tracking-[0.2em]">Our Mission</h4>
                                        <p className="text-base-100/60 text-base leading-relaxed font-bold">Democratizing higher education by making scholarships accessible to every deserving student.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-6 items-center lg:items-start text-center lg:text-left group">
                                    <div className="flex-shrink-0 w-16 h-16 bg-base-100/10 border border-base-100/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <BarChart3 size={30} />
                                    </div>
                                    <div className="max-w-md">
                                        <h4 className="text-xl font-black mb-2 uppercase tracking-[0.2em]">Our Vision</h4>
                                        <p className="text-base-100/60 text-base leading-relaxed font-bold">To become the world's most trusted ecosystem for international student mobility by 2030.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:grid grid-cols-2 gap-8 relative">
                            <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000" className="rounded-[4rem] h-[400px] object-cover mt-20 shadow-2xl border-4 border-base-100/5 hover:-translate-y-4 transition-transform duration-700" alt="" />
                            <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000" className="rounded-[4rem] h-[400px] object-cover shadow-2xl border-4 border-base-100/5 hover:-translate-y-4 transition-transform duration-700" alt="" />
                        </div>
                    </div>
                </section>

                {/* --- 4. CORE VALUES --- */}
                <section className="py-24 lg:py-40">
                    <div className="text-center mb-16 lg:mb-24">
                        <h2 className="text-4xl lg:text-6xl font-black text-neutral uppercase tracking-tighter mb-4">Values <span className="text-primary italic">Drive Us</span></h2>
                        <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6"></div>
                        <p className="text-base-content/50 max-w-lg mx-auto text-lg font-bold italic leading-relaxed">Three fundamental pillars that guide everything we do.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
                        {values.map((v, i) => (
                            <motion.div 
                                key={i} 
                                whileHover={{ y: -15 }}
                                className="p-10 lg:p-20 border border-base-300/10 rounded-[3rem] lg:rounded-[5rem] bg-base-200/50 hover:bg-base-100 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 text-center"
                            >
                                <div className="mb-10 flex justify-center transform group-hover:scale-110 transition-transform">{v.icon}</div>
                                <h3 className="text-2xl font-black mb-4 uppercase tracking-[0.2em] text-neutral">{v.title}</h3>
                                <p className="text-base-content/60 text-base leading-relaxed font-bold italic">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- 5. FOUNDER'S MESSAGE --- */}
                <section className="py-20 lg:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                        <div className="lg:col-span-5 order-2 lg:order-1">
                            <div className="relative group">
                                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000" className="rounded-[3.5rem] lg:rounded-[5rem] shadow-2xl border-8 border-base-200 group-hover:grayscale-0 transition-all duration-700" alt="Founder" />
                                <div className="absolute -bottom-6 -right-6 bg-primary text-base-100 p-8 lg:p-14 rounded-[2rem] lg:rounded-[3.5rem] shadow-2xl max-w-[240px] lg:max-w-sm">
                                    <p className="text-xl lg:text-3xl font-black italic leading-tight">"Education is a universal human right."</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-7 space-y-8 lg:space-y-12 order-1 lg:order-2 text-center lg:text-left">
                            <h3 className="text-4xl lg:text-6xl font-black text-neutral tracking-tighter leading-tight">Message from <br /><span className="text-primary italic">Our Founder</span></h3>
                            <p className="text-xl lg:text-3xl text-base-content/70 leading-relaxed font-bold italic border-l-4 border-primary pl-8 lg:pl-10">
                                "We want to ensure that no other student has to say 'I can't go' to their dream university because of financial constraints."
                            </p>
                            <div>
                                <p className="text-2xl lg:text-4xl font-black text-neutral tracking-tight">Alex J. Richardson</p>
                                <p className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mt-2">CEO & Founder, ScholarStream</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 6. FINAL CTA --- */}
                <section className="py-24 lg:py-32">
                    <div className="bg-primary rounded-[3.5rem] lg:rounded-[6rem] p-12 lg:p-28 text-center text-base-100 relative overflow-hidden shadow-2xl shadow-primary/20 group">
                        <div className="absolute inset-0 bg-neutral/10 group-hover:bg-transparent transition-colors duration-500"></div>
                        <div className="relative z-10 space-y-10">
                            <h2 className="text-4xl lg:text-8xl font-black mb-6 lg:mb-8 tracking-tighter leading-none">Ready to write <br />your story?</h2>
                            <p className="text-lg lg:text-2xl font-black mb-12 lg:mb-16 opacity-70 max-w-3xl mx-auto italic">Your scholarship is waiting. Join 50,000+ students globally today.</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
                                <Link to="/all-scholarships" className="w-full sm:w-auto bg-base-100 text-primary hover:text-black px-16 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-neutral transition-all shadow-2xl hover:-translate-y-2">Start Application</Link>
                                <Link to="/community" className="w-full sm:w-auto bg-transparent border-2 border-base-100/30 text-base-100 px-16 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-base-100/10 transition-all">Join Community</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;