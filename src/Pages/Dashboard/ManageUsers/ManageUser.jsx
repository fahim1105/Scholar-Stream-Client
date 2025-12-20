import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { RiDeleteBin5Fill } from "react-icons/ri";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loader from "../../../Components/Loader/Loader";

const ManageUsers = () => {
    const axiosSecure = UseAxiosSecure();

    // FETCH USERS
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    // DELETE USER
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "User will be permanently removed!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/users/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "User removed successfully", "success");
                    refetch();
                }
            }
        });
    };

    // CHANGE ROLE
    const handleRoleChange = (user, newRole) => {
        if (user.role === newRole) {
            return;
        }

        Swal.fire({
            title: "Change Role?",
            text: `${user.displayName} will be ${newRole}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, change",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/role/${user._id}`, { role: newRole });

                if (res.data.modifiedCount > 0) {
                    Swal.fire("Success!", "User role updated", "success");
                    refetch();
                }
            }
        });
    };

    if (isLoading) return <Loader />;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Manage Users</h2>

            <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
                <table className="table">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created At</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photoURL}
                                                    alt="user avatar"
                                                />
                                            </div>
                                        </div>
                                        <div className="font-semibold">
                                            {user.displayName}
                                        </div>
                                    </div>
                                </td>

                                <td>{user.email}</td>

                                <td>
                                    <span
                                        className={`px-4 py-1 rounded-full text-sm font-semibold text-white
                                        ${user.role === "admin"
                                                ? "bg-green-500"
                                                : user.role === "moderator"
                                                    ? "bg-yellow-500"
                                                    : "bg-gray-500"
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>

                                <td>
                                    {new Date(user.createdAt).toLocaleString()}
                                </td>

                                <td className="flex justify-center gap-2">
                                    {/* ROLE DROPDOWN */}
                                    <div>
                                        <button
                                            className="btn btn-sm btn-outline"
                                            popoverTarget={`popover-${user._id}`}
                                            style={{
                                                anchorName: `--anchor-${user._id}`,
                                            }}
                                        >
                                            Change Role
                                        </button>

                                        <ul
                                            className="dropdown menu w-44 rounded-box bg-base-100 shadow"
                                            popover="auto"
                                            id={`popover-${user._id}`}
                                            style={{
                                                positionAnchor: `--anchor-${user._id}`,
                                            }}
                                        >
                                            <li>
                                                <button
                                                    onClick={() =>
                                                        handleRoleChange(user, "student")
                                                    }
                                                >
                                                    Student
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() =>
                                                        handleRoleChange(user, "moderator")
                                                    }
                                                >
                                                    Moderator
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    disabled={user.role === "admin"}
                                                    onClick={() =>
                                                        handleRoleChange(user, "admin")
                                                    }
                                                >
                                                    Admin
                                                </button>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* DELETE */}
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="p-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all active:scale-90"
                                    >
                                        <RiDeleteBin5Fill className="text-lg" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;