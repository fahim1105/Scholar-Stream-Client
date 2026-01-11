import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loader from "../../../Components/Loader/Loader";
import { useState } from "react";
import { Edit3, Trash2, X, GraduationCap, Calendar, Layers, BookOpen, Settings2 } from "lucide-react";
import { motion } from "framer-motion";

const ManageScholarships = () => {
    const axiosSecure = UseAxiosSecure();
    const [selectedScholarship, setSelectedScholarship] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { register, handleSubmit, reset } = useForm();

    const { data: scholarshipData, isLoading, refetch } = useQuery({
        queryKey: ["manage-scholarships"],
        queryFn: async () => {
            const res = await axiosSecure.get("/scholarships?limit=20");
            return res.data;
        },
    });

    const scholarships = scholarshipData?.scholarships || scholarshipData || [];

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

    if (isLoading) return <Loader />;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="p-4 md:p-8 min-h-screen max-w-7xl mx-auto"
        >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h2 className="text-3xl md:text-5xl font-black text-neutral italic uppercase tracking-tighter flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-2xl text-primary"><Settings2 size={30} /></div>
                        Manage <span className="text-primary underline decoration-primary/20">Scholarships</span>
                    </h2>
                    <p className="text-base-content/50 mt-2 font-bold uppercase text-[9px] md:text-[10px] tracking-[0.3em] px-1 italic">Administrative Control Panel</p>
                </div>
                <div className="stats shadow-2xl bg-base-100 rounded-3xl border border-base-300/10">
                    <div className="stat px-8 py-3">
                        <div className="stat-title text-[10px] font-black uppercase tracking-widest text-base-content/40">Total Listed</div>
                        <div className="stat-value text-primary text-3xl font-black italic">{scholarships.length}</div>
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
                                    <td className="pl-10 font-mono text-[10px] text-base-content/30 font-black italic">#{index + 1}</td>
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

            {/* --- Mobile View: Cards --- */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-5">
                {scholarships.map((scholarship, index) => (
                    <div key={scholarship._id} className="bg-base-100 p-7 rounded-[2.5rem] border border-base-300/10 shadow-xl space-y-5 relative overflow-hidden group">
                        <div className="flex justify-between items-center relative z-10">
                            <div className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[9px] font-black italic uppercase tracking-widest">ID #{index + 1}</div>
                            <span className="text-[9px] font-black text-base-content/30 uppercase tracking-widest italic">{scholarship.applicationDeadline}</span>
                        </div>

                        <div className="space-y-2 relative z-10">
                            <h3 className="font-black text-neutral uppercase text-sm leading-tight italic line-clamp-2">{scholarship.scholarshipName}</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="badge border-none bg-primary/10 text-primary font-black text-[8px] uppercase px-2 h-5 italic tracking-tighter">{scholarship.scholarshipCategory}</span>
                                <span className="badge border-none bg-base-200 text-neutral/60 font-black text-[8px] uppercase px-2 h-5 italic tracking-tighter">{scholarship.degree}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2 relative z-10">
                            <button onClick={() => openModal(scholarship)} className="btn btn-ghost btn-sm bg-info/10 text-info rounded-2xl text-[10px] font-black uppercase tracking-widest italic flex items-center gap-2">
                                <Edit3 size={14}/> Edit
                            </button>
                            <button onClick={() => handleDelete(scholarship._id)} className="btn btn-ghost btn-sm bg-error/10 text-error rounded-2xl text-[10px] font-black uppercase tracking-widest italic flex items-center gap-2">
                                <Trash2 size={14}/> Delete
                            </button>
                        </div>
                        {/* Background Decoration Icon */}
                        <div className="absolute -bottom-4 -right-4 opacity-[0.03] text-neutral group-hover:scale-110 transition-transform duration-500">
                            <GraduationCap size={120} />
                        </div>
                    </div>
                ))}
            </div>

            {/* UPDATE MODAL */}
            {isModalOpen && (
                <div className="modal modal-open backdrop-blur-md transition-all">
                    <div className="modal-box max-w-lg rounded-[3rem] p-8 md:p-12 border border-base-300/10 shadow-2xl relative">
                        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                        <button onClick={() => setIsModalOpen(false)} className="btn btn-circle btn-sm btn-ghost absolute right-8 top-8">
                            <X size={20} />
                        </button>

                        <h3 className="font-black text-2xl md:text-3xl mb-10 text-neutral italic uppercase tracking-tighter">
                            Modify <span className="text-primary underline decoration-primary/10">Records</span>
                        </h3>

                        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">
                            <div className="form-control">
                                <label className="text-[10px] font-black uppercase tracking-widest text-base-content/30 mb-2 px-3 italic">Scholarship Headline</label>
                                <div className="relative">
                                    <input {...register("scholarshipName", { required: true })} className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none focus:ring-2 ring-primary transition-all font-bold h-14 pl-12" />
                                    <BookOpen className="absolute left-4 top-4 text-primary opacity-40" size={20} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-base-content/30 mb-2 px-3 italic">Funding Type</label>
                                    <div className="relative">
                                        <select {...register("scholarshipCategory")} className="select select-bordered w-full rounded-2xl bg-base-200/50 border-none font-bold h-14 pl-12 appearance-none">
                                            <option>Full Fund</option>
                                            <option>Partial Fund</option>
                                            <option>Self Fund</option>
                                        </select>
                                        <Layers className="absolute left-4 top-4 text-primary opacity-40" size={20} />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-base-content/30 mb-2 px-3 italic">Academic Degree</label>
                                    <div className="relative">
                                        <select {...register("degree")} className="select select-bordered w-full rounded-2xl bg-base-200/50 border-none font-bold h-14 pl-12">
                                            <option>Bachelor</option>
                                            <option>Masters</option>
                                            <option>PhD</option>
                                        </select>
                                        <GraduationCap className="absolute left-4 top-4 text-primary opacity-40" size={20} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="text-[10px] font-black uppercase tracking-widest text-base-content/30 mb-2 px-3 italic">Final Submission Deadline</label>
                                <div className="relative">
                                    <input type="date" {...register("applicationDeadline")} className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none font-bold h-14 pl-12" />
                                    <Calendar className="absolute left-4 top-4 text-primary opacity-40" size={20} />
                                </div>
                            </div>

                            <div className="pt-6">
                                <button type="submit" className="btn btn-primary btn-block rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] h-14 shadow-xl shadow-primary/20 italic">
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