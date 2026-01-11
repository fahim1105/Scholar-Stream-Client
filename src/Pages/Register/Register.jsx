import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import UseAuth from "../../Hooks/UseAuth";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
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
                role: "student",
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
            <div className="w-full max-w-md bg-base-200 p-8 rounded-[2.5rem] shadow-2xl border border-base-300/50 backdrop-blur-sm">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-neutral italic uppercase tracking-tighter">Create Account</h1>
                    <p className="text-neutral/50 mt-2 text-[10px] font-bold uppercase tracking-widest">Join <span className="font-black text-neutral italic">
                        Scholar<span className="text-primary">Stream</span>
                    </span> & start your journey</p>
                </div>

                <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-[9px] font-black uppercase tracking-widest text-neutral/50 mb-1.5 ml-1 italic">Full Name</label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            placeholder="Your Name"
                            className="w-full px-4 py-3 bg-base-100 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                        />
                        {errors.name && <p className="text-error text-[10px] font-black mt-1 ml-2 uppercase italic tracking-tighter">{errors.name.message}</p>}
                    </div>

                    {/* Custom Photo Section */}
                    <div>
                        <label className="block text-[9px] font-black uppercase tracking-widest text-neutral/50 mb-1.5 ml-1 italic">Profile Photo</label>
                        <div className="flex items-center gap-4 p-2 bg-base-100 border border-base-300 rounded-2xl">
                            <label
                                htmlFor="photo-upload"
                                className="px-4 py-2 bg-primary text-base-100 rounded-xl cursor-pointer hover:bg-neutral transition-all text-[10px] font-black uppercase tracking-widest italic"
                            >
                                Choose Image
                            </label>
                            <input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                {...register("photo", { required: "Photo is required" })}
                                className="hidden"
                            />

                            <div className="h-12 w-12 rounded-full bg-base-200 overflow-hidden border-2 border-primary/20 ml-auto shadow-inner">
                                {photoFile?.[0] ? (
                                    <img src={URL.createObjectURL(photoFile[0])} alt="preview" className="h-full w-full object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-neutral/30 text-[8px] font-black uppercase">No Pic</div>
                                )}
                            </div>
                        </div>
                        {errors.photo && <p className="text-error text-[10px] font-black mt-1 ml-2 uppercase italic tracking-tighter">{errors.photo.message}</p>}
                    </div>

                    {/* Email Address */}
                    <div>
                        <label className="block text-[9px] font-black uppercase tracking-widest text-neutral/50 mb-1.5 ml-1 italic">Email Address</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="admin@scholarstream.com"
                            className="w-full px-4 py-3 bg-base-100 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                        />
                        {errors.email && <p className="text-error text-[10px] font-black mt-1 ml-2 uppercase italic tracking-tighter">{errors.email.message}</p>}
                    </div>

                    {/* Password with Eye Toggle */}
                    <div>
                        <label className="block text-[9px] font-black uppercase tracking-widest text-neutral/50 mb-1.5 ml-1 italic">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "At least 6 characters" },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message: "Must include Uppercase, Lowercase, Number & Symbol"
                                    }
                                })}
                                placeholder="Password@"
                                className="w-full px-4 py-3 bg-base-100 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3.5 text-neutral/30 hover:text-primary transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-error text-[10px] font-black mt-1 ml-2 uppercase italic tracking-tighter leading-tight">{errors.password.message}</p>}
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] italic transition-all shadow-xl active:scale-95 ${loading ? 'bg-base-300 cursor-not-allowed text-neutral/30' : 'bg-primary text-base-100 hover:bg-neutral hover:-translate-y-1'}`}
                    >
                        {loading ? "Processing..." : "Create Account"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-neutral/40 text-[10px] font-black uppercase tracking-widest italic">
                        Already have an account?{" "}
                        <Link state={from} to="/auth/login" className="text-primary/90 font-black hover:underline decoration-2 underline-offset-4">Login</Link>
                    </p>
                </div>

                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-base-300"></div>
                    <span className="text-neutral/30 text-[9px] font-black uppercase tracking-[0.3em] italic">Or continue with</span>
                    <div className="flex-1 h-px bg-base-300"></div>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-base-100 border border-base-300 py-3 rounded-2xl hover:bg-neutral hover:text-white transition-all font-black text-[10px] uppercase tracking-widest italic group shadow-sm"
                >
                    <FcGoogle size={20} className="group-hover:scale-110 transition-transform" />
                    <span>Register with Google</span>
                </button>
            </div>
        </div>
    );
};

export default Register;