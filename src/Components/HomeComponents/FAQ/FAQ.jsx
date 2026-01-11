import React from "react";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";

const faqData = [
    {
        question: "How can I apply for a scholarship?",
        answer: "You can browse scholarships on the home page, view details, and click 'Apply' to submit your application via our streamlined dashboard.",
    },
    {
        question: "Is there an application fee?",
        answer: "While many scholarships are free to apply, some may require a small processing fee. All fee details are transparently listed on the scholarship details page.",
    },
    {
        question: "Can I track my application status?",
        answer: "Absolutely! Once logged in, your personalized user dashboard provides real-time updates on every application you've submitted.",
    },
    {
        question: "What documents are required?",
        answer: "Typically, you'll need academic transcripts, a statement of purpose, and recommendation letters. Specific requirements vary by university.",
    },
];

const FAQ = () => {
    return (
        <section className="py-24 bg-base-100 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-6">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20"
                    >
                        Support Center
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black text-neutral mb-4">
                        Commonly <span className="text-primary">Asked Questions</span>
                    </h2>
                    <p className="text-base-content/70 text-lg font-medium">
                        Everything you need to know about the application process.
                    </p>
                </div>

                {/* Accordion List */}
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ scale: 1.01 }}
                            className="group"
                        >
                            {/* DaisyUI Collapse using theme variables */}
                            <div className="collapse collapse-arrow bg-base-200 border border-base-300/10 rounded-[1.5rem] shadow-sm hover:border-primary/30 transition-all duration-300">
                                <input type="checkbox" className="peer" />

                                {/* Question Label */}
                                <div className="collapse-title flex items-center gap-4 text-xl font-black text-neutral py-5">
                                    <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <HelpCircle size={20} />
                                    </div>
                                    <span className="flex-1 pr-4">{item.question}</span>
                                </div>

                                {/* Answer Content */}
                                <div className="collapse-content px-6 sm:pl-20">
                                    {/* Divider Line */}
                                    <div className="h-[1px] bg-base-300/10 mb-4 w-full"></div>
                                    <p className="text-base-content/80 leading-relaxed font-bold pb-4">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Contact Trigger */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-12 text-center p-8 rounded-[2rem] bg-secondary/5 border border-dashed border-secondary/20 transition-colors"
                >
                    <p className="text-base-content/70 font-bold">
                        Still have more questions?
                        <ScrollLink
                            to="contactSection"
                            smooth={true}
                            duration={800}
                            className="text-secondary font-black cursor-pointer hover:text-primary hover:underline ml-2 transition-colors uppercase text-xs tracking-widest"
                        >
                            Contact our support team
                        </ScrollLink>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;