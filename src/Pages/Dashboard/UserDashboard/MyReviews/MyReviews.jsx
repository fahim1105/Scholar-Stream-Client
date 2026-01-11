import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Pencil, Trash2, Star, XCircle, StarHalf, MessageSquareOff, Calendar } from 'lucide-react';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecure';
import Loader from '../../../../Components/Loader/Loader';
import { motion, AnimatePresence } from "framer-motion";

const MyReviews = () => {
    const axiosSecure = UseAxiosSecure();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
    const { register, handleSubmit, setValue } = useForm();

    const { data: reviews = [], isLoading, refetch } = useQuery({
        queryKey: ['my-reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews');
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete Review?",
            text: "This feedback will be permanently removed!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Yes, Delete",
            customClass: { popup: 'rounded-[2rem]' }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/reviews/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Your review has been removed.", "success");
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
                Swal.fire({
                    title: "Success!",
                    text: "Review updated successfully",
                    icon: "success",
                    customClass: { popup: 'rounded-[2rem]' }
                });
                setIsEditModalOpen(false);
                refetch();
            }
        } catch (error) {
            Swal.fire("Error", "Failed to update review", "error");
        }
    };

    if (isLoading) return <Loader />;

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                    MY <span className="text-primary italic">REVIEWS</span>
                </h2>
                <div className="badge badge-primary text-white font-bold p-3 md:p-4 text-xs md:text-sm">
                    {reviews.length} Feedbacks
                </div>
            </div>

            {/* Responsive Container */}
            <div className="bg-transparent md:bg-base-100 md:rounded-[2.5rem] md:shadow-2xl md:border md:border-base-200 md:p-4">
                <table className="table w-full border-separate border-spacing-y-4 md:border-spacing-y-2">
                    {/* Table Head - Hidden on Mobile */}
                    <thead className="hidden md:table-header-group">
                        <tr className="text-gray-400 uppercase text-[10px] tracking-widest border-none">
                            <th className="bg-transparent">Scholarship & University</th>
                            <th className="bg-transparent">Review Comment</th>
                            <th className="bg-transparent">Rating</th>
                            <th className="bg-transparent">Posted Date</th>
                            <th className="bg-transparent text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="flex flex-col md:table-row-group gap-4">
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <tr key={review._id} className="flex flex-col md:table-row bg-base-100 md:bg-transparent rounded-3xl md:rounded-none border border-base-200 md:border-none shadow-sm md:shadow-none hover:bg-primary/5 transition-all duration-300">
                                    
                                    {/* Scholarship Name */}
                                    <td className="md:bg-base-200/30 md:rounded-l-2xl md:border-y md:border-l md:border-base-200 p-4 md:p-3">
                                        <div className="flex flex-col">
                                            <span className="md:hidden text-[10px] font-black uppercase text-gray-400 mb-1">Scholarship</span>
                                            <div className="font-bold text-neutral text-sm md:text-base">{review.scholarshipName}</div>
                                            <div className="text-[10px] font-bold text-primary uppercase">{review.universityName}</div>
                                        </div>
                                    </td>

                                    {/* Comment */}
                                    <td className="md:bg-base-200/30 md:border-y md:border-base-200 p-4 md:p-3 italic text-gray-500 text-sm">
                                        <span className="md:hidden not-italic text-[10px] font-black uppercase text-gray-400 block mb-1">Feedback</span>
                                        <p className="line-clamp-3 md:max-w-xs md:truncate">"{review.reviewComment}"</p>
                                    </td>

                                    {/* Rating */}
                                    <td className="md:bg-base-200/30 md:border-y md:border-base-200 p-4 md:p-3">
                                        <div className="flex items-center gap-2">
                                            <span className="md:hidden text-[10px] font-black uppercase text-gray-400">Rating:</span>
                                            <div className="flex items-center gap-1 text-amber-500 font-black">
                                                <Star size={14} fill="currentColor" /> {review.rating}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Date */}
                                    <td className="md:bg-base-200/30 md:border-y md:border-base-200 p-4 md:p-3 text-xs font-bold text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="md:hidden" />
                                            {new Date(review.createdAt).toLocaleDateString('en-GB')}
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="md:bg-base-200/30 md:rounded-r-2xl md:border-y md:border-r md:border-base-200 p-4 md:p-3">
                                        <div className="flex justify-start md:justify-center gap-3">
                                            <button
                                                onClick={() => openEditModal(review)}
                                                className="flex-1 md:flex-none flex items-center justify-center gap-2 md:p-2 py-3 bg-warning/10 text-warning rounded-xl hover:bg-warning hover:text-white transition-all shadow-sm text-xs font-bold"
                                            >
                                                <Pencil size={16} /> <span className="md:hidden">Edit</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(review._id)}
                                                className="flex-1 md:flex-none flex items-center justify-center gap-2 md:p-2 py-3 bg-error/10 text-error rounded-xl hover:bg-error hover:text-white transition-all shadow-sm text-xs font-bold"
                                            >
                                                <Trash2 size={16} /> <span className="md:hidden">Delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="flex flex-col md:table-row">
                                <td colSpan="5" className="py-12 md:py-24 text-center">
                                    <div className="flex flex-col items-center opacity-20">
                                        <MessageSquareOff size={60} />
                                        <p className="text-xl font-black mt-4 uppercase">No reviews found</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* --- EDIT MODAL (Responsive) --- */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEditModalOpen(false)}
                            className="absolute inset-0 bg-neutral/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="modal-box relative w-full max-w-md rounded-t-[2.5rem] sm:rounded-[2.5rem] border-t sm:border border-base-200 bg-base-100 p-6 md:p-10 shadow-2xl overflow-visible"
                        >
                            <button onClick={() => setIsEditModalOpen(false)} className="btn btn-ghost btn-circle btn-sm absolute right-4 top-4 md:right-6 md:top-6">
                                <XCircle size={24} className="text-gray-400" />
                            </button>

                            <header className="mb-6 md:mb-8">
                                <h3 className="text-xl md:text-2xl font-black">Edit Your <span className="text-primary">Experience</span></h3>
                                <p className="text-xs md:text-sm text-gray-400 font-medium">Update your rating and feedback.</p>
                            </header>

                            <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-4 md:space-y-5">
                                <div className="form-control">
                                    <label className="label text-[10px] font-black uppercase text-gray-400 tracking-widest">
                                        Rating (1-5)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number" min="1" max="5"
                                            {...register("rating", { required: true })}
                                            className="input input-bordered w-full rounded-2xl font-bold focus:ring-2 focus:ring-primary/20 border-base-300 h-12"
                                        />
                                        <StarHalf className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/30" />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label text-[10px] font-black uppercase text-gray-400 tracking-widest">
                                        Review Comment
                                    </label>
                                    <textarea
                                        {...register("reviewComment", { required: true })}
                                        className="textarea textarea-bordered h-24 md:h-32 w-full rounded-2xl font-medium focus:ring-2 focus:ring-primary/20 border-base-300"
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary/30 h-12 md:h-14">
                                    Update Review
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MyReviews;