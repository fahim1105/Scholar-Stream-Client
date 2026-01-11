import React from 'react';
import { Award, GraduationCap, Star, Quote } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import Loader from '../../Components/Loader/Loader';
import { Link } from 'react-router';


const OurToppers = () => {
    const axiosPublic = UseAxiosPublic();

    // --- FETCH DATA FROM DATABASE ---
    const { data: toppers = [], isLoading } = useQuery({
        queryKey: ['toppers-list'],
        queryFn: async () => {
            const res = await axiosPublic.get('/toppers');
            return res.data;
        }
    });

    if (isLoading) return <Loader />;

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4">
            <div className="max-w-7xl mx-auto">

                {/* --- Section Header --- */}
                <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                        <Award size={18} />
                        <span className="text-sm font-bold uppercase tracking-wider">Hall of Fame</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
                        Meet Our <span className="text-primary">Top Achievers</span>
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto font-medium">
                        Celebrating the brilliant minds who secured world-class scholarships with ScholarStream's guidance.
                    </p>
                </div>

                {/* --- Grid Layout (Desktop 5, Tablet 3, Mobile 1) --- */}
                {toppers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {toppers.map((topper, index) => (
                            <div
                                key={topper._id}
                                style={{ animationDelay: `${index * 100}ms` }}
                                className="group relative bg-white rounded-[2rem] p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 border border-gray-100 animate-in fade-in zoom-in duration-700"
                            >
                                {/* Top Star Badge */}
                                <div className="absolute -top-3 -right-3 bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-2 rounded-xl shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform">
                                    <Star size={16} fill="white" />
                                </div>

                                {/* Image Section */}
                                <div className="relative mb-6">
                                    <div className="w-24 h-24 mx-auto relative z-10">
                                        <img
                                            src={topper.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                            alt={topper.name}
                                            className="w-full h-full object-cover rounded-[1.5rem] ring-4 ring-gray-50 group-hover:ring-primary/20 transition-all duration-500"
                                        />
                                    </div>
                                    {/* Glowing Background Effect */}
                                    <div className="absolute inset-0 bg-primary/10 rounded-full scale-125 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                </div>

                                {/* Info Section */}
                                <div className="text-center relative z-10">
                                    <h3 className="text-lg font-black text-gray-800 mb-1 group-hover:text-primary transition-colors line-clamp-1">
                                        {topper.name}
                                    </h3>
                                    <div className="flex items-center justify-center gap-1 text-xs font-bold text-gray-400 mb-4">
                                        <GraduationCap size={14} className="text-primary/60" />
                                        <span>Batch {topper.batch}</span>
                                    </div>

                                    <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100 group-hover:bg-primary/5 group-hover:border-primary/10 transition-all duration-300">
                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1 truncate">
                                            {topper.scholarship}
                                        </p>
                                        <p className="text-[11px] text-gray-500 font-bold truncate">
                                            {topper.university}
                                        </p>
                                    </div>
                                </div>

                                {/* Hidden Action Button */}
                                {/* <button className="w-full mt-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-300 group-hover:text-primary border-t border-gray-50 pt-4 transition-colors">
                                    Success Story
                                </button> */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 opacity-30">
                        <Award size={64} className="mx-auto mb-4" />
                        <h2 className="text-2xl font-black uppercase">Coming Soon</h2>
                    </div>
                )}

                {/* --- Bottom CTA Section --- */}
                <div className="mt-20 text-center bg-white rounded-[3.5rem] p-12 shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full -ml-16 -mb-16 blur-3xl" />
                    
                    <Quote className="mx-auto text-primary/10 mb-6" size={60} />
                    <h2 className="text-3xl font-black text-gray-800 mb-3">Your Future Starts Here</h2>
                    <p className="text-gray-500 mb-8 italic font-medium max-w-lg mx-auto">
                        "Join the community of scholars who are breaking boundaries worldwide."
                    </p>
                    <Link to="/all-scholarships" className="bg-primary text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
                        Apply for Scholarship
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OurToppers;