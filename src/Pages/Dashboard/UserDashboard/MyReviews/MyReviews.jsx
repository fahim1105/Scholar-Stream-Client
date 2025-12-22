import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import Swal from 'sweetalert2';
import { Pencil, Trash2, Star, XCircle, StarHalf } from 'lucide-react';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecure';
import Loader from '../../../../Components/Loader/Loader';
import { motion, AnimatePresence } from "framer-motion";
// import { X, Star } from "lucide-react";

const MyReviews = () => {
    const axiosSecure = UseAxiosSecure();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
    const { register, handleSubmit, setValue } = useForm();

    // ইউজারের রিভিউ ডাটা ফেচ করা
    const { data: reviews = [], isLoading, refetch } = useQuery({
        queryKey: ['my-reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews');
            return res.data;
        }
    });

    // ডিলিট লজিক
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/reviews/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Review has been removed.", "success");
                    refetch();
                }
            }
        });
    };

    // এডিট মডাল ওপেন
    const openEditModal = (review) => {
        setEditingReview(review);
        setValue("rating", review.rating);
        setValue("reviewComment", review.reviewComment);
        setIsEditModalOpen(true);
    };

    // এডিট সাবমিট (ব্যাকএন্ডে PATCH/PUT রাউট থাকতে হবে)
    const onEditSubmit = async (data) => {
        try {
            const res = await axiosSecure.patch(`/reviews/${editingReview._id}`, data);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Updated!", "Your review has been updated.", "success");
                setIsEditModalOpen(false);
                refetch();
            }
        } catch (error) {
            console.log(error)
            Swal.fire("Error", "Failed to update review", "error");
        }
    };

    if (isLoading) return <Loader />;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-black mb-8">MY <span className="text-primary">REVIEWS</span></h2>

            <div className="overflow-x-auto bg-white rounded-3xl shadow-xl border border-base-200">
                <table className="table w-full">
                    <thead className="bg-neutral text-white">
                        <tr>
                            <th>Scholarship & University</th>
                            <th>Comment</th>
                            <th>Rating</th>
                            <th>Date</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                            <tr key={review._id} className="hover:bg-base-100 transition-colors">
                                <td>
                                    <div className="font-bold text-primary">{review.scholarshipName}</div>
                                    <div className="text-xs opacity-50">{review.universityName || "University N/A"}</div>
                                </td>
                                <td className="max-w-xs truncate italic">"{review.reviewComment}"</td>
                                <td>
                                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                                        <Star size={14} fill="currentColor" /> {review.rating}
                                    </div>
                                </td>
                                <td className="text-xs">{new Date(review.createdAt).toLocaleDateString()}</td>
                                <td className="flex justify-center gap-2">
                                    <button onClick={() => openEditModal(review)} className="btn btn-square btn-sm btn-warning shadow-md hover:scale-110">
                                        <Pencil size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(review._id)} className="btn btn-square btn-sm btn-error shadow-md hover:scale-110">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- EDIT MODAL --- */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Animated Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEditModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />

                        {/* Premium Modal Card */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="modal-box relative max-w-md overflow-hidden rounded-[2.5rem] border border-white/10 bg-base-100/80 p-10 shadow-2xl backdrop-blur-2xl"
                        >
                            {/* Subtle Decorative Gradient Flare */}
                            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />

                            {/* Close Button */}
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="btn btn-ghost btn-circle btn-sm absolute right-6 top-6 transition-transform hover:rotate-90"
                            >
                                <XCircle size={20} className="text-base-content/50" />
                            </button>

                            {/* Header */}
                            <header className="mb-8">
                                <h3 className="text-3xl font-black tracking-tight text-base-content">
                                    Edit <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Review</span>
                                </h3>
                                <p className="mt-1 text-sm font-medium text-base-content/50">Your feedback helps us grow.</p>
                            </header>

                            <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-6">
                                {/* Rating Input */}
                                <div className="form-control">
                                    <label className="label mb-1">
                                        <span className="label-text flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-base-content/60">
                                            <StarHalf size={14} className="text-primary" /> Rating (1-5)
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        {...register("rating", { required: true })}
                                        className="input input-lg w-full border-none bg-base-200/50 text-lg font-semibold transition-all focus:bg-base-200 focus:ring-2 focus:ring-primary/20 rounded-2xl"
                                        placeholder="5"
                                    />
                                </div>

                                {/* Comment Input */}
                                <div className="form-control">
                                    <label className="label mb-1">
                                        <span className="label-text text-xs font-bold uppercase tracking-widest text-base-content/60">Your Experience</span>
                                    </label>
                                    <textarea
                                        {...register("reviewComment", { required: true })}
                                        className="textarea textarea-lg h-36 w-full border-none bg-base-200/50 text-base leading-relaxed transition-all focus:bg-base-200 focus:ring-2 focus:ring-primary/20 rounded-2xl"
                                        placeholder="Tell us what you thought..."
                                    ></textarea>
                                </div>

                                {/* Action Button */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block h-14 rounded-2xl border-none bg-gradient-to-r from-primary to-primary-focus text-lg font-bold text-primary-content shadow-[0_10px_20px_-10px_rgba(var(--p),0.5)] transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95"
                                    >
                                        Update Review
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MyReviews;