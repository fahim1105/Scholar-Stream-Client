import React from 'react';
import { Link } from 'react-router';
import { MdErrorOutline } from 'react-icons/md'; 
import { FiArrowLeft, FiRefreshCw } from 'react-icons/fi';

const PaymentCancel = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-red-50">

                {/* Warning/Error Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-red-50 p-5 rounded-full">
                        <MdErrorOutline className="text-6xl text-red-500 animate-pulse" />
                    </div>
                </div>

                {/* Text Content */}
                <h1 className="text-2xl md:text-3xl font-black text-gray-800 mb-4">
                    Payment Cancelled
                </h1>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    It looks like the transaction was interrupted or cancelled. No funds were charged from your account.
                </p>

                {/* Troubleshooting Box */}
                <div className="bg-amber-50 rounded-2xl p-4 mb-8 text-left border border-amber-100">
                    <h4 className="text-xs font-bold text-amber-700 uppercase mb-2 tracking-widest">Common Issues:</h4>
                    <ul className="text-sm text-amber-800 space-y-1 opacity-80">
                        <li>• Bank verification timeout</li>
                        <li>• Insufficient balance</li>
                        <li>• Window closed accidentally</li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4">
                    <Link
                        to="/dashboard/my-parcels"
                        className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
                    >
                        <FiRefreshCw className="text-lg" />
                        Try Payment Again
                    </Link>

                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-800 font-medium text-sm transition-colors py-2"
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