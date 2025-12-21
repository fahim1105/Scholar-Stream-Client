import { useQuery } from "@tanstack/react-query";

import { FaTrashAlt, FaStar, FaCalendarAlt, FaEnvelope, FaUniversity } from "react-icons/fa";
import Swal from "sweetalert2"; // SweetAlert2 ইমপোর্ট করুন
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Loader from "../../../../Components/Loader/Loader";

const AllReviews = () => {
    const axiosSecure = UseAxiosSecure();

    const { data: reviews = [], refetch, isLoading } = useQuery({
        queryKey: ["all-reviews"],
        queryFn: async () => {
            const res = await axiosSecure.get("/reviews");
            return res.data;
        }
    });

    const handleDelete = (id) => {
        // SweetAlert2 কনফার্মেশন ডায়ালগ
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this review!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            customClass: {
                popup: 'rounded-[2rem]', // কার্ডের সাথে মিল রেখে রাউন্ডেড করা
                confirmButton: 'rounded-xl',
                cancelButton: 'rounded-xl'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/reviews/${id}`);
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "The review has been deleted.",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false,
                            customClass: {
                                popup: 'rounded-[2rem]'
                            }
                        });
                        refetch();
                    }
                } catch (error) {
                    console.log(error)
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong while deleting.",
                        icon: "error",
                        customClass: {
                            popup: 'rounded-[2rem]'
                        }
                    });
                }
            }
        });
    };

    if (isLoading) return <Loader />;

    return (
        <div className="p-6 bg-base-200 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10">
                    <h2 className="text-4xl font-black text-neutral flex items-center gap-3">
                        Total Reviews <span className="text-primary bg-primary/10 px-4 py-1 rounded-2xl text-2xl">{reviews.length}</span>
                    </h2>
                    <p className="text-gray-500 mt-2 ml-1">Manage and moderate all student feedbacks from here.</p>
                </header>

                {reviews.length === 0 ? (
                    <div className="text-center py-20 bg-base-100 rounded-[3rem] shadow-inner border-4 border-dashed border-base-300">
                        <p className="text-2xl text-gray-400 font-bold">No reviews found!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.map((review) => (
                            <div
                                key={review._id}
                                className="bg-base-100 rounded-[2.5rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-primary/20 group flex flex-col justify-between"
                            >
                                <div>
                                    {/* User Profile Info */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="avatar">
                                            <div className="w-14 h-14 rounded-2xl ring ring-primary ring-offset-2 overflow-hidden shadow-lg">
                                                <img src={review.reviewerPhoto} alt={review.reviewerName} />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-black text-neutral text-xl">{review.reviewerName}</h4>
                                            <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                                                <FaEnvelope className="text-primary" /> {review.reviewerEmail}
                                            </div>
                                        </div>
                                    </div>

                                    {/* University Name Badge */}
                                    <div className="inline-flex items-center gap-2 bg-neutral text-white px-4 py-2 rounded-xl text-sm mb-5 shadow-md">
                                        <FaUniversity className="text-primary" />
                                        <span className="font-bold truncate max-w-[180px]">{review.scholarshipName}</span>
                                    </div>

                                    {/* Review Text */}
                                    <div className="relative mb-6">
                                        <p className="text-gray-600 italic leading-relaxed text-base pl-4 border-l-4 border-primary/20">
                                            "{review.reviewComment}"
                                        </p>
                                    </div>
                                </div>

                                {/* Card Footer: Rating, Date & Actions */}
                                <div className="mt-4 pt-6 border-t border-base-200 flex items-center justify-between">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center text-amber-500 gap-1 font-black text-lg">
                                            <FaStar /> {review.rating || "0"}
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                            <FaCalendarAlt /> {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "N/A"}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="btn btn-error btn-circle shadow-lg shadow-error/30 hover:scale-110 transition-transform"
                                    >
                                        <FaTrashAlt className="text-white text-lg" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllReviews;