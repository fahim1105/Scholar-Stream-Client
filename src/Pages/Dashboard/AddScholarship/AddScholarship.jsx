import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";

const AddScholarship = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const axiosSecure = UseAxiosSecure();
    const { user } = UseAuth();

    const onSubmit = (data) => {
        const payload = {
            ...data,
            tags: data.tags ? data.tags.split(",").map(tag => tag.trim()) : [],
            postedUserEmail: user?.email,
        };

        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to publish this scholarship?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3B82F6",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, Publish!"
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.post("/scholarships", payload)
                    .then(res => {
                        if (res.data.insertedId) {
                            reset();
                            Swal.fire("Success!", "Scholarship added successfully.", "success");
                            navigate("/all-scholarships");
                        }
                    });
            }
        });
    };

    const labelStyle = "label-text font-bold text-neutral mb-1 block";
    const inputStyle = "input input-bordered w-full focus:input-primary bg-base-100";
    const sectionTitle = "text-xl font-bold text-secondary flex items-center gap-2 mt-8 mb-4 border-l-4 border-secondary pl-3";

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 bg-base-200 rounded-3xl my-10 shadow-sm">
            <div className="bg-base-100 shadow-xl rounded-2xl overflow-hidden border border-base-300">

                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white">
                    <h1 className="text-3xl font-extrabold text-white">Add New Scholarship</h1>
                    <p className="opacity-90 mt-1">Fill out the 19 details below to post a new opportunity.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-10 space-y-5">

                    {/* 1. Basic & University Info */}
                    <h2 className={sectionTitle}>University Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="md:col-span-2 lg:col-span-1">
                            <label className={labelStyle}>Scholarship Name</label>
                            <input {...register("scholarshipName", { required: true })} placeholder="Full Name" className={inputStyle} />
                        </div>
                        <div>
                            <label className={labelStyle}>University Name</label>
                            <input {...register("universityName", { required: true })} placeholder="University Name" className={inputStyle} />
                        </div>
                        <div>
                            <label className={labelStyle}>University Image URL</label>
                            <input {...register("universityImage")} placeholder="https://..." className={inputStyle} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                            <label className={labelStyle}>Country</label>
                            <input {...register("universityCountry")} placeholder="Country" className={inputStyle} />
                        </div>
                        <div>
                            <label className={labelStyle}>City</label>
                            <input {...register("universityCity")} placeholder="City" className={inputStyle} />
                        </div>
                        <div>
                            <label className={labelStyle}>University World Rank</label>
                            <input type="number" {...register("universityWorldRank")} placeholder="Rank Number" className={inputStyle} />
                        </div>
                    </div>

                    {/* 2. Academic Details */}
                    <h2 className={sectionTitle}>Academic & Category</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                            <label className={labelStyle}>Degree Level</label>
                            <select {...register("degree", { required: true })} className="select select-bordered w-full focus:select-primary">
                                <option disabled selected>Select Degree</option>
                                <option>Bachelor</option>
                                <option>Masters</option>
                                <option>PhD</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelStyle}>Subject Category</label>
                            <select {...register("subjectCategory")} className="select select-bordered w-full focus:select-primary">
                                <option disabled selected>Select Subject</option>
                                <option>Computer Science</option>
                                <option>Engineering</option>
                                <option>Business</option>
                                <option>Medical</option>
                                <option>Arts</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelStyle}>Scholarship Category</label>
                            <select {...register("scholarshipCategory")} className="select select-bordered w-full focus:select-primary">
                                <option disabled selected>Funding Type</option>
                                <option>Full Fund</option>
                                <option>Partial Fund</option>
                                <option>Self Fund</option>
                            </select>
                        </div>
                    </div>

                    {/* 3. Fees & Dates */}
                    <h2 className={sectionTitle}>Fees & Important Dates</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div>
                            <label className={labelStyle}>Application Fees ($)</label>
                            <input type="number" {...register("applicationFees")} placeholder="0.00" className={inputStyle} />
                        </div>
                        <div>
                            <label className={labelStyle}>Service Charge ($)</label>
                            <input type="number" {...register("serviceCharge")} placeholder="0.00" className={inputStyle} />
                        </div>
                        <div>
                            <label className={labelStyle}>Application Deadline</label>
                            <input type="date" {...register("applicationDeadline")} className={inputStyle} />
                        </div>
                        <div>
                            <label className={labelStyle}>Post Date</label>
                            <input type="date" {...register("scholarshipPostDate")} className={inputStyle} />
                        </div>
                    </div>

                    {/* 4. Descriptions (Textareas) */}
                    <h2 className={sectionTitle}>Coverage & Requirements</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className={labelStyle}>Stipend & Coverage Details</label>
                            <textarea {...register("stipendDetails")} placeholder="Describe stipend..." className="textarea textarea-bordered w-full h-24 focus:textarea-primary" />
                        </div>
                        <div>
                            <label className={labelStyle}>Eligibility Criteria</label>
                            <textarea {...register("eligibility")} placeholder="Who can apply?" className="textarea textarea-bordered w-full h-24 focus:textarea-primary" />
                        </div>
                        <div>
                            <label className={labelStyle}>Scholarship Benefits</label>
                            <textarea {...register("benefits")} placeholder="What are the benefits?" className="textarea textarea-bordered w-full h-24 focus:textarea-primary" />
                        </div>
                        <div>
                            <label className={labelStyle}>Detailed Description</label>
                            <textarea {...register("scholarshipDescription")} placeholder="Full description..." className="textarea textarea-bordered w-full h-24 focus:textarea-primary" />
                        </div>
                    </div>

                    {/* 5. Others */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                        <div>
                            <label className={labelStyle}>Instruction Language</label>
                            <input {...register("language")} placeholder="e.g. English" className={inputStyle} />
                        </div>
                        <div>
                            <label className={labelStyle}>Search Tags (Comma Separated)</label>
                            <input {...register("tags")} placeholder="usa, engineering, 2024" className={inputStyle} />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-8">
                        <button className="btn btn-primary w-full text-lg shadow-md hover:scale-[1.01] active:scale-95 transition-all">
                            Publish Scholarship
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddScholarship;