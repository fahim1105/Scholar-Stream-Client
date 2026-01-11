import React from 'react';
import {
    ArrowRight, CheckCircle2, UserPlus,
    Compass, FileSearch, Send, Trophy
} from 'lucide-react';
import { Link } from 'react-router';

const Tutorial = () => {
    const steps = [
        {
            id: "01",
            title: "Create Your Profile",
            desc: "Complete your registration and input your academic credentials. Our smart filters use this data to match you with the most relevant scholarship opportunities worldwide.",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
            icon: <UserPlus size={24} className="text-primary" />,
            tag: "Registration"
        },
        {
            id: "02",
            title: "Discover Scholarships",
            desc: "Browse through thousands of options by country, subject, and funding type. Find the perfect scholarship that aligns with your career goals and academic merit.",
            image: "https://i.ibb.co.com/TqrwV6s8/vitaly-gariev-Oxfy-S-V0x6k-unsplash.jpg",
            icon: <Compass size={24} className="text-primary" />,
            tag: "Discovery"
        },
        {
            id: "03",
            title: "Prepare Documents",
            desc: "Organize your transcripts, recommendation letters, and Statement of Purpose (SOP). Ensure all files are in high-quality PDF format as required by universities.",
            image: "https://i.ibb.co.com/mC3ndCdp/resume-genius-9si2no-VCVH8-unsplash.jpg",
            icon: <FileSearch size={24} className="text-primary" />,
            tag: "Preparation"
        },
        {
            id: "04",
            title: "Final Submission",
            desc: "Review your application details thoroughly and click submit. Track your application status in real-time through your personalized ScholarStream dashboard.",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200",
            icon: <Send size={24} className="text-primary" />,
            tag: "Application"
        }
    ];

    return (
        <div className="bg-base-100 min-h-screen transition-colors duration-300 selection:bg-primary/20">
            {/* --- Header Section --- */}
            <header className="pt-32 pb-16 border-b border-base-300/10">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
                    <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
                        Step-by-Step Guide
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black text-neutral tracking-tighter leading-tight">
                        How to <span className="text-primary italic">Apply.</span>
                    </h1>
                    <p className="text-lg text-base-content/60 font-bold max-w-2xl mx-auto leading-relaxed italic">
                        "Follow our visual walkthrough to navigate your scholarship application journey with ease and precision."
                    </p>
                </div>
            </header>

            {/* --- Tutorial Steps Section --- */}
            <main className="max-w-6xl mx-auto px-6 py-20">
                <div className="space-y-32">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            {/* Picture Part */}
                            <div className="w-full lg:w-1/2 group">
                                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[8px] md:border-[12px] border-base-200 ring-1 ring-base-300/10 transform group-hover:-translate-y-2 transition-transform duration-500">
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        className="w-full h-[350px] object-cover rounded-[1.5rem]"
                                    />
                                    <div className="absolute top-6 left-6 px-4 py-2 bg-neutral text-base-100 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                        {step.tag}
                                    </div>
                                </div>
                            </div>

                            {/* Documentation Part */}
                            <div className="w-full lg:w-1/2 space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="text-5xl font-black text-primary/20 tracking-tighter">{step.id}</span>
                                    <div className="h-1 w-12 bg-primary/20 rounded-full"></div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-4 bg-base-200 rounded-2xl border border-base-300/10 shadow-sm text-primary">
                                        {step.icon}
                                    </div>
                                    <h2 className="text-3xl font-black text-neutral tracking-tight uppercase leading-tight">
                                        {step.title}
                                    </h2>
                                </div>
                                <p className="text-lg text-base-content/80 leading-relaxed font-bold italic">
                                    {step.desc}
                                </p>
                                <div className="pt-4 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-base-content/30 group cursor-pointer hover:text-primary transition-all">
                                    Need More Info? <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Success Badge Section --- */}
                <div className="mt-40 p-12 md:p-24 bg-neutral rounded-[4rem] text-base-100 text-center relative overflow-hidden shadow-2xl shadow-primary/10 group">
                    <div className="relative z-10 space-y-8">
                        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-primary/40 mb-4 group-hover:scale-110 transition-transform">
                            <Trophy size={40} className="text-white" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
                            Ready to <span className="text-primary italic">Begin?</span>
                        </h2>
                        <p className="text-base-100/60 max-w-md mx-auto italic font-black text-lg">
                            Follow these simple steps and take your first major leap toward international education today.
                        </p>
                        <div className="pt-4">
                            <Link to="/all-scholarships" className="inline-flex items-center gap-3 bg-primary hover:bg-white hover:text-primary text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl hover:-translate-y-1 active:scale-95 mx-auto">
                                Start Application <CheckCircle2 size={18} />
                            </Link>
                        </div>
                    </div>
                    {/* Decorative Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[140px] rounded-full"></div>
                </div>
            </main>

            {/* --- Footer Signature --- */}
            <footer className="pb-16 text-center">
                <div className="w-16 h-1 bg-primary/20 mx-auto mb-6 rounded-full"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-base-content/20">
                    ScholarStream Official Tutorial 2026
                </p>
            </footer>
        </div>
    );
};

export default Tutorial;