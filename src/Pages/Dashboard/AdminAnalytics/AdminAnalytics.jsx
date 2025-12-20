import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loader from "../../../Components/Loader/Loader";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const AdminAnalytics = () => {
    const axiosSecure = UseAxiosSecure();

    // SUMMARY DATA
    const { data: summary = {}, isLoading } = useQuery({
        queryKey: ["admin-analytics"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/analytics");
            return res.data;
        },
    });

    // CHART DATA
    const { data: chartData = [] } = useQuery({
        queryKey: ["application-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/application-stats");
            return res.data;
        },
    });

    if (isLoading) return <Loader />;

    return (
        <div className="p-6 space-y-8">
            <h2 className="text-3xl font-bold">Analytics Dashboard</h2>

            {/* KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow">
                    <h3 className="text-lg">Total Users</h3>
                    <p className="text-4xl font-bold">{summary.totalUsers}</p>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow">
                    <h3 className="text-lg">Total Scholarships</h3>
                    <p className="text-4xl font-bold">
                        {summary.totalScholarships}
                    </p>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow">
                    <h3 className="text-lg">Total Fees Collected</h3>
                    <p className="text-4xl font-bold">
                        ${summary.totalFees}
                    </p>
                </div>
            </div>

            {/* BAR CHART */}
            <div className="bg-base-100 p-6 rounded-2xl shadow">
                <h3 className="text-xl font-semibold mb-4">
                    Applications by Scholarship Category
                </h3>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="applications" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminAnalytics;
