import React from 'react';
import { BookOpen, CheckCircle, FileText, Info, AlertCircle, ArrowDown } from 'lucide-react';

const PlainDocumentation = () => {
    return (
        <div className="min-h-screen bg-base-100 text-base-content font-sans selection:bg-primary/20 transition-colors duration-300">
            
            {/* --- Hero Section --- */}
            <header className="py-32 border-b border-base-300/10">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-neutral mb-6">
                        GUIDELINES & <span className="text-primary italic">DOCS</span>
                    </h1>
                    <p className="text-xl text-base-content/60 font-bold leading-relaxed max-w-2xl mx-auto italic">
                        "Everything you need to know about our scholarship application process, simplified in one place."
                    </p>
                    <div className="mt-12 flex justify-center animate-bounce text-base-content/20">
                        <ArrowDown size={30} />
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-20 space-y-28">
                
                {/* --- Section 1: Introduction --- */}
                <section className="space-y-6">
                    <div className="flex items-center gap-4 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                        <BookOpen size={16} /> 01. Introduction
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-neutral">About ScholarStream</h2>
                    <p className="text-lg leading-relaxed text-base-content/80 font-medium">
                        ScholarStream is a unified platform for students seeking international education funding. 
                        Our goal is to provide a transparent, efficient, and reliable way to connect with 
                        global scholarship opportunities. 
                    </p>
                </section>

                {/* --- Section 2: Requirements --- */}
                <section className="space-y-8">
                    <div className="flex items-center gap-4 text-secondary font-black uppercase tracking-[0.2em] text-[10px]">
                        <CheckCircle size={16} /> 02. General Requirements
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-neutral">Who Can Apply?</h2>
                    <ul className="space-y-4">
                        {[
                            "Undergraduate or Postgraduate applicants from any country.",
                            "Minimum cumulative GPA of 3.0 or equivalent academic standing.",
                            "English proficiency test results (IELTS 6.5+ or TOEFL 80+).",
                            "Valid identification documents and educational certificates."
                        ].map((item, i) => (
                            <li key={i} className="flex gap-4 items-start p-6 bg-base-200 rounded-[2rem] border border-base-300/10 shadow-sm transition-all hover:border-primary/20">
                                <span className="w-8 h-8 shrink-0 rounded-full bg-primary text-white flex items-center justify-center text-xs font-black shadow-lg shadow-primary/20">
                                    {i+1}
                                </span>
                                <span className="text-base-content/90 font-bold leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* --- Section 3: Document Checklist --- */}
                <section className="space-y-6">
                    <div className="flex items-center gap-4 text-accent font-black uppercase tracking-[0.2em] text-[10px]">
                        <FileText size={16} /> 03. Document Checklist
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-neutral">Required Paperwork</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 bg-base-200/50 border border-base-300/10 rounded-[2.5rem] space-y-3">
                            <p className="font-black text-primary uppercase text-[10px] tracking-[0.2em]">Academic Documents</p>
                            <p className="text-base-content/70 text-sm font-bold italic leading-relaxed">Transcripts, Degree Certificates, and CV.</p>
                        </div>
                        <div className="p-8 bg-base-200/50 border border-base-300/10 rounded-[2.5rem] space-y-3">
                            <p className="font-black text-secondary uppercase text-[10px] tracking-[0.2em]">Personal Identification</p>
                            <p className="text-base-content/70 text-sm font-bold italic leading-relaxed">Passport Copy, Photo, and Recommendation Letters.</p>
                        </div>
                    </div>
                </section>

                {/* --- Section 4: Process --- */}
                <section className="space-y-10 p-12 bg-neutral text-base-100 rounded-[3.5rem] relative overflow-hidden shadow-2xl shadow-primary/5">
                    {/* Decorative Background Element */}
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/20 rounded-full blur-[80px]"></div>
                    <div className="relative z-10 space-y-10">
                        <h2 className="text-3xl md:text-4xl font-black italic">The Application Cycle</h2>
                        <div className="space-y-10">
                            {[
                                { phase: "Phase 1: Registration", desc: "Create your account and complete your verified profile." },
                                { phase: "Phase 2: Submission", desc: "Select your scholarship and upload all required documents." },
                                { phase: "Phase 3: Verification", desc: "Our team will review your data within 7-14 business days." }
                            ].map((step, idx) => (
                                <div key={idx} className="border-l-[3px] border-primary/40 pl-8 relative group">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full ring-4 ring-neutral group-hover:scale-125 transition-transform"></div>
                                    <h4 className="font-black text-xl mb-2">{step.phase}</h4>
                                    <p className="text-base-100/60 font-bold text-sm tracking-wide">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- Section 5: Important Notes --- */}
                <section className="pt-10 border-t border-base-300/10">
                    <div className="bg-warning/10 p-8 rounded-[2.5rem] border border-warning/20 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                        <AlertCircle className="text-warning shrink-0" size={32} />
                        <div className="space-y-2">
                            <h4 className="font-black text-warning uppercase text-[10px] tracking-[0.2em]">Important Disclaimer</h4>
                            <p className="text-sm text-base-content/80 leading-relaxed font-black">
                                Providing false information or forged documents will result in immediate disqualification 
                                and a permanent ban from the ScholarStream platform.
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- Simple Footer --- */}
                <footer className="pt-20 text-center space-y-6">
                    <div className="w-16 h-1 bg-primary/20 mx-auto rounded-full"></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-base-content/20">
                        ScholarStream Official Documentation 2026
                    </p>
                </footer>
            </main>
        </div>
    );
};

export default PlainDocumentation;