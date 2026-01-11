import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import {
    FaTrashAlt,
    FaPlusCircle,
    FaLayerGroup,
    FaImage,
    FaHeading,
    FaPenNib,
    FaEdit,
    FaTimesCircle,
    FaCheckCircle
} from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa6';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Loader from '../../../Components/Loader/Loader';


const ManageBlogs = () => {
    const axiosSecure = UseAxiosSecure();
    const [editingId, setEditingId] = useState(null);
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    const { data: blogs = [], isLoading, refetch } = useQuery({
        queryKey: ['manage-blogs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/blogs');
            return res.data;
        }
    });

    const handleEditClick = (blog) => {
        setEditingId(blog._id);
        setValue("title", blog.title);
        setValue("category", blog.category);
        setValue("image", blog.image);
        setValue("description", blog.description);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        toast("Editing Mode Active", { icon: '📝' });
    };

    const cancelEdit = () => {
        setEditingId(null);
        reset();
    };

    const onSubmit = async (data) => {
        const loadingToast = toast.loading(editingId ? "Updating..." : "Publishing...");
        try {
            if (editingId) {
                const res = await axiosSecure.patch(`/blogs/${editingId}`, data);
                if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
                    toast.success("Blog Updated Successfully!", { id: loadingToast });
                    setEditingId(null);
                }
            } else {
                const res = await axiosSecure.post('/blogs', data);
                if (res.data.insertedId) {
                    toast.success("Blog Published Successfully!", { id: loadingToast });
                }
            }
            reset();
            refetch();
        } catch (error) {
            toast.error("Operation failed. Try again.", { id: loadingToast });
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete this article?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f87171",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, Delete It",
            background: 'var(--fallback-b1, #fff)',
            color: 'var(--fallback-bc, #000)',
            customClass: { popup: 'rounded-[2rem]' }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/blogs/${id}`);
                    if (res.data.deletedCount > 0) {
                        toast.success("Blog Deleted");
                        refetch();
                    }
                } catch (error) {
                    toast.error("Failed to delete");
                }
            }
        });
    };

    if (isLoading) return <Loader />;

    return (
        <div className="p-2 md:p-8 max-w-7xl mx-auto space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* --- EDITOR SECTION --- */}
            <section className={`relative overflow-hidden bg-base-100 p-5 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl border-2 transition-all duration-500 ${editingId ? 'border-primary/40 ring-4 ring-primary/5' : 'border-base-300'}`}>
                {editingId && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary animate-pulse"></div>
                )}

                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-10">
                        <div>
                            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-neutral">
                                {editingId ? "Refine your" : "Create"} <span className="text-primary italic">{editingId ? "Masterpiece" : "Magic"}</span>
                            </h2>
                            <p className="text-gray-500 font-medium mt-1 text-sm md:text-base">
                                {editingId ? "Adjusting details of your article." : "Share your wisdom with the world."}
                            </p>
                        </div>
                        <div className="hidden lg:block">
                            {editingId ? <FaEdit className="text-6xl text-primary/20 animate-bounce" /> : <FaPlusCircle className="text-6xl text-primary/10 rotate-12" />}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] md:text-sm font-bold ml-1 text-gray-400">
                                    <FaHeading className="text-primary" /> BLOG TITLE
                                </label>
                                <input
                                    type="text"
                                    {...register("title", { required: "Title is required" })}
                                    placeholder="captivating headline..."
                                    className="w-full px-4 py-3 md:py-4 bg-base-200 border-none rounded-xl md:rounded-2xl focus:ring-2 focus:ring-primary/50 transition-all font-semibold text-neutral text-sm md:text-base"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] md:text-sm font-bold ml-1 text-gray-400">
                                    <FaLayerGroup className="text-primary" /> CATEGORY
                                </label>
                                <div className="relative">
                                    <select
                                        {...register("category", { required: true })}
                                        className="w-full px-4 py-3 md:py-4 bg-base-200 border-none rounded-xl md:rounded-2xl focus:ring-2 focus:ring-primary/50 font-semibold appearance-none pr-12 text-neutral text-sm md:text-base"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Scholarship">Scholarship</option>
                                        <option value="Study Abroad">Study Abroad</option>
                                        <option value="Admission Guide">Admission Guide</option>
                                        <option value="Exam Preparation">Exam Preparation</option>
                                        <option value="Career Guidance">Career Guidance</option>
                                        <option value="Financial Aid">Financial Aid</option>
                                        <option value="Student Life">Student Life</option>
                                    </select>
                                    <FaChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-2">
                                <label className="flex items-center gap-2 text-[10px] md:text-sm font-bold ml-1 text-gray-400">
                                    <FaImage className="text-primary" /> COVER IMAGE URL
                                </label>
                                <input
                                    type="text"
                                    {...register("image", { required: "Image URL is required" })}
                                    className="w-full px-4 py-3 md:py-4 bg-base-200 border-none rounded-xl md:rounded-2xl focus:ring-2 focus:ring-primary/50 font-medium text-neutral text-sm md:text-base"
                                />
                            </div>

                            <div className="lg:col-span-2 space-y-2">
                                <label className="flex items-center gap-2 text-[10px] md:text-sm font-bold ml-1 text-gray-400">
                                    <FaPenNib className="text-primary" /> BLOG CONTENT
                                </label>
                                <textarea
                                    {...register("description", { required: "Content is required" })}
                                    className="w-full px-4 py-3 md:py-4 bg-base-200 border-none rounded-2xl md:rounded-3xl h-36 md:h-44 focus:ring-2 focus:ring-primary/50 font-medium resize-none text-neutral text-sm md:text-base"
                                    placeholder="Write details..."
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex flex-col-reverse md:flex-row justify-end gap-3 md:gap-4">
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="w-full md:w-auto px-6 py-3 md:py-4 bg-secondary text-neutral font-bold rounded-xl md:rounded-2xl hover:bg-base-200 transition-all flex items-center justify-center gap-2 text-sm"
                                >
                                    <FaTimesCircle /> Cancel
                                </button>
                            )}
                            <button type="submit" className="w-full md:w-auto px-8 py-3 md:py-4 bg-primary text-base-100 font-bold rounded-xl md:rounded-2xl shadow-xl active:scale-95 transition-all text-sm">
                                {editingId ? "Update Article" : "Publish Article"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* --- LISTING SECTION --- */}
            <section className="bg-base-100 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl border border-base-300 overflow-hidden mb-10">
                <div className="px-5 md:px-8 py-4 md:py-6 bg-base-200/50 flex justify-between items-center border-b border-base-300">
                    <h3 className="text-sm md:text-xl font-black tracking-tight uppercase">Live <span className="text-primary">Articles</span></h3>
                    <div className="badge badge-secondary badge-sm md:badge-lg font-bold">{blogs.length} Posts</div>
                </div>

                {/* Table View for Desktop / Card View for Mobile */}
                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-2 md:border-spacing-y-3 px-2 md:px-6 pb-6">
                        <thead className="hidden md:table-header-group">
                            <tr className="text-gray-400 uppercase text-[10px] tracking-[0.2em] border-none">
                                <th>Article Details</th>
                                <th>Category</th>
                                <th className="hidden lg:table-cell">Last Modified</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="flex flex-col md:table-row-group gap-4">
                            {blogs.map((blog) => (
                                <tr key={blog._id} className="group flex flex-col md:table-row bg-base-100 md:bg-transparent rounded-2xl border md:border-none border-base-300 p-4 md:p-0 transition-all duration-300 hover:bg-primary/5">
                                    
                                    {/* Column 1: Info */}
                                    <td className="md:bg-base-100 md:rounded-l-2xl md:border-y md:border-l md:border-base-300 p-0 md:p-4">
                                        <div className="flex items-center gap-3 md:gap-4">
                                            <div className="mask mask-squircle w-12 h-12 md:w-16 md:h-16 shadow-md border-2 border-white shrink-0">
                                                <img src={blog.image} alt="Cover" className="object-cover w-full h-full" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="font-black text-neutral line-clamp-1 text-sm md:text-base">{blog.title}</div>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                                                    <span className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase">Active</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Column 2: Category */}
                                    <td className="md:bg-base-100 md:border-y md:border-base-300 mt-3 md:mt-0 p-0 md:p-4">
                                        <div className="flex md:block">
                                            <span className="px-2.5 py-1 bg-primary/10 text-primary text-[9px] md:text-[10px] font-black rounded-lg uppercase border border-primary/10">
                                                {blog.category}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Column 3: Date (Hidden on mobile) */}
                                    <td className="hidden lg:table-cell md:bg-base-100 md:border-y md:border-base-300 font-bold text-gray-400 text-xs p-4">
                                        {new Date(blog.updatedAt || blog.createdAt).toLocaleDateString('en-GB')}
                                    </td>

                                    {/* Column 4: Actions */}
                                    <td className="md:bg-base-100 md:rounded-r-2xl md:border-y md:border-r md:border-base-300 p-0 md:p-4 mt-4 md:mt-0 border-t border-base-200 pt-3 md:border-none">
                                        <div className="flex justify-between md:justify-end items-center gap-2">
                                            <span className="md:hidden text-[10px] text-gray-400 font-bold">
                                                MODIFIED: {new Date(blog.updatedAt || blog.createdAt).toLocaleDateString('en-GB')}
                                            </span>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => handleEditClick(blog)}
                                                    className="btn btn-ghost btn-sm btn-circle text-primary hover:bg-primary/20"
                                                >
                                                    <FaEdit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(blog._id)}
                                                    className="btn btn-ghost btn-sm btn-circle text-error hover:bg-error/20"
                                                >
                                                    <FaTrashAlt size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {blogs.length === 0 && (
                    <div className="py-16 md:py-24 text-center flex flex-col items-center justify-center opacity-20 px-4">
                        <FaLayerGroup size={60} className="mb-4" />
                        <p className="text-xl md:text-2xl font-black uppercase tracking-widest">No Content Found</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ManageBlogs;