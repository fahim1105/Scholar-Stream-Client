import React from 'react';
import LogoIMG from '../assets/logo.png'
import { Link, Outlet } from 'react-router';
import AuthIMG from '../assets/Login:resisterImg.jpg'

const AuthLayout = () => {
    return (
        <div className='px-10 mx-auto bg-[#0d1233]'>
            <Link to="/">
                <div className='bg-base-200 px-5 py-2 rounded-3xl flex items-center gap-2'>
                    <img className='w-10 rounded-2xl' src={LogoIMG} alt="" />
                    <span className="text-xl font-bold tracking-tight text-gray-800">
                        Scholar<span className="text-primary">Stream</span>
                    </span>
                </div>
            </Link>
            <div className='flex items-center'>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <img src={AuthIMG} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;