import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast"; // ১. টোস্ট ইম্পোর্ট

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signinUser, signInGoogle } = UseAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = UseAxiosSecure();

    // রিডাইরেক্ট পাথ নির্ধারণ
    const from = location?.state || '/';

    // ইমেইল-পাসওয়ার্ড লগইন
    const handleLogin = (data) => {
        signinUser(data.email, data.password)
            .then(() => {
                toast.success("Successfully Logged In!"); // ২. সাকসেস টোস্ট
                navigate(from, { replace: true }); // ৩. সঠিক পেজে রিডাইরেক্ট
            })
            .catch((error) => {
                console.error(error);
                toast.error(error?.message || "Invalid Email or Password"); // ৪. এরর টোস্ট
            });
    }

    // গুগল লগইন
    const handleGoogleLogin = () => {
        signInGoogle()
            .then((result) => {
                // toast.success("Successfully Logged In!");
                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL,
                };

                // ডাটাবেসে ইউজার সেভ করা
                axiosSecure.post('/users', userInfo)
                    .then((res) => {
                        toast.success("Google Login Successful!");
                        navigate(from, { replace: true });
                    })
                    .catch(err => {
                        // যদি ইউজার আগে থেকেই থাকে তাও রিডাইরেক্ট হবে
                        navigate(from, { replace: true });
                    });

            }).catch((error) => {
                toast.error("Google Login Failed!");
                console.log(error.message);
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow">
                <h1 className="text-3xl font-bold mb-1">Welcome Back</h1>
                <p className="text-gray-600 mb-6">Login with <span className="text-lg font-bold tracking-tight text-gray-800">
                    Scholar<span className="text-primary">Stream</span>
                </span></p>

                <form onSubmit={handleSubmit(handleLogin)}>
                    <fieldset>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="Email"
                            className="w-full px-3 py-2 mb-1 border rounded-lg focus:outline-none focus:ring focus:ring-green-200"
                        />
                        {errors.email && <p className="text-red-500 text-xs mb-3">{errors.email.message}</p>}

                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Min 6 characters required" }
                            })}
                            placeholder="Password"
                            className="w-full px-3 py-2 mb-1 border rounded-lg focus:outline-none focus:ring focus:ring-green-200"
                        />
                        {errors.password && <p className="text-red-500 text-xs mb-3">{errors.password.message}</p>}

                        <p className="text-sm text-blue-600 cursor-pointer mb-4">Forget Password?</p>

                        <button type="submit" className="w-full py-2 rounded-lg bg-primary/80 font-semibold text-gray-800 hover:bg-primary transition">
                            Login
                        </button>
                    </fieldset>
                </form>

                <Link state={from} to="/auth/register">
                    <p className="text-sm text-gray-600 mt-4">
                        Don’t have any account? <span className="text-primary cursor-pointer">Register</span>
                    </p>
                </Link>

                <div className="flex items-center gap-2 my-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-gray-500 text-sm">Or</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-2 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                    <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default Login;