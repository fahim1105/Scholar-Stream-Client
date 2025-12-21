import React from 'react';
import { useQuery } from '@tanstack/react-query'
import Swal from 'sweetalert2';

import { Trash2, CreditCard, Calendar, Hash, DollarSign, History } from 'lucide-react';
import UseAuth from '../../Hooks/UseAuth';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';

const PaymentHistory = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const { data: payments = [], refetch: paymentsRefetch, isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`)
            return res.data
        }
    });

    const handleDeletePaymentAll = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will permanently clear your entire payment history!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, delete all!',
            customClass: { popup: 'rounded-[2rem]' }
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete('/payments')
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire('Cleared!', 'All history has been removed.', 'success');
                            paymentsRefetch();
                        }
                    })
            }
        });
    };

    const handleDeletePayment = (id) => {
        Swal.fire({
            title: 'Delete this record?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete it!',
            customClass: { popup: 'rounded-[2rem]' }
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/payments/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'Record removed.', 'success');
                            paymentsRefetch();
                        }
                    })
            }
        });
    };

    if (isLoading) return <div className="flex justify-center items-center h-96"><span className="loading loading-dots loading-lg text-primary"></span></div>;

    return (
        <div className="p-4 md:p-8 bg-gradient-to-br from-base-100 to-base-200 min-h-screen">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-neutral flex items-center gap-4">
                            <History className="text-primary w-10 h-10 md:w-12 md:h-12" />
                            Payment <span className="text-primary">History</span>
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium">Tracking your scholarship investments and transactions.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="stats shadow-sm bg-white rounded-3xl border border-base-300">
                            <div className="stat px-6 py-2">
                                <div className="stat-title text-xs font-bold uppercase tracking-widest">Total Payments</div>
                                <div className="stat-value text-primary text-2xl">{payments.length}</div>
                            </div>
                        </div>
                        {payments.length > 0 && (
                            <button
                                onClick={handleDeletePaymentAll}
                                className="btn btn-error btn-outline rounded-2xl border-2 hover:shadow-lg hover:shadow-error/20 transition-all gap-2"
                            >
                                <Trash2 size={18} /> Clear All
                            </button>
                        )}
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-base-300 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full border-separate border-spacing-y-0">
                            <thead>
                                <tr className="bg-neutral text-white text-sm uppercase tracking-wider">
                                    <th className="py-5 pl-8 rounded-tl-3xl">#</th>
                                    <th><div className="flex items-center gap-2"><CreditCard size={16} /> Scholarship Name</div></th>
                                    <th><div className="flex items-center gap-2"><DollarSign size={16} /> Amount</div></th>
                                    <th><div className="flex items-center gap-2"><Hash size={16} /> Transaction ID</div></th>
                                    <th><div className="flex items-center gap-2"><Calendar size={16} /> Paid At</div></th>
                                    <th className="rounded-tr-3xl text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-neutral/80">
                                {payments.length > 0 ? (
                                    payments.map((payment, index) => (
                                        <tr key={payment._id} className="hover:bg-base-200/50 transition-colors group">
                                            <th className="pl-8 font-mono text-gray-400">{index + 1}</th>
                                            <td className="font-bold text-neutral">{payment.scholarshipName}</td>
                                            <td>
                                                <span className="badge badge-lg badge-success badge-outline font-bold py-4">
                                                    ${payment.amount}
                                                </span>
                                            </td>
                                            <td>
                                                <code className="bg-base-200 px-3 py-1 rounded-lg text-xs font-semibold text-primary">
                                                    {payment.transactionId}
                                                </code>
                                            </td>
                                            <td className="text-sm font-medium">
                                                {new Date(payment.paidAt).toLocaleString("en-US", {
                                                    month: "short", day: "2-digit", year: "numeric",
                                                    hour: "2-digit", minute: "2-digit", hour12: true
                                                })}
                                            </td>
                                            <td className="text-center">
                                                <button
                                                    onClick={() => handleDeletePayment(payment._id)}
                                                    className="btn btn-circle btn-ghost text-error hover:bg-error/10 opacity-100 md:group-hover:opacity-100 transition-all"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="py-20 text-center">
                                            <div className="flex flex-col items-center opacity-30">
                                                <History size={64} className="mb-4" />
                                                <p className="text-2xl font-bold italic">No payment history found</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;