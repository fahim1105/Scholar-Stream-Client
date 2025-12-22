import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ListCollapse, Pencil, ReceiptText, Trash2, Star, CreditCard } from 'lucide-react';
import Swal from 'sweetalert2';
import UseAuth from '../../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecure';
import { useForm } from 'react-hook-form';

const MyApplications = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const [selectedApp, setSelectedApp] = useState(null);

    const { data: applications = [], refetch } = useQuery({
        queryKey: ['myApplications', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications?email=${user.email}`);
            return res.data;
        }
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingApp, setEditingApp] = useState(null);

    const { register, handleSubmit, setValue, reset } = useForm();

    const handleEditClick = (app) => {
        setEditingApp(app);
        // set current value when modal open
        setValue("phoneNumber", app.phoneNumber || "");
        setValue("address", app.address || "");
        setIsEditModalOpen(true);
    };

    const onEditSubmit = async (data) => {
        try {
            const res = await axiosSecure.patch(`/applications/${editingApp._id}`, data);

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Your application has been updated.',
                    showConfirmButton: false,
                    timer: 1500
                });
                setIsEditModalOpen(false);
                refetch();
                reset();
            }
        } catch (error) {
            console.log(error)
            Swal.fire("Error", "Could not update application. Please try again.", "error");
        }
    };

    // Delete Logic
    const handleApplicationDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This pending application will be permanently removed!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/applications/${id}`);
                if (res.data.deletedCount) {
                    Swal.fire("Deleted!", "Application removed.", "success");
                    refetch();
                }
            }
        });
    };

    // Review Modal Logic

    const handleAddReview = (app) => {
        Swal.fire({
            title: `Review for ${app.universityName}`,
            html: `
            <input type="number" id="rating" min="1" max="5" placeholder="Rating (1-5)" class="swal2-input" style="width: 80%">
            <textarea id="reviewComment" placeholder="Write your comment..." class="swal2-textarea" style="width: 80%"></textarea>
        `,
            showCancelButton: true,
            confirmButtonText: 'Submit',
            preConfirm: () => {
                const popup = Swal.getPopup();
                const rating = popup.querySelector('#rating').value;
                const reviewComment = popup.querySelector('#reviewComment').value;

                if (!rating || !reviewComment) {
                    Swal.showValidationMessage(`Please enter both rating and comment`);
                }
                return { rating, reviewComment };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const reviewData = {
                    scholarshipId: app.scholarshipId.toString(),
                    scholarshipName: app.scholarshipName,
                    reviewComment: result.value.reviewComment,
                    rating: result.value.rating
                };

                try {
                    const res = await axiosSecure.post('/reviews', reviewData);
                    if (res.data.insertedId) {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: "Review added successfully.",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        if (typeof refetch === "function") {
                            refetch();
                        }

                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire("Error", "Failed to add review", "error");
                }
            }
        });
    };

    const handlePayment = async (app) => {
        const paymentInfo = {
            scholarshipId: app.scholarshipId,
            userEmail: user?.email,
            userName: user?.displayName
        };
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        window.location.assign(res.data.url);
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-5">Applied Scholarships: {applications.length}</h2>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th>No.</th>
                            <th>Scholarship Name</th>
                            <th>University Name</th>
                            <th>Fees</th>
                            <th>Payment Status</th>
                            <th>Status</th>
                            <th>Feedback</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app, index) => (
                            <tr key={app._id}>
                                <td>{index + 1}</td>
                                <td>{app.scholarshipName}</td>
                                <td>{app.universityName}</td>
                                <td>${app.amountPaid || app.applicationFees || 0}</td>
                                <td>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${app.paymentStatus === 'paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                        {app.paymentStatus}
                                    </span>
                                </td>
                                <td>
                                    <span className="badge badge-ghost uppercase text-[10px] font-bold">{app.status}</span>
                                </td>
                                <td className="max-w-xs truncate">{app.feedback || "No feedback"}</td>
                                <td className="flex justify-center gap-2">
                                    {/* Details - Always Visible */}
                                    <button
                                        onClick={() => setSelectedApp(app)}
                                        data-tip="Details"
                                        className="btn btn-square btn-sm btn-info tooltip before:bg-gray-900"
                                        title="Details">
                                        <ListCollapse size={16} />
                                    </button>

                                    {/* Edit - Only if Pending */}
                                    {app.status === 'pending' && (
                                        <button
                                            onClick={() => handleEditClick(app)} data-tip="Edit"
                                            className="btn btn-square btn-sm btn-warning tooltip before:bg-gray-900"
                                            title="Edit">
                                            <Pencil size={16} />
                                        </button>
                                    )}

                                    {/* Pay - Only if Pending AND Unpaid */}
                                    {(app.status === 'pending' && app.paymentStatus !== 'paid') && (
                                        <button
                                            onClick={() => handlePayment(app)}
                                            data-tip="Pay Now"
                                            className="btn btn-square btn-sm btn-primary tooltip before:bg-gray-900"
                                            title="Pay">
                                            <CreditCard size={16} />
                                        </button>
                                    )}

                                    {/* Delete - Only if Pending */}
                                    {app.status === 'pending' && (
                                        <button
                                            onClick={() => handleApplicationDelete(app._id)}
                                            data-tip="Delete"
                                            className="btn btn-square btn-sm btn-error tooltip before:bg-gray-900"
                                            title="Delete">
                                            <Trash2 size={16} />
                                        </button>
                                    )}

                                    {/* Add Review - Only if Completed */}
                                    {app.status === 'completed' && (
                                        <button
                                            onClick={() => handleAddReview(app)}
                                            data-tip="Review"
                                            className="btn btn-square btn-sm btn-success text-white tooltip before:bg-gray-900"
                                            title="Add Review">
                                            <Star size={16} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Details Modal */}
            {selectedApp && (
                <dialog open className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Application Details</h3>
                        <div className="py-4 space-y-2">
                            <p><strong>University:</strong> {selectedApp.universityName}</p>
                            <p><strong>Subject:</strong> {selectedApp.subjectCategory}</p>
                            <p><strong>Degree:</strong> {selectedApp.degree}</p>
                            <p><strong>Transaction ID:</strong> {selectedApp.transactionId || "N/A"}</p>
                        </div>
                        <div className="modal-action">
                            <button onClick={() => setSelectedApp(null)} className="btn">Close</button>
                        </div>
                    </div>
                </dialog>
            )}

            {isEditModalOpen && (
                <div className="modal modal-open backdrop-blur-sm">
                    <div className="modal-box rounded-3xl p-8 max-w-md relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsEditModalOpen(false)}
                            className="btn btn-sm btn-circle absolute right-4 top-4"
                        >✕</button>

                        <h3 className="font-bold text-2xl mb-6 flex items-center gap-2">
                            <Pencil className="text-warning" size={24} />
                            Edit Application
                        </h3>

                        <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-4">
                            {/* Phone Number Field */}
                            <div className="form-control">
                                <label className="label font-semibold">Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter your phone number"
                                    {...register("phoneNumber", { required: "Phone number is required" })}
                                    className="input input-bordered rounded-xl w-full"
                                />
                            </div>

                            {/* Address Field */}
                            <div className="form-control">
                                <label className="label font-semibold">Address</label>
                                <textarea
                                    placeholder="Enter your full address"
                                    {...register("address", { required: "Address is required" })}
                                    className="textarea textarea-bordered rounded-xl w-full h-24"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="modal-action mt-6">
                                <button type="submit" className="btn btn-warning btn-block rounded-xl text-white font-bold">
                                    Update Now
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyApplications;