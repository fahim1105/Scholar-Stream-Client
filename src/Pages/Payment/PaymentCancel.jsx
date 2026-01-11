import React from 'react';
import { Link, useLocation } from 'react-router';
import { MdErrorOutline } from 'react-icons/md';
import { FiArrowLeft, FiAlertCircle } from 'react-icons/fi';

const PaymentCancel = () => {
    const location = useLocation();
    const scholarshipName = location.state?.scholarshipName || "Selected Scholarship";

    return (
        <div className="min-h-screen flex items-center rounded-3xl justify-center bg-base-100 p-4">
            <div className="max-w-md w-full bg-base-200/50 rounded-[2.5rem] shadow-2xl p-8 md:p-12 text-center border border-base-300/50 backdrop-blur-sm relative overflow-hidden">

                {/* Decorative Top Bar */}
                <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>

                {/* Error Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-primary/10 p-5 rounded-full ring-8 ring-primary/5">
                        <MdErrorOutline className="text-6xl text-red-500" />
                    </div>
                </div>

                {/* Text Content */}
                <h1 className="text-3xl font-black text-neutral italic uppercase tracking-tighter mb-2">
                    Payment Failed
                </h1>
                <div className="bg-red-500 text-base-100 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] italic inline-block mb-6 shadow-lg shadow-primary/20">
                    Transaction Cancelled
                </div>

                {/* Scholarship Info */}
                <div className="bg-base-100/50 rounded-2xl p-5 mb-8 border border-base-300 text-left">
                    <p className="text-[9px] font-black uppercase tracking-widest text-neutral opacity-40 mb-1 italic pl-1">Attempted For:</p>
                    <h3 className="font-bold text-neutral flex items-center gap-2 italic">
                        <FiAlertCircle className="text-primary shrink-0" /> {scholarshipName}
                    </h3>
                </div>

                <p className="text-neutral/60 mb-8 leading-relaxed text-xs italic font-medium">
                    "Your payment process was interrupted. No money has been deducted from your account. You can retry the process from your dashboard."
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4">
                    <Link
                        to="/dashboard/my-applications"
                        className="w-full bg-primary hover:bg-neutral text-base-100 font-black py-4 rounded-2xl shadow-xl transition-all hover:-translate-y-1 active:scale-95 uppercase text-xs italic tracking-widest"
                    >
                        Return to Dashboard
                    </Link>

                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 text-neutral/40 hover:text-primary font-black text-[10px] uppercase tracking-[0.2em] transition-all py-2 italic"
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