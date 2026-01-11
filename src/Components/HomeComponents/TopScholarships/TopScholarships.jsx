import React from "react";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import { useQuery } from '@tanstack/react-query';
import { motion } from "framer-motion";
import { MapPin, Calendar, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const TopScholarships = () => {
    const axiosPublic = UseAxiosPublic();

    const { data: scholarships = [], isLoading } = useQuery({
        queryKey: ["top-scholarships"],
        queryFn: async () => {
            const res = await axiosPublic.get("/scholarships/top");
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px] bg-base-100">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-20 bg-base-100 transition-colors duration-300">
            <div className="text-center mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl font-black text-neutral mb-4"
                >
                    Top <span className="text-primary">Scholarships</span>
                </motion.h2>
                <p className="text-base-content/60 max-w-xl mx-auto font-medium">
                    Handpicked opportunities with the lowest application fees and latest funding updates.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {scholarships.map((item, index) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -10 }}
                        className="group bg-base-200 rounded-[2.5rem] overflow-hidden border border-base-300/10 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
                    >
                        {/* Image Container */}
                        <div className="relative h-56 overflow-hidden p-3">
                            <img
                                src={item.universityImage}
                                alt={item.universityName}
                                className="w-full h-full object-cover rounded-[2rem] transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-6 left-6 bg-base-100/80 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg border border-white/10">
                                <span className="text-[10px] font-black text-primary flex items-center gap-1 uppercase tracking-widest">
                                    <Award size={14} /> {item.scholarshipCategory}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 pt-4">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-black text-neutral leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                    {item.scholarshipName}
                                </h3>
                            </div>

                            <div className="space-y-4 mb-8">
                                <p className="flex items-center gap-2 text-base-content/80 text-sm font-bold">
                                    <MapPin size={16} className="text-primary" />
                                    {item.universityName}, {item.universityCountry}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-3">
                                    <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                                        {item.degree}
                                    </span>
                                    <span className="bg-base-300/10 text-base-content/70 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                                        Rank #{item.universityWorldRank}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-t border-base-300/10 pt-6 mb-8">
                                <div>
                                    <p className="text-[10px] uppercase font-black text-base-content/40 tracking-[0.1em] mb-1">App Fee</p>
                                    <p className="text-2xl font-black text-neutral">${item.applicationFees}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] uppercase font-black text-base-content/40 tracking-[0.1em] mb-1 flex justify-end items-center gap-1">
                                        <Calendar size={12} /> Deadline
                                    </p>
                                    <p className="text-sm font-black text-neutral">{item.applicationDeadline}</p>
                                </div>
                            </div>

                            <Link to={`/scholarship-details/${item._id}`}>
                                <button className="w-full bg-neutral text-base-100 group-hover:bg-primary group-hover:text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl shadow-neutral/10 group-hover:shadow-primary/30">
                                    View Details
                                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="text-center mt-16">
                <Link to="/all-scholarships">
                    <button className="px-10 py-4 border-2 border-base-300/20 rounded-full font-black text-xs uppercase tracking-[0.2em] text-neutral hover:bg-neutral hover:text-base-100 transition-all active:scale-95">
                        Explore All Scholarships
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default TopScholarships;