import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    ListCollapse, Pencil, Trash2, Star, CreditCard,
    GraduationCap, MapPin, Phone,
    Info, CheckCircle2, Clock, ChevronLeft, ChevronRight, X, Hash, DollarSign
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
    
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20; // মোবাইলে পারফরম্যান্সের জন্য ১০ করা হয়েছে

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

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- Handlers (Existing logic remains same) ---
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
                        Swal.fire({ icon: "success", title: "Success", text: "Review submitted.", showConfirmButton: false, timer: 1500, customClass: { popup: 'rounded-[2rem]' } });
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen p-3 md:p-8 pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                
                {/* --- Header --- */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 md:mb-16">
                    <div className="flex items-center gap-4">
                        <div className="p-3 md:p-4 bg-primary rounded-2xl md:rounded-[2rem] text-white shadow-xl shadow-primary/20">
                            <GraduationCap size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-5xl font-black text-neutral italic tracking-tighter uppercase">
                                My <span className="text-primary underline decoration-primary/10">Applications</span>
                            </h1>
                            <p className="text-base-content/40 mt-1 font-black uppercase text-[8px] md:text-[10px] tracking-[0.3em] italic">Manage your {totalItems} active requests</p>
                        </div>
                    </div>
                </div>

                {/* --- Desktop Table --- */}
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
                                        <td className="pl-10 font-mono text-[10px] text-base-content/20 font-black italic">
                                            #{(currentPage - 1) * limit + index + 1}
                                        </td>
                                        <td className="py-8">
                                            <div className="font-black text-neutral uppercase text-xs tracking-tight">{app.scholarshipName}</div>
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
                                                <button onClick={() => setSelectedApp(app)} className="btn btn-square btn-sm btn-ghost text-info hover:bg-info/10 rounded-xl"><ListCollapse size={18} /></button>
                                                {app.status === 'pending' && <button onClick={() => handleEditClick(app)} className="btn btn-square btn-sm btn-ghost text-warning hover:bg-warning/10 rounded-xl"><Pencil size={18} /></button>}
                                                {(app.status === 'pending' && app.paymentStatus !== 'paid') && <button onClick={() => handlePayment(app)} className="btn btn-square btn-sm btn-ghost text-primary hover:bg-primary/10 rounded-xl"><CreditCard size={18} /></button>}
                                                {app.status === 'pending' && <button onClick={() => handleApplicationDelete(app._id)} className="btn btn-square btn-sm btn-ghost text-error hover:bg-error/10 rounded-xl"><Trash2 size={18} /></button>}
                                                {app.status === 'completed' && <button onClick={() => handleAddReview(app)} className="btn btn-square btn-sm btn-ghost text-success hover:bg-success/10 rounded-xl"><Star size={18} /></button>}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- Mobile Card View (Well Responsive) --- */}
                <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {applications.map((app, index) => (
                        <div key={app._id} className="bg-base-100 p-6 rounded-[2.5rem] border border-base-300/10 shadow-lg space-y-5 relative overflow-hidden flex flex-col justify-between">
                            
                            {/* Card Top Info */}
                            <div className="flex justify-between items-start">
                                <div className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-[9px] font-black italic uppercase flex items-center gap-1">
                                    <Hash size={10} /> {(currentPage - 1) * limit + index + 1}
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    {app.paymentStatus === 'paid' ? (
                                        <span className="text-success flex items-center gap-1 font-black text-[9px] uppercase italic tracking-widest"><CheckCircle2 size={10}/> Paid</span>
                                    ) : (
                                        <span className="text-warning flex items-center gap-1 font-black text-[9px] uppercase italic tracking-widest"><Clock size={10}/> Pending</span>
                                    )}
                                    <span className="text-[9px] font-black text-neutral opacity-40 uppercase italic">${app.amountPaid || app.applicationFees || 0}</span>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="space-y-2">
                                <h3 className="font-black text-neutral uppercase text-sm leading-snug italic line-clamp-2 min-h-[2.5rem]">
                                    {app.scholarshipName}
                                </h3>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-primary italic opacity-70">
                                    <MapPin size={10} className="shrink-0" /> 
                                    <span className="truncate">{app.universityName}</span>
                                </div>
                                <div className="pt-1">
                                    <span className="text-[8px] font-black uppercase bg-base-200 px-2 py-0.5 rounded text-base-content/50 italic tracking-widest">
                                        Status: {app.status}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons (Fix: Stacked for clarity in mobile) */}
                            <div className="grid grid-cols-2 gap-2 pt-2">
                                <button onClick={() => setSelectedApp(app)} className="btn btn-ghost btn-sm bg-info/10 text-info rounded-xl text-[10px] font-black uppercase tracking-widest italic flex items-center justify-center gap-2 h-10 min-h-0 w-full">
                                    <ListCollapse size={14}/> Details
                                </button>
                                
                                {app.status === 'pending' && (
                                    <button onClick={() => handleEditClick(app)} className="btn btn-ghost btn-sm bg-warning/10 text-warning rounded-xl text-[10px] font-black uppercase tracking-widest italic flex items-center justify-center gap-2 h-10 min-h-0 w-full">
                                        <Pencil size={14}/> Edit
                                    </button>
                                )}

                                {(app.status === 'pending' && app.paymentStatus !== 'paid') && (
                                    <button onClick={() => handlePayment(app)} className="btn btn-ghost btn-sm bg-primary/10 text-primary rounded-xl text-[10px] font-black uppercase tracking-widest italic flex items-center justify-center gap-2 h-10 min-h-0 w-full col-span-2">
                                        <CreditCard size={14}/> Complete Payment
                                    </button>
                                )}

                                {app.status === 'completed' && (
                                    <button onClick={() => handleAddReview(app)} className="btn btn-ghost btn-sm bg-success/10 text-success rounded-xl text-[10px] font-black uppercase tracking-widest italic flex items-center justify-center gap-2 h-10 min-h-0 w-full">
                                        <Star size={14}/> Review
                                    </button>
                                )}

                                {app.status === 'pending' && (
                                    <button onClick={() => handleApplicationDelete(app._id)} className="btn btn-ghost btn-sm bg-error/10 text-error rounded-xl text-[10px] font-black uppercase tracking-widest italic flex items-center justify-center gap-2 h-10 min-h-0 w-full col-span-2">
                                        <Trash2 size={14}/> Cancel Application
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Pagination --- */}
                <div className="mt-12 md:mt-16 mb-8 flex flex-col items-center gap-6">
                    <div className="flex items-center gap-2 md:gap-4 overflow-x-auto max-w-full pb-2 no-scrollbar">
                        <button
                            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                            disabled={currentPage === 1}
                            className="btn btn-sm md:btn-md bg-base-200 border-none rounded-xl md:rounded-2xl font-black text-[10px] uppercase italic min-w-[60px]"
                        >
                            <ChevronLeft size={16} /> <span className="hidden md:inline">Prev</span>
                        </button>

                        <div className="flex gap-1 md:gap-2">
                            {[...Array(totalPages)].map((_, index) => {
                                if (totalPages > 5 && Math.abs(currentPage - (index + 1)) > 2) return null;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`btn btn-sm md:btn-md border-none rounded-xl md:rounded-2xl font-black text-[10px] w-9 h-9 md:w-12 md:h-12 transition-all ${
                                            currentPage === index + 1 
                                            ? "bg-primary text-white shadow-lg" 
                                            : "bg-base-200 text-neutral/40"
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="btn btn-sm md:btn-md bg-base-200 border-none rounded-xl md:rounded-2xl font-black text-[10px] uppercase italic min-w-[60px]"
                        >
                            <span className="hidden md:inline">Next</span> <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Detail Modal (Responsive) --- */}
            {selectedApp && (
                <dialog open className="modal modal-bottom sm:modal-middle backdrop-blur-md px-4">
                    <div className="modal-box rounded-[2.5rem] md:rounded-[3rem] border border-base-300/10 shadow-2xl p-6 md:p-12 relative overflow-hidden bg-base-100 max-h-[90vh] custom-scrollbar">
                        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                        <button onClick={() => setSelectedApp(null)} className="btn btn-sm btn-circle btn-ghost absolute right-6 top-6"><X size={20} /></button>
                        
                        <div className="mb-8">
                            <h3 className="font-black text-2xl md:text-4xl text-neutral italic uppercase tracking-tighter">
                                App <span className="text-primary underline decoration-primary/20">Overview</span>
                            </h3>
                        </div>

                        <div className="space-y-3 md:space-y-4 text-left">
                            <DetailRow label="University" value={selectedApp.universityName} icon={<GraduationCap size={18} />} />
                            <DetailRow label="Subject & Degree" value={`${selectedApp.subjectCategory} (${selectedApp.degree})`} icon={<Info size={18} />} />
                            <DetailRow label="Contact Info" value={selectedApp.phoneNumber || "N/A"} icon={<Phone size={18} />} />
                            <DetailRow label="Residential" value={selectedApp.address || "N/A"} icon={<MapPin size={18} />} />
                            <div className="mt-4 p-5 bg-primary/5 rounded-[2rem] border border-primary/10">
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary mb-2 italic">Official Feedback</p>
                                <p className="text-xs md:text-sm font-bold text-neutral italic leading-relaxed">
                                    {selectedApp.feedback || "Your application is currently being reviewed. You will receive an update shortly."}
                                </p>
                            </div>
                        </div>
                        
                        <div className="modal-action pt-4">
                            <button onClick={() => setSelectedApp(null)} className="btn btn-primary btn-block rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] h-12 italic border-none text-neutral">Close Overview</button>
                        </div>
                    </div>
                </dialog>
            )}

            {/* --- Edit Modal (Responsive) --- */}
            {isEditModalOpen && (
                <div className="modal modal-open backdrop-blur-md px-4">
                    <div className="modal-box rounded-[2.5rem] p-8 md:p-10 max-w-md border border-base-300/10 shadow-2xl relative bg-base-100">
                        <button onClick={() => setIsEditModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-6 top-6"><X size={20}/></button>
                        <h3 className="font-black text-xl mb-8 flex items-center gap-3 italic uppercase tracking-tighter">
                            <div className="p-2 bg-warning/10 rounded-xl text-warning"><Pencil size={20} /></div>
                            Update Records
                        </h3>
                        <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-5 text-left">
                            <div className="form-control">
                                <label className="text-[9px] font-black uppercase tracking-widest text-base-content/40 mb-2 px-1 italic">Phone Number</label>
                                <input type="text" {...register("phoneNumber", { required: true })} className="input input-bordered bg-base-200/50 rounded-xl font-bold h-12 text-sm focus:border-primary border-none" />
                            </div>
                            <div className="form-control">
                                <label className="text-[9px] font-black uppercase tracking-widest text-base-content/40 mb-2 px-1 italic">Current Address</label>
                                <textarea {...register("address", { required: true })} className="textarea textarea-bordered bg-base-200/50 rounded-xl font-bold h-28 text-sm focus:border-primary border-none p-4"></textarea>
                            </div>
                            <div className="pt-2">
                                <button type="submit" className="btn btn-primary btn-block rounded-xl font-black uppercase text-[10px] tracking-[0.2em] h-12 italic border-none text-neutral shadow-lg shadow-primary/20">Save Official Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

const DetailRow = ({ label, value, icon }) => (
    <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-[1.5rem] border border-base-300/5 hover:border-primary/20 transition-all group">
        <div className="p-3 bg-base-100 shadow-sm text-primary rounded-xl shrink-0">{icon}</div>
        <div className="overflow-hidden">
            <p className="text-[8px] font-black uppercase tracking-widest text-base-content/30 italic">{label}</p>
            <p className="text-[11px] md:text-sm font-black text-neutral leading-tight truncate md:whitespace-normal">{value}</p>
        </div>
    </div>
);

export default MyApplications;