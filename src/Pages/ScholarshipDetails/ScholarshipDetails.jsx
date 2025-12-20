import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Loader from "../../Components/Loader/Loader";
import { FaGlobe, FaGraduationCap, FaCalendarAlt, FaDollarSign, FaLanguage, FaAward, FaUniversity } from "react-icons/fa";

const ScholarshipDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = UseAxiosSecure();

    const { data: scholarship = {}, isLoading: isScholarshipLoading } = useQuery({
        queryKey: ["scholarship-details", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarships/${id}`);
            return res.data;
        },
    });

    const { data: reviews = [], isLoading: isReviewsLoading } = useQuery({
        queryKey: ["reviews", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews?scholarshipId=${id}`);
            return res.data;
        },
        enabled: !!id,
    });
    const handleApply = async () => {
        const res = await axiosSecure.post("/create-checkout-session", {
            scholarshipId: scholarship._id
        });

        window.location.href = res.data.url; // 🔥 external redirect
    };


    if (isScholarshipLoading || isReviewsLoading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 font-sans bg-base-50">
            {/* Top Navigation */}
            <button
                onClick={() => navigate(-1)}
                className="mb-8 group flex items-center gap-2 text-neutral-500 font-semibold hover:text-primary transition-colors"
            >
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Scholarships
            </button>

            {/* University Hero Section */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group">
                <img
                    src={scholarship.universityImage}
                    alt={scholarship.universityName}
                    className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                    <div className="badge badge-accent p-4 py-5 text-lg font-bold mb-4 shadow-xl">
                        World Rank: #{scholarship.universityWorldRank}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight drop-shadow-lg">
                        {scholarship.scholarshipName}
                    </h1>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid lg:grid-cols-12 gap-10 mt-12">

                {/* LEFT COLUMN: 8 Units */}
                <div className="lg:col-span-8 space-y-10">

                    {/* Tags & Location */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-base-200">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {scholarship.tags?.map((tag, idx) => (
                                <span key={idx} className="bg-secondary/10 text-secondary text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-secondary/20">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-6 text-neutral-600">
                            <div className="flex items-center gap-2">
                                <div className="p-3 bg-primary/10 text-primary rounded-xl"><FaUniversity /></div>
                                <span className="font-bold text-xl">{scholarship.universityName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="p-3 bg-accent/10 text-accent rounded-xl"><FaGlobe /></div>
                                <span className="text-lg">{scholarship.universityCity}, {scholarship.universityCountry}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <InfoCard icon={<FaGraduationCap />} label="Degree" value={scholarship.degree} theme="primary" />
                        <InfoCard icon={<FaCalendarAlt />} label="Deadline" value={scholarship.applicationDeadline} theme="secondary" />
                        <InfoCard icon={<FaLanguage />} label="Language" value={scholarship.language || "English"} theme="accent" />
                        <InfoCard icon={<FaDollarSign />} label="App Fee" value={`$${scholarship.applicationFees}`} theme="neutral" />
                        <InfoCard icon={<FaDollarSign />} label="Service" value={`$${scholarship.serviceCharge}`} theme="neutral" />
                    </div>

                    {/* Detailed Descriptions */}
                    <section className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-neutral-800 mb-6 flex items-center gap-3">
                                <span className="w-2 h-10 bg-primary rounded-full"></span>
                                About Scholarship
                            </h2>
                            <div className="bg-white p-8 rounded-3xl border border-base-200 shadow-sm leading-relaxed text-neutral-600 text-lg">
                                {scholarship.scholarshipDescription}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-secondary/5 p-8 rounded-3xl border border-secondary/10">
                                <h3 className="text-secondary font-black text-2xl mb-4 flex items-center gap-2">
                                    <FaAward /> Eligibility
                                </h3>
                                <p className="text-neutral-700 leading-relaxed font-medium">{scholarship.eligibility}</p>
                            </div>
                            <div className="bg-accent/5 p-8 rounded-3xl border border-accent/10">
                                <h3 className="text-accent font-black text-2xl mb-4 flex items-center gap-2">
                                    <FaAward /> Benefits
                                </h3>
                                <p className="text-neutral-700 leading-relaxed font-medium">{scholarship.benefits}</p>
                            </div>
                        </div>

                        <div className="bg-neutral-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>
                            <h3 className="text-primary-content text-xl font-bold mb-4 opacity-70 uppercase tracking-widest">Stipend & Coverage</h3>
                            <p className="text-2xl font-medium italic leading-relaxed text-primary-100">
                                "{scholarship.stipendDetails}"
                            </p>
                        </div>
                    </section>
                </div>

                {/* RIGHT COLUMN: 4 Units (Sidebar) */}
                <div className="lg:col-span-4">
                    <div className="sticky top-10 space-y-6">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-base-200">
                            <h3 className="text-2xl font-bold text-neutral-800 mb-8 pb-4 border-b border-base-100 text-center">Application Summary</h3>
                            <div className="space-y-5 mb-10">
                                <SummaryItem label="Subject Category" value={scholarship.subjectCategory} />
                                <SummaryItem label="Funding Type" value={scholarship.scholarshipCategory} />
                                <SummaryItem label="Posted On" value={scholarship.scholarshipPostDate} />
                                <SummaryItem label="Official Email" value={scholarship.postedUserEmail} />
                            </div>
                            <button
                                onClick={handleApply}
                                className="w-full btn btn-primary btn-lg rounded-2xl h-16 text-lg font-black shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95"
                            >
                                Apply for Scholarship
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-24">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-4xl font-black text-neutral-800">
                        Student Reviews <span className="text-primary ml-2">({reviews.length})</span>
                    </h2>
                    <div className="h-1 flex-1 mx-8 bg-base-200 rounded-full hidden md:block"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review._id} className="p-8 bg-white rounded-[2rem] shadow-sm border border-base-200 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-5 mb-6">
                                    <div className="avatar">
                                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={review.userImage || "https://i.ibb.co/4pDNDk1/avatar.png"} />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-neutral-800 text-xl">{review.userName}</h4>
                                        <div className="flex text-amber-400 mt-1">
                                            {"★".repeat(Number(review.rating))}
                                            <span className="text-base-300">{"★".repeat(5 - Number(review.rating))}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-neutral-500 leading-relaxed italic text-lg bg-base-50 p-6 rounded-2xl">
                                    "{review.reviewComment}"
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-4 border-dashed border-base-200">
                            <p className="text-neutral-400 text-xl font-semibold italic">No feedback yet. Be the first student to share your thoughts!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Reusable Components with Theme Support
const InfoCard = ({ icon, label, value, theme }) => {
    const themes = {
        primary: "text-primary bg-primary/10 border-primary/20",
        secondary: "text-secondary bg-secondary/10 border-secondary/20",
        accent: "text-accent bg-accent/10 border-accent/20",
        neutral: "text-neutral-600 bg-neutral-50 border-neutral-200"
    };

    return (
        <div className={`p-5 rounded-3xl border shadow-sm flex flex-col items-center text-center bg-white hover:-translate-y-1 transition-transform`}>
            <div className={`text-2xl mb-2 ${themes[theme].split(' ')[0]}`}>{icon}</div>
            <p className="text-[10px] text-neutral-400 font-black uppercase tracking-widest">{label}</p>
            <p className="text-neutral-800 font-bold text-sm mt-1">{value}</p>
        </div>
    );
};

const SummaryItem = ({ label, value }) => (
    <div className="flex flex-col gap-1 border-b border-base-50 pb-3">
        <span className="text-xs text-neutral-400 font-bold uppercase tracking-tighter">{label}</span>
        <span className="text-neutral-800 font-semibold break-words">{value}</span>
    </div>
);

export default ScholarshipDetails;