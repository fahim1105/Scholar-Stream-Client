import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import {
    FaTrashAlt,
    FaPlusCircle,
    FaImage,
    FaUserGraduate,
    FaUniversity,
    FaAward,
    FaEdit,
    FaTimesCircle,
    FaCheckCircle,
    FaCalendarAlt
} from 'react-icons/fa';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecure';
import Loader from '../../../../Components/Loader/Loader';
import { motion, AnimatePresence } from "framer-motion";

const ManageToppers = () => {
    const axiosSecure = UseAxiosSecure();
    const [editingId, setEditingId] = useState(null);
    const { register, handleSubmit, reset, setValue } = useForm();

    const { data: toppers = [], isLoading, refetch } = useQuery({
        queryKey: ['manage-toppers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/toppers');
            return res.data;
        }
    });

    const handleEditClick = (topper) => {
        setEditingId(topper._id);
        setValue("name", topper.name);
        setValue("university", topper.university);
        setValue("scholarship", topper.scholarship);
        setValue("image", topper.image);
        setValue("batch", topper.batch);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        toast("Editing Topper Profile", { icon: '🎓' });
    };

    const cancelEdit = () => {
        setEditingId(null);
        reset();
    };

    const onSubmit = async (data) => {
        const loadingToast = toast.loading(editingId ? "Updating Profile..." : "Adding Topper...");
        try {
            if (editingId) {
                const res = await axiosSecure.patch(`/toppers/${editingId}`, data);
                if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
                    toast.success("Topper Updated Successfully!", { id: loadingToast });
                    setEditingId(null);
                }
            } else {
                const res = await axiosSecure.post('/toppers', data);
                if (res.data.insertedId) {
                    toast.success("Topper Added to Hall of Fame!", { id: loadingToast });
                }
            }
            reset();
            refetch();
        } catch (error) {
            toast.error("Operation failed. Try again.", { id: loadingToast });
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Remove from Hall of Fame?",
            text: "This topper will be permanently removed!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3B82F6",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, Remove It",
            customClass: { popup: 'rounded-[2.5rem]' }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/toppers/${id}`);
                    if (res.data.deletedCount > 0) {
                        toast.success("Topper Removed");
                        refetch();
                    }
                } catch (error) {
                    toast.error("Failed to delete");
                }
            }
        });
    };

    if (isLoading) return <Loader />;

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 mb-20">

            {/* --- EDITOR SECTION --- */}
            <section className={`relative overflow-hidden bg-base-100 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border-2 transition-all duration-500 ${editingId ? 'border-primary/40 ring-4 ring-primary/5' : 'border-base-300/10'}`}>
                {editingId && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary animate-pulse"></div>
                )}
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-neutral italic uppercase">
                                {editingId ? "Update" : "Add New"} <span className="text-primary underline decoration-primary/10">{editingId ? "Profile" : "Achiever"}</span>
                            </h2>
                            <p className="text-base-content/40 font-black uppercase text-[10px] tracking-widest italic mt-1">
                                Feature our best students in the Hall of Fame.
                            </p>
                        </div>
                        <div className="hidden md:block">
                            {editingId ? (
                                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                                    <FaEdit size={60} className="text-primary/20" />
                                </motion.div>
                            ) : (
                                <FaAward size={60} className="text-primary/10 rotate-12" />
                            )}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1 italic"><FaUserGraduate className="text-primary" /> Student Name</label>
                                <input {...register("name", { required: true })} placeholder="Full name..." className="w-full px-5 py-4 bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/50 transition-all font-bold text-neutral" />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1 italic"><FaUniversity className="text-primary" /> University Name</label>
                                <input {...register("university", { required: true })} placeholder="e.g. Oxford University" className="w-full px-5 py-4 bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/50 transition-all font-bold text-neutral" />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1 italic"><FaAward className="text-primary" /> Scholarship Title</label>
                                <input {...register("scholarship", { required: true })} placeholder="e.g. Commonwealth Scholarship" className="w-full px-5 py-4 bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/50 transition-all font-bold text-neutral" />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1 italic"><FaCalendarAlt className="text-primary" /> Passing Batch</label>
                                <input {...register("batch", { required: true })} placeholder="e.g. 2024" className="w-full px-5 py-4 bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/50 transition-all font-bold text-neutral" />
                            </div>
                            <div className="lg:col-span-2 space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-base-content/40 px-1 italic"><FaImage className="text-primary" /> Photo URL</label>
                                <input {...register("image", { required: true })} placeholder="Paste image link..." className="w-full px-5 py-4 bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/50 transition-all font-medium text-neutral" />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            {editingId && (
                                <button type="button" onClick={cancelEdit} className="px-8 py-4 bg-neutral text-base-100 font-black uppercase text-[10px] tracking-widest rounded-2xl hover:text-neutral hover:bg-base-200 transition-all italic flex items-center gap-2">
                                    <FaTimesCircle /> Cancel
                                </button>
                            )}
                            <button type="submit" className="px-10 py-4 bg-primary text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2">
                                {editingId ? <><FaCheckCircle /> Update Profile</> : <><FaPlusCircle /> Publish Achiever</>}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* --- FEATURED TOPPERS SECTION (RESPONSIVE) --- */}
            <section className="bg-base-100 rounded-[2.5rem] shadow-2xl border border-base-300/10 overflow-hidden">
                <div className="px-8 py-6 bg-primary/5 flex justify-between items-center border-b border-base-300/10">
                    <h3 className="text-sm md:text-lg font-black tracking-widest uppercase italic text-neutral">
                        Featured <span className="text-primary underline decoration-primary/10">Toppers</span>
                    </h3>
                    <div className="text-[10px] font-black bg-primary text-white px-4 py-1.5 rounded-full italic uppercase">{toppers.length} Achievers</div>
                </div>

                {/* --- MOBILE VIEW (Card Layout) --- */}
                <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
                    <AnimatePresence>
                        {toppers.map((topper) => (
                            <motion.div 
                                layout
                                key={topper._id} 
                                className="bg-base-200/50 p-5 rounded-[2rem] border border-base-300/50 flex flex-col gap-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="mask mask-squircle w-16 h-16 border-2 border-primary/20 shadow-md">
                                        <img src={topper.image} alt={topper.name} className="object-cover w-full h-full" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-neutral uppercase italic text-sm tracking-tighter">{topper.name}</h4>
                                        <p className="text-[9px] text-primary font-black uppercase tracking-widest mt-0.5">Batch {topper.batch}</p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-neutral/80 italic">{topper.scholarship}</p>
                                    <p className="text-[10px] text-base-content/40 font-black uppercase tracking-wider">{topper.university}</p>
                                </div>
                                <div className="flex justify-end gap-2 pt-3 border-t border-base-300/50">
                                    <button onClick={() => handleEditClick(topper)} className="btn btn-sm btn-square bg-blue-500/10 text-blue-500 border-none rounded-xl hover:bg-blue-500 hover:text-white transition-all"><FaEdit /></button>
                                    <button onClick={() => handleDelete(topper._id)} className="btn btn-sm btn-square bg-error/10 text-error border-none rounded-xl hover:bg-error hover:text-white transition-all"><FaTrashAlt /></button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* --- DESKTOP VIEW (Table Layout) --- */}
                <div className="hidden md:block overflow-x-auto p-6">
                    <table className="table w-full border-separate border-spacing-y-3">
                        <thead>
                            <tr className="text-base-content/30 uppercase text-[10px] tracking-[0.2em] italic font-black border-none">
                                <th className="bg-transparent pl-4">Student Detail</th>
                                <th className="bg-transparent">Success Story</th>
                                <th className="bg-transparent text-right pr-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {toppers.map((topper) => (
                                <tr key={topper._id} className="group hover:bg-primary/[0.02] transition-all duration-300">
                                    <td className="bg-base-100 rounded-l-2xl border-y border-l border-base-300 group-hover:border-primary/20 pl-4 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="mask mask-squircle w-14 h-14 border-2 border-primary/10 shadow-sm">
                                                <img src={topper.image} alt={topper.name} className="object-cover w-full h-full" />
                                            </div>
                                            <div>
                                                <div className="font-black text-neutral italic uppercase tracking-tighter">{topper.name}</div>
                                                <div className="text-[9px] text-primary font-black uppercase tracking-[0.2em] mt-0.5">Batch {topper.batch}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="bg-base-100 border-y border-base-300 group-hover:border-primary/20 py-4">
                                        <div className="font-bold text-neutral/80 text-sm italic">{topper.scholarship}</div>
                                        <div className="text-[10px] text-base-content/40 font-black uppercase tracking-widest">{topper.university}</div>
                                    </td>
                                    <td className="bg-base-100 rounded-r-2xl border-y border-r border-base-300 group-hover:border-primary/20 text-right pr-4 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => handleEditClick(topper)} className="w-10 h-10 flex items-center justify-center bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all"><FaEdit size={16} /></button>
                                            <button onClick={() => handleDelete(topper._id)} className="w-10 h-10 flex items-center justify-center bg-error/10 text-error rounded-xl hover:bg-error hover:text-white transition-all"><FaTrashAlt size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {toppers.length === 0 && (
                    <div className="py-24 text-center opacity-20 flex flex-col items-center">
                        <FaAward size={80} className="mb-4" />
                        <p className="text-xl font-black uppercase tracking-[0.3em] italic">No Toppers Listed</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ManageToppers;