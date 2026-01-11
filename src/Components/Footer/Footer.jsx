import React from 'react';
import FooterIMG from '../../assets/logo.png'
import { Link } from 'react-router';
import { Facebook, Github, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full bg-base-100 transition-colors duration-300">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-16 border-b border-base-300/20">

                <div className="max-w-96">
                    <div className='flex gap-2 items-center'>
                        <div className="p-1 bg-base-200 rounded-lg border border-base-300/30">
                            <img className='w-10 h-10 object-contain' src={FooterIMG} alt="Logo" />
                        </div>
                        <span className="text-xl lg:text-2xl font-black tracking-tighter text-neutral">
                            SCHOLAR <span className="text-primary italic">STREAM</span>
                        </span>
                    </div>
                    <p className="mt-6 text-sm text-base-content/60 leading-relaxed font-medium">
                        Empowering students to unlock their future. Scholar Stream simplifies the search for global scholarships, connecting ambitious minds with life-changing academic opportunities.
                    </p>

                    {/* Social Icons */}
                    <div className="flex items-center gap-3 mt-6">
                        {[
                            { icon: <Facebook size={18} />, href: "https://facebook.com", color: "hover:bg-blue-600" },
                            { icon: <Github size={18} />, href: "https://github.com/fahim1105", color: "hover:bg-gray-800" },
                            { icon: <Linkedin size={18} />, href: "https://linkedin.com", color: "hover:bg-blue-700" }
                        ].map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                className={`p-2.5 rounded-xl border border-base-300/50 text-base-content/70 hover:text-white ${social.color} transition-all duration-300 shadow-sm`}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap gap-16 md:gap-24">
                    {/* Resources Column */}
                    <div>
                        <h2 className="font-black text-neutral text-xs uppercase tracking-[0.2em] mb-6">Resources</h2>
                        <ul className="text-sm space-y-3 list-none">
                            {['Documentation', 'Tutorials', 'Blogs', 'Community'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={`/${item.toLowerCase()}`}
                                        className="text-base-content/60 hover:text-primary font-bold transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h2 className="font-black text-neutral text-xs uppercase tracking-[0.2em] mb-6">Company</h2>
                        <ul className="text-sm space-y-3 list-none">
                            {['About-Us', 'Careers', 'Privacy', 'Terms'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={`/${item.toLowerCase()}`}
                                        className="text-base-content/60 hover:text-primary font-bold transition-colors"
                                    >
                                        {item.replace('-', ' ')}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>

            <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest">
                    Copyright 2026 © <span className="text-primary">Scholar Stream</span>
                </p>
                <p className="text-[10px] font-black text-base-content/20 uppercase tracking-[0.3em]">
                    Built for Global Success
                </p>
            </div>
        </footer>
    );
};

export default Footer;