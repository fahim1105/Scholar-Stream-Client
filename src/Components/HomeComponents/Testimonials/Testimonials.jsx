import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonialsData = [
    {
        name: "Sadia Akter",
        photo: "https://i.ibb.co.com/hxpV7h37/ryan-hoffman-ijhzq-Am3-N1-Y-unsplash.jpg",
        role: "Harvard Scholar",
        feedback:
            "ScholarStream helped me find the perfect scholarship! The process was smooth and I got selected easily.",
    },
    {
        name: "Fahim Rahman",
        photo: "https://i.ibb.co.com/fVjGhRrz/muhammad-rizwan-Vnydp-Ki-CDa-Y-unsplash.jpg",
        role: "Masters Student",
        feedback:
            "Thanks to ScholarStream, I could apply to multiple scholarships and save time. Highly recommend!",
    },
    {
        name: "Mim Islam",
        photo: "https://i.ibb.co.com/3yTr8Bdc/humberto-chavez-FVh-yq-LR9e-A-unsplash.jpg",
        role: "PhD Candidate",
        feedback:
            "The dashboard is amazing! Tracking applications and payment was very easy to manage.",
    },
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-base-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary font-black tracking-[0.2em] uppercase text-xs"
                    >
                        Success Stories
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-neutral mt-2"
                    >
                        What Our <span className="text-primary">Scholars</span> Say
                    </motion.h2>
                    <div className="w-20 h-1.5 bg-accent mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Testimonial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonialsData.map((item, index) => (
                        <motion.div
                            key={index}
                            className="bg-base-200 p-8 rounded-[2.5rem] border border-base-300/10 shadow-sm relative group transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.15)" }}
                        >
                            {/* Quote Icon Background - ডার্ক মোডে উজ্জ্বলতা অ্যাডজাস্ট করা */}
                            <div className="absolute top-8 right-10 text-primary/10 group-hover:text-primary/20 transition-colors">
                                <Quote size={48} />
                            </div>

                            <div className="flex flex-col h-full relative z-10">
                                {/* Feedback Text - base-content/90 উজ্জ্বল টেক্সটের জন্য */}
                                <p className="text-base-content/90 text-lg leading-relaxed font-medium italic mb-10">
                                    "{item.feedback}"
                                </p>

                                {/* User Profile */}
                                <div className="mt-auto flex items-center gap-4">
                                    <div className="avatar">
                                        <div className="w-14 h-14 rounded-2xl ring-2 ring-primary/20 ring-offset-2 ring-offset-base-200">
                                            <img src={item.photo} alt={item.name} className="object-cover" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-neutral font-black text-lg leading-tight">{item.name}</h3>
                                        <p className="text-primary font-black text-[10px] uppercase tracking-widest mt-1">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;