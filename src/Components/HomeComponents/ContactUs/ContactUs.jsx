import React, { useState, useRef } from "react"; // useRef যোগ করা হয়েছে
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser"; // EmailJS ইম্পোর্ট করা হয়েছে

const ContactUs = () => {
    const form = useRef(); // ফর্ম রেফারেন্সের জন্য
    const [loading, setLoading] = useState(false); // লোডিং স্টেট
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // --- EmailJS Integration ---
        // আপনার EmailJS ড্যাশবোর্ড থেকে আইডিগুলো এখানে বসান
        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then(() => {
                setLoading(false);
                // --- Success Toast ---
                toast.custom((t) => (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full bg-base-200 shadow-2xl rounded-2xl flex border-l-8 border-primary border border-base-300/20`}
                    >
                        <div className="flex-1 p-5">
                            <div className="flex items-start">
                                <CheckCircle className="h-10 w-10 text-primary shrink-0" />
                                <div className="ml-4">
                                    <p className="text-base font-black text-neutral italic uppercase">Successfully Sent!</p>
                                    <p className="mt-1 text-xs font-bold text-base-content/70 uppercase tracking-tight">
                                        Thanks <span className="text-primary">{formData.name}</span>, check your email soon.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => toast.dismiss(t.id)} className="p-4 text-base-content/40 hover:text-primary"><X size={20} /></button>
                    </motion.div>
                ));
                setFormData({ name: "", email: "", message: "" });
            })
            .catch((error) => {
                setLoading(false);
                toast.error("Something went wrong! Please try again.");
                console.error("EmailJS Error:", error);
            });
    };

    return (
        <section className="py-24 bg-base-100 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section (Unchanged) */}
                <div className="text-center mb-20">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4 border border-primary/20">
                        <MessageSquare size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest italic">Contact Support</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-neutral mb-6 italic uppercase tracking-tighter">
                        Get In <span className="text-primary">Touch</span>
                    </h2>
                    <p className="text-neutral opacity-60 max-w-2xl mx-auto text-sm font-bold uppercase tracking-widest leading-relaxed italic">
                        Have questions about scholarships? Our team is here to help you navigate your journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Left: Contact Info (Unchanged Color Theme) */}
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="lg:col-span-5 space-y-10">
                        {[
                            { icon: <MapPin />, title: "Our Office", detail: "Niketan-Gulshan Link Road, Gulshan-1 Dhaka", color: "bg-neutral" },
                            { icon: <Phone />, title: "Call Us", detail: "+1 (234) 567-890", color: "bg-primary" },
                            { icon: <Mail />, title: "Email Support", detail: "support@scholarstream.com", color: "bg-neutral" }
                        ].map((info, i) => (
                            <div key={i} className="flex gap-6 group">
                                <div className={`${info.color} p-4 rounded-2xl text-base-100 shadow-lg transition-transform group-hover:scale-110`}>
                                    {React.cloneElement(info.icon, { size: 28 })}
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-neutral italic uppercase">{info.title}</h4>
                                    <p className="text-neutral opacity-50 mt-1 font-bold text-[11px] uppercase tracking-[0.2em]">{info.detail}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="lg:col-span-7 bg-base-200/50 p-8 md:p-12 rounded-[2.5rem] border border-base-300 shadow-2xl">
                        <form ref={form} onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-3">
                                    <label className="text-[9px] font-black text-neutral opacity-50 uppercase tracking-[0.2em] ml-2 italic">Full Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="w-full px-6 py-4 bg-base-100 border border-base-300 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold text-neutral" required />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-[9px] font-black text-neutral opacity-50 uppercase tracking-[0.2em] ml-2 italic">Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="admin@scholarstream.com" className="w-full px-6 py-4 bg-base-100 border border-base-300 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold text-neutral" required />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-[9px] font-black text-neutral opacity-50 uppercase tracking-[0.2em] ml-2 italic">Message</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="How can we help you?" className="w-full px-6 py-4 bg-base-100 border border-base-300 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold text-neutral min-h-[160px] resize-none" required></textarea>
                            </div>

                            <motion.button
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-primary hover:bg-neutral text-base-100 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] italic flex items-center justify-center gap-3 shadow-xl transition-all disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <>Send Message <Send size={18} /></>}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;