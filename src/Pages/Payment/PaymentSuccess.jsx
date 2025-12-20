import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import { FiCopy, FiCheck } from "react-icons/fi";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const [copiedField, setCopiedField] = useState(null);

    const axiosSecure = UseAxiosSecure();
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        if (sessionId) {
            axiosSecure
                .patch(`/scholarship-payment-success?session_id=${sessionId}`)
                .then((res) => {
                    if (res.data.success) {
                        setPaymentInfo({
                            transactionId: res.data.transactionId,
                        });
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [sessionId, axiosSecure]);

    const handleCopy = (text, field) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-6 md:p-10 text-center border border-gray-100">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <BsCheckCircleFill className="text-6xl text-green-500 animate-pulse" />
                </div>

                <h1 className="text-2xl md:text-3xl font-black text-gray-800 mb-2">
                    Payment Successful!
                </h1>
                <p className="text-gray-500 mb-8 text-sm">
                    Your scholarship application has been submitted successfully.
                </p>

                {/* Payment Details Card */}
                <div className="bg-gray-50 rounded-2xl p-4 mb-8 border border-gray-100 text-left space-y-4">
                    {/* Transaction ID */}
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                            Transaction ID
                        </p>
                        <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
                            <span className="text-gray-700 text-xs font-mono break-all leading-tight">
                                {paymentInfo.transactionId || "Processing..."}
                            </span>
                            <button
                                onClick={() =>
                                    handleCopy(paymentInfo.transactionId, "trans")
                                }
                                className="ml-2 p-2 hover:bg-gray-100 rounded-lg transition-colors text-indigo-600"
                                title="Copy Transaction ID"
                            >
                                {copiedField === "trans" ? <FiCheck className="text-green-500" /> : <FiCopy />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    <Link
                        to="/dashboard/my-applications"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
                    >
                        View My Applications
                    </Link>
                    <Link
                        to="/"
                        className="text-gray-500 hover:text-indigo-600 font-medium text-sm transition-colors py-2"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
