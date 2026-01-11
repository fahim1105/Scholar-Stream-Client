import { useQuery } from "@tanstack/react-query";
import { 
    LineChart, Line, AreaChart, Area, BarChart, Bar, 
    CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, 
    Cell, PieChart, Pie, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis 
} from "recharts";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loader from "../../../Components/Loader/Loader";
import { Users, GraduationCap, DollarSign, TrendingUp, PieChart as PieIcon, Activity, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const AdminAnalytics = () => {
    const axiosSecure = UseAxiosSecure();

    const { data: summary = {}, isLoading: isSummaryLoading } = useQuery({
        queryKey: ["admin-analytics"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/analytics");
            return res.data;
        },
    });

    const { data: chartData = [], isLoading: isChartLoading } = useQuery({
        queryKey: ["application-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/application-stats");
            return res.data;
        },
    });

    const COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'];

    // --- Custom Axis Styling ---
    const axisStyle = {
        fontSize: '10px',
        fontWeight: '900',
        fontStyle: 'italic',
        fill: '#94a3b8',
        textTransform: 'uppercase'
    };

    if (isSummaryLoading || isChartLoading) return <Loader />;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 md:p-8 space-y-12 max-w-7xl mx-auto mb-20"
        >
            {/* --- Header --- */}
            <div>
                <h2 className="text-4xl md:text-6xl font-black text-neutral italic uppercase tracking-tighter flex items-center gap-4">
                    <div className="p-4 bg-primary/10 rounded-[2rem] text-primary shadow-inner">
                        <Activity size={35} />
                    </div>
                    System <span className="text-primary underline decoration-primary/10">Metrics</span>
                </h2>
                <p className="text-base-content/40 mt-3 font-black uppercase text-[10px] tracking-[0.4em] px-2 italic">Comprehensive platform data visualization</p>
            </div>

            {/* --- KPI CARDS --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Users Card */}
                <div className="bg-base-100 p-8 rounded-[3rem] shadow-2xl border border-base-300/10 relative overflow-hidden group">
                    <Users size={24} className="text-blue-500 mb-4" />
                    <h3 className="text-[10px] font-black uppercase text-base-content/30 tracking-widest italic">Total Registered</h3>
                    <p className="text-5xl font-black text-neutral mt-2 italic tracking-tighter">{summary.totalUsers?.toLocaleString() || 0}</p>
                    <Users size={120} className="absolute -right-6 -bottom-6 text-blue-500/5 group-hover:scale-110 transition-transform" />
                </div>
                {/* Scholarship Card */}
                <div className="bg-base-100 p-8 rounded-[3rem] shadow-2xl border border-base-300/10 relative overflow-hidden group">
                    <GraduationCap size={24} className="text-green-500 mb-4" />
                    <h3 className="text-[10px] font-black uppercase text-base-content/30 tracking-widest italic">Total Scholarships</h3>
                    <p className="text-5xl font-black text-neutral mt-2 italic tracking-tighter">{summary.totalScholarships?.toLocaleString() || 0}</p>
                    <GraduationCap size={120} className="absolute -right-6 -bottom-6 text-green-500/5 group-hover:scale-110 transition-transform" />
                </div>
                {/* Fees Card */}
                <div className="bg-base-100 p-8 rounded-[3rem] shadow-2xl border border-base-300/10 relative overflow-hidden group">
                    <DollarSign size={24} className="text-primary mb-4" />
                    <h3 className="text-[10px] font-black uppercase text-base-content/30 tracking-widest italic">Revenue Stream</h3>
                    <p className="text-5xl font-black text-neutral mt-2 italic tracking-tighter">${summary.totalFees?.toLocaleString() || 0}</p>
                    <DollarSign size={120} className="absolute -right-6 -bottom-6 text-primary/5 group-hover:scale-110 transition-transform" />
                </div>
            </div>

            {/* --- GRAPHS GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* 1. AREA CHART (Application Growth Trend) */}
                <div className="bg-base-100 p-8 md:p-10 rounded-[4rem] shadow-2xl border border-base-300/10">
                    <div className="flex items-center gap-3 mb-10">
                        <TrendingUp size={18} className="text-primary" />
                        <h3 className="text-xs font-black uppercase italic tracking-widest text-neutral">Growth Trend</h3>
                    </div>
                    
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ left: -15, right: 10, bottom: 20 }}>
                                <defs>
                                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.3} />
                                <XAxis dataKey="category" tick={axisStyle} axisLine={false} tickLine={false} dy={15} />
                                <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{borderRadius: '1.5rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontWeight: '900', fontStyle: 'italic'}} />
                                <Area type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={5} fill="url(#colorApps)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. PIE CHART (User Roles) */}
                <div className="bg-base-100 p-8 md:p-10 rounded-[4rem] shadow-2xl border border-base-300/10 flex flex-col items-center">
                    <div className="flex items-center gap-3 mb-10 self-start">
                        <PieIcon size={18} className="text-purple-500" />
                        <h3 className="text-xs font-black uppercase italic tracking-widest text-neutral">User Segments</h3>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={summary.userRoleStats || []} innerRadius={75} outerRadius={100} paddingAngle={10} dataKey="value" stroke="none">
                                    {(summary.userRoleStats || []).map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                                <Legend wrapperStyle={{fontSize: '9px', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase'}} iconType="rect" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. BAR CHART (Performance Ranking) */}
                <div className="bg-base-100 p-8 md:p-10 rounded-[4rem] shadow-2xl border border-base-300/10">
                    <div className="flex items-center gap-3 mb-10">
                        <BarChart3 size={18} className="text-orange-500" />
                        <h3 className="text-xs font-black uppercase italic tracking-widest text-neutral">Category Performance</h3>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                                <XAxis dataKey="category" tick={axisStyle} axisLine={false} tickLine={false} dy={15} />
                                <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{fill: 'rgba(0,0,0,0.03)'}} />
                                <Bar dataKey="applications" radius={[15, 15, 0, 0]} barSize={45}>
                                    {chartData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 4. RADAR CHART (Platform Balance) */}
                <div className="bg-base-100 p-8 md:p-10 rounded-[4rem] shadow-2xl border border-base-300/10">
                    <div className="flex items-center gap-3 mb-10">
                        <Activity size={18} className="text-green-500" />
                        <h3 className="text-xs font-black uppercase italic tracking-widest text-neutral">Balance Score</h3>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                <PolarGrid strokeOpacity={0.1} />
                                <PolarAngleAxis dataKey="category" tick={{fontSize: 9, fontWeight: '900', fontStyle: 'italic', fill: '#64748b'}} />
                                <Radar name="Apps" dataKey="applications" stroke="#10B981" strokeWidth={3} fill="#10B981" fillOpacity={0.3} />
                                <Tooltip />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default AdminAnalytics;