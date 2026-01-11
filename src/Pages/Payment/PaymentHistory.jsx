import React from 'react';
import { useQuery } from '@tanstack/react-query'
import Swal from 'sweetalert2';
import { Trash2, CreditCard, Calendar, Hash, DollarSign, History, Trash } from 'lucide-react';
import UseAuth from '../../Hooks/UseAuth';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { motion } from 'framer-motion';

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
            customClass: { popup: 'rounded-[2.5rem] bg-base-100 text-base-content' }
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
            customClass: { popup: 'rounded-[2.5rem] bg-base-100 text-base-content' }
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen transition-colors duration-300 px-2 sm:px-4"
        >
            <div className="max-w-7xl mx-auto">

                {/* --- Header Section --- */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 md:mb-12">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black text-neutral flex items-center gap-3 md:gap-4 italic tracking-tighter">
                            <div className="p-2 md:p-3 bg-primary/10 rounded-2xl">
                                <History className="text-primary w-8 h-8 md:w-12 md:h-12" />
                            </div>
                            Payment <span className="text-primary underline decoration-primary/20">History</span>
                        </h1>
                        <p className="text-base-content/50 mt-3 font-bold uppercase text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em]">
                            Tracking your scholarship investments & transactions
                        </p>
                    </div>

                    <div className="flex flex-row items-center gap-3 sm:gap-4">
                        <div className="stats shadow-xl md:shadow-2xl bg-base-200/50 backdrop-blur-md rounded-2xl md:rounded-[2rem] border border-base-300/10">
                            <div className="stat px-4 md:px-8 py-2 md:py-3">
                                <div className="stat-title text-[8px] md:text-[10px] font-black uppercase tracking-widest text-base-content/40">Total</div>
                                <div className="stat-value text-primary text-xl md:text-3xl font-black italic">{payments.length}</div>
                            </div>
                        </div>
                        {payments.length > 0 && (
                            <button
                                onClick={handleDeletePaymentAll}
                                className="btn btn-error btn-outline h-auto py-3 md:py-4 rounded-xl md:rounded-2xl border-2 transition-all duration-300 gap-2 font-black uppercase text-[9px] md:text-[10px] tracking-widest flex-1 sm:flex-none"
                            >
                                <Trash2 size={16} /> <span className="hidden sm:inline">Clear Records</span> <span className="sm:hidden">Clear</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* --- Content Section --- */}
                <div className="bg-transparent lg:bg-base-100 lg:rounded-[3rem] lg:shadow-2xl lg:border lg:border-base-300/10 overflow-hidden">
                    
                    {/* Desktop Table View */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="table w-full border-separate border-spacing-y-0">
                            <thead>
                                <tr className="bg-primary/5 border-b border-base-300/10">
                                    <th className="py-6 pl-10 text-[10px] font-black uppercase tracking-[0.2em] text-primary">#</th>
                                    <th className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Scholarship</th>
                                    <th className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Amount</th>
                                    <th className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">TxID</th>
                                    <th className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Timestamp</th>
                                    <th className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-primary">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-300/5">
                                {payments.map((payment, index) => (
                                    <tr key={payment._id} className="hover:bg-primary/5 transition-all duration-300 group/row">
                                        <th className="pl-10 font-mono text-[10px] text-base-content/30 italic font-black">{index + 1}</th>
                                        <td className="py-6 font-black text-neutral uppercase text-xs tracking-tight">{payment.scholarshipName}</td>
                                        <td>
                                            <div className="inline-flex items-center px-4 py-2 bg-success/10 text-success rounded-xl font-black text-xs border border-success/20">
                                                ${payment.amount}
                                            </div>
                                        </td>
                                        <td>
                                            <code className="bg-base-200/50 px-3 py-1.5 rounded-xl text-[10px] font-black text-primary border border-base-300/10">{payment.transactionId}</code>
                                        </td>
                                        <td className="text-[10px] font-bold text-base-content/60 uppercase italic tracking-wider">
                                            {new Date(payment.paidAt).toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })}
                                        </td>
                                        <td className="text-center">
                                            <button onClick={() => handleDeletePayment(payment._id)} className="btn btn-circle btn-sm btn-ghost text-error/40 hover:text-error hover:bg-error/10 transition-all duration-300">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile/Tablet Card View */}
                    <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {payments.length > 0 ? (
                            payments.map((payment, index) => (
                                <div key={payment._id} className="bg-base-100 p-6 rounded-[2rem] border border-base-300/10 shadow-lg space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="bg-primary/5 text-primary text-[10px] font-black px-3 py-1 rounded-full italic">#{index + 1}</div>
                                        <button onClick={() => handleDeletePayment(payment._id)} className="text-error/50 hover:text-error transition-colors p-1">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                    
                                    <div>
                                        <label className="text-[9px] font-black uppercase text-base-content/30 block mb-1">Scholarship</label>
                                        <h3 className="font-black text-neutral uppercase text-sm leading-tight">{payment.scholarshipName}</h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div>
                                            <label className="text-[9px] font-black uppercase text-base-content/30 block mb-1">Amount</label>
                                            <div className="text-success font-black text-sm">${payment.amount}</div>
                                        </div>
                                        <div>
                                            <label className="text-[9px] font-black uppercase text-base-content/30 block mb-1">Date</label>
                                            <div className="text-[10px] font-bold text-base-content/60 uppercase italic">
                                                {new Date(payment.paidAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <label className="text-[9px] font-black uppercase text-base-content/30 block mb-1">Transaction ID</label>
                                        <code className="bg-base-200 px-3 py-1.5 rounded-lg text-[10px] font-black text-primary block truncate">
                                            {payment.transactionId}
                                        </code>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center bg-base-100 rounded-[2.5rem] border border-dashed border-base-300">
                                <History size={60} strokeWidth={1} className="mx-auto opacity-10" />
                                <p className="text-xl font-black italic mt-4 uppercase tracking-tighter opacity-20">No History Detected</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

export default PaymentHistory;