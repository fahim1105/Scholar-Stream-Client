import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaCalendarAlt, FaUser, FaTimes } from 'react-icons/fa';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import Loader from '../../Components/Loader/Loader';
import { motion } from 'framer-motion';

const Blogs = () => {
    const axiosPublic = UseAxiosPublic();
    const [selectedBlog, setSelectedBlog] = useState(null);

    const { data: blogs = [], isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blogs');
            return res.data;
        }
    });

    if (isLoading) return <Loader />;

    return (
        <div className="bg-base-100 min-h-screen py-20 px-6 lg:p-10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-16 text-center space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-neutral tracking-tighter"
                    >
                        Academic <span className="text-primary italic">Insights</span>
                    </motion.h2>
                    <p className="text-base-content/60 max-w-xl mx-auto font-bold text-lg italic">
                        "Stay updated with expert tips on scholarships, applications, and student life."
                    </p>
                    <div className="w-20 h-1.5 bg-accent mx-auto rounded-full"></div>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, idx) => (
                        <motion.div
                            key={blog._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-base-200 rounded-[2.5rem] overflow-hidden shadow-sm border border-base-300/10 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2"
                        >
                            <figure className="relative h-60 overflow-hidden p-3">
                                <img
                                    src={blog.image}
                                    alt="Blog"
                                    className="w-full h-full object-cover rounded-[2rem] group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-lg">
                                        {blog.category || "Scholarship"}
                                    </span>
                                </div>
                            </figure>

                            <div className="p-8 pt-2">
                                <div className="flex items-center gap-4 text-[10px] text-base-content/40 mb-4 font-black uppercase tracking-[0.2em]">
                                    <span className="flex items-center gap-1.5"><FaCalendarAlt className="text-primary" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                                    <span className="flex items-center gap-1.5"><FaUser className="text-primary" /> Admin</span>
                                </div>
                                <h3 className="text-xl font-black text-neutral mb-4 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                                    {blog.title}
                                </h3>
                                <p className="text-base-content/60 text-sm font-bold line-clamp-3 mb-8 leading-relaxed">
                                    {blog.description}
                                </p>

                                <button
                                    onClick={() => setSelectedBlog(blog)}
                                    className="w-full bg-neutral text-base-100 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all active:scale-95 shadow-lg shadow-neutral/5"
                                >
                                    Read Full Insight
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* --- DaisyUI MODAL Section --- */}
            {selectedBlog && (
                <div className="modal modal-open modal-bottom sm:modal-middle transition-all duration-300 backdrop-blur-sm">
                    <div className="modal-box max-w-4xl rounded-[3rem] p-0 overflow-hidden bg-base-100 border border-base-300/20 shadow-2xl relative">

                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedBlog(null)}
                            className="btn btn-circle btn-sm absolute top-6 right-6 z-50 bg-neutral/80 border-none text-base-100 hover:bg-primary transition-colors"
                        >
                            <FaTimes />
                        </button>

                        <div className="h-72 md:h-96 w-full relative">
                            <img
                                src={selectedBlog.image}
                                className="w-full h-full object-cover"
                                alt="blog view"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent"></div>
                        </div>

                        <div className="p-10 -mt-12 relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="bg-primary text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-primary/20">
                                    {selectedBlog.category}
                                </span>
                                <span className="text-xs text-base-content/40 font-black uppercase tracking-widest">
                                    Published: {new Date(selectedBlog.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-black text-neutral leading-tight mb-8">
                                {selectedBlog.title}
                            </h3>

                            <div className="h-1 w-20 bg-primary/20 mb-8 rounded-full"></div>

                            <div className="max-h-80 overflow-y-auto pr-4 text-base-content/80 font-bold leading-relaxed whitespace-pre-line text-lg italic custom-scrollbar">
                                "{selectedBlog.description}"
                            </div>

                            <div className="modal-action mt-10">
                                <button
                                    onClick={() => setSelectedBlog(null)}
                                    className="px-10 py-4 bg-neutral text-base-100 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-primary transition-all active:scale-95 shadow-xl"
                                >
                                    Back to Insights
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="modal-backdrop bg-neutral/60" onClick={() => setSelectedBlog(null)}></div>
                </div>
            )}
        </div>
    );
};

export default Blogs;