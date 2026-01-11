import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Loader from "../../Components/Loader/Loader";
import { FaGlobe, FaGraduationCap, FaCalendarAlt, FaDollarSign, FaLanguage, FaAward, FaUniversity, FaChevronLeft } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ScholarshipDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = UseAxiosSecure();
    const { user } = UseAuth();

    const { data: scholarship = {}, isLoading: isScholarshipLoading } = useQuery({
        queryKey: ["scholarship-details", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarships/${id}`);
            return res.data;
        },
    });

    const { data: reviews = [], isLoading: isReviewsLoading } = useQuery({
        queryKey: ["scholarship-reviews", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarship-reviews/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    const handleApply = async () => {
        if (!user) return toast.error("Please login to apply");

        try {
            const res = await axiosSecure.post("/create-checkout-session", {
                scholarshipId: scholarship._id,
                scholarshipName: scholarship.scholarshipName,
                universityName: scholarship.universityName,
                userName: user?.displayName,
                userEmail: user?.email
            });

            if (res.data.url) window.location.href = res.data.url;
        } catch (error) {
            toast.error("Something went wrong with the payment!");
        }
    };

    if (isScholarshipLoading || isReviewsLoading) return <Loader />;

    return (
        <div className="bg-base-100 min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 py-20 font-sans">
                
                {/* --- Navigation --- */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-10 group flex items-center gap-3 text-base-content/40 font-black uppercase tracking-[0.2em] text-[10px] hover:text-primary transition-all"
                >
                    <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Explorations
                </button>

                {/* --- Hero Section --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-[3rem] lg:rounded-[5rem] overflow-hidden shadow-2xl border-[12px] border-base-200 group ring-1 ring-base-300/10"
                >
                    <img
                        src={scholarship.universityImage}
                        alt={scholarship.universityName}
                        className="w-full h-[400px] lg:h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral via-neutral/20 to-transparent opacity-80"></div>
                    <div className="absolute bottom-10 left-10 right-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 text-base-100">
                        <div className="space-y-4">
                            <span className="bg-primary text-base-100 px-6 py-2 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl inline-block">
                                World Rank: #{scholarship.universityWorldRank}
                            </span>
                            <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-none italic">
                                {scholarship.scholarshipName}
                            </h1>
                        </div>
                    </div>
                </motion.div>

                {/* --- Main Content Layout --- */}
                <div className="grid lg:grid-cols-12 gap-10 mt-16">

                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* Title Box */}
                        <div className="bg-base-200 p-10 rounded-[3rem] border border-base-300/5 shadow-xl relative overflow-hidden group">
                            <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                                {scholarship.tags?.map((tag, idx) => (
                                    <span key={idx} className="bg-primary/10 text-primary text-[9px] font-black px-4 py-1.5 rounded-xl uppercase tracking-widest border border-primary/20">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center gap-8 text-neutral relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-base-100 rounded-2xl flex items-center justify-center text-primary shadow-inner border border-base-300/10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        <FaUniversity size={24} />
                                    </div>
                                    <span className="font-black text-2xl tracking-tight leading-none">{scholarship.universityName}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-base-100 rounded-2xl flex items-center justify-center text-secondary shadow-inner border border-base-300/10">
                                        <FaGlobe size={24} />
                                    </div>
                                    <span className="text-lg font-bold text-base-content/60 italic leading-none">{scholarship.universityCity}, {scholarship.universityCountry}</span>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full"></div>
                        </div>

                        {/* Quick Info Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <InfoCard icon={<FaGraduationCap />} label="Degree" value={scholarship.degree} theme="primary" />
                            <InfoCard icon={<FaCalendarAlt />} label="Deadline" value={scholarship.applicationDeadline} theme="secondary" />
                            <InfoCard icon={<FaLanguage />} label="Language" value={scholarship.language || "English"} theme="accent" />
                            <InfoCard icon={<FaDollarSign />} label="App Fee" value={`$${scholarship.applicationFees}`} theme="neutral" />
                            <InfoCard icon={<FaDollarSign />} label="Service" value={`$${scholarship.serviceCharge}`} theme="neutral" />
                        </div>

                        {/* Descriptions */}
                        <section className="space-y-12">
                            <div>
                                <h2 className="text-3xl font-black text-neutral mb-8 uppercase tracking-tighter flex items-center gap-4 italic">
                                    <span className="w-1.5 h-10 bg-primary rounded-full"></span>
                                    About Scholarship
                                </h2>
                                <div className="bg-base-200 p-10 rounded-[3rem] border border-base-300/5 shadow-inner leading-relaxed text-base-content/70 text-lg font-bold italic">
                                    {scholarship.scholarshipDescription}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-secondary/5 p-10 rounded-[3rem] border border-secondary/10 group hover:bg-secondary/10 transition-colors duration-500">
                                    <h3 className="text-secondary font-black text-2xl mb-6 flex items-center gap-3 uppercase tracking-tighter italic">
                                        <FaAward /> Eligibility
                                    </h3>
                                    <p className="text-base-content/60 leading-relaxed font-bold italic">{scholarship.eligibility}</p>
                                </div>
                                <div className="bg-accent/5 p-10 rounded-[3rem] border border-accent/10 group hover:bg-accent/10 transition-colors duration-500">
                                    <h3 className="text-accent font-black text-2xl mb-6 flex items-center gap-3 uppercase tracking-tighter italic">
                                        <FaAward /> Benefits
                                    </h3>
                                    <p className="text-base-content/60 leading-relaxed font-bold italic">{scholarship.benefits}</p>
                                </div>
                            </div>

                            <div className="bg-neutral text-base-100 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group">
                                <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/20 blur-[100px] rounded-full group-hover:scale-110 transition-transform duration-1000"></div>
                                <h3 className="text-primary text-[10px] font-black mb-4 uppercase tracking-[0.4em]">Stipend & Coverage</h3>
                                <p className="text-2xl lg:text-3xl font-black italic leading-tight text-base-100/90 tracking-tight">
                                    "{scholarship.stipendDetails}"
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN (Sidebar) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-10 space-y-8">
                            <div className="bg-base-200 p-10 rounded-[3.5rem] shadow-2xl border border-base-300/5">
                                <h3 className="text-xl font-black text-neutral mb-10 pb-6 border-b border-base-100 text-center uppercase tracking-widest">Application Summary</h3>
                                <div className="space-y-6 mb-12">
                                    <SummaryItem label="Subject Category" value={scholarship.subjectCategory} />
                                    <SummaryItem label="Funding Type" value={scholarship.scholarshipCategory} />
                                    <SummaryItem label="Posted Date" value={scholarship.scholarshipPostDate} />
                                    <SummaryItem label="Admin Node" value={scholarship.postedUserEmail} />
                                </div>
                                <button
                                    onClick={handleApply}
                                    className="w-full bg-primary text-base-100 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:bg-neutral hover:scale-[1.02] active:scale-95 transition-all duration-300"
                                >
                                    Proceed to Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Reviews Section --- */}
                <div className="mt-40">
                    <div className="flex items-center justify-between mb-16 gap-6">
                        <h2 className="text-4xl md:text-6xl font-black text-neutral tracking-tighter italic whitespace-nowrap">
                            Student <span className="text-primary">Voice.</span>
                        </h2>
                        <div className="h-1 flex-1 bg-base-200 rounded-full"></div>
                        <span className="text-2xl font-black text-base-content/20 italic">({reviews.length})</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <motion.div 
                                    key={review._id}
                                    whileHover={{ y: -5 }}
                                    className="p-10 bg-base-200 rounded-[3rem] border border-base-300/5 shadow-sm hover:shadow-2xl transition-all duration-500 group"
                                >
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="avatar">
                                            <div className="w-20 rounded-[1.5rem] ring-4 ring-primary/20 ring-offset-base-100 ring-offset-4 overflow-hidden">
                                                <img src={review.reviewerPhoto} alt={review.reviewerName} />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-black text-neutral text-2xl tracking-tight">{review.reviewerName}</h4>
                                            <div className="flex text-amber-500 mt-2 text-sm">
                                                {"★".repeat(Number(review.rating))}
                                                <span className="text-base-content/10">{"★".repeat(5 - Number(review.rating))}</span>
                                            </div>
                                            <p className="text-[10px] font-black text-base-content/20 mt-2 uppercase tracking-widest italic">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-base-content/60 leading-relaxed italic text-lg font-bold bg-base-100 p-8 rounded-[2rem] border border-base-300/5 shadow-inner">
                                        "{review.reviewComment}"
                                    </p>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-24 text-center bg-base-200 rounded-[4rem] border-4 border-dashed border-base-300/20">
                                <p className="text-base-content/20 text-3xl font-black uppercase tracking-tighter italic">No feedback yet.</p>
                                <p className="text-base-content/40 font-bold mt-2">Be the first to share your global experience!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoCard = ({ icon, label, value, theme }) => {
    const themes = {
        primary: "text-primary bg-primary/10 border-primary/20",
        secondary: "text-secondary bg-secondary/10 border-secondary/20",
        accent: "text-accent bg-accent/10 border-accent/20",
        neutral: "text-neutral bg-base-100 border-base-300/10"
    };

    return (
        <div className={`p-6 rounded-[2rem] border shadow-sm flex flex-col items-center text-center bg-base-200 hover:-translate-y-2 transition-all duration-500 group`}>
            <div className={`text-2xl mb-3 ${themes[theme].split(' ')[0]} group-hover:scale-110 transition-transform`}>{icon}</div>
            <p className="text-[9px] text-base-content/30 font-black uppercase tracking-[0.2em]">{label}</p>
            <p className="text-neutral font-black text-xs mt-2 uppercase tracking-tighter line-clamp-1">{value}</p>
        </div>
    );
};

const SummaryItem = ({ label, value }) => (
    <div className="flex flex-col gap-2 border-b border-base-100 pb-4">
        <span className="text-[9px] text-base-content/30 font-black uppercase tracking-[0.3em]">{label}</span>
        <span className="text-neutral font-bold text-sm break-words italic">{value}</span>
    </div>
);

export default ScholarshipDetails;