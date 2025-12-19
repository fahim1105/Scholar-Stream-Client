import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import UseAuth from "../../Hooks/UseAuth";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";

const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { registerUser, signInGoogle, updateUserProfile } = UseAuth();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = UseAxiosSecure();

    const from = location?.state || "/";
    const photoFile = watch("photo");

    const handleRegister = async (data) => {
        setLoading(true);
        const toastId = toast.loading("Creating your account...");

        try {
            const formData = new FormData();
            formData.append("image", data.photo[0]);
            const img_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_Host_Key}`;
            const imgRes = await axios.post(img_API_URL, formData);
            const photoURL = imgRes.data.data.url;

            await registerUser(data.email, data.password);
            await updateUserProfile({ displayName: data.name, photoURL });

            const userInfo = {
                email: data.email,
                displayName: data.name,
                photoURL,
                role: "user",
                createdAt: new Date(),
            };

            await axiosSecure.post("/users", userInfo);
            toast.success("Welcome! Registration Successful", { id: toastId });
            navigate(from, { replace: true });

        } catch (error) {
            console.error(error);
            toast.error(error?.message || "Registration failed!", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    // --- ফিক্সড গুগল লগইন ফাংশন ---
    const handleGoogleLogin = async () => {
        try {
            const result = await signInGoogle();
            const user = result?.user;

            const userInfo = {
                email: user?.email,
                displayName: user?.displayName,
                photoURL: user?.photoURL,
                role: "user",
                createdAt: new Date(),
            };

            // ডাটাবেসে ইউজার পাঠানোর সময় catch ব্যবহার করেছি যাতে ইউজার আগে থেকে থাকলেও লগইন হয়ে যায়
            await axiosSecure.post('/users', userInfo)
                .catch(err => console.log("User might already exist in DB", err));

            toast.success("Google Login Successful!");
            navigate(from, { replace: true });
        } catch (error) {
            console.error("Google Login Error:", error);
            toast.error(error?.message || "Google Login Failed!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-base-100">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
                    <p className="text-gray-500 mt-2">Join <span className="text-lg font-bold tracking-tight text-gray-800">
                        Scholar<span className="text-primary">Stream</span>
                    </span> & start your journey</p>
                </div>

                <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-base-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            placeholder="John Doe"
                            className="w-full px-4 py-2.5 border border-base-300 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    {/* --- কাস্টম ফটো সেকশন (ডিফল্ট টেক্সট ছাড়া) --- */}
                    <div>
                        <label className="block text-sm font-semibold text-base-300 mb-1">Profile Photo</label>
                        <div className="flex items-center gap-4">
                            <label
                                htmlFor="photo-upload"
                                className="px-4 py-2 bg-base-100 text-primary border border-dashed border-primary/50 rounded-xl cursor-pointer hover:bg-primary/20 transition-all text-sm font-medium"
                            >
                                Choose Image
                            </label>
                            <input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                {...register("photo", { required: "Photo is required" })}
                                className="hidden" // এটিই "No file chosen" হাইড করেছে
                            />

                            <div className="h-12 w-12 rounded-full bg-base-100 overflow-hidden border-2 border-primary/20 ml-auto">
                                {photoFile?.[0] ? (
                                    <img src={URL.createObjectURL(photoFile[0])} alt="preview" className="h-full w-full object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-base-300 text-[10px]">No Pic</div>
                                )}
                            </div>
                        </div>
                        {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-base-300 mb-1">Email Address</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="example@mail.com"
                            className="w-full px-4 py-2.5 border border-base-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "At least 6 characters" },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: "Must include Uppercase, Lowercase, Number & Symbol"
                                }
                            })}
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 border border-base-200 rounded-xl focus:ring-2 focus:ring-primary/40 focus:outline-none transition-all"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className={`w-full py-3 rounded-xl font-bold text-neutral transition-all ${loading ? 'bg-base-200 cursor-not-allowed' : 'bg-primary/70 hover:bg-primary shadow-lg shadow-primary/20'}`}
                    >
                        {loading ? "Processing..." : "Create Account"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-500 text-sm">
                        Already have an account?{" "}
                        <Link state={from} to="/auth/login" className="text-primary/90 font-bold hover:underline">Login</Link>
                    </p>
                </div>

                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-base-200"></div>
                    <span className="text-base-300 text-xs font-medium uppercase">Or continue with</span>
                    <div className="flex-1 h-px bg-base-200"></div>
                </div>

                <button
                    type="button" // Type button দেওয়া হয়েছে যাতে ফর্ম সাবমিট না হয়ে যায়
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-white border border-base-200 py-2.5 rounded-xl hover:bg-base-100 transition-all font-medium text-base-300"
                >
                    <FcGoogle size={24} />
                    <span>Register with Google</span>
                </button>
            </div>
        </div>
    );
};

export default Register;