import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaEnvelope, FaCalendarAlt, FaCheckCircle, FaUserTag, FaIdBadge } from "react-icons/fa";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../../Hooks/UseAuth";
import Loader from "../../../../Components/Loader/Loader";
import { motion } from 'framer-motion';

const UserProfile = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = UseAuth();

    const { data: profile = {}, isLoading } = useQuery({
        queryKey: ["user-profile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get("/users/me");
            return res.data;
        }
    });

    if (isLoading) return <Loader />;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen transition-colors duration-300"
        >
            <div className="max-w-6xl mx-auto">
                {/* --- Header Section --- */}
                <div className="mb-8 md:mb-12 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-black text-neutral italic tracking-tighter">
                        Account <span className="text-primary underline decoration-primary/20">Overview</span>
                    </h2>
                    <p className="text-base-content/50 mt-3 font-bold uppercase text-[10px] tracking-[0.3em]">
                        Your personal information and account security.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                    
                    {/* --- Left Side: Profile Card --- */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-base-100 shadow-2xl rounded-[2.5rem] p-8 flex flex-col items-center text-center border border-base-300/10 relative overflow-hidden group">
                            {/* Decorative Background Element */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                            
                            <div className="avatar online mb-6">
                                <div className="w-28 md:w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                                    <img src={user?.photoURL || "https://i.ibb.co/XF0Ym8p/user.png"} alt="Profile" />
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-neutral uppercase tracking-tight italic">
                                {profile.displayName || "Rise Follower"}
                            </h3>
                            
                            <div className="mt-3 inline-flex items-center gap-2 px-5 py-2 bg-primary/10 text-primary rounded-full font-black uppercase text-[10px] tracking-widest border border-primary/20">
                                <FaIdBadge size={12} />
                                {profile.role || "User"}
                            </div>

                            <div className="divider opacity-50 my-8"></div>

                            <div className="w-full grid grid-cols-1 gap-4">
                                <div className="p-4 bg-base-200/50 rounded-2xl border border-base-300/10">
                                    <p className="text-[9px] text-base-content/40 font-black uppercase tracking-[0.2em] mb-1">Account Holder Since</p>
                                    <p className="text-lg font-black text-neutral italic">2025</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- Right Side: Details --- */}
                    <div className="lg:col-span-8">
                        <div className="bg-base-100 shadow-2xl rounded-[2.5rem] p-6 md:p-10 border border-base-300/10 h-full">
                            <h4 className="text-xl font-black mb-10 flex items-center gap-4 text-neutral italic uppercase tracking-tighter">
                                <div className="p-3 bg-primary rounded-2xl text-white shadow-lg shadow-primary/30">
                                    <FaUserShield size={20} />
                                </div>
                                Profile Verification Details
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                {/* Email Address */}
                                <div className="group flex items-center gap-5 p-5 bg-base-200/50 rounded-[1.5rem] border border-transparent hover:border-primary/30 transition-all duration-300">
                                    <div className="p-4 bg-white dark:bg-base-300 rounded-2xl shadow-sm text-primary group-hover:scale-110 transition-transform">
                                        <FaEnvelope size={20} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-[9px] text-base-content/40 font-black uppercase tracking-[0.2em] mb-1">Official Email</p>
                                        <p className="font-black text-neutral text-xs md:text-sm break-all tracking-tight">
                                            {profile.email || "user@example.com"}
                                        </p>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="group flex items-center gap-5 p-5 bg-base-200/50 rounded-[1.5rem] border border-transparent hover:border-success/30 transition-all duration-300">
                                    <div className="p-4 bg-white dark:bg-base-300 rounded-2xl shadow-sm text-success group-hover:scale-110 transition-transform">
                                        <FaCheckCircle size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-base-content/40 font-black uppercase tracking-[0.2em] mb-1">Account Status</p>
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                                            <p className="font-black text-neutral text-sm uppercase italic tracking-widest">
                                                {profile.status || "Active"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Member Since */}
                                <div className="md:col-span-2 group flex items-center gap-5 p-5 bg-base-200/50 rounded-[1.5rem] border border-transparent hover:border-orange-400/30 transition-all duration-300">
                                    <div className="p-4 bg-white dark:bg-base-300 rounded-2xl shadow-sm text-orange-400 group-hover:scale-110 transition-transform">
                                        <FaCalendarAlt size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-base-content/40 font-black uppercase tracking-[0.2em] mb-1">Registration Date</p>
                                        <p className="font-black text-neutral text-sm md:text-lg italic">
                                            {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : "December 20, 2025"}
                                        </p>
                                    </div>
                                </div>

                                {/* Role Info Box (Extra) */}
                                <div className="md:col-span-2 mt-4 p-6 bg-primary/5 rounded-[2rem] border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                                            <FaUserTag size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-neutral uppercase">Access Permissions</p>
                                            <p className="text-xs text-base-content/50">Your account is authorized as a <span className="text-primary font-bold">{profile.role || "User"}</span>.</p>
                                        </div>
                                    </div>
                                    {/* <button className="btn btn-primary btn-sm rounded-xl px-6 font-black uppercase text-[10px] tracking-widest">
                                        Verify Identity
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default UserProfile;