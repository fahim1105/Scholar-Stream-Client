import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, DollarSign, BookOpen, Sparkles, Send } from "lucide-react";

const AddScholarship = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const axiosSecure = UseAxiosSecure();
    const { user } = UseAuth();

    const onSubmit = (data) => {
        // ট্যাগগুলোকে অ্যারেতে রূপান্তর এবং ডাটা প্রসেসিং
        const payload = {
            ...data,
            // যেহেতু valueAsNumber ব্যবহার করা হয়েছে, নিচের ফি গুলো এখন সরাসরি Number হিসেবে আসবে
            tags: data.tags ? data.tags.split(",").map(tag => tag.trim()) : [],
            postedUserEmail: user?.email,
            createdAt: new Date()
        };

        Swal.fire({
            title: "Confirm Publication?",
            text: "This opportunity will be live for students immediately.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3B82F6",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, Publish!",
            customClass: { popup: 'rounded-[2.5rem]' }
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.post("/scholarships", payload)
                    .then(res => {
                        if (res.data.insertedId) {
                            reset();
                            Swal.fire({
                                icon: "success",
                                title: "Published!",
                                text: "Scholarship added successfully.",
                                showConfirmButton: false,
                                timer: 1500,
                                customClass: { popup: 'rounded-[2rem]' }
                            });
                            navigate("/all-scholarships");
                        }
                    })
                    .catch(err => {
                        Swal.fire("Error", "Failed to save scholarship", "error");
                    });
            }
        });
    };

    const labelStyle = "text-[10px] font-black uppercase tracking-widest text-base-content/40 mb-2 px-3 italic";
    const inputStyle = "input input-bordered w-full rounded-2xl bg-base-200 border-base-300 focus:bg-base-100 focus:ring-2 ring-primary transition-all font-bold h-12 md:h-14 text-neutral";
    const selectStyle = "select select-bordered w-full rounded-2xl bg-base-200 border-base-300 focus:bg-base-100 focus:ring-2 ring-primary transition-all font-bold h-12 md:h-14 text-neutral";
    const textareaStyle = "textarea textarea-bordered w-full rounded-[2rem] bg-base-200 border-base-300 focus:bg-base-100 focus:ring-2 ring-primary transition-all font-bold p-5 min-h-[120px] text-neutral";
    const sectionTitle = "text-sm md:text-lg font-black text-neutral italic uppercase tracking-tighter flex items-center gap-2 mt-10 mb-6 border-l-4 border-primary pl-4";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto p-2 md:p-8 my-5"
        >
            <div className="bg-base-100 shadow-2xl rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-base-300/10">

                {/* --- Header Section --- */}
                <div className="bg-primary/5 p-8 md:p-14 border-b border-base-300/10 relative overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-3xl md:text-6xl font-black text-neutral italic tracking-tighter uppercase leading-none">
                            Add New <span className="text-primary underline decoration-primary/10">Scholarship</span>
                        </h1>
                        <p className="text-base-content/40 mt-4 font-black uppercase text-[9px] md:text-[11px] tracking-[0.3em] italic max-w-lg">
                            Create a bridge between global opportunities and ambitious students by listing new scholarship programs.
                        </p>
                    </div>
                    <GraduationCap className="absolute -right-10 -bottom-10 w-48 h-48 md:w-80 md:h-80 text-primary opacity-[0.03] rotate-12" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-16 space-y-8">

                    {/* 1. University Info */}
                    <div>
                        <h2 className={sectionTitle}><MapPin size={20} className="text-primary" /> University Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-1">
                                <label className={labelStyle}>Scholarship Name</label>
                                <input {...register("scholarshipName", { required: true })} placeholder="e.g. Global Talent Grant" className={inputStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>University Name</label>
                                <input {...register("universityName", { required: true })} placeholder="e.g. Harvard University" className={inputStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>Logo/Image URL</label>
                                <input {...register("universityImage")} placeholder="https://image-link.com" className={inputStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>Country</label>
                                <input {...register("universityCountry")} placeholder="e.g. USA" className={inputStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>City</label>
                                <input {...register("universityCity")} placeholder="e.g. Cambridge" className={inputStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>World Rank</label>
                                <input type="number" {...register("universityWorldRank", { valueAsNumber: true })} placeholder="e.g. 1" className={inputStyle} />
                            </div>
                        </div>
                    </div>

                    {/* 2. Academic & Category */}
                    <div>
                        <h2 className={sectionTitle}><BookOpen size={20} className="text-primary" /> Academic Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <label className={labelStyle}>Degree Level</label>
                                <select {...register("degree", { required: true })} className={selectStyle}>
                                    <option value="">Select Level</option>
                                    <option>Bachelor</option>
                                    <option>Masters</option>
                                    <option>PhD</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelStyle}>Subject Category</label>
                                <select {...register("subjectCategory")} className={selectStyle}>
                                    <option value="">Select Category</option>
                                    <option>Computer Science</option>
                                    <option>Engineering</option>
                                    <option>Business</option>
                                    <option>Medical</option>
                                    <option>Arts</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelStyle}>Funding Category</label>
                                <select {...register("scholarshipCategory")} className={selectStyle}>
                                    <option value="">Select Type</option>
                                    <option>Full Fund</option>
                                    <option>Partial Fund</option>
                                    <option>Self Fund</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 3. Fees & Dates (CRITICAL CHANGES HERE) */}
                    <div>
                        <h2 className={sectionTitle}><DollarSign size={20} className="text-primary" /> Fees & Deadlines</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <label className={labelStyle}>App Fees ($)</label>
                                <input 
                                    type="number" 
                                    {...register("applicationFees", { required: true, valueAsNumber: true })} 
                                    placeholder="0" 
                                    className={inputStyle} 
                                />
                            </div>
                            <div>
                                <label className={labelStyle}>Service Charge ($)</label>
                                <input 
                                    type="number" 
                                    {...register("serviceCharge", { required: true, valueAsNumber: true })} 
                                    placeholder="0" 
                                    className={inputStyle} 
                                />
                            </div>
                            <div>
                                <label className={labelStyle}>Deadline</label>
                                <input type="date" {...register("applicationDeadline")} className={inputStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>Post Date</label>
                                <input type="date" {...register("scholarshipPostDate")} className={inputStyle} />
                            </div>
                        </div>
                    </div>

                    {/* 4. Descriptions */}
                    <div>
                        <h2 className={sectionTitle}><Sparkles size={20} className="text-primary" /> Coverage & Requirements</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelStyle}>Stipend & Coverage</label>
                                <textarea {...register("stipendDetails")} placeholder="Describe financial support..." className={textareaStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>Eligibility</label>
                                <textarea {...register("eligibility")} placeholder="Who is eligible to apply?" className={textareaStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>Key Benefits</label>
                                <textarea {...register("benefits")} placeholder="List of additional benefits..." className={textareaStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>Detailed Description</label>
                                <textarea {...register("scholarshipDescription")} placeholder="Full details of the program..." className={textareaStyle} />
                            </div>
                        </div>
                    </div>

                    {/* 5. Others */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelStyle}>Instruction Language</label>
                            <input {...register("language")} placeholder="e.g. English, Chinese" className={inputStyle} />
                        </div>
                        <div>
                            <label className={labelStyle}>Tags (Comma Separated)</label>
                            <input {...register("tags")} placeholder="usa, engineering, 2026" className={inputStyle} />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-10">
                        <button className="btn btn-primary w-full md:w-auto px-12 h-14 md:h-16 rounded-2xl md:rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] md:text-xs shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                            <Send size={18} /> Publish Opportunity
                        </button>
                    </div>

                </form>
            </div>
        </motion.div>
    );
};

export default AddScholarship;