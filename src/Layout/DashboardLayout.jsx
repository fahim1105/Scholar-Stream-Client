import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { PiPersonArmsSpreadDuotone } from "react-icons/pi";
import { MdManageAccounts, MdRateReview, MdWorkHistory, MdLogout } from "react-icons/md";
import { SiNginxproxymanager } from "react-icons/si";
import UseRole from '../Hooks/UseRole';
import { CgProfile } from "react-icons/cg";
import { ClipboardList, LayoutDashboard, Home, ChevronLeft, ChevronRight, PanelLeftClose, PanelLeftOpen, Menu } from 'lucide-react';
import { MessageCircleCode } from 'lucide-react';
import UseAuth from '../Hooks/UseAuth';

const DashboardLayout = () => {
    const { role } = UseRole();
    const { user, logOut } = UseAuth();
    // সাইডবার ছোট বড় করার জন্য স্টেট
    const [isCollapsed, setIsCollapsed] = useState(false);

    const activeLink = "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20 scale-105 transition-all duration-300 rounded-xl";
    const normalLink = "text-neutral-500 hover:bg-base-300 hover:text-primary transition-all duration-200 rounded-xl";

    return (
        <div className="flex min-h-screen bg-base-100 font-sans">
            {/* --- Premium Collapsible Sidebar --- */}
            <aside 
                className={`hidden lg:flex flex-col bg-base-100 border-r border-base-200 transition-all duration-300 ease-in-out sticky top-0 h-screen z-40 ${
                    isCollapsed ? "w-24" : "w-72"
                }`}
            >
                {/* Logo Area */}
                <div className={`p-6 mb-4 flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
                    {!isCollapsed && (
                        <Link to="/" className="text-xl font-black text-neutral-800 flex items-center gap-2 overflow-hidden whitespace-nowrap">
                            <div className="p-2 bg-primary rounded-xl text-white shadow-lg shadow-primary/30">
                                <PiPersonArmsSpreadDuotone size={20} />
                            </div>
                            <span>Scholar<span className="text-primary">Stream</span></span>
                        </Link>
                    )}
                    {isCollapsed && (
                        <div className="p-2 bg-primary rounded-xl text-white shadow-lg">
                            <PiPersonArmsSpreadDuotone size={24} />
                        </div>
                    )}
                </div>

                {/* Navigation Links */}
                <ul className="menu menu-md px-4 space-y-2 grow flex-nowrap overflow-y-auto overflow-x-hidden custom-scrollbar">
                    <p className={`text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2 px-2 italic ${isCollapsed ? "text-center" : ""}`}>
                        {isCollapsed ? "---" : "Main"}
                    </p>
                    
                    <SidebarItem to="/" icon={<Home size={20} />} label="Landing Home" isCollapsed={isCollapsed} activeLink={activeLink} normalLink={normalLink} />
                    <SidebarItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" isCollapsed={isCollapsed} activeLink={activeLink} normalLink={normalLink} end />

                    {/* Admin Routes */}
                    {role === 'admin' && (
                        <>
                            <div className="divider opacity-50"></div>
                            <SidebarItem to="/dashboard/add-scholarship" icon={<PiPersonArmsSpreadDuotone size={20} />} label="Add Scholarship" isCollapsed={isCollapsed} activeLink={activeLink} normalLink={normalLink} />
                            <SidebarItem to="/dashboard/manage-users" icon={<MdManageAccounts size={20} />} label="Manage Users" isCollapsed={isCollapsed} activeLink={activeLink} normalLink={normalLink} />
                            <SidebarItem to="/dashboard/manage-scholarship" icon={<SiNginxproxymanager size={20} />} label="Scholarships" isCollapsed={isCollapsed} activeLink={activeLink} normalLink={normalLink} />
                        </>
                    )}

                    {/* Personal */}
                    <div className="divider opacity-50"></div>
                    <SidebarItem to="/dashboard/profile" icon={<CgProfile size={20} />} label="My Profile" isCollapsed={isCollapsed} activeLink={activeLink} normalLink={normalLink} />
                    
                    <li className={role === 'admin' || role === 'moderator' ? "hidden" : ""}>
                        <SidebarItem to="/dashboard/my-applications" icon={<ClipboardList size={20} />} label="Applications" isCollapsed={isCollapsed} activeLink={activeLink} normalLink={normalLink} />
                    </li>

                    <SidebarItem to="/dashboard/payment-history" icon={<MdWorkHistory size={20} />} label="Payments" isCollapsed={isCollapsed} activeLink={activeLink} normalLink={normalLink} />
                    <SidebarItem to="/dashboard/my-reviews" icon={<MessageCircleCode size={20} />} label="My Feedback" isCollapsed={isCollapsed} activeLink={activeLink} normalLink={normalLink} />
                </ul>

                {/* Sidebar Footer: Collapse Toggle & Logout */}
                <div className="p-4 border-t border-base-200 space-y-2">
                    <button 
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="btn btn-ghost w-full justify-start gap-4 text-neutral-500 rounded-xl hidden lg:flex"
                    >
                        {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
                        {!isCollapsed && <span className="font-bold">Collapse</span>}
                    </button>
                    
                    <button 
                        onClick={logOut}
                        className="btn btn-ghost w-full justify-start gap-4 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl font-bold"
                    >
                        <MdLogout size={20} />
                        {!isCollapsed && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* --- Main Content Area --- */}
            <div className="flex-1 flex flex-col min-w-0 bg-base-100">
                {/* Modern Navbar */}
                <nav className="navbar sticky top-0 z-30 bg-base-100/80 backdrop-blur-md border-b border-base-200 px-4 md:px-8">
                    <div className="flex-1 gap-2">
                        {/* Mobile Drawer Toggle */}
                        <label htmlFor="my-drawer-4" className="btn btn-ghost lg:hidden">
                            <Menu size={20} />
                        </label>
                        <h2 className="hidden md:block text-sm font-bold text-neutral-400 uppercase tracking-widest">
                            Dashboard / <span className="text-primary">{role}</span>
                        </h2>
                    </div>
                    
                    <div className="flex-none gap-4">
                        <div className="hidden md:block text-right">
                            <p className="text-sm font-black text-neutral-800 leading-tight">{user?.displayName}</p>
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">{role}</p>
                        </div>
                        {/* <div className="avatar shadow-xl ring-2 ring-primary/20 rounded-full ring-offset-2">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="User" />
                            </div>
                        </div> */}
                    </div>
                </nav>

                {/* Page Content Holder */}
                <main className="p-4 md:p-8 flex-grow">
                    <div className="bg-base-200/40 rounded-[2.5rem] p-4 md:p-10 min-h-[85vh] border border-base-200 shadow-inner">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* --- Mobile Drawer Side (DaisyUI Standard) --- */}
            <div className="drawer lg:hidden">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-side z-[100]">
                    <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                    <ul className="menu p-6 w-80 min-h-full bg-base-100 text-base-content space-y-2">
                        <div className="mb-8 font-black text-2xl px-4">Zap <span className="text-primary">Shift</span></div>
                        {/* মোবাইল মেনুর জন্য আলাদা লিঙ্কগুলো এখানেও রাখা যাবে অথবা ডুপ্লিকেট করা যাবে */}
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                        {/* ... বাকি লিঙ্কগুলো ... */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

// হেল্পার কম্পোনেন্ট: যা আইকন ও টেক্সট কন্ট্রোল করবে
const SidebarItem = ({ to, icon, label, isCollapsed, activeLink, normalLink, end = false }) => (
    <li>
        <NavLink 
            to={to} 
            end={end}
            className={({ isActive }) => 
                `flex items-center gap-4 p-3 transition-all duration-300 ${isActive ? activeLink : normalLink} ${isCollapsed ? "justify-center" : ""}`
            }
            title={isCollapsed ? label : ""} 
        >
            <span className="shrink-0">{icon}</span>
            {!isCollapsed && <span className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">{label}</span>}
        </NavLink>
    </li>
);

export default DashboardLayout;