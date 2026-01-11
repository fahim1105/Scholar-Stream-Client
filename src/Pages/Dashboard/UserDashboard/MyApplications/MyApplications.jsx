import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    ListCollapse, Pencil, Trash2, Star, CreditCard,
    History, GraduationCap, MapPin, Phone,
    Info, CheckCircle2, Clock, ChevronLeft, ChevronRight, X
} from 'lucide-react';
import Swal from 'sweetalert2';
import UseAuth from '../../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecure';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

const MyApplications = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const [selectedApp, setSelectedApp] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingApp, setEditingApp] = useState(null);
    
    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20;

    const { register, handleSubmit, setValue, reset } = useForm();

    const { data: appData, refetch, isLoading } = useQuery({
        queryKey: ['myApplications', user?.email, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications?email=${user.email}&page=${currentPage}&limit=${limit}`);
            return res.data;
        }
    });

    const applications = appData?.applications || [];
    const totalPages = appData?.totalPages || 1;
    const totalItems = appData?.totalItems || 0;

    // --- Pagination Handler ---
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- Handlers ---
    const handleAddReview = (app) => {
        Swal.fire({
            title: `<div class="flex flex-col items-center gap-2">
                      <div class="p-3 bg-primary/10 rounded-2xl text-primary"><Star size={28} /></div>
                      <span class="text-xl font-black italic uppercase tracking-tighter">Share Your Experience</span>
                    </div>`,
            html: `
                <div class="space-y-4 px-2">
                    <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-base-content/40 italic">Reviewing: ${app.universityName}</p>
                    <div class="form-control w-full text-left">
                        <label class="label"><span class="label-text font-black uppercase text-[10px] tracking-widest text-primary">Rating (1-5)</span></label>
                        <input type="number" id="rating" min="1" max="5" placeholder="Enter rating..." 
                            class="input input-bordered w-full rounded-2xl font-bold bg-base-200/50 focus:border-primary transition-all">
                    </div>
                    <div class="form-control w-full text-left">
                        <label class="label"><span class="label-text font-black uppercase text-[10px] tracking-widest text-primary">Your Feedback</span></label>
                        <textarea id="reviewComment" placeholder="Write your thoughts here..." 
                            class="textarea textarea-bordered w-full rounded-2xl font-bold bg-base-200/50 h-32 focus:border-primary transition-all"></textarea>
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Submit Review',
            confirmButtonColor: '#3b82f6',
            cancelButtonText: 'Cancel',
            customClass: {
                popup: 'rounded-[3rem] border border-base-300/10 shadow-2xl',
                confirmButton: 'btn btn-primary rounded-2xl font-black uppercase text-[10px] tracking-widest px-8',
                cancelButton: 'btn btn-ghost rounded-2xl font-black uppercase text-[10px] tracking-widest'
            },
            preConfirm: () => {
                const popup = Swal.getPopup();
                const rating = popup.querySelector('#rating').value;
                const reviewComment = popup.querySelector('#reviewComment').value;
                if (!rating || !reviewComment) {
                    Swal.showValidationMessage(`Please provide both rating and feedback`);
                }
                if (rating < 1 || rating > 5) {
                    Swal.showValidationMessage(`Rating must be between 1 and 5`);
                }
                return { rating, reviewComment };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const reviewData = {
                    scholarshipId: app.scholarshipId.toString(),
                    scholarshipName: app.scholarshipName,
                    reviewComment: result.value.reviewComment,
                    rating: result.value.rating,
                    userEmail: user?.email,
                    userName: user?.displayName,
                    userImage: user?.photoURL,
                    reviewDate: new Date().toLocaleDateString()
                };
                try {
                    const res = await axiosSecure.post('/reviews', reviewData);
                    if (res.data.insertedId) {
                        Swal.fire({ 
                            icon: "success", 
                            title: "Thank You!", 
                            text: "Review submitted successfully.", 
                            showConfirmButton: false, 
                            timer: 1500,
                            customClass: { popup: 'rounded-[2rem]' }
                        });
                        refetch();
                    }
                } catch (err) {
                    Swal.fire("Error", "Failed to submit review", "error");
                }
            }
        });
    };

    const handleEditClick = (app) => {
        setEditingApp(app);
        setValue("phoneNumber", app.phoneNumber || "");
        setValue("address", app.address || "");
        setIsEditModalOpen(true);
    };

    const onEditSubmit = async (data) => {
        try {
            const res = await axiosSecure.patch(`/applications/${editingApp._id}`, data);
            if (res.data.modifiedCount > 0) {
                Swal.fire({ icon: 'success', title: 'Updated!', showConfirmButton: false, timer: 1500, customClass: { popup: 'rounded-[2rem]' } });
                setIsEditModalOpen(false);
                refetch();
                reset();
            }
        } catch (error) {
            Swal.fire("Error", "Update failed", "error");
        }
    };

    const handleApplicationDelete = async (id) => {
        Swal.fire({
            title: "Remove Application?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete",
            customClass: { popup: 'rounded-[2.5rem]' }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/applications/${id}`);
                if (res.data.deletedCount) {
                    Swal.fire("Deleted!", "Removed successfully.", "success");
                    refetch();
                }
            }
        });
    };

    const handlePayment = async (app) => {
        try {
            const paymentInfo = { scholarshipId: app.scholarshipId, userEmail: user?.email };
            const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
            if (res.data.url) window.location.assign(res.data.url);
        } catch (error) {
            Swal.fire("Error", "Redirecting to checkout failed", "error");
        }
    };

    if (isLoading) return <div className="flex justify-center items-center h-96"><span className="loading loading-dots loading-lg text-primary"></span></div>;

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen px-2 md:px-4 pb-20">
            <div className="max-w-7xl mx-auto">
                
                {/* --- Header Section --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-3 md:gap-5 flex-wrap">
                        <div className="p-3 md:p-4 bg-primary rounded-[2rem] text-white shadow-xl shadow-primary/20 shrink-0">
                            <GraduationCap size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-5xl font-black text-neutral italic tracking-tighter uppercase leading-none">
                                My <span className="text-primary underline decoration-primary/10">Applications</span>
                            </h1>
                            <p className="text-base-content/40 mt-2 font-black uppercase text-[8px] md:text-[10px] tracking-[0.3em] italic">Manage your {totalItems} active requests</p>
                        </div>
                    </div>
                </div>

                {/* --- Desktop View: Table --- */}
                <div className="hidden lg:block bg-base-100 rounded-[3.5rem] shadow-2xl border border-base-300/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full border-separate border-spacing-y-0">
                            <thead>
                                <tr className="bg-primary/5 text-primary">
                                    <th className="py-8 pl-10 text-[10px] font-black uppercase tracking-[0.2em]">Index</th>
                                    <th className="text-[10px] font-black uppercase tracking-[0.2em]">Scholarship Details</th>
                                    <th className="text-[10px] font-black uppercase tracking-[0.2em]">Application Status</th>
                                    <th className="text-[10px] font-black uppercase tracking-[0.2em] text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-300/5">
                                {applications.map((app, index) => (
                                    <tr key={app._id} className="hover:bg-primary/5 transition-all duration-300 group">
                                        <td className="pl-10 font-mono text-[10px] text-base-content/20 font-black italic group-hover:text-primary transition-colors">
                                            #{(currentPage - 1) * limit + index + 1}
                                        </td>
                                        <td className="py-8">
                                            <div className="font-black text-neutral uppercase text-xs tracking-tight group-hover:translate-x-1 transition-transform">{app.scholarshipName}</div>
                                            <div className="text-[10px] font-bold text-primary/60 italic mt-1.5 flex items-center gap-1"><MapPin size={10}/> {app.universityName}</div>
                                        </td>
                                        <td>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    {app.paymentStatus === 'paid' ? (
                                                        <span className="badge border-none bg-success/10 text-success font-black text-[9px] uppercase tracking-widest h-6 px-3 gap-1 italic"><CheckCircle2 size={10}/> Paid</span>
                                                    ) : (
                                                        <span className="badge border-none bg-warning/10 text-warning font-black text-[9px] uppercase tracking-widest h-6 px-3 gap-1 italic"><Clock size={10}/> Pending</span>
                                                    )}
                                                    <span className="text-neutral font-black text-[10px] italic">(${app.amountPaid || app.applicationFees || 0})</span>
                                                </div>
                                                <span className="text-[9px] font-bold text-base-content/30 uppercase tracking-widest italic pl-1">Process: {app.status}</span>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => setSelectedApp(app)} className="btn btn-square btn-sm btn-ghost text-info hover:bg-info/10 rounded-xl transition-all"><ListCollapse size={18} /></button>
                                                {app.status === 'pending' && <button onClick={() => handleEditClick(app)} className="btn btn-square btn-sm btn-ghost text-warning hover:bg-warning/10 rounded-xl transition-all"><Pencil size={18} /></button>}
                                                {(app.status === 'pending' && app.paymentStatus !== 'paid') && <button onClick={() => handlePayment(app)} className="btn btn-square btn-sm btn-ghost text-primary hover:bg-primary/10 rounded-xl transition-all shadow-lg shadow-primary/5"><CreditCard size={18} /></button>}
                                                {app.status === 'pending' && <button onClick={() => handleApplicationDelete(app._id)} className="btn btn-square btn-sm btn-ghost text-error hover:bg-error/10 rounded-xl transition-all"><Trash2 size={18} /></button>}
                                                {app.status === 'completed' && <button onClick={() => handleAddReview(app)} className="btn btn-square btn-sm btn-ghost text-success hover:bg-success/10 rounded-xl transition-all shadow-lg shadow-success/5"><Star size={18} /></button>}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- Mobile View: Cards --- */}
                <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {applications.map((app, index) => (
                        <div key={app._id} className="bg-base-100 p-7 rounded-[2.5rem] border border-base-300/10 shadow-xl space-y-5 relative overflow-hidden group">
                            <div className="flex justify-between items-center">
                                <div className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[9px] font-black italic uppercase tracking-widest">
                                    App #{(currentPage - 1) * limit + index + 1}
                                </div>
                                {app.paymentStatus === 'paid' ? (
                                    <span className="text-success flex items-center gap-1 font-black text-[10px] uppercase italic tracking-widest"><CheckCircle2 size={12}/> Paid</span>
                                ) : (
                                    <span className="text-warning flex items-center gap-1 font-black text-[10px] uppercase italic tracking-widest"><Clock size={12}/> Pending</span>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <h3 className="font-black text-neutral uppercase text-sm leading-tight italic line-clamp-2">{app.scholarshipName}</h3>
                                <p className="text-[10px] font-bold text-primary italic opacity-70 flex items-center gap-1 leading-none"><MapPin size={10}/> {app.universityName}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <button onClick={() => setSelectedApp(app)} className="btn btn-ghost btn-sm bg-info/10 text-info rounded-2xl text-[10px] font-black uppercase tracking-widest italic">Details</button>
                                {app.status === 'pending' && <button onClick={() => handleEditClick(app)} className="btn btn-ghost btn-sm bg-warning/10 text-warning rounded-2xl text-[10px] font-black uppercase tracking-widest italic">Edit</button>}
                                {app.status === 'completed' && <button onClick={() => handleAddReview(app)} className="btn btn-ghost btn-sm bg-success/10 text-success rounded-2xl text-[10px] font-black uppercase tracking-widest italic">Review</button>}
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Pagination Pagination --- */}
                <div className="mt-16 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral/40 italic">
                        Showing Page <span className="text-primary">{currentPage}</span> of {totalPages}
                    </p>
                    
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                            disabled={currentPage === 1}
                            className="btn btn-sm md:btn-md bg-base-200 border-none rounded-2xl font-black text-[10px] uppercase italic disabled:opacity-20 hover:bg-primary hover:text-white transition-all shadow-lg shadow-neutral/5"
                        >
                            <ChevronLeft size={16} /> Prev
                        </button>

                        <div className="flex gap-2">
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`btn btn-sm md:btn-md border-none rounded-2xl font-black text-[10px] w-10 md:w-12 transition-all ${
                                        currentPage === index + 1 
                                        ? "bg-primary text-white shadow-xl shadow-primary/20 scale-110" 
                                        : "bg-base-200 text-neutral/40 hover:bg-base-300"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="btn btn-sm md:btn-md bg-base-200 border-none rounded-2xl font-black text-[10px] uppercase italic disabled:opacity-20 hover:bg-primary hover:text-white transition-all shadow-lg shadow-neutral/5"
                        >
                            Next <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Modals --- */}
            {selectedApp && (
                <dialog open className="modal modal-bottom sm:modal-middle backdrop-blur-md">
                    <div className="modal-box rounded-[3rem] border border-base-300/10 shadow-2xl p-8 md:p-12 relative overflow-hidden bg-base-100">
                        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                        <button onClick={() => setSelectedApp(null)} className="btn btn-sm btn-circle btn-ghost absolute right-8 top-8"><X size={20} /></button>
                        <div className="mb-10 text-center sm:text-left">
                            <h3 className="font-black text-3xl md:text-4xl text-neutral italic uppercase tracking-tighter">
                                App <span className="text-primary underline decoration-primary/20">Overview</span>
                            </h3>
                        </div>
                        <div className="space-y-4 text-left">
                            <DetailRow label="University" value={selectedApp.universityName} icon={<GraduationCap size={18} />} />
                            <DetailRow label="Subject & Degree" value={`${selectedApp.subjectCategory} (${selectedApp.degree})`} icon={<Info size={18} />} />
                            <DetailRow label="Contact Info" value={selectedApp.phoneNumber || "N/A"} icon={<Phone size={18} />} />
                            <DetailRow label="Residential" value={selectedApp.address || "N/A"} icon={<MapPin size={18} />} />
                            <div className="mt-6 p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3 italic">University Feedback</p>
                                <p className="text-xs md:text-sm font-bold text-neutral italic leading-relaxed">
                                    {selectedApp.feedback || "Your application is currently being reviewed. You will receive an update shortly."}
                                </p>
                            </div>
                        </div>
                        <div className="modal-action mt-10">
                            <button onClick={() => setSelectedApp(null)} className="btn btn-primary btn-block rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] h-14 shadow-xl shadow-primary/20 italic">Close Overview</button>
                        </div>
                    </div>
                </dialog>
            )}

            {isEditModalOpen && (
                <div className="modal modal-open backdrop-blur-md">
                    <div className="modal-box rounded-[3rem] p-10 max-w-md border border-base-300/10 shadow-2xl relative bg-base-100">
                        <button onClick={() => setIsEditModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-8 top-8"><X size={20}/></button>
                        <h3 className="font-black text-2xl mb-10 flex items-center gap-4 italic uppercase tracking-tighter">
                            <div className="p-3 bg-warning/10 rounded-2xl text-warning shadow-lg shadow-warning/5"><Pencil size={24} /></div>
                            Update Profile
                        </h3>
                        <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-6 text-left">
                            <div className="form-control">
                                <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 mb-2 px-3 italic">Phone Number</label>
                                <input type="text" {...register("phoneNumber", { required: true })} className="input input-bordered bg-base-200/50 rounded-2xl font-bold focus:border-primary transition-all h-14" />
                            </div>
                            <div className="form-control">
                                <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 mb-2 px-3 italic">Current Address</label>
                                <textarea {...register("address", { required: true })} className="textarea textarea-bordered bg-base-200/50 rounded-2xl font-bold h-32 focus:border-primary transition-all p-4"></textarea>
                            </div>
                            <div className="pt-4">
                                <button type="submit" className="btn btn-primary btn-block rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-primary/20 h-14 italic">Update Records</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

const DetailRow = ({ label, value, icon }) => (
    <div className="flex items-center gap-5 p-5 bg-base-200/50 rounded-[1.5rem] border border-base-300/5 hover:border-primary/20 transition-all group">
        <div className="p-3.5 bg-base-100 shadow-sm text-primary rounded-xl shrink-0 group-hover:scale-110 transition-transform">{icon}</div>
        <div className="overflow-hidden">
            <p className="text-[9px] font-black uppercase tracking-widest text-base-content/30 mb-1 italic">{label}</p>
            <p className="text-xs md:text-sm font-black text-neutral leading-tight break-words">{value}</p>
        </div>
    </div>
);

export default MyApplications;