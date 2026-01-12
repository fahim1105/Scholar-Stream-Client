import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaStar, FaCalendarAlt, FaEnvelope, FaUniversity, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Loader from "../../../../Components/Loader/Loader";
import { motion, AnimatePresence } from "framer-motion";

const ManageReviews = () => {
    const axiosSecure = UseAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20;

    const { data: reviewData, refetch, isLoading } = useQuery({
        queryKey: ["all-reviews", currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-reviews?page=${currentPage}&limit=${limit}`);
            return res.data;
        }
    });

    const reviews = reviewData?.reviews || [];
    const totalItems = reviewData?.totalItems || 0;
    const totalPages = reviewData?.totalPages || 1;

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This review will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3B82F6",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it!",
            customClass: { popup: 'rounded-[2rem]' }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/reviews/${id}`);
                    if (res.data.deletedCount > 0) {
                        refetch();
                        toast.success("Review deleted successfully");
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        });
    };

    if (isLoading) return <Loader />;

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-10 mb-20">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="text-left relative flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 mb-3">
                        <h2 className="text-4xl md:text-6xl font-black text-neutral uppercase tracking-tighter leading-none">
                            Review <br className="sm:hidden" />
                            <span className="text-primary relative inline-block">Moderation</span>
                        </h2>

                        <div className="bg-primary text-white px-5 py-2 md:px-7 md:py-3 rounded-[2rem] shadow-xl flex flex-col items-center min-w-[100px]">
                            <span className="text-xl md:text-2xl font-black leading-none">{totalItems}</span>
                            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest opacity-90">Total</span>
                        </div>
                    </div>
                    <p className="text-base-content/40 font-black uppercase text-[10px] md:text-[12px] tracking-[0.4em] italic leading-relaxed">
                        System-wide student experience monitoring
                    </p>
                </div>
            </div>

            {/* --- REVIEWS GRID --- */}
            {reviews.length === 0 ? (
                <div className="text-center py-20 opacity-20 italic">
                    <FaQuoteLeft size={40} className="mx-auto mb-4" />
                    <h3 className="text-2xl font-black uppercase">No Reviews Found</h3>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <AnimatePresence>
                        {reviews.map((review, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                key={review._id}
                                className="bg-base-100 rounded-[2.5rem] p-6 shadow-2xl border border-base-200 group flex flex-col justify-between relative overflow-hidden h-full"
                            >
                                {/* --- Indexing Badge --- */}
                                <div className="absolute top-4 right-6 text-[10px] font-black text-primary/20 italic tracking-tighter uppercase">
                                    #{(currentPage - 1) * limit + index + 1}
                                </div>

                                <div>
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className="mask mask-squircle w-14 h-14 border-2 border-primary/10 shadow-lg">
                                            <img
                                                src={review.reviewerPhoto || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                                alt={review.reviewerName}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <h4 className="font-black text-neutral uppercase italic text-sm leading-tight truncate">
                                                {review.reviewerName}
                                            </h4>
                                            <div className="flex items-center gap-1 text-[8px] text-base-content/40 font-black uppercase tracking-widest truncate">
                                                <FaEnvelope className="text-primary/50" /> {review.reviewerEmail}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex items-center gap-2 bg-neutral text-base-100 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">
                                            <FaUniversity className="text-primary shrink-0" />
                                            <span className="truncate">{review.scholarshipName}</span>
                                        </div>
                                    </div>

                                    <div className="relative mb-4">
                                        <FaQuoteLeft className="absolute -top-1 -left-1 text-primary/10" size={24} />
                                        <p className="text-neutral/80 italic text-xs leading-relaxed pl-5 line-clamp-4 font-medium">
                                            {review.reviewComment}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-auto pt-4 border-t border-base-200 flex items-end justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center text-amber-500 gap-1.5 font-black text-lg italic">
                                            <FaStar /> {review.rating || "0"}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[9px] text-base-content/30 font-black uppercase tracking-tighter">
                                            <FaCalendarAlt /> {new Date(review.createdAt || Date.now()).toLocaleDateString('en-GB')}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 shadow-md active:scale-90"
                                    >
                                        <FaTrashAlt size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* --- PAGINATION (Payment History Style) --- */}
            {totalPages > 1 && (
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-16 bg-base-100 p-6 rounded-[2.5rem] shadow-xl border border-base-200">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral/40 italic">
                        Showing Page <span className="text-primary">{currentPage}</span> of {totalPages}
                    </p>
                    
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="btn btn-sm md:btn-md bg-base-200 border-none rounded-2xl font-black text-[10px] uppercase italic disabled:opacity-20 hover:bg-primary hover:text-white transition-all"
                        >
                            <FaChevronLeft /> Prev
                        </button>

                        <div className="flex gap-2">
                            {[...Array(totalPages)].map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handlePageChange(idx + 1)}
                                    className={`btn btn-sm md:btn-md border-none rounded-2xl font-black text-[10px] w-10 md:w-12 transition-all ${
                                        currentPage === idx + 1 
                                        ? "bg-primary text-base-100 shadow-lg scale-110" 
                                        : "bg-base-200 text-neutral/40 hover:bg-base-300"
                                    }`}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="btn btn-sm md:btn-md bg-base-200 border-none rounded-2xl font-black text-[10px] uppercase italic disabled:opacity-20 hover:bg-primary hover:text-white transition-all"
                        >
                            Next <FaChevronRight />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageReviews;