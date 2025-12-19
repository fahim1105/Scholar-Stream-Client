import React from "react";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import { useQuery } from '@tanstack/react-query';
import { motion } from "framer-motion";
import { MapPin, Calendar, DollarSign, Award, ArrowRight } from "lucide-react";
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
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-20 bg-base-100">
            <div className="text-center mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl font-black text-base-300 mb-4"
                >
                    Top <span className="text-primary">Scholarships</span>
                </motion.h2>
                <p className="text-gray-500 max-w-xl mx-auto">
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
                        className="group bg-base-100 rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300"
                    >
                        {/* Image Container */}
                        <div className="relative h-52 overflow-hidden">
                            <img
                                src={item.universityImage}
                                alt={item.universityName}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4 bg-base-100/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                                <span className="text-xs font-bold text-primary flex items-center gap-1">
                                    <Award size={14} /> {item.scholarshipCategory}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-xl font-bold text-base-300 leading-tight group-hover:text-primary transition-colors">
                                    {item.scholarshipName}
                                </h3>
                            </div>

                            <div className="space-y-3 mb-6">
                                <p className="flex items-center gap-2 text-base-300 text-sm font-medium">
                                    <MapPin size={16} className="text-primary" />
                                    {item.universityName}, {item.universityCountry}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-3">
                                    <span className="bg-primary/90 text-neutral px-3 py-1 rounded-lg text-xs font-bold uppercase">
                                        {item.degree}
                                    </span>
                                    <span className="bg-base-100 text-base-300 px-3 py-1 rounded-lg text-xs font-bold uppercase">
                                        Rank #{item.universityWorldRank}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-4 mb-6">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-base-300 tracking-wider">App Fee</p>
                                    <p className="text-lg font-black text-base-300">${item.applicationFees}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] uppercase font-bold text-base-300 tracking-wider flex justify-end items-center gap-1">
                                        <Calendar size={12} /> Deadline
                                    </p>
                                    <p className="text-sm font-bold text-base-300">{item.applicationDeadline}</p>
                                </div>
                            </div>

                            <Link to={`/scholarship-details/${item._id}`}>
                                <button className="w-full bg-neutral group-hover:bg-primary text-base-100 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-gray-200 group-hover:shadow-primary/30">
                                    View Details
                                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="text-center mt-12">
                <Link to="/all-scholarships">
                    <button className="px-8 py-3 border-2 border-gray-200 rounded-full font-bold text-base-300 hover:bg-base-100 transition-all">
                        Explore All Scholarships
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default TopScholarships;