import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaStar, FaCalendarAlt, FaEnvelope, FaUniversity, FaQuoteLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Loader from "../../../../Components/Loader/Loader";
import { motion, AnimatePresence } from "framer-motion";

const ManageReviews = () => {
    const axiosSecure = UseAxiosSecure();

    const { data: reviews = [], refetch, isLoading } = useQuery({
        queryKey: ["all-reviews"],
        queryFn: async () => {
            const res = await axiosSecure.get("/all-reviews");
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This review will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3B82F6",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it!",
            background: "#fff",
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-1000">
                <div className="text-left relative flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 mb-3">
                        {/* Main Title */}
                        <h2 className="text-4xl md:text-6xl font-black text-neutral  uppercase tracking-tighter leading-none">
                            Review <br className="sm:hidden" />
                            <span className="text-primary relative inline-block">
                                Moderation
                                <div className="absolute -bottom-1 left-0 w-full h-1.5 bg-primary/20 rounded-full"></div>
                            </span>
                        </h2>

                        {/* Premium Dynamic Count Badge */}
                        <div className="relative group self-start sm:self-center">
                            <div className="bg-primary text-white px-5 py-2 md:px-7 md:py-3 rounded-[2rem] shadow-[0_10px_30px_rgba(59,130,246,0.4)] flex flex-col items-center justify-center border-b-4 border-black/10 active:scale-95 transition-transform cursor-default min-w-[100px] md:min-w-[120px]">
                                <span className="text-xl md:text-2xl font-black leading-none tracking-tighter">
                                    {reviews.length}
                                </span>
                                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] leading-tight opacity-90">
                                    Feedbacks
                                </span>
                            </div>
                            {/* Decorative Ping Animation */}
                            <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-primary/60 border-2 border-white dark:border-base-100"></span>
                            </span>
                        </div>
                    </div>

                    {/* Subtitle */}
                    <p className="text-base-content/40 font-black uppercase text-[10px] md:text-[12px] tracking-[0.4em] italic px-1 leading-relaxed max-w-xl">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <AnimatePresence>
                        {reviews.map((review, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                key={review._id}
                                className="bg-base-100 rounded-[3rem] p-8 shadow-2xl border border-base-200 group flex flex-col justify-between relative overflow-hidden"
                            >
                                {/* Top Section: Avatar & Info */}
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="mask mask-squircle w-16 h-16 border-2 border-primary/10 shadow-lg">
                                            <img
                                                src={review.reviewerPhoto || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                                alt={review.reviewerName}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <h4 className="font-black text-neutral uppercase italic text-lg leading-tight truncate">
                                                {review.reviewerName}
                                            </h4>
                                            <div className="flex items-center gap-1 text-[9px] text-base-content/40 font-black uppercase tracking-widest truncate">
                                                <FaEnvelope className="text-primary/50" /> {review.reviewerEmail}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Scholarship Pill (Black Header like your screenshot) */}
                                    <div className="mb-6">
                                        <div className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] shadow-lg">
                                            <FaUniversity className="text-primary" />
                                            <span className="truncate">{review.scholarshipName}</span>
                                        </div>
                                    </div>

                                    {/* Quote/Comment */}
                                    <div className="relative mb-6">
                                        <FaQuoteLeft className="absolute -top-1 -left-1 text-primary/10" size={30} />
                                        <p className="text-neutral/80 italic text-sm md:text-base leading-relaxed pl-6 line-clamp-4 font-medium">
                                            {review.reviewComment}
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom Section: Rating & Delete */}
                                <div className="mt-4 pt-6 border-t border-base-200 flex items-end justify-between">
                                    <div className="space-y-2">
                                        <div className="flex items-center text-amber-500 gap-1.5 font-black text-xl italic">
                                            <FaStar /> {review.rating || "0"}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] text-base-content/30 font-black uppercase tracking-tighter">
                                            <FaCalendarAlt /> {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "22/12/2025"}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="w-12 h-12 flex items-center justify-center bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg active:scale-90"
                                    >
                                        <FaTrashAlt size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default ManageReviews;