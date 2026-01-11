import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import Loader from "../../Components/Loader/Loader";
import { Link } from "react-router";
import { FiSearch, FiChevronLeft, FiChevronRight, FiFilter, FiDollarSign, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";

const AllScholarships = () => {
    const axiosPublic = UseAxiosPublic();
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 12;

    const { register, watch } = useForm({
        defaultValues: { search: "", category: "", subject: "", degree: "" },
    });

    const searchVal = watch("search").toLowerCase();
    const categoryVal = watch("category");
    const subjectVal = watch("subject");
    const degreeVal = watch("degree");

    const { data, isLoading } = useQuery({
        queryKey: ["all-scholarships-list"],
        queryFn: async () => {
            const res = await axiosPublic.get("/scholarships");
            return res.data;
        },
    });

    const allScholarships = data?.scholarships || [];

    const filteredScholarships = allScholarships.filter((item) => {
        const matchesSearch = item.scholarshipName.toLowerCase().includes(searchVal) || item.universityName.toLowerCase().includes(searchVal);
        const matchesCategory = categoryVal ? item.scholarshipCategory === categoryVal : true;
        const matchesSubject = subjectVal ? item.subjectCategory === subjectVal : true;
        const matchesDegree = degreeVal ? item.degree === degreeVal : true;

        return matchesSearch && matchesCategory && matchesSubject && matchesDegree;
    });

    const totalPages = Math.ceil(filteredScholarships.length / limit);
    const currentData = filteredScholarships.slice((currentPage - 1) * limit, currentPage * limit);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchVal, categoryVal, subjectVal, degreeVal]);

    if (isLoading) return <Loader />;

    return (
        <div className="bg-base-100 min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 py-20">
                {/* Header */}
                <header className="mb-16 text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20"
                    >
                        <FiFilter size={14} /> Find Your Path
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-black text-neutral tracking-tighter leading-none">
                        Explore <span className="text-primary italic">Opportunities.</span>
                    </h2>
                    <p className="text-base-content/50 font-bold italic text-lg max-w-xl mx-auto leading-relaxed">
                        "Real-time scholarship discovery engine. Filter through thousands of funding options in seconds."
                    </p>
                </header>

                {/* --- Search & Filters Section --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-base-200 p-8 rounded-[3rem] border border-base-300/10 shadow-2xl shadow-primary/5 mb-16"
                >
                    <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="relative group">
                            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform" size={18} />
                            <input
                                type="text"
                                placeholder="Live Search..."
                                {...register("search")}
                                className="w-full bg-base-100 border border-base-300/10 focus:border-primary/50 text-neutral font-bold rounded-2xl pl-14 pr-5 py-4 outline-none transition-all placeholder:text-base-content/20"
                            />
                        </div>

                        <select {...register("category")} className="select-custom bg-base-100 border border-base-300/10 text-neutral font-bold rounded-2xl px-5 py-4 outline-none focus:border-primary/50 cursor-pointer">
                            <option value="">All Categories</option>
                            <option value="Full Fund">Full Fund</option>
                            <option value="Partial Fund">Partial Fund</option>
                            <option value="Self Fund">Self Fund</option>
                        </select>

                        <select {...register("subject")} className="select-custom bg-base-100 border border-base-300/10 text-neutral font-bold rounded-2xl px-5 py-4 outline-none focus:border-primary/50 cursor-pointer">
                            <option value="">All Subjects</option>
                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                            <option value="Physics">Physics</option>
                            <option value="Agriculture">Agriculture</option>
                        </select>

                        <select {...register("degree")} className="select-custom bg-base-100 border border-base-300/10 text-neutral font-bold rounded-2xl px-5 py-4 outline-none focus:border-primary/50 cursor-pointer">
                            <option value="">All Degrees</option>
                            <option value="Bachelor">Bachelor</option>
                            <option value="Masters">Masters</option>
                            <option value="PhD">PhD</option>
                        </select>
                    </form>
                </motion.div>

                {/* Scholarship Grid */}
                {currentData.length === 0 ? (
                    <div className="text-center py-32 bg-base-200 rounded-[4rem] border-4 border-dashed border-base-300/20">
                        <p className="text-3xl text-base-content/20 font-black uppercase tracking-tighter italic">No scholarships found!</p>
                        <p className="text-base-content/40 font-bold mt-2">Try adjusting your filters or search keywords.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {currentData.map((scholarship, idx) => (
                                <motion.div
                                    key={scholarship._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group bg-base-200 rounded-[2.5rem] overflow-hidden border border-base-300/5 hover:border-primary/20 hover:bg-base-100 transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-2xl hover:shadow-primary/5"
                                >
                                    <figure className="relative h-52 overflow-hidden p-3">
                                        <img
                                            src={scholarship.universityImage}
                                            alt={scholarship.universityName}
                                            className="w-full h-full object-cover rounded-[2rem] group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-6 right-6">
                                            <span className="bg-neutral text-base-100 text-[9px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-lg">
                                                {scholarship.scholarshipCategory}
                                            </span>
                                        </div>
                                    </figure>

                                    <div className="p-8 pt-2">
                                        <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest mb-3">
                                            <FiMapPin size={12} /> {scholarship.universityCountry || "Global"}
                                        </div>
                                        <h3 className="text-xl font-black text-neutral leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                            {scholarship.scholarshipName}
                                        </h3>
                                        <p className="text-base-content/50 text-sm font-bold mb-6 line-clamp-1 italic">
                                            {scholarship.universityName}
                                        </p>

                                        <div className="flex justify-between items-center py-5 border-t border-dashed border-base-300/20">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black text-base-content/30 uppercase tracking-widest">Degree</span>
                                                <span className="text-sm font-black text-neutral">{scholarship.degree}</span>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-[9px] font-black text-base-content/30 uppercase tracking-widest">Fees</span>
                                                <span className="text-xl font-black text-primary">${scholarship.applicationFees}</span>
                                            </div>
                                        </div>

                                        <Link to={`/scholarship-details/${scholarship._id}`}>
                                            <button className="w-full bg-neutral text-base-100 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all active:scale-95 shadow-xl">
                                                View Insight
                                            </button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center mt-24 gap-6">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    className="p-4 bg-base-200 rounded-2xl text-neutral hover:bg-primary hover:text-white disabled:opacity-30 disabled:hover:bg-base-200 disabled:hover:text-neutral transition-all border border-base-300/10 shadow-lg active:scale-90"
                                >
                                    <FiChevronLeft size={24} />
                                </button>

                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-black uppercase tracking-widest text-base-content/40">Page</span>
                                    <span className="text-xl font-black text-neutral">{currentPage}</span>
                                    <span className="text-xs font-black uppercase tracking-widest text-base-content/40">of {totalPages}</span>
                                </div>

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    className="p-4 bg-base-200 rounded-2xl text-neutral hover:bg-primary hover:text-white disabled:opacity-30 disabled:hover:bg-base-200 disabled:hover:text-neutral transition-all border border-base-300/10 shadow-lg active:scale-90"
                                >
                                    <FiChevronRight size={24} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AllScholarships;