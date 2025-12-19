import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, X } from "lucide-react";
import toast from "react-hot-toast";

const ContactUs = () => {
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

        // --- Custom Premium Toast ---
        toast.custom((t) => (
            <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`${t.visible ? "animate-enter" : "animate-leave"
                    } max-w-md w-full bg-white shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 border-l-8 border-[#3B82F6]`}
            >
                <div className="flex-1 w-0 p-5">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            <CheckCircle className="h-10 w-10 text-[#3B82F6]" />
                        </div>
                        <div className="ml-4 flex-1">
                            <p className="text-base font-black text-black">
                                Successfully Sent!
                            </p>
                            <p className="mt-1 text-sm text-[#4B5563]">
                                Thanks <span className="font-bold text-[#3B82F6]">{formData.name}</span>, our team will contact you soon.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-gray-100">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-2xl p-4 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
            </motion.div>
        ), { duration: 4000 });

        // Reset Form
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <section className="py-24 bg-base-100 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-neutral/10 text-primary px-4 py-2 rounded-full mb-4"
                    >
                        <MessageSquare size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Contact Support</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-neutral mb-6">
                        Get In <span className="text-primary">Touch</span>
                    </h2>
                    <p className="text-[#4B5563] max-w-2xl mx-auto text-lg font-medium">
                        Have questions about scholarships? Our team is here to help you navigate your journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Left: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="lg:col-span-5 space-y-10"
                    >
                        {[
                            { icon: <MapPin />, title: "Our Office", detail: "Niketan-Gulshan Link Road, Gulshan-1 Dhaka", color: "bg-[#3B82F6]" },
                            { icon: <Phone />, title: "Call Us", detail: "+1 (234) 567-890", color: "bg-neutral" },
                            { icon: <Mail />, title: "Email Support", detail: "support@scholarstream.com", color: "bg-accent" }
                        ].map((info, i) => (
                            <div key={i} className="flex gap-6 group">
                                <div className={`${info.color} p-4 rounded-2xl text-base-100 shadow-lg transition-transform group-hover:scale-110`}>
                                    {React.cloneElement(info.icon, { size: 28 })}
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-black">{info.title}</h4>
                                    <p className="text-[#4B5563] mt-1 font-semibold">{info.detail}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[2.5rem] border border-[#E5E7EB] shadow-2xl shadow-blue-100/50"
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-3">
                                    <label className="text-xs font-black text-black uppercase tracking-widest ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full px-6 py-4 bg-base-100 border-none rounded-2xl focus:ring-2 focus:ring-[#3B82F6]/30 outline-none transition-all font-bold text-black"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-xs font-black text-black uppercase tracking-widest ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full px-6 py-4 bg-base-100 border-none rounded-2xl focus:ring-2 focus:ring-[#3B82F6]/30 outline-none transition-all font-bold text-black"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-xs font-black text-neutral uppercase tracking-widest ml-1">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="How can we help you?"
                                    className="w-full px-6 py-4 bg-base-100 border-none rounded-2xl focus:ring-2 focus:ring-[#3B82F6]/30 outline-none transition-all font-bold text-black min-h-[160px] resize-none"
                                    required
                                ></textarea>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-primary/90 hover:bg-primary text-base-100 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-200 transition-all"
                            >
                                Send Message
                                <Send size={22} />
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;