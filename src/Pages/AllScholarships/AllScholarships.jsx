import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import Loader from "../../Components/Loader/Loader";
import { Link } from "react-router";

const AllScholarships = () => {
    const axiosPublic = UseAxiosPublic();

    // React Hook Form
    const { register, watch } = useForm({
        defaultValues: {
            search: "",
            category: "",
            subject: "",
            degree: ""
        },
    });

    // watch individual fields (better performance)
    const search = watch("search");
    const category = watch("category");
    const subject = watch("subject");
    const degree = watch("degree");

    // React Query
    const { data: scholarships = [], isLoading } = useQuery({
        queryKey: [
            "all-scholarships",
            search,
            category,
            subject,
            degree,
        ],
        queryFn: async () => {
            const res = await axiosPublic.get("/scholarships", {
                params: { search, category, subject, degree },
            });
            return res.data;
        },
    });

    if (isLoading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6">All Scholarships</h2>

            {/* Search & Filters */}
            <form className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by name, university or degree"
                    {...register("search")}
                    className="input input-bordered w-full"
                />

                <select {...register("category")} className="select select-bordered w-full md:w-48">
                    <option value="">All Categories</option>
                    <option value="Full Fund">Full Fund</option>
                    <option value="Partial Fund">Partial Fund</option>
                    <option value="Self Fund">Self Fund</option>
                </select>

                <select {...register("subject")} className="select select-bordered w-full md:w-48">
                    <option value="">All Subjects</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Physics">Physics</option>
                    <option value="Agriculture">Agriculture</option>
                </select>

                <select {...register("degree")} className="select select-bordered w-full md:w-48">
                    <option value="">All Degree</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                </select>
            </form>

            {/* Scholarship Cards */}
            {scholarships.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">
                    No scholarships found.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {scholarships.map((scholarship) => (
                        <div
                            key={scholarship._id}
                            className="card bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
                        >
                            <img
                                src={scholarship.universityImage}
                                alt={scholarship.universityName}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">
                                    {scholarship.scholarshipName}
                                </h3>

                                <p className="text-gray-600">
                                    {scholarship.universityName} – {scholarship.universityCity},{" "}
                                    {scholarship.universityCountry}
                                </p>

                                <p className="text-gray-500 text-sm">
                                    {scholarship.degree} | {scholarship.scholarshipCategory}
                                </p>

                                <p className="text-gray-700 font-medium mt-2">
                                    Application Fees: ${scholarship.applicationFees}
                                </p>


                                <Link to={`/scholarship-details/${scholarship._id}`}>
                                    <button
                                        className="btn btn-primary w-full mt-4"
                                    >
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllScholarships;
