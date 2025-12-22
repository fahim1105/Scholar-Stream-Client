import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loader from "../../../Components/Loader/Loader";
import { useState } from "react";
import { Edit3, Trash2, X } from "lucide-react"; // আইকন যোগ করা হয়েছে

const ManageScholarships = () => {
    const axiosSecure = UseAxiosSecure();
    const [selectedScholarship, setSelectedScholarship] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { register, handleSubmit, reset } = useForm();

    const { data: scholarshipData, isLoading, refetch } = useQuery({
        queryKey: ["manage-scholarships"],
        queryFn: async () => {
            const res = await axiosSecure.get("/scholarships?limit=100"); // সব ডেটা দেখার জন্য লিমিট বাড়ানো হয়েছে
            return res.data;
        },
    });

    // আপনার API যদি { scholarships: [...] } ফরম্যাটে থাকে তবে এটি হ্যান্ডেল করবে
    const scholarships = scholarshipData?.scholarships || scholarshipData || [];

    // OPEN MODAL
    const openModal = (scholarship) => {
        setSelectedScholarship(scholarship);

        // Date format handling for <input type="date" />
        const formattedDate = scholarship.applicationDeadline ?
            new Date(scholarship.applicationDeadline).toISOString().split('T')[0] : '';

        reset({
            scholarshipName: scholarship.scholarshipName,
            scholarshipCategory: scholarship.scholarshipCategory,
            degree: scholarship.degree,
            applicationDeadline: formattedDate,
        });
        setIsModalOpen(true);
    };

    // UPDATE SUBMIT
    const handleUpdate = async (data) => {
        try {
            const res = await axiosSecure.patch(`/scholarships/${selectedScholarship._id}`, data);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Scholarship updated successfully',
                    timer: 1500,
                    showConfirmButton: false
                });
                setIsModalOpen(false);
                setSelectedScholarship(null);
                refetch();
            }
        } catch (error) {
            console.log(error)
            Swal.fire("Error", "Failed to update scholarship", "error");
        }
    };

    // DELETE
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This scholarship will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/scholarships/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Scholarship removed", "success");
                    refetch();
                }
            }
        });
    };

    if (isLoading) return <Loader />;

    return (
        <div className="p-6 bg-base-200 min-h-screen">
            <h2 className="text-4xl font-black mb-8 text-neutral">Manage <span className="text-primary">Scholarships</span></h2>

            <div className="overflow-x-auto bg-white rounded-[2rem] shadow-xl border border-base-300">
                <table className="table w-full">
                    <thead className="bg-neutral text-white">
                        <tr className="text-xs uppercase tracking-widest">
                            <th className="py-4 pl-6">#</th>
                            <th>Scholarship</th>
                            <th>Category</th>
                            <th>Degree</th>
                            <th>Deadline</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600">
                        {scholarships.length > 0 ? scholarships.map((scholarship, index) => (
                            <tr key={scholarship._id} className="hover:bg-base-200/50 border-b border-base-100">
                                <td className="pl-6 font-bold">{index + 1}</td>
                                <td className="font-bold text-neutral">{scholarship.scholarshipName}</td>
                                <td><span className="badge badge-ghost font-medium">{scholarship.scholarshipCategory}</span></td>
                                <td className="font-semibold text-primary">{scholarship.degree}</td>
                                <td className="text-sm italic">{scholarship.applicationDeadline}</td>
                                <td className="text-center">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => openModal(scholarship)}
                                            className="btn btn-square btn-sm btn-ghost text-info hover:bg-info/10"
                                        >
                                            <Edit3 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(scholarship._id)}
                                            className="btn btn-square btn-sm btn-ghost text-error hover:bg-error/10"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="6" className="text-center py-10 font-bold opacity-30">No Scholarships Found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* UPDATE MODAL */}
            {isModalOpen && (
                <div className="modal modal-open backdrop-blur-sm transition-all">
                    <div className="modal-box max-w-lg rounded-[2.5rem] p-10 border border-white shadow-2xl relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="btn btn-circle btn-sm absolute right-6 top-6"
                        ><X size={18} /></button>

                        <h3 className="font-black text-3xl mb-6 text-neutral">
                            Update <span className="text-primary">Info</span>
                        </h3>

                        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-5">
                            <div className="form-control">
                                <label className="label text-xs font-black uppercase tracking-widest text-gray-400">Scholarship Name</label>
                                <input
                                    {...register("scholarshipName", { required: true })}
                                    className="input input-bordered w-full rounded-2xl bg-base-200 border-none focus:ring-2 ring-primary"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label text-xs font-black uppercase tracking-widest text-gray-400">Category</label>
                                    <select
                                        {...register("scholarshipCategory")}
                                        className="select select-bordered w-full rounded-2xl bg-base-200 border-none"
                                    >
                                        <option>Full Fund</option>
                                        <option>Partial Fund</option>
                                        <option>Self Fund</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label text-xs font-black uppercase tracking-widest text-gray-400">Degree</label>
                                    <select
                                        {...register("degree")}
                                        className="select select-bordered w-full rounded-2xl bg-base-200 border-none"
                                    >
                                        <option>Bachelor</option>
                                        <option>Masters</option>
                                        <option>PhD</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label text-xs font-black uppercase tracking-widest text-gray-400">Deadline</label>
                                <input
                                    type="date"
                                    {...register("applicationDeadline")}
                                    className="input input-bordered w-full rounded-2xl bg-base-200 border-none"
                                />
                            </div>

                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary btn-block rounded-2xl shadow-lg shadow-primary/20">
                                    Apply Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageScholarships;