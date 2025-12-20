import React, { useEffect, useState } from "react";

import { FaUserCircle, FaEnvelope, FaUserShield } from "react-icons/fa";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loader from "../../../Components/Loader/Loader";

const AdminProfile = () => {
    const axiosSecure = UseAxiosSecure();
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure
            .get("/users/me") // Backend should return logged-in user info
            .then((res) => {
                setAdmin(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [axiosSecure]);

    if (loading) return <Loader />;

    if (!admin)
        return (
            <div className="p-6 text-center text-red-500">
                Failed to load profile information.
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Admin Profile</h2>

            <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row gap-8 items-center">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    {admin.photoURL ? (
                        <img
                            src={admin.photoURL}
                            alt={admin.displayName}
                            className="w-36 h-36 rounded-full object-cover shadow-lg"
                        />
                    ) : (
                        <FaUserCircle className="w-36 h-36 text-gray-400" />
                    )}
                </div>

                {/* Profile Info */}
                <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                        <FaUserShield className="text-primary text-xl" />
                        <span className="text-lg font-semibold">{admin.role}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <FaUserCircle className="text-gray-500 text-xl" />
                        <span className="text-lg font-medium">{admin.displayName}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <FaEnvelope className="text-gray-500 text-xl" />
                        <span className="text-lg font-medium">{admin.email}</span>
                    </div>

                    <div className="text-sm text-gray-500">
                        Account Created:{" "}
                        {new Date(admin.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
