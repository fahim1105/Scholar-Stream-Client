import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { BsCheckCircleFill } from "react-icons/bs";
import { FiCopy, FiCheck, FiInfo } from "react-icons/fi";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Loader from "../../Components/Loader/Loader";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [copiedField, setCopiedField] = useState(null);

    const axiosSecure = UseAxiosSecure();
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        if (sessionId) {
            axiosSecure
                .patch(`/scholarship-payment-success?session_id=${sessionId}`)
                .then((res) => {
                    if (res.data.success) {
                        setPaymentInfo(res.data);
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

    if (!paymentInfo) return <Loader />;

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-8 text-center border border-gray-100 relative overflow-hidden">

                {/* Decorative Top Bar */}
                <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>

                {/* Success Icon */}
                <div className="flex justify-center mb-6 mt-4">
                    <div className="bg-green-100 p-4 rounded-full animate-bounce">
                        <BsCheckCircleFill className="text-5xl text-green-500" />
                    </div>
                </div>

                <h1 className="text-3xl font-black text-gray-800 mb-2">Payment Successful!</h1>
                <p className="text-gray-500 mb-8 text-sm px-6">
                    Congratulations! Your application has been received and is now being processed.
                </p>

                {/* Info Card / Receipt */}
                <div className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-200 text-left space-y-5">

                    {/* Scholarship & University */}
                    <div className="flex items-start gap-3">
                        <div className="mt-1 text-indigo-600"><FiInfo /></div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Scholarship Details</p>
                            <h3 className="font-bold text-gray-800 leading-tight">{paymentInfo.scholarshipName}</h3>
                            <p className="text-xs text-gray-500 font-medium">{paymentInfo.universityName}</p>
                        </div>
                    </div>

                    {/* Amount Paid */}
                    <div className="flex justify-between items-center py-3 border-y border-dashed border-gray-300">
                        <span className="text-sm font-bold text-gray-600">Amount Paid:</span>
                        <span className="text-xl font-black text-green-600">${paymentInfo.amountPaid}</span>
                    </div>

                    {/* Transaction ID */}
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Transaction ID</p>
                        <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                            <span className="text-gray-700 text-[10px] font-mono break-all leading-tight pr-2">
                                {paymentInfo.transactionId}
                            </span>
                            <button
                                onClick={() => handleCopy(paymentInfo.transactionId, "trans")}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-indigo-600 shrink-0"
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
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-100 transition-all hover:-translate-y-1 active:scale-95"
                    >
                        View My Applications
                    </Link>
                    <Link
                        to="/"
                        className="text-gray-400 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest transition-colors py-2"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;