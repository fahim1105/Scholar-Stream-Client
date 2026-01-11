import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaUserShield, FaUserEdit, FaUserGraduate, FaUsersCog, FaCalendarAlt, FaEnvelope } from "react-icons/fa";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loader from "../../../Components/Loader/Loader";
import { motion } from "framer-motion";

const ManageUsers = () => {
    const axiosSecure = UseAxiosSecure();

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

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

    if (isLoading) return <Loader />;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="p-2 md:p-6 mb-15 max-w-7xl mx-auto"
        >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h2 className="text-3xl md:text-5xl font-black text-neutral italic uppercase tracking-tighter flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-2xl text-primary"><FaUsersCog size={30} /></div>
                        Manage <span className="text-primary underline decoration-primary/20">Users</span>
                    </h2>
                    <p className="text-base-content/50 mt-2 font-bold uppercase text-[9px] md:text-[10px] tracking-[0.3em] px-1">Control user access and permission levels</p>
                </div>
                <div className="bg-base-100 px-6 py-3 rounded-2xl shadow-sm border border-base-300/10 hidden md:block">
                    <span className="text-[10px] font-black uppercase text-base-content/30 tracking-widest block">Total Members</span>
                    <span className="text-2xl font-black text-primary italic">{users.length}</span>
                </div>
            </div>

            {/* --- Desktop View: Table --- */}
            <div className="hidden lg:block bg-base-100 rounded-[2.5rem] shadow-2xl border border-base-300/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-0">
                        <thead>
                            <tr className="bg-primary/5 text-primary">
                                <th className="py-6 pl-8 text-[10px] font-black uppercase tracking-widest">Index</th>
                                <th className="text-[10px] font-black uppercase tracking-widest">User Profile</th>
                                <th className="text-[10px] font-black uppercase tracking-widest">Email Address</th>
                                <th className="text-[10px] font-black uppercase tracking-widest">Role & Access</th>
                                <th className="text-[10px] font-black uppercase tracking-widest text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-base-300/5">
                            {users.map((user, index) => (
                                <tr key={user._id} className="hover:bg-primary/5 transition-all duration-300 group">
                                    <td className="pl-8 font-mono text-[10px] text-base-content/30 font-black italic">#{index + 1}</td>
                                    <td className="py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12 border-2 border-primary/20 p-0.5">
                                                    <img src={user.photoURL} alt="avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-black text-neutral uppercase text-sm italic">{user.displayName}</div>
                                                <div className="text-[8px] font-bold text-base-content/40 uppercase tracking-widest mt-0.5 flex items-center gap-1">
                                                    <FaCalendarAlt /> {new Date(user.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2 font-bold text-xs text-base-content/60">
                                            <FaEnvelope className="text-primary/40" /> {user.email}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest italic
                                            ${user.role === "admin" ? "bg-green-500/10 text-green-600 border border-green-500/20" : 
                                              user.role === "moderator" ? "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20" : 
                                              "bg-gray-500/10 text-gray-500 border border-gray-500/20"}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex justify-center gap-2">
                                            <div className="dropdown dropdown-left">
                                                <div tabIndex={0} role="button" className="btn btn-sm btn-outline border-base-300 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-primary hover:border-primary">Change Role</div>
                                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100 rounded-2xl w-40 border border-base-300/10 mt-1">
                                                    <li><button onClick={() => handleRoleChange(user, "student")} className="font-bold text-xs"><FaUserGraduate /> Student</button></li>
                                                    <li><button onClick={() => handleRoleChange(user, "moderator")} className="font-bold text-xs"><FaUserEdit /> Moderator</button></li>
                                                    <li><button disabled={user.role === "admin"} onClick={() => handleRoleChange(user, "admin")} className="font-bold text-xs"><FaUserShield /> Admin</button></li>
                                                </ul>
                                            </div>
                                            <button onClick={() => handleDelete(user._id)} className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/5 active:scale-90">
                                                <RiDeleteBin5Fill size={18} />
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
                    <div key={user._id} className="bg-base-100 p-6 rounded-[2.5rem] border border-base-300/10 shadow-lg space-y-4 relative overflow-hidden group">
                        <div className="flex justify-between items-center">
                            <div className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black italic">USER #{index + 1}</div>
                            <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase italic tracking-widest
                                ${user.role === "admin" ? "bg-green-500/10 text-green-600" : 
                                  user.role === "moderator" ? "bg-yellow-500/10 text-yellow-600" : 
                                  "bg-gray-500/10 text-gray-500"}`}>
                                {user.role}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 border-b border-base-300/5 pb-4">
                            <div className="mask mask-squircle h-14 w-14 border-2 border-primary/20 p-0.5 shrink-0">
                                <img src={user.photoURL} alt="avatar" />
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="font-black text-neutral uppercase text-sm truncate italic">{user.displayName}</h3>
                                <p className="text-[10px] font-bold text-base-content/40 truncate flex items-center gap-1 leading-none mt-1">
                                    <FaEnvelope size={10} /> {user.email}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <div className="dropdown dropdown-top w-full">
                                <div tabIndex={0} role="button" className="btn btn-outline btn-sm w-full rounded-xl font-black text-[9px] uppercase tracking-widest">Update Role</div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100 rounded-2xl w-44 border border-base-300/10 mb-2">
                                    <li><button onClick={() => handleRoleChange(user, "student")} className="font-bold text-xs">Student</button></li>
                                    <li><button onClick={() => handleRoleChange(user, "moderator")} className="font-bold text-xs">Moderator</button></li>
                                    <li><button disabled={user.role === "admin"} onClick={() => handleRoleChange(user, "admin")} className="font-bold text-xs">Admin</button></li>
                                </ul>
                            </div>
                            <button onClick={() => handleDelete(user._id)} className="btn btn-error btn-outline btn-sm rounded-xl font-black text-[9px] uppercase tracking-widest">Remove</button>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default ManageUsers;