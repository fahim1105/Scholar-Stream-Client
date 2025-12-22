import React, { useState } from "react";
import { Menu, X, LogOut, LayoutDashboard, ChevronRight, User } from "lucide-react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import toast from "react-hot-toast";

const Navbar = () => {
    const { user, signOutUser } = UseAuth();
    const [open, setOpen] = useState(false);

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                toast.success("Logout successful")
            })
            .catch((error) => console.error(error));
        setOpen(false);
    }

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "All Scholarships", path: "/all-scholarships" },
    ];

    const linkStyles = ({ isActive }) =>
        `px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm flex items-center gap-1 ${isActive
            ? "bg-primary text-white shadow-md"
            : "text-gray-600 hover:bg-gray-100 hover:text-primary"
        }`;

    return (
        <nav className="w-full bg-base-200 border-b border-gray-100 relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">

                    {/* Brand Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <img src={logo} alt="Logo" className="w-9 h-9 rounded-lg object-contain" />
                        <span className="text-xl font-bold tracking-tight text-gray-800">
                            Scholar<span className="text-primary">Stream</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-2 bg-gray-50 rounded-full p-1 border">
                        {navLinks.map((link) => (
                            <NavLink key={link.path} to={link.path} className={linkStyles}>
                                {link.name}
                            </NavLink>
                        ))}
                        {user && (
                            <NavLink to="/dashboard" className={linkStyles}>
                                <LayoutDashboard size={14} /> Dashboard
                            </NavLink>
                        )}
                    </div>

                    {/* Auth Actions (Desktop) */}
                    <div className="hidden lg:flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-3 pl-2 border-l ml-2">
                                <div className="text-right">
                                    <p className="text-xs font-bold text-gray-800 leading-none">{user?.displayName || "User"}</p>
                                    <button onClick={handleSignOut} className="text-[10px] text-red-500 font-bold uppercase hover:underline">Sign Out</button>
                                </div>
                                <img
                                    src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=random`}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border-2 border-primary p-0.5 object-cover"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/auth/login" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary">Login</Link>
                                <Link to="/auth/register" className="bg-primary text-white px-5 py-2 rounded-full font-bold text-sm shadow-lg hover:brightness-110 transition-all">Join Free</Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-gray-600">
                        {open ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setOpen(false)} />

            <aside className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[60] shadow-2xl lg:hidden transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
                <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-8 border-b pb-4">
                        <span className="font-bold text-gray-400">Navigation</span>
                        <X size={24} className="text-gray-400 cursor-pointer" onClick={() => setOpen(false)} />
                    </div>

                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <NavLink key={link.path} to={link.path} onClick={() => setOpen(false)} className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium">
                                {link.name} <ChevronRight size={16} className="text-gray-300" />
                            </NavLink>
                        ))}
                        {user && (
                            <NavLink to="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 text-primary font-bold">
                                <LayoutDashboard size={18} /> Dashboard
                            </NavLink>
                        )}
                    </div>

                    {/* User Section (Mobile Bottom) */}
                    <div className="mt-auto pt-6 border-t">
                        {user ? (
                            <div className="bg-gray-50 p-4 rounded-2xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}`} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="" />
                                    <div className="overflow-hidden">
                                        <p className="font-bold text-gray-800 truncate">{user?.displayName}</p>
                                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                    </div>
                                </div>
                                <button onClick={handleSignOut} className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-red-100 text-red-500 rounded-xl font-bold text-sm hover:bg-red-50 transition-colors">
                                    <LogOut size={16} /> Logout Account
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-3">
                                <Link to="/auth/login" onClick={() => setOpen(false)} className="w-full text-center py-3 border rounded-xl font-bold text-gray-600">Login</Link>
                                <Link to="/auth/register" onClick={() => setOpen(false)} className="w-full text-center py-3 bg-primary text-white rounded-xl font-bold">Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </nav>
    );
};

export default Navbar;