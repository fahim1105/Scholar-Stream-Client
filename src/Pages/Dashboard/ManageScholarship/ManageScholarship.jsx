import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loader from "../../../Components/Loader/Loader";
import { useState } from "react";
import { Edit3, Trash2, X, GraduationCap, Calendar, Layers, BookOpen, Settings2, ChevronLeft, ChevronRight, Hash, Clock } from "lucide-react";
import { motion } from "framer-motion";

const ManageScholarships = () => {
    const axiosSecure = UseAxiosSecure();
    const [selectedScholarship, setSelectedScholarship] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20; // মোবাইলে ভালো অভিজ্ঞতার জন্য লিমিট ১০ করা হয়েছে

    const { register, handleSubmit, reset } = useForm();

    const { data: scholarshipData, isLoading, refetch } = useQuery({
        queryKey: ["manage-scholarships", currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarships?page=${currentPage}&limit=${limit}`);
            return res.data;
        },
    });

    const scholarships = scholarshipData?.scholarships || [];
    const totalPages = scholarshipData?.totalPages || 1;

    const openModal = (scholarship) => {
        setSelectedScholarship(scholarship);
        const formattedDate = scholarship.applicationDeadline ?
            new Date(scholarship.applicationDeadline).toISOString().split('T')[0] : '';

        reset({
            scholarshipName: scholarship.scholarshipName,
            scholarshipCategory: scholarship.scholarshipCategory,
            degree: scholarship.degree,
            applicationDeadline: formattedDate,
        });
        setIsModalOpen(true);
    };

    const handleUpdate = async (data) => {
        try {
            const res = await axiosSecure.patch(`/scholarships/${selectedScholarship._id}`, data);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Scholarship data refreshed successfully',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: { popup: 'rounded-[2rem]' }
                });
                setIsModalOpen(false);
                setSelectedScholarship(null);
                refetch();
            }
        } catch (error) {
            Swal.fire("Error", "Update failed", "error");
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This scholarship will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it!",
            customClass: { popup: 'rounded-[2rem]' }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/scholarships/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Scholarship removed", "success");
                    refetch();
                }
            }
        });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading) return <Loader />;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="p-3 md:p-8 min-h-screen max-w-7xl mx-auto overflow-hidden"
        >
            {/* --- Header Section --- */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 md:mb-16">
                <div className="space-y-1">
                    <h2 className="text-3xl md:text-5xl font-black text-neutral italic uppercase tracking-tighter flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-2xl text-primary"><Settings2 className="w-6 h-6 md:w-8 md:h-8" /></div>
                        <span>Manage <span className="text-primary underline decoration-primary/20">Scholarships</span></span>
                    </h2>
                    <p className="text-base-content/40 font-black uppercase text-[8px] md:text-[10px] tracking-[0.3em] px-1 italic">Administrative Control Panel</p>
                </div>
                
                <div className="stats shadow-xl bg-base-100 rounded-3xl border border-base-300/10 w-fit">
                    <div className="stat px-6 md:px-8 py-2 md:py-3">
                        <div className="stat-title text-[9px] md:text-[10px] font-black uppercase tracking-widest text-base-content/40">Total Items</div>
                        <div className="stat-value text-primary text-2xl md:text-3xl font-black italic">{scholarshipData?.totalItems || 0}</div>
                    </div>
                </div>
            </div>

            {/* --- Desktop View: Table --- */}
            <div className="hidden lg:block bg-base-100 rounded-[3rem] shadow-2xl border border-base-300/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-0">
                        <thead>
                            <tr className="bg-primary/5 text-primary border-b border-base-300/10">
                                <th className="py-6 pl-10 text-[10px] font-black uppercase tracking-widest">#</th>
                                <th className="text-[10px] font-black uppercase tracking-widest">Scholarship Name</th>
                                <th className="text-[10px] font-black uppercase tracking-widest">Category</th>
                                <th className="text-[10px] font-black uppercase tracking-widest">Degree</th>
                                <th className="text-[10px] font-black uppercase tracking-widest">Deadline</th>
                                <th className="text-[10px] font-black uppercase tracking-widest text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-base-300/5">
                            {scholarships.map((scholarship, index) => (
                                <tr key={scholarship._id} className="hover:bg-primary/5 transition-all duration-300 group">
                                    <td className="pl-10 font-mono text-[10px] text-base-content/30 font-black italic">
                                        #{(currentPage - 1) * limit + index + 1}
                                    </td>
                                    <td className="py-6 font-black text-neutral uppercase text-xs tracking-tight">{scholarship.scholarshipName}</td>
                                    <td>
                                        <span className="badge border-none bg-primary/10 text-primary font-black text-[9px] uppercase tracking-widest h-6 px-3 italic">
                                            {scholarship.scholarshipCategory}
                                        </span>
                                    </td>
                                    <td className="font-bold text-neutral/70 italic text-sm">{scholarship.degree}</td>
                                    <td className="text-[10px] font-black text-base-content/40 uppercase tracking-wider">{scholarship.applicationDeadline}</td>
                                    <td className="py-4">
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => openModal(scholarship)} className="btn btn-square btn-sm btn-ghost text-info hover:bg-info/10 rounded-xl transition-all">
                                                <Edit3 size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(scholarship._id)} className="btn btn-square btn-sm btn-ghost text-error hover:bg-error/10 rounded-xl transition-all">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- Mobile & Tablet View: Cards (Responsive Grid) --- */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {scholarships.map((scholarship, index) => (
                    <div key={scholarship._id} className="bg-base-100 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-base-300/10 shadow-lg space-y-5 relative overflow-hidden flex flex-col justify-between">
                        {/* Card Header */}
                        <div className="flex justify-between items-start">
                            <div className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-[9px] font-black italic uppercase flex items-center gap-1">
                                <Hash size={10} /> {(currentPage - 1) * limit + index + 1}
                            </div>
                            <div className="flex items-center gap-1 text-[9px] font-black text-base-content/30 uppercase tracking-wider italic">
                                <Clock size={10} /> {scholarship.applicationDeadline}
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="space-y-3">
                            <h3 className="font-black text-neutral uppercase text-xs md:text-sm leading-snug italic line-clamp-2 min-h-[2.5rem]">
                                {scholarship.scholarshipName}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-primary/10 text-primary font-black text-[8px] uppercase px-2.5 py-1 rounded-md italic tracking-tighter">
                                    {scholarship.scholarshipCategory}
                                </span>
                                <span className="bg-base-200 text-neutral/60 font-black text-[8px] uppercase px-2.5 py-1 rounded-md italic tracking-tighter">
                                    {scholarship.degree}
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <button onClick={() => openModal(scholarship)} className="btn btn-ghost btn-sm bg-info/10 text-info rounded-xl text-[10px] font-black uppercase tracking-widest italic flex items-center justify-center gap-2 h-10 min-h-0">
                                <Edit3 size={14}/> Edit
                            </button>
                            <button onClick={() => handleDelete(scholarship._id)} className="btn btn-ghost btn-sm bg-error/10 text-error rounded-xl text-[10px] font-black uppercase tracking-widest italic flex items-center justify-center gap-2 h-10 min-h-0">
                                <Trash2 size={14}/> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- Pagination (Fully Responsive) --- */}
            <div className="mt-12 md:mt-16 mb-8 flex flex-col items-center gap-6">
                <div className="flex items-center gap-2 md:gap-4 overflow-x-auto max-w-full pb-2 no-scrollbar">
                    <button
                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="btn btn-sm md:btn-md bg-base-200 border-none rounded-xl md:rounded-2xl font-black text-[10px] uppercase italic disabled:opacity-20 hover:bg-primary hover:text-white transition-all min-w-[60px]"
                    >
                        <ChevronLeft size={16} /> <span className="hidden md:inline">Prev</span>
                    </button>

                    <div className="flex gap-1 md:gap-2">
                        {[...Array(totalPages)].map((_, index) => {
                            // সল্প পরিসরে পৃষ্ঠা দেখানোর জন্য লজিক (ঐচ্ছিক)
                            if (totalPages > 5 && Math.abs(currentPage - (index + 1)) > 2) return null;
                            return (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`btn btn-sm md:btn-md border-none rounded-xl md:rounded-2xl font-black text-[10px] w-9 h-9 md:w-12 md:h-12 transition-all ${
                                        currentPage === index + 1 
                                        ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110" 
                                        : "bg-base-200 text-neutral/40 hover:bg-base-300"
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
                        className="btn btn-sm md:btn-md bg-base-200 border-none rounded-xl md:rounded-2xl font-black text-[10px] uppercase italic disabled:opacity-20 hover:bg-primary hover:text-white transition-all min-w-[60px]"
                    >
                        <span className="hidden md:inline">Next</span> <ChevronRight size={16} />
                    </button>
                </div>
                
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-neutral/40 italic">
                    Showing Page <span className="text-primary">{currentPage}</span> of {totalPages}
                </p>
            </div>

            {/* UPDATE MODAL (Responsive Fix) */}
            {isModalOpen && (
                <div className="modal modal-open backdrop-blur-md px-4">
                    <div className="modal-box w-full max-w-lg rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-12 border border-base-300/10 shadow-2xl relative bg-base-100 max-h-[95vh] overflow-y-auto custom-scrollbar">
                        <button onClick={() => setIsModalOpen(false)} className="btn btn-circle btn-sm btn-ghost absolute right-4 top-4 md:right-8 md:top-8">
                            <X size={20} />
                        </button>
                        
                        <div className="mb-8">
                            <h3 className="font-black text-xl md:text-3xl text-neutral italic uppercase tracking-tighter">
                                Modify <span className="text-primary underline decoration-primary/10">Records</span>
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-5 md:space-y-6">
                            <div className="form-control">
                                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-base-content/30 mb-2 px-1 italic">Scholarship Headline</label>
                                <div className="relative">
                                    <input {...register("scholarshipName", { required: true })} className="input input-bordered w-full rounded-xl md:rounded-2xl bg-base-200/50 border-none focus:ring-2 ring-primary transition-all font-bold h-12 md:h-14 pl-10 md:pl-12 text-xs md:text-sm" />
                                    <BookOpen className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-primary opacity-40" size={18} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="form-control">
                                    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-base-content/30 mb-2 px-1 italic">Funding Type</label>
                                    <div className="relative">
                                        <select {...register("scholarshipCategory")} className="select select-bordered w-full rounded-xl md:rounded-2xl bg-base-200/50 border-none font-bold h-12 md:h-14 pl-10 md:pl-12 appearance-none text-xs md:text-sm">
                                            <option>Full Fund</option>
                                            <option>Partial Fund</option>
                                            <option>Self Fund</option>
                                        </select>
                                        <Layers className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-primary opacity-40" size={18} />
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-base-content/30 mb-2 px-1 italic">Academic Degree</label>
                                    <div className="relative">
                                        <select {...register("degree")} className="select select-bordered w-full rounded-xl md:rounded-2xl bg-base-200/50 border-none font-bold h-12 md:h-14 pl-10 md:pl-12 text-xs md:text-sm">
                                            <option>Bachelor</option>
                                            <option>Masters</option>
                                            <option>PhD</option>
                                        </select>
                                        <GraduationCap className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-primary opacity-40" size={18} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-base-content/30 mb-2 px-1 italic">Final Submission Deadline</label>
                                <div className="relative">
                                    <input type="date" {...register("applicationDeadline")} className="input input-bordered w-full rounded-xl md:rounded-2xl bg-base-200/50 border-none font-bold h-12 md:h-14 pl-10 md:pl-12 text-xs md:text-sm" />
                                    <Calendar className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-primary opacity-40" size={18} />
                                </div>
                            </div>

                            <div className="pt-4 md:pt-6">
                                <button type="submit" className="btn btn-primary btn-block rounded-xl md:rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] h-12 md:h-14 shadow-xl shadow-primary/20 italic border-none text-neutral">
                                    Apply Official Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default ManageScholarships;