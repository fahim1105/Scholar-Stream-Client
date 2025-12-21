import React, { useEffect, useState } from "react"; // useState যোগ করুন
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import Loader from "../../Components/Loader/Loader";
import { Link } from "react-router";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const AllScholarships = () => {
    const axiosPublic = UseAxiosPublic();
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 17;

    const { register, watch } = useForm({
        defaultValues: { search: "", category: "", subject: "", degree: "" },
    });

    const search = watch("search");
    const category = watch("category");
    const subject = watch("subject");
    const degree = watch("degree");

    // ফিল্টার চেঞ্জ হলে আবার ১ নম্বর পেজে ফিরে যাওয়ার জন্য
    useEffect(() => {
        setCurrentPage(1);
    }, [search, category, subject, degree]);

    const { data, isLoading } = useQuery({
        queryKey: ["all-scholarships", search, category, subject, degree, currentPage],
        queryFn: async () => {
            const res = await axiosPublic.get("/scholarships", {
                params: { search, category, subject, degree, page: currentPage, limit },
            });
            return res.data;
        },
    });

    const scholarships = data?.scholarships || [];
    const totalPages = data?.totalPages || 0;

    if (isLoading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
            <header className="mb-10 text-center">
                <h2 className="text-4xl font-black text-neutral mb-2">Explore <span className="text-primary">Scholarships</span></h2>
                <p className="text-gray-500">Find your dream university scholarship with ease</p>
            </header>

            {/* Search & Filters */}
            <form className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 bg-white p-6 rounded-3xl shadow-lg border border-base-200">
                <div className="relative">
                    <FiSearch className="absolute left-4 top-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        {...register("search")}
                        className="input input-bordered w-full pl-12 rounded-xl"
                    />
                </div>

                <select {...register("category")} className="select select-bordered w-full rounded-xl">
                    <option value="">All Categories</option>
                    <option value="Full Fund">Full Fund</option>
                    <option value="Partial Fund">Partial Fund</option>
                    <option value="Self Fund">Self Fund</option>
                </select>

                <select {...register("subject")} className="select select-bordered w-full rounded-xl">
                    <option value="">All Subjects</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Physics">Physics</option>
                    <option value="Agriculture">Agriculture</option>
                </select>

                <select {...register("degree")} className="select select-bordered w-full rounded-xl">
                    <option value="">All Degree</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                </select>
            </form>

            {/* Scholarship Cards */}
            {scholarships.length === 0 ? (
                <div className="text-center py-20 bg-base-100 rounded-[3rem] border-4 border-dashed">
                    <p className="text-2xl text-gray-400 font-bold italic">No scholarships found matching your criteria.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {scholarships.map((scholarship) => (
                            <div key={scholarship._id} className="card bg-white shadow-xl rounded-[2rem] overflow-hidden border border-base-200 hover:shadow-2xl transition-all group">
                                <figure className="relative h-56">
                                    <img src={scholarship.universityImage} alt={scholarship.universityName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-4 right-4 badge badge-primary font-bold py-3 shadow-lg">
                                        {scholarship.scholarshipCategory}
                                    </div>
                                </figure>
                                <div className="card-body p-6">
                                    <h3 className="card-title text-xl font-bold text-neutral leading-tight mb-2">
                                        {scholarship.scholarshipName}
                                    </h3>
                                    <p className="text-gray-500 text-sm font-medium">{scholarship.universityName}</p>
                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-dashed">
                                        <span className="text-xs font-black uppercase text-gray-400 tracking-widest">{scholarship.degree}</span>
                                        <span className="text-lg font-black text-primary">${scholarship.applicationFees}</span>
                                    </div>
                                    <Link to={`/scholarship-details/${scholarship._id}`} className="mt-4">
                                        <button className="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/20">View Details</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center mt-16 gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="btn btn-circle btn-outline border-2 disabled:opacity-30"
                        >
                            <FiChevronLeft />
                        </button>

                        {[...Array(totalPages).keys()].map(num => (
                            <button
                                key={num + 1}
                                onClick={() => setCurrentPage(num + 1)}
                                className={`btn btn-circle border-2 ${currentPage === num + 1 ? 'btn-primary shadow-lg' : 'btn-outline'}`}
                            >
                                {num + 1}
                            </button>
                        ))}

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="btn btn-circle btn-outline border-2 disabled:opacity-30"
                        >
                            <FiChevronRight />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AllScholarships;