import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loader from "../../../Components/Loader/Loader";
import { useState } from "react";

const ManageScholarships = () => {
    const axiosSecure = UseAxiosSecure();

    const [selectedScholarship, setSelectedScholarship] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { register, handleSubmit, reset } = useForm();

    const { data: scholarships = [], isLoading, refetch } = useQuery({
        queryKey: ["manage-scholarships"],
        queryFn: async () => {
            const res = await axiosSecure.get("/scholarships");
            return res.data;
        },
    });

    // OPEN MODAL
    const openModal = (scholarship) => {
        setSelectedScholarship(scholarship);
        reset({
            scholarshipName: scholarship.scholarshipName,
            scholarshipCategory: scholarship.scholarshipCategory,
            degree: scholarship.degree,
            applicationDeadline: scholarship.applicationDeadline,
        });
        setIsModalOpen(true);
    };

    // UPDATE SUBMIT
    const handleUpdate = async (data) => {
        const res = await axiosSecure.patch(`/scholarships/${selectedScholarship._id}`,data);

        if (res.data.modifiedCount > 0) {
            Swal.fire("Updated!", "Scholarship updated successfully", "success");
            setIsModalOpen(false);
            setSelectedScholarship(null);
            refetch();
        }
    };

    // DELETE
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This scholarship will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
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
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Manage Scholarships</h2>

            <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
                <table className="table table-zebra">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Scholarship</th>
                            <th>Category</th>
                            <th>Degree</th>
                            <th>Deadline</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scholarships.map((scholarship, index) => (
                            <tr key={scholarship._id}>
                                <td>{index + 1}</td>
                                <td>{scholarship.scholarshipName}</td>
                                <td>{scholarship.scholarshipCategory}</td>
                                <td>{scholarship.degree}</td>
                                <td>{scholarship.applicationDeadline}</td>
                                <td className="text-center space-x-2">
                                    <button
                                        onClick={() => openModal(scholarship)}
                                        className="btn btn-sm btn-outline btn-info"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(scholarship._id)}
                                        className="btn btn-sm btn-outline btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* UPDATE MODAL */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-lg">
                        <h3 className="font-bold text-xl mb-4">
                            Update Scholarship
                        </h3>

                        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
                            <div>
                                <label className="label font-medium">
                                    Scholarship Name
                                </label>
                                <input
                                    {...register("scholarshipName")}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div>
                                <label className="label font-medium">
                                    Scholarship Category
                                </label>
                                <select
                                    {...register("scholarshipCategory")}
                                    className="select select-bordered w-full"
                                >
                                    <option>Full Fund</option>
                                    <option>Partial Fund</option>
                                    <option>Self Fund</option>
                                </select>
                            </div>

                            <div>
                                <label className="label font-medium">Degree</label>
                                <select
                                    {...register("degree")}
                                    className="select select-bordered w-full"
                                >
                                    <option>Bachelor</option>
                                    <option>Masters</option>
                                    <option>PhD</option>
                                </select>
                            </div>

                            <div>
                                <label className="label font-medium">
                                    Application Deadline
                                </label>
                                <input
                                    type="date"
                                    {...register("applicationDeadline")}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setSelectedScholarship(null);
                                    }}
                                    className="btn"
                                >
                                    Cancel
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
