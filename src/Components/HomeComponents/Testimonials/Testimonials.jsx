import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react"; // Import for premium look

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
        <section className="py-24 bg-base-100"> {/* theme color: #F9FAFB */}
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary font-bold tracking-widest uppercase text-sm"
                    >
                        Testimonials
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-neutral mt-2"
                    >
                        Success <span className="text-primary">Stories</span>
                    </motion.h2>
                    <div className="w-20 h-1.5 bg-accent mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Testimonial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonialsData.map((item, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-8 rounded-[2rem] border border-base-200 shadow-sm relative group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                        >
                            {/* Quote Icon Background */}
                            <div className="absolute top-6 right-8 text-primary/10 group-hover:text-primary/20 transition-colors">
                                <Quote size={40} />
                            </div>

                            <div className="flex flex-col h-full">
                                {/* Feedback Text */}
                                <p className="text-base-300 text-lg leading-relaxed italic mb-8 relative z-10">
                                    "{item.feedback}"
                                </p>

                                {/* User Profile */}
                                <div className="mt-auto flex items-center gap-4">
                                    <div className="avatar">
                                        <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={item.photo} alt={item.name} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-neutral font-bold text-lg">{item.name}</h3>
                                        <p className="text-primary text-sm font-semibold">{item.role}</p>
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