import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Pencil, Trash2, Star, XCircle, StarHalf, MessageSquareOff, Calendar, History, ChevronLeft, ChevronRight } from 'lucide-react';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecure';
import Loader from '../../../../Components/Loader/Loader';
import { motion, AnimatePresence } from "framer-motion";

const MyReviews = () => {
    const axiosSecure = UseAxiosSecure();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
    const { register, handleSubmit, setValue } = useForm();

    // --- Pagination States ---
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20;

    const { data: reviewData, isLoading, refetch } = useQuery({
        queryKey: ['my-reviews', currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews?page=${currentPage}&limit=${limit}`);
            return res.data;
        }
    });

    const reviews = reviewData?.reviews || [];
    const totalPages = reviewData?.totalPages || 1;
    const totalItems = reviewData?.totalItems || 0;

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete Review?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Yes, Delete",
            customClass: { popup: 'rounded-[2.5rem] bg-base-100' }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/reviews/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Review removed.", "success");
                    refetch();
                }
            }
        });
    };

    const openEditModal = (review) => {
        setEditingReview(review);
        setValue("rating", review.rating);
        setValue("reviewComment", review.reviewComment);
        setIsEditModalOpen(true);
    };

    const onEditSubmit = async (data) => {
        try {
            const res = await axiosSecure.patch(`/reviews/${editingReview._id}`, data);
            if (res.data.modifiedCount > 0) {
                Swal.fire({ title: "Updated!", icon: "success", customClass: { popup: 'rounded-[2.5rem]' }});
                setIsEditModalOpen(false);
                refetch();
            }
        } catch (error) {
            Swal.fire("Error", "Failed to update", "error");
        }
    };

    if (isLoading) return <Loader />;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen px-2 sm:px-4"
        >
            <div className="max-w-7xl mx-auto">
                {/* --- Header Section (Payments Style) --- */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 md:mb-12">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black text-neutral flex items-center gap-3 md:gap-4 italic tracking-tighter">
                            <div className="p-2 md:p-3 bg-primary/10 rounded-2xl">
                                <Star className="text-primary w-8 h-8 md:w-12 md:h-12" />
                            </div>
                            My <span className="text-primary underline decoration-primary/20">Reviews</span>
                        </h1>
                        <p className="text-base-content/50 mt-3 font-bold uppercase text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em]">
                            Managing your shared experiences & feedback
                        </p>
                    </div>

                    <div className="stats shadow-xl bg-base-200/50 backdrop-blur-md rounded-2xl md:rounded-[2rem] border border-base-300/10">
                        <div className="stat px-4 md:px-8 py-2 md:py-3">
                            <div className="stat-title text-[8px] md:text-[10px] font-black uppercase tracking-widest text-base-content/40">Total Reviews</div>
                            <div className="stat-value text-primary text-xl md:text-3xl font-black italic">{totalItems}</div>
                        </div>
                    </div>
                </div>

                {/* --- Content Section --- */}
                <div className="bg-transparent lg:bg-base-100 lg:rounded-[3rem] lg:shadow-2xl lg:border lg:border-base-300/10 overflow-hidden">
                    
                    {/* Desktop View */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="table w-full border-separate border-spacing-y-0">
                            <thead>
                                <tr className="bg-primary/5 border-b border-base-300/10">
                                    <th className="py-6 pl-10 text-[10px] font-black uppercase tracking-[0.2em] text-primary">#</th>
                                    <th className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">University & Scholarship</th>
                                    <th className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Feedback</th>
                                    <th className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Rating</th>
                                    <th className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Posted Date</th>
                                    <th className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-primary">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-300/5">
                                {reviews.map((review, index) => (
                                    <tr key={review._id} className="hover:bg-primary/5 transition-all duration-300 group/row">
                                        {/* --- Indexing Logic --- */}
                                        <th className="pl-10 font-mono text-[10px] text-base-content/30 italic font-black">
                                            #{(currentPage - 1) * limit + index + 1}
                                        </th>
                                        <td className="py-6">
                                            <div className="font-black text-neutral uppercase text-xs tracking-tight">{review.scholarshipName}</div>
                                            <div className="text-[9px] font-bold text-primary uppercase">{review.universityName}</div>
                                        </td>
                                        <td className="italic text-base-content/60 text-xs max-w-xs truncate">"{review.reviewComment}"</td>
                                        <td>
                                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/10 text-amber-600 rounded-lg font-black text-xs border border-amber-500/20">
                                                <Star size={12} fill="currentColor" /> {review.rating}
                                            </div>
                                        </td>
                                        <td className="text-[10px] font-bold text-base-content/60 uppercase italic tracking-wider">
                                            {new Date(review.createdAt).toLocaleDateString('en-GB')}
                                        </td>
                                        <td className="text-center">
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => openEditModal(review)} className="btn btn-circle btn-sm btn-ghost text-warning/40 hover:text-warning hover:bg-warning/10 transition-all duration-300">
                                                    <Pencil size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(review._id)} className="btn btn-circle btn-sm btn-ghost text-error/40 hover:text-error hover:bg-error/10 transition-all duration-300">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <div key={review._id} className="bg-base-100 p-6 rounded-[2rem] border border-base-300/10 shadow-lg space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="bg-primary/5 text-primary text-[10px] font-black px-3 py-1 rounded-full italic">
                                            #{(currentPage - 1) * limit + index + 1}
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => openEditModal(review)} className="text-warning/50 p-1"><Pencil size={18} /></button>
                                            <button onClick={() => handleDelete(review._id)} className="text-error/50 p-1"><Trash2 size={18} /></button>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-black text-neutral uppercase text-sm leading-tight">{review.scholarshipName}</h3>
                                        <p className="text-[10px] font-bold text-primary uppercase">{review.universityName}</p>
                                    </div>
                                    <p className="italic text-gray-500 text-xs">"{review.reviewComment}"</p>
                                    <div className="flex justify-between items-center pt-2 border-t border-base-200">
                                        <div className="flex items-center gap-1 text-amber-500 font-black text-xs"><Star size={14} fill="currentColor" /> {review.rating}</div>
                                        <div className="text-[9px] font-black text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center opacity-20"><MessageSquareOff size={60} className="mx-auto" /> <p className="font-black italic mt-4 uppercase">No Reviews Yet</p></div>
                        )}
                    </div>
                </div>

                {/* --- Pagination (Payments Style) --- */}
                {totalPages > 1 && (
                    <div className="mt-12 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral/40 italic">
                            Showing Page <span className="text-primary">{currentPage}</span> of {totalPages}
                        </p>
                        
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                                disabled={currentPage === 1}
                                className="btn btn-sm md:btn-md bg-base-200 border-none rounded-2xl font-black text-[10px] uppercase italic disabled:opacity-20 hover:bg-primary hover:text-white transition-all shadow-lg"
                            >
                                <ChevronLeft size={16} /> Prev
                            </button>

                            <div className="flex gap-2">
                                {[...Array(totalPages)].map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handlePageChange(idx + 1)}
                                        className={`btn btn-sm md:btn-md border-none rounded-2xl font-black text-[10px] w-10 md:w-12 transition-all ${
                                            currentPage === idx + 1 
                                            ? "bg-primary text-white shadow-xl scale-110" 
                                            : "bg-base-200 text-neutral/40 hover:bg-base-300"
                                        }`}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="btn btn-sm md:btn-md bg-base-200 border-none rounded-2xl font-black text-[10px] uppercase italic disabled:opacity-20 hover:bg-primary hover:text-white transition-all shadow-lg"
                            >
                                Next <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* --- Edit Modal --- */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEditModalOpen(false)} className="absolute inset-0 bg-neutral/80 backdrop-blur-sm" />
                        <motion.div initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }} className="modal-box relative w-full max-w-md rounded-t-[2.5rem] sm:rounded-[2.5rem] bg-base-100 p-8 shadow-2xl border border-base-200">
                            <button onClick={() => setIsEditModalOpen(false)} className="btn btn-ghost btn-circle btn-sm absolute right-4 top-4"><XCircle size={24} className="text-gray-400" /></button>
                            <h3 className="text-xl font-black uppercase mb-6">Edit <span className="text-primary italic">Review</span></h3>
                            <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-4">
                                <div className="form-control">
                                    <label className="label text-[10px] font-black uppercase text-gray-400 tracking-widest">Rating (1-5)</label>
                                    <input type="number" min="1" max="5" {...register("rating", { required: true })} className="input input-bordered rounded-2xl font-bold" />
                                </div>
                                <div className="form-control">
                                    <label className="label text-[10px] font-black uppercase text-gray-400 tracking-widest">Review Comment</label>
                                    <textarea {...register("reviewComment", { required: true })} className="textarea textarea-bordered h-32 rounded-2xl font-medium"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block rounded-2xl font-black uppercase tracking-widest h-14 shadow-lg shadow-primary/30">Update Review</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default MyReviews;