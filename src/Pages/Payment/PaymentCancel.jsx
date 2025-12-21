import React from 'react';
import { Link, useLocation } from 'react-router';
import { MdErrorOutline } from 'react-icons/md';
import { FiArrowLeft, FiAlertCircle } from 'react-icons/fi';

const PaymentCancel = () => {
    const location = useLocation();
    // যদি আপনি পেমেন্ট সেশন থেকে স্কলারশিপের নাম পাস করেন, তবে এখানে রিসিভ করতে পারেন
    // নতুবা এটি একটি জেনেরিক মেসেজ দেখাবে
    const scholarshipName = location.state?.scholarshipName || "Selected Scholarship";

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 text-center border border-red-100 relative overflow-hidden">

                {/* Decorative Top Bar */}
                <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>

                {/* Error Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-red-50 p-5 rounded-full ring-8 ring-red-50/50">
                        <MdErrorOutline className="text-6xl text-red-500" />
                    </div>
                </div>

                {/* Text Content */}
                <h1 className="text-3xl font-black text-gray-800 mb-2">
                    Payment Failed
                </h1>
                <div className="bg-red-50 text-red-700 px-4 py-2 rounded-xl text-sm font-bold inline-block mb-6">
                    Transaction Cancelled
                </div>

                {/* Scholarship Info */}
                <div className="bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-200 text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Attempted For:</p>
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <FiAlertCircle className="text-red-400" /> {scholarshipName}
                    </h3>
                </div>

                <p className="text-gray-500 mb-8 leading-relaxed text-sm italic">
                    "Your payment process was interrupted. No money has been deducted from your account. You can retry the process from your dashboard."
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4">
                    <Link
                        to="/dashboard/my-applications"
                        className="w-full bg-neutral hover:bg-black text-white font-bold py-4 rounded-2xl shadow-xl transition-all hover:-translate-y-1 active:scale-95"
                    >
                        Return to Dashboard
                    </Link>

                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 text-gray-400 hover:text-gray-800 font-bold text-xs uppercase tracking-widest transition-colors py-2"
                    >
                        <FiArrowLeft />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;