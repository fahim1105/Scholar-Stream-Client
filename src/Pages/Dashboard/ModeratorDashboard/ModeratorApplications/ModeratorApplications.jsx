import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { FaEye, FaCommentDots, FaBan, FaUniversity, FaUserGraduate, FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaInfoCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdOutlinePendingActions, MdTimeline } from "react-icons/md";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Loader from "../../../../Components/Loader/Loader";
import Swal from "sweetalert2";

const ModeratorApplications = () => {
    const axiosSecure = UseAxiosSecure();
    const queryClient = useQueryClient();

    const [selectedApplication, setSelectedApplication] = useState(null);
    const [feedbackText, setFeedbackText] = useState("");

    // --- Pagination Logic ---
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20;

    const { data: appData, isLoading } = useQuery({
        queryKey: ["moderator-applications", currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/moderator/applications?page=${currentPage}&limit=${limit}`);
            return res.data;
        }
    });

    const applications = appData?.applications || [];
    const totalItems = appData?.totalItems || 0;
    const totalPages = appData?.totalPages || 1;

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const statusMutation = useMutation({
        mutationFn: ({ id, status }) =>
            axiosSecure.patch(`/moderator/application-status/${id}`, { status }),
        onSuccess: () => {
            toast.success("Status updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["moderator-applications"] });
        },
        onError: () => toast.error("Failed to update status")
    });

    const feedbackMutation = useMutation({
        mutationFn: ({ id, feedback }) =>
            axiosSecure.patch(`/moderator/application-feedback/${id}`, { feedback }),
        onSuccess: () => {
            toast.success("Feedback saved successfully");
            queryClient.invalidateQueries({ queryKey: ["moderator-applications"] });
            setFeedbackText("");
            document.getElementById('feedback-modal').checked = false;
        },
        onError: () => toast.error("Failed to save feedback")
    });

    const handleReject = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to reject this application?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#1F2937",
            confirmButtonText: "Yes, reject it!",
            background: "var(--color-base-100)",
            color: "var(--color-base-content)",
            customClass: { popup: 'rounded-[2rem]' }
        }).then((result) => {
            if (result.isConfirmed) {
                statusMutation.mutate({ id: id, status: "rejected" });
            }
        });
    };

    if (isLoading) return <Loader />;

    return (
        <div className="p-3 md:p-8 min-h-screen bg-base-100 text-base-content rounded-3xl">
            <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
                
                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-1">
                        <h2 className="text-3xl md:text-5xl font-black text-neutral italic uppercase tracking-tighter leading-none">
                            Manage <span className="text-primary">Applications</span>
                        </h2>
                        <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] opacity-50 pl-1">
                            System-wide student monitoring
                        </p>
                    </div>
                    <div className="bg-primary/10 text-primary px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-primary/20 inline-flex items-center gap-2 self-start md:self-auto">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        {totalItems} Records Found
                    </div>
                </header>

                <div className="bg-base-200/50 shadow-2xl rounded-[2.5rem] overflow-hidden border border-base-300/50 backdrop-blur-sm">
                    
                    {/* Desktop View */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="table w-full border-separate border-spacing-0">
                            <thead className="bg-neutral text-base-100 uppercase text-[10px] tracking-[0.2em] italic">
                                <tr>
                                    <th className="py-6 pl-8">#</th> {/* Index Header */}
                                    <th>Applicant Information</th>
                                    <th>Institutional Details</th>
                                    <th className="text-center">Review Status</th>
                                    <th className="text-right pr-12">Management Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-300/20">
                                {applications.map((app, index) => (
                                    <tr key={app._id} className="hover:bg-primary/5 transition-all duration-300 group">
                                        {/* Indexing logic added */}
                                        <td className="pl-8 font-mono text-[10px] opacity-30 font-black italic">
                                            #{(currentPage - 1) * limit + index + 1}
                                        </td>
                                        <td className="py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-primary/10 rounded-2xl text-primary"><FaUserGraduate size={18}/></div>
                                                <div className="max-w-[200px]">
                                                    <div className="font-black text-neutral uppercase italic text-sm truncate">{app.userName || "Anonymous"}</div>
                                                    <div className="text-[10px] opacity-60 font-bold truncate lowercase">{app.userEmail}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-bold text-neutral/80 text-xs italic flex items-center gap-1.5">
                                                <FaUniversity className="text-primary/50" /> {app.universityName}
                                            </div>
                                            <div className="text-[10px] opacity-40 font-black uppercase tracking-widest mt-1.5">{app.scholarshipName}</div>
                                        </td>
                                        <td className="text-center">
                                            <div className={`inline-flex items-center gap-1.5 uppercase font-black text-[9px] px-3 py-1 rounded-full border ${
                                                app.status === 'completed' ? 'text-success border-success/20 bg-success/5' : 
                                                app.status === 'processing' ? 'text-info border-info/20 bg-info/5 animate-pulse' : 
                                                app.status === 'rejected' ? 'text-error border-error/20 bg-error/5' : 'text-warning border-warning/20 bg-warning/5'
                                            }`}>
                                                {app.status === 'completed' && <FaCheckCircle />}
                                                {app.status === 'processing' && <MdTimeline />}
                                                {app.status === 'rejected' && <FaTimesCircle />}
                                                {!['completed', 'processing', 'rejected'].includes(app.status) && <MdOutlinePendingActions />}
                                                {app.status || "pending"}
                                            </div>
                                        </td>
                                        {/* Buttons are kept exactly as your original code */}
                                        <td className="text-right pr-8">
                                            <div className="flex justify-end items-center gap-2.5">
                                                <label htmlFor="details-modal" onClick={() => setSelectedApplication(app)} className="btn btn-square btn-sm bg-info/10 text-info border-none hover:bg-info hover:text-white rounded-xl"><FaEye /></label>
                                                <label htmlFor="feedback-modal" onClick={() => { setSelectedApplication(app); setFeedbackText(app.feedback || ""); }} className="btn btn-square btn-sm bg-accent/10 text-accent border-none hover:bg-accent hover:text-neutral rounded-xl"><FaCommentDots /></label>
                                                <select 
                                                    className="select select-bordered select-xs rounded-xl font-black text-[9px] w-28 bg-base-100" 
                                                    value={app.status || "pending"} 
                                                    onChange={(e) => statusMutation.mutate({ id: app._id, status: e.target.value })}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                                {app.status !== 'rejected' && <button onClick={() => handleReject(app._id)} className="btn btn-square btn-sm bg-error/10 text-error border-none hover:bg-error hover:text-white rounded-xl"><FaBan /></button>}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View (Design Intact) */}
                    <div className="lg:hidden p-4 space-y-5">
                        {applications.map((app, index) => (
                            <div key={app._id} className="bg-base-100 rounded-[2rem] p-5 border border-base-300 shadow-lg relative overflow-hidden">
                                <div className="absolute top-4 right-6 text-[10px] font-black opacity-10">
                                    #{(currentPage - 1) * limit + index + 1}
                                </div>
                                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                                    app.status === 'completed' ? 'bg-success' : 
                                    app.status === 'rejected' ? 'bg-error' : 
                                    app.status === 'processing' ? 'bg-info' : 'bg-warning'
                                }`}></div>

                                <div className="flex justify-between items-start mb-4 pl-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0"><FaUserGraduate size={20} /></div>
                                        <div className="min-w-0">
                                            <h4 className="font-black text-neutral uppercase italic text-sm truncate leading-tight">
                                                {app.userName || "Anonymous"}
                                            </h4>
                                            <div className={`inline-flex items-center gap-1 mt-1.5 uppercase font-black text-[8px] px-2 py-0.5 rounded-md border ${
                                                app.status === 'completed' ? 'text-success border-success/20 bg-success/5' : 'text-warning border-warning/20 bg-warning/5'
                                            }`}>
                                                {app.status || 'pending'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-5 pl-2">
                                    <div className="p-3 bg-base-200/80 rounded-2xl border border-base-300/30">
                                        <div className="flex items-center gap-2 text-[11px] font-bold text-neutral italic"><FaUniversity className="text-primary shrink-0" /> {app.universityName}</div>
                                        <div className="text-[9px] opacity-40 font-black uppercase tracking-widest pl-5 mt-0.5 truncate">{app.scholarshipName}</div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-base-300/50 pl-2">
                                    <div className="flex gap-2">
                                        <label htmlFor="details-modal" onClick={() => setSelectedApplication(app)} className="btn btn-sm btn-square bg-info/10 text-info border-none rounded-xl"><FaEye /></label>
                                        <label htmlFor="feedback-modal" onClick={() => { setSelectedApplication(app); setFeedbackText(app.feedback || ""); }} className="btn btn-sm btn-square bg-accent/10 text-accent border-none rounded-xl"><FaCommentDots /></label>
                                        {app.status !== 'rejected' && <button onClick={() => handleReject(app._id)} className="btn btn-sm btn-square bg-error/10 text-error border-none rounded-xl"><FaBan /></button>}
                                    </div>
                                    <select 
                                        className="select select-bordered select-xs rounded-xl flex-1 max-w-[110px] bg-base-200 text-[10px] font-bold uppercase h-8" 
                                        value={app.status || "pending"} 
                                        onChange={(e) => statusMutation.mutate({ id: app._id, status: e.target.value })}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>

                    {applications.length === 0 && (
                        <div className="p-20 flex flex-col items-center justify-center opacity-30">
                            <FaInfoCircle size={40} className="mb-4 text-primary" />
                            <div className="italic font-black uppercase tracking-[0.5em] text-sm text-center">No Applications Found</div>
                        </div>
                    )}
                </div>

                {/* --- Pagination Controls (Your requested Style) --- */}
                {totalPages > 1 && (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-12 bg-base-100 p-6 rounded-[2.5rem] shadow-xl border border-base-200">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral/40 italic">
                            Showing Page <span className="text-primary">{currentPage}</span> of {totalPages}
                        </p>
                        
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="btn btn-sm md:btn-md bg-base-200 border-none rounded-2xl font-black text-[10px] uppercase italic disabled:opacity-20 hover:bg-primary hover:text-white transition-all shadow-lg"
                            >
                                <FaChevronLeft /> Prev
                            </button>

                            <div className="flex gap-2">
                                {[...Array(totalPages)].map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handlePageChange(idx + 1)}
                                        className={`btn btn-sm md:btn-md border-none rounded-2xl font-black text-[10px] w-10 md:w-12 transition-all ${
                                            currentPage === idx + 1 
                                            ? "bg-primary text-white shadow-xl scale-110" 
                                            : "bg-base-200 text-neutral/40 hover:bg-base-300"
                                        }`}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="btn btn-sm md:btn-md bg-base-200 border-none rounded-2xl font-black text-[10px] uppercase italic disabled:opacity-20 hover:bg-primary hover:text-white transition-all shadow-lg"
                            >
                                Next <FaChevronRight />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* ... (Modals Section remains exactly same as yours) */}
            <input type="checkbox" id="details-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
                <div className="modal-box rounded-t-[3rem] sm:rounded-[3rem] p-0 overflow-hidden bg-base-100 border-t sm:border border-base-300 shadow-2xl max-w-2xl">
                    <div className="bg-primary p-6 md:p-8 text-white relative overflow-hidden">
                        <FaUserGraduate size={100} className="absolute top-0 right-0 p-6 opacity-10 rotate-12" />
                        <h3 className="font-black text-2xl md:text-3xl italic uppercase tracking-tighter relative z-10">Application <span className="opacity-50">Profile</span></h3>
                        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mt-1 relative z-10 italic">Verification & Payment Detail</p>
                    </div>
                    <div className="p-6 md:p-8 space-y-5 md:space-y-6 max-h-[70vh] overflow-y-auto">
                        {selectedApplication && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                    <div className="p-4 bg-base-200 rounded-2xl border border-base-300/30">
                                        <p className="text-[9px] font-black uppercase text-primary tracking-widest mb-1">Email ID</p>
                                        <p className="font-bold text-neutral text-sm break-all">{selectedApplication.userEmail}</p>
                                    </div>
                                    <div className="p-4 bg-base-200 rounded-2xl border border-base-300/30">
                                        <p className="text-[9px] font-black uppercase text-primary tracking-widest mb-1 flex items-center gap-1"><FaCalendarAlt size={10}/> Submission Date</p>
                                        <p className="font-bold text-neutral italic text-sm">{new Date(selectedApplication.appliedAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="p-4 bg-base-200 rounded-2xl border border-base-300/30 md:col-span-2">
                                        <p className="text-[9px] font-black uppercase text-primary tracking-widest mb-1">Institution & Scholarship</p>
                                        <p className="font-bold text-neutral italic text-sm">{selectedApplication.universityName}</p>
                                        <p className="text-[10px] opacity-50 uppercase font-black tracking-wider mt-1">{selectedApplication.scholarshipName}</p>
                                    </div>
                                </div>
                                <div className="p-5 md:p-6 rounded-[2rem] bg-neutral text-white flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xl">
                                    <div className="text-center sm:text-left">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-1 italic">Transaction Reference</p>
                                        <p className="font-mono text-[10px] opacity-80 text-base-100 break-all px-2 sm:px-0">{selectedApplication.transactionId}</p>
                                    </div>
                                    <div className="text-center sm:text-right sm:border-l border-white/10 sm:pl-6 w-full sm:w-auto">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-1 italic">Paid Amount</p>
                                        <p className="text-2xl font-black italic text-success">${selectedApplication.amountPaid}</p>
                                    </div>
                                </div>
                                <div className="p-5 md:p-6 rounded-[2rem] border-2 border-dashed border-primary/20 bg-primary/5">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 flex items-center gap-2 font-bold italic"><FaCommentDots /> Official Remarks</p>
                                    <p className="italic text-sm text-base-content/70 leading-relaxed font-medium">
                                        {selectedApplication.feedback ? `"${selectedApplication.feedback}"` : "No official feedback has been recorded for this profile yet."}
                                    </p>
                                </div>
                            </>
                        )}
                        <label htmlFor="details-modal" className="btn btn-block bg-primary border-none text-base-100 rounded-2xl font-black uppercase italic h-14 hover:bg-neutral transition-all">Dismiss Profile</label>
                    </div>
                </div>
            </div>

            <input type="checkbox" id="feedback-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle backdrop-blur-md">
                <div className="modal-box rounded-t-[3rem] sm:rounded-[3rem] p-0 overflow-hidden bg-base-100 border-t sm:border border-base-300 shadow-2xl">
                    <div className="bg-accent p-6 md:p-8 text-neutral">
                        <h3 className="font-black text-2xl italic uppercase tracking-tighter flex items-center gap-3">
                            <FaCommentDots className="animate-pulse" /> Review <span className="opacity-40">Feedback</span>
                        </h3>
                    </div>
                    <div className="p-6 md:p-8 space-y-6">
                        <textarea
                            className="textarea textarea-bordered w-full h-40 md:h-44 rounded-[2rem] focus:ring-4 focus:ring-accent/10 focus:border-accent font-medium p-5 md:p-6 shadow-inner bg-base-200 text-base-content border-base-300"
                            placeholder="Type specific missing documents or instructions..."
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                        ></textarea>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                className={`flex-[2] btn bg-accent border-none text-neutral rounded-2xl font-black uppercase italic shadow-lg h-14 hover:bg-neutral hover:text-white transition-all order-1 sm:order-2 ${feedbackMutation.isPending ? 'loading' : ''}`}
                                disabled={!feedbackText.trim()}
                                onClick={() => feedbackMutation.mutate({ id: selectedApplication._id, feedback: feedbackText })}
                            >
                                {feedbackMutation.isPending ? "Syncing..." : "Publish Feedback"}
                            </button>
                            <label htmlFor="feedback-modal" className="btn flex-1 bg-base-300 text-base-100 border-none rounded-2xl font-black uppercase italic h-14 order-2 sm:order-1">Discard</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModeratorApplications;