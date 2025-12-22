import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { FaEye, FaCommentDots, FaBan, FaUniversity, FaUserGraduate, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdOutlinePendingActions, MdTimeline } from "react-icons/md";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Loader from "../../../../Components/Loader/Loader";
import Swal from "sweetalert2";

const ModeratorApplications = () => {
    const axiosSecure = UseAxiosSecure();
    const queryClient = useQueryClient();

    const [selectedApplication, setSelectedApplication] = useState(null);
    const [feedbackText, setFeedbackText] = useState("");

    // 1. feetch all application from application collection
    const { data: applications = [], isLoading } = useQuery({
        queryKey: ["moderator-applications"],
        queryFn: async () => {
            const res = await axiosSecure.get("/moderator/applications");
            return res.data;
        }
    });

    // 2. Status update mutation using ID
    // learn mutation from homework of PH

    const statusMutation = useMutation({
        mutationFn: ({ id, status }) =>
            axiosSecure.patch(`/moderator/application-status/${id}`, { status }),
        onSuccess: () => {
            toast.success("Status updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["moderator-applications"] }); // learn form gpt
        },
        onError: () => {
            toast.error("Failed to update status");
        }
    });

    // Feedback mutation using ID
    const feedbackMutation = useMutation({
        mutationFn: ({ id, feedback }) =>
            axiosSecure.patch(`/moderator/application-feedback/${id}`, { feedback }),
        onSuccess: () => {
            toast.success("Feedback saved successfully");
            queryClient.invalidateQueries({ queryKey: ["moderator-applications"] });
            setFeedbackText("");
            document.getElementById('feedback-modal').checked = false;
        },
        onError: () => {
            toast.error("Failed to save feedback");
        }
    });

    const handleReject = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to reject this application?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444", // Red color for reject
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, reject it!",
            cancelButtonText: "No, cancel",
            reverseButtons: true,
            background: "#ffffff",
            customClass: {
                popup: 'rounded-[2rem]',
                confirmButton: 'rounded-xl',
                cancelButton: 'rounded-xl'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // আপনার mutation কল করা হচ্ছে
                statusMutation.mutate({ id: id, status: "rejected" });
            }
        });
    };

    if (isLoading) return <Loader />;

    return (
        <div className="p-4 md:p-8 bg-base-200 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-extrabold mb-6 text-neutral tracking-tight">
                    Manage <span className="text-primary">Applications</span>
                </h2>

                <div className="bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-base-300">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead className="bg-neutral text-white uppercase text-xs">
                                <tr>
                                    <th>#</th>
                                    <th>Applicant</th>
                                    <th>University</th>
                                    <th>Payment</th>
                                    <th>Status</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app, idx) => (
                                    <tr key={app._id} className="hover:bg-base-200 transition-colors">
                                        <td>{idx + 1}</td>
                                        <td>
                                            <div className="flex flex-col">
                                                <span className="font-bold flex items-center gap-1">
                                                    <FaUserGraduate className="text-gray-400" /> {app.userName || "N/A"}
                                                </span>
                                                <span className="text-xs text-gray-500">{app.userEmail}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-sm">
                                                <div className="font-semibold flex items-center gap-1 text-primary">
                                                    <FaUniversity /> {app.universityName}
                                                </div>
                                                <div className="text-xs opacity-70">{app.scholarshipName}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge badge-outline badge-success font-mono font-bold uppercase text-[10px]">
                                                {app.paymentStatus}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-1 uppercase font-bold text-[10px]">
                                                {app.status === 'completed' && <FaCheckCircle className="text-success" />}
                                                {app.status === 'processing' && <MdTimeline className="text-info animate-pulse" />}
                                                {app.status === 'pending' && <MdOutlinePendingActions className="text-warning" />}
                                                {app.status === 'rejected' && <FaTimesCircle className="text-error" />}
                                                {app.status || "pending"}
                                            </div>
                                        </td>
                                        <td className="flex justify-center gap-2">
                                            {/* Details */}
                                            <label
                                                htmlFor="details-modal"
                                                data-tip="Details"
                                                className="btn btn-square btn-sm btn-info text-white shadow-md hover:scale-110 transition-transform tooltip before:bg-base-300"
                                                onClick={() => setSelectedApplication(app)}
                                                title="Details"
                                            >
                                                <FaEye />
                                            </label>

                                            {/* Feedback */}
                                            <label
                                                htmlFor="feedback-modal"
                                                data-tip="Feedback"
                                                className="btn btn-square btn-sm btn-warning text-white shadow-md hover:scale-110 transition-transform tooltip before:bg-base-300"
                                                onClick={() => {
                                                    setSelectedApplication(app);
                                                    setFeedbackText(app.feedback || "");
                                                }}
                                                title="Give Feedback"
                                            >
                                                <FaCommentDots />
                                            </label>

                                            {/* Status Update Dropdown */}
                                            <select
                                                className="select select-bordered select-sm w-32 focus:outline-primary"
                                                value={app.status || "pending"}
                                                onChange={(e) => statusMutation.mutate({
                                                    id: app._id,
                                                    status: e.target.value
                                                })}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="completed">Completed</option>
                                            </select>

                                            {/* Cancel/Reject Button */}
                                            {app.status !== 'rejected' && (
                                                <button
                                                    data-tip="Reject"
                                                    className="btn btn-square btn-sm btn-error text-white shadow-md hover:scale-110 transition-transform tooltip before:bg-base-300"
                                                    onClick={() => handleReject(app._id)}
                                                    title="Reject"
                                                >
                                                    <FaBan />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {applications.length === 0 && <p className="text-center py-10 text-gray-500">No applications found.</p>}
                    </div>
                </div>
            </div>

            {/* --- Modals Section --- */}

            {/* Details Modal */}
            <input type="checkbox" id="details-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box rounded-3xl max-w-2xl border border-base-300 shadow-2xl">
                    <h3 className="font-bold text-2xl mb-4 border-b pb-4 text-primary flex items-center gap-2">
                        <FaUserGraduate /> Application Profile
                    </h3>
                    {selectedApplication && (
                        <div className="space-y-4 text-sm md:text-base">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-base-200 p-6 rounded-2xl">
                                <div><p className="font-bold opacity-60 uppercase text-xs">Applicant Email</p> <p className="break-all">{selectedApplication.userEmail}</p></div>
                                <div><p className="font-bold opacity-60 uppercase text-xs">University Name</p> {selectedApplication.universityName}</div>
                                <div><p className="font-bold opacity-60 uppercase text-xs">Scholarship Category</p> {selectedApplication.scholarshipName}</div>
                                <div><p className="font-bold opacity-60 uppercase text-xs">Applied Date</p> {new Date(selectedApplication.appliedAt).toLocaleDateString()}</div>
                                <div><p className="font-bold opacity-60 uppercase text-xs">Transaction ID</p> <span className="font-mono text-xs">{selectedApplication.transactionId}</span></div>
                                <div><p className="font-bold opacity-60 uppercase text-xs">Amount Paid</p> <span className="text-green-600 font-bold">${selectedApplication.amountPaid}</span></div>
                            </div>
                            <div className="p-5 border border-dashed border-primary/30 rounded-2xl bg-primary/5">
                                <p className="font-bold mb-2 flex items-center gap-2 text-primary">
                                    <FaCommentDots /> Official Feedback:
                                </p>
                                <p className="italic text-gray-700 leading-relaxed">
                                    {selectedApplication.feedback || "No feedback has been recorded for this applicant yet."}
                                </p>
                            </div>
                        </div>
                    )}
                    <div className="modal-action">
                        <label htmlFor="details-modal" className="btn btn-block rounded-xl">Close Details</label>
                    </div>
                </div>
            </div>

            {/* Feedback Modal */}
            <input type="checkbox" id="feedback-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box rounded-3xl shadow-2xl border border-base-300">
                    <h3 className="font-bold text-xl mb-4 text-neutral flex items-center gap-2">
                        <FaCommentDots className="text-warning" /> Provide Review Feedback
                    </h3>
                    <textarea
                        className="textarea textarea-bordered w-full h-40 rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary shadow-inner"
                        placeholder="Write detailed feedback for the student..."
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                    ></textarea>
                    <div className="modal-action gap-3">
                        <button
                            className={`btn btn-primary flex-1 rounded-xl shadow-lg ${feedbackMutation.isPending ? 'loading' : ''}`}
                            disabled={!feedbackText.trim()}
                            onClick={() => feedbackMutation.mutate({
                                id: selectedApplication._id,
                                feedback: feedbackText
                            })}
                        >
                            {feedbackMutation.isPending ? "Saving..." : "Save Feedback"}
                        </button>
                        <label htmlFor="feedback-modal" className="btn flex-1 rounded-xl">Cancel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModeratorApplications;