import React, { useState, useEffect } from "react";
import {
    Menu, X, LogOut, LayoutDashboard, ChevronRight,
    User, ChevronDown, Settings, Heart, Sun, Moon
} from "lucide-react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import toast from "react-hot-toast";

const Navbar = () => {
    const { user, signOutUser } = UseAuth();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);

        document.querySelector('html').setAttribute('data-theme', theme);
        localStorage.setItem("theme", theme);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const handleSignOut = () => {
        signOutUser()
            .then(() => toast.success("Logout successful"))
            .catch((error) => console.error(error));
        setOpen(false);
        setDropdownOpen(false);
    }

    const publicLinks = [
        { name: "Home", path: "/" },
        { name: "Scholarships", path: "/all-scholarships" },
        { name: "About Us", path: "/about-us" },
    ];

    const privateLinks = [
        ...publicLinks,
        { name: "Blogs", path: "/blogs" },
        { name: "Our Toppers", path: "/our-topers" },
    ];

    const navLinks = user ? privateLinks : publicLinks;

    const linkStyles = ({ isActive }) =>
        `px-4 py-2 rounded-full transition-all duration-300 font-bold text-[13px] uppercase tracking-wider flex items-center gap-1 ${isActive
            ? "bg-primary text-white shadow-lg shadow-primary/30"
            : "text-base-300 hover:text-primary hover:bg-primary/5"
        }`;

    return (
        <nav className={`w-full fixed top-0 left-0 transition-all duration-300 z-[100] ${scrolled ? "bg-base-100/90 backdrop-blur-md py-2 shadow-lg border-b border-base-200" : "bg-base-200 py-4"
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">

                    {/* Brand Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="p-1.5 bg-base-100 rounded-xl shadow-sm group-hover:rotate-12 transition-transform border border-base-300/10">
                            <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-neutral">
                            SCHOLAR<span className="text-primary italic">STREAM</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1 bg-base-100/50 backdrop-blur-sm rounded-full p-1 border border-base-300/20">
                        {navLinks.map((link) => (
                            <NavLink key={link.path} to={link.path} className={linkStyles}>
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Desktop Right Side */}
                    <div className="hidden lg:flex items-center gap-4">

                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 bg-base-100 rounded-full border border-base-300/20 text-neutral hover:text-primary transition-all active:scale-90 shadow-sm"
                        >
                            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                        </button>

                        {user ? (
                            <div className="relative flex items-center gap-4">
                                <div className="relative">
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center gap-2 p-1 pr-3 bg-base-100 rounded-full border border-base-300/20 hover:shadow-md transition-all active:scale-95"
                                    >
                                        <img
                                            src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}`}
                                            className="w-9 h-9 rounded-full object-cover border-2 border-primary/20"
                                            alt="User"
                                        />
                                        <ChevronDown size={16} className={`text-base-300 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                                    </button>

                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-3 w-64 bg-base-100 rounded-[2rem] shadow-2xl border border-base-300/20 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <div className="px-3 pb-3 border-b border-base-200">
                                                <p className="font-black text-neutral truncate">{user?.displayName}</p>
                                                <p className="text-[10px] text-base-300 font-bold uppercase truncate">{user?.email}</p>
                                            </div>
                                            <div className="py-2">
                                                <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 text-base-300 font-bold text-sm transition-all group">
                                                    <LayoutDashboard size={18} className="group-hover:text-primary" /> Dashboard
                                                </Link>
                                                <Link to="/dashboard/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 text-base-300 font-bold text-sm transition-all group">
                                                    <User size={18} className="group-hover:text-primary" /> My Profile
                                                </Link>
                                            </div>
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full flex items-center gap-3 p-3 rounded-xl bg-error/10 text-error font-black text-xs uppercase tracking-widest hover:bg-error hover:text-white transition-all"
                                            >
                                                <LogOut size={16} /> Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/auth/login" className="px-6 py-2.5 text-sm font-black text-base-300 uppercase tracking-widest hover:text-primary transition-all">Login</Link>
                                <Link to="/auth/register" className="bg-primary text-white px-7 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30 hover:-translate-y-0.5 transition-all active:scale-95 border border-primary/10">Join Free</Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Toggle & Theme Toggle */}
                    <div className="lg:hidden flex items-center gap-3">
                        <button onClick={toggleTheme} className="p-2 text-neutral hover:bg-base-100 rounded-xl transition-colors">
                            {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
                        </button>
                        <button onClick={() => setOpen(!open)} className="p-2 text-neutral hover:bg-base-100 rounded-xl transition-colors">
                            {open ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] lg:hidden transition-opacity duration-500 ${open ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setOpen(false)} />

            <aside className={`fixed top-0 right-0 h-full w-[300px] bg-base-100 z-[120] lg:hidden transform transition-transform duration-500 border-l border-base-200 ${open ? "translate-x-0" : "translate-x-full"}`}>
                <div className="p-8 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-10 pb-4 border-b border-base-200">
                        <span className="font-black text-base-300 uppercase tracking-[0.2em] text-xs">Menu</span>
                        <div onClick={() => setOpen(false)} className="p-2 bg-base-200 rounded-full cursor-pointer text-neutral hover:text-primary transition-colors"><X size={20} /></div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {navLinks.map((link) => (
                            <NavLink key={link.path} to={link.path} onClick={() => setOpen(false)} className="flex justify-between items-center p-4 rounded-2xl hover:bg-primary/5 text-neutral font-black uppercase text-xs tracking-widest group transition-all">
                                {link.name} <ChevronRight size={16} className="text-base-300 group-hover:text-primary transition-all" />
                            </NavLink>
                        ))}
                    </div>

                    <div className="mt-auto">
                        {user ? (
                            <div className="bg-base-200 p-5 rounded-[2rem] border border-base-300/10">
                                <div className="flex items-center gap-4 mb-6">
                                    <img src={user?.photoURL} className="w-14 h-14 rounded-2xl border-4 border-base-100 shadow-xl" alt="" />
                                    <div className="overflow-hidden">
                                        <p className="font-black text-neutral truncate leading-none mb-1">{user?.displayName}</p>
                                        <p className="text-[10px] text-base-300 font-bold uppercase tracking-tighter truncate">{user?.email}</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Link to="/dashboard" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 py-3 bg-base-100 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] text-base-300 shadow-sm border border-base-300/20">
                                        <LayoutDashboard size={14} /> Dashboard
                                    </Link>
                                    <button onClick={handleSignOut} className="w-full flex items-center justify-center gap-2 py-4 bg-error text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-error/20">
                                        <LogOut size={14} /> Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Link to="/auth/login" onClick={() => setOpen(false)} className="w-full text-center py-4 border-2 border-base-200 rounded-2xl font-black text-xs uppercase tracking-widest text-neutral">Login</Link>
                                <Link to="/auth/register" onClick={() => setOpen(false)} className="w-full text-center py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20">Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </nav>
    );
};

export default Navbar;