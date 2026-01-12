import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaUserShield, FaUserEdit, FaUserGraduate, FaUsersCog, FaCalendarAlt, FaEnvelope, FaChevronLeft, FaChevronRight, FaIdBadge, FaCheckCircle } from "react-icons/fa";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loader from "../../../Components/Loader/Loader";
import { motion } from "framer-motion";
import { useState } from "react";

const ManageUsers = () => {
    const axiosSecure = UseAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20; // রেসপন্সিভনেসের জন্য লিমিট ১০ করা হয়েছে

    const { data: userData, isLoading, refetch } = useQuery({
        queryKey: ["users", currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?page=${currentPage}&limit=${limit}`);
            return res.data;
        },
    });

    const users = userData?.users || [];
    const totalPages = userData?.totalPages || 1;

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "User will be permanently removed!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Delete",
            customClass: { popup: 'rounded-[2rem]' }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/users/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "User removed successfully", "success");
                    refetch();
                }
            }
        });
    };

    const handleRoleChange = (user, newRole) => {
        if (user.role === newRole) return;
        Swal.fire({
            title: "Change Role?",
            text: `${user.displayName} will be promoted to ${newRole}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, change",
            customClass: { popup: 'rounded-[2rem]' }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/role/${user._id}`, { role: newRole });
                if (res.data.modifiedCount > 0) {
                    Swal.fire("Success!", "User role updated", "success");
                    refetch();
                }
            }
        });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
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
                        <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                            <FaUsersCog className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <span>Manage <span className="text-primary underline decoration-primary/20">Users</span></span>
                    </h2>
                    <p className="text-base-content/40 font-black uppercase text-[8px] md:text-[10px] tracking-[0.3em] px-1 italic">Control user access and permission levels</p>
                </div>
                
                <div className="stats shadow-xl bg-base-100 rounded-3xl border border-base-300/10 w-fit">
                    <div className="stat px-6 md:px-8 py-2 md:py-3">
                        <div className="stat-title text-[9px] md:text-[10px] font-black uppercase tracking-widest text-base-content/40">Total Members</div>
                        <div className="stat-value text-primary text-2xl md:text-3xl font-black italic">{userData?.totalItems || 0}</div>
                    </div>
                </div>
            </div>

            {/* --- Desktop View: Table --- */}
            <div className="hidden lg:block bg-base-100 rounded-[3rem] shadow-2xl border border-base-300/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-0">
                        <thead>
                            <tr className="bg-primary/5 text-primary">
                                <th className="py-6 pl-10 text-[10px] font-black uppercase tracking-widest">Index</th>
                                <th className="text-[10px] font-black uppercase tracking-widest">User Profile</th>
                                <th className="text-[10px] font-black uppercase tracking-widest">Email Address</th>
                                <th className="text-[10px] font-black uppercase tracking-widest">Role</th>
                                <th className="text-[10px] font-black uppercase tracking-widest text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-base-300/5">
                            {users.map((user, index) => (
                                <tr key={user._id} className="hover:bg-primary/5 transition-all duration-300">
                                    <td className="pl-10 font-mono text-[10px] text-base-content/30 font-black italic">
                                        #{(currentPage - 1) * limit + index + 1}
                                    </td>
                                    <td className="py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12 border-2 border-primary/20 p-0.5 bg-base-200">
                                                    <img src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-black text-neutral uppercase text-sm italic">{user.displayName}</div>
                                                <div className="text-[8px] font-bold text-base-content/40 uppercase tracking-widest mt-0.5 flex items-center gap-1">
                                                    <FaCalendarAlt size={10} /> {new Date(user.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2 font-bold text-xs text-base-content/60 italic">
                                            <FaEnvelope className="text-primary/40" /> {user.email}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest italic border
                                            ${user.role === "admin" ? "bg-green-500/10 text-green-600 border-green-500/20" : 
                                              user.role === "moderator" ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" : 
                                              "bg-primary/5 text-primary border-primary/20"}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex justify-center gap-3">
                                            <div className="dropdown dropdown-left">
                                                <div tabIndex={0} role="button" className="btn btn-sm bg-base-200 hover:bg-primary hover:text-white border-none rounded-xl font-black text-[9px] uppercase tracking-widest italic h-9 px-4">Role</div>
                                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100 rounded-2xl w-40 border border-base-300/10 animate-in fade-in slide-in-from-right-2">
                                                    <li><button onClick={() => handleRoleChange(user, "student")} className="font-bold text-xs hover:text-primary">Student</button></li>
                                                    <li><button onClick={() => handleRoleChange(user, "moderator")} className="font-bold text-xs hover:text-primary">Moderator</button></li>
                                                    <li><button disabled={user.role === "admin"} onClick={() => handleRoleChange(user, "admin")} className="font-bold text-xs hover:text-primary">Admin</button></li>
                                                </ul>
                                            </div>
                                            <button onClick={() => handleDelete(user._id)} className="btn btn-square btn-sm bg-error/10 text-error hover:bg-error hover:text-white rounded-xl border-none transition-all h-9 w-9">
                                                <RiDeleteBin5Fill size={16} />
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
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                {users.map((user, index) => (
                    <div key={user._id} className="bg-base-100 p-6 rounded-[2.5rem] border border-base-300/10 shadow-lg space-y-5 relative overflow-hidden group">
                        {/* Card Header */}
                        <div className="flex justify-between items-center relative z-10">
                            <div className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-[9px] font-black italic uppercase flex items-center gap-1">
                                <FaIdBadge size={10} /> #{(currentPage - 1) * limit + index + 1}
                            </div>
                            <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-tighter italic border
                                ${user.role === "admin" ? "bg-green-500/10 text-green-600 border-green-500/20" : 
                                  user.role === "moderator" ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" : 
                                  "bg-primary/5 text-primary border-primary/20"}`}>
                                {user.role}
                            </span>
                        </div>

                        {/* User Profile Info */}
                        <div className="flex items-center gap-4 relative z-10">
                            <img 
                                src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} 
                                className="w-14 h-14 rounded-2xl object-cover border-2 border-base-200" 
                                alt="" 
                            />
                            <div className="overflow-hidden">
                                <h3 className="font-black text-neutral uppercase text-xs md:text-sm leading-none italic truncate mb-1">
                                    {user.displayName}
                                </h3>
                                <p className="text-[10px] text-base-content/50 font-bold truncate lowercase flex items-center gap-1">
                                    <FaEnvelope size={8} className="text-primary/40" /> {user.email}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-3 pt-2 relative z-10">
                            <div className="dropdown dropdown-top w-full">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-sm bg-base-200 text-neutral rounded-xl text-[10px] font-black uppercase tracking-widest italic w-full flex items-center justify-center gap-2 h-11 min-h-0">
                                    <FaUserEdit size={14}/> Role
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100 rounded-2xl w-full border border-base-300/10 mb-2">
                                    <li><button onClick={() => handleRoleChange(user, "student")} className="font-bold text-[10px] uppercase italic">Student</button></li>
                                    <li><button onClick={() => handleRoleChange(user, "moderator")} className="font-bold text-[10px] uppercase italic">Moderator</button></li>
                                    <li><button disabled={user.role === "admin"} onClick={() => handleRoleChange(user, "admin")} className="font-bold text-[10px] uppercase italic text-error">Admin</button></li>
                                </ul>
                            </div>
                            <button onClick={() => handleDelete(user._id)} className="btn btn-ghost btn-sm bg-error/10 text-error rounded-xl text-[10px] font-black uppercase tracking-widest italic flex items-center justify-center gap-2 h-11 min-h-0">
                                <RiDeleteBin5Fill size={14}/> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- Pagination Controls --- */}
            <div className="mt-12 md:mt-16 mb-8 flex flex-col items-center gap-6">
                <div className="flex items-center gap-2 md:gap-4 overflow-x-auto max-w-full pb-2 no-scrollbar">
                    <button
                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="btn btn-sm md:btn-md bg-base-200 border-none rounded-xl md:rounded-2xl font-black text-[10px] uppercase italic disabled:opacity-20 hover:bg-primary hover:text-white transition-all min-w-[60px]"
                    >
                        <FaChevronLeft size={14} /> <span className="hidden md:inline">Prev</span>
                    </button>

                    <div className="flex gap-1 md:gap-2">
                        {[...Array(totalPages)].map((_, idx) => {
                            if (totalPages > 5 && Math.abs(currentPage - (idx + 1)) > 2) return null;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handlePageChange(idx + 1)}
                                    className={`btn btn-sm md:btn-md border-none rounded-xl md:rounded-2xl font-black text-[10px] w-9 h-9 md:w-12 md:h-12 transition-all ${
                                        currentPage === idx + 1 
                                        ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110" 
                                        : "bg-base-200 text-neutral/40 hover:bg-base-300"
                                    }`}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="btn btn-sm md:btn-md bg-base-200 border-none rounded-xl md:rounded-2xl font-black text-[10px] uppercase italic disabled:opacity-20 hover:bg-primary hover:text-white transition-all min-w-[60px]"
                    >
                        <span className="hidden md:inline">Next</span> <FaChevronRight size={14} />
                    </button>
                </div>
                
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-neutral/40 italic">
                    Member Page <span className="text-primary">{currentPage}</span> of {totalPages}
                </p>
            </div>
        </motion.div>
    );
};

export default ManageUsers;