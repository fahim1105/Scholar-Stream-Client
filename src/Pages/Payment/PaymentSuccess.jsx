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
        <div className="min-h-screen flex items-center rounded-3xl justify-center bg-base-100 p-4">
            <div className="max-w-md w-full bg-base-200/50 rounded-[2.5rem] shadow-2xl p-8 text-center border border-base-300/50 backdrop-blur-sm relative overflow-hidden">

                {/* Decorative Top Bar - Success Green */}
                <div className="absolute top-0 left-0 w-full h-2 bg-success"></div>

                {/* Success Icon with Glow */}
                <div className="flex justify-center mb-6 mt-4 relative">
                    <div className="bg-success/10 p-5 rounded-full ring-8 ring-success/5 animate-bounce">
                        <BsCheckCircleFill className="text-5xl text-success" />
                    </div>
                </div>

                <h1 className="text-3xl font-black text-neutral italic uppercase tracking-tighter mb-2">Payment Successful!</h1>
                <p className="text-neutral/50 mb-8 text-[11px] font-bold uppercase tracking-widest px-6 italic leading-relaxed">
                    Congratulations! Your application has been received and is now being processed.
                </p>

                {/* Info Card / Receipt */}
                <div className="bg-base-100 rounded-3xl p-6 mb-8 border border-base-300 text-left space-y-5 shadow-inner">

                    {/* Scholarship & University */}
                    <div className="flex items-start gap-3">
                        <div className="mt-1 text-success text-lg"><FiInfo /></div>
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-neutral/40 italic mb-1">Scholarship Details</p>
                            <h3 className="font-black text-neutral italic leading-tight uppercase text-sm">{paymentInfo.scholarshipName}</h3>
                            <p className="text-[10px] text-neutral/60 font-bold uppercase tracking-tight mt-1">{paymentInfo.universityName}</p>
                        </div>
                    </div>

                    {/* Amount Paid */}
                    <div className="flex justify-between items-center py-4 border-y border-dashed border-base-300">
                        <span className="text-[10px] font-black text-neutral/50 uppercase tracking-widest italic">Amount Paid:</span>
                        <span className="text-2xl font-black text-success italic">${paymentInfo.amountPaid}</span>
                    </div>

                    {/* Transaction ID */}
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-neutral/40 mb-2 italic pl-1">Transaction ID</p>
                        <div className="flex items-center justify-between bg-base-200 p-3 rounded-xl border border-base-300 group transition-all">
                            <span className="text-neutral text-[9px] font-mono font-bold break-all leading-tight pr-2 uppercase opacity-70">
                                {paymentInfo.transactionId}
                            </span>
                            <button
                                onClick={() => handleCopy(paymentInfo.transactionId, "trans")}
                                className="p-2 hover:bg-success/20 rounded-lg transition-all text-success shrink-0"
                            >
                                {copiedField === "trans" ? <FiCheck className="scale-125" /> : <FiCopy />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    <Link
                        to="/dashboard/my-applications"
                        className="w-full bg-neutral hover:bg-success text-base-100 font-black py-4 rounded-2xl shadow-xl transition-all hover:-translate-y-1 active:scale-95 uppercase text-xs italic tracking-widest"
                    >
                        View My Applications
                    </Link>
                    <Link
                        to="/"
                        className="text-neutral/40 hover:text-success font-black text-[10px] uppercase tracking-[0.3em] transition-all py-2 italic"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;