import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaEnvelope, FaCalendarAlt, FaCheckCircle, FaEdit, FaCog } from "react-icons/fa";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../../Hooks/UseAuth";
import Loader from "../../../../Components/Loader/Loader";



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
        <div className="min-h-screen bg-base-200 p-4 md:p-6 lg:p-10">
            {/* Header - Center on mobile, left on desktop */}
            <div className="max-w-5xl mx-auto mb-10 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-extrabold text-neutral tracking-tight">
                    Account <span className="text-primary">Overview</span>
                </h2>
                <p className="text-gray-500 mt-2 text-sm md:text-base">Your personal information and account security.</p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 items-center lg:grid-cols-12 gap-6">

                {/* Left Side: Profile Card (Takes 4 columns on large screens) */}
                <div className="lg:col-span-4 bg-base-100 shadow-xl rounded-[2rem] p-6 md:p-8 flex flex-col items-center text-center border border-base-300">
                    <div className="avatar online">
                        <div className="w-28 md:w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                            <img src={user?.photoURL || "https://i.ibb.co/XF0Ym8p/user.png"} alt="Moderator" />
                        </div>
                    </div>
                    <h3 className="mt-6 text-2xl font-bold text-neutral">{profile.displayName || "Rise Follower"}</h3>
                    <div className="mt-2 badge badge-primary badge-outline font-bold uppercase px-4 py-3 text-xs">
                        {profile.role || "Moderator"}
                    </div>

                    <div className="divider my-6"></div>

                    <div className="w-full space-y-3">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Moderator Since</p>
                        <p className="text-lg font-semibold text-neutral">2025</p>
                    </div>
                </div>

                {/* Right Side: Details (Takes 8 columns on large screens) */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-base-100 shadow-xl rounded-[2rem] p-6 md:p-8 border border-base-300">
                        <h4 className="text-xl font-bold mb-8 flex items-center gap-3 text-neutral">
                            <span className="p-2 bg-primary/10 rounded-lg"><FaUserShield className="text-primary" /></span>
                            Profile Details
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {/* Email Address - Responsive Fix */}
                            <div className="flex items-center gap-4 p-4 bg-base-200 rounded-2xl border border-transparent hover:border-primary/20 transition-all">
                                <div className="hidden sm:flex p-3 bg-white rounded-xl shadow-sm text-primary shrink-0">
                                    <FaEnvelope size={18} />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Email Address</p>
                                    <p className="font-bold text-neutral text-sm md:text-base break-all">
                                        {profile.email || "risefollower11@gmail.com"}
                                    </p>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex items-center gap-4 p-4 bg-base-200 rounded-2xl">
                                <div className="hidden sm:flex p-3 bg-white rounded-xl shadow-sm text-green-500 shrink-0">
                                    <FaCheckCircle size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Account Status</p>
                                    <p className="font-bold text-neutral text-sm md:text-base uppercase flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        {profile.status || "Active"}
                                    </p>
                                </div>
                            </div>

                            {/* Member Since - Full width on mobile */}
                            <div className="md:col-span-2 flex items-center gap-4 p-4 bg-base-200 rounded-2xl">
                                <div className="hidden sm:flex p-3 bg-white rounded-xl shadow-sm text-orange-400 shrink-0">
                                    <FaCalendarAlt size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Member Since</p>
                                    <p className="font-bold text-neutral text-sm md:text-base">
                                        {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : "December 20, 2025"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;