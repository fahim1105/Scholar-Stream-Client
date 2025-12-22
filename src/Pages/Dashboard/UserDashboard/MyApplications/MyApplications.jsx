import React from 'react';
import { useQuery } from '@tanstack/react-query'

import { Pencil, ReceiptText, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import UseAuth from '../../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecure';

const MyApplications = () => {

    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const { data: applications = [], refetch } = useQuery({
        queryKey: ['myApplications', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications?email=${user.email}`)
            return res.data;
        }
    })

    const handleApplicationDelete = async (id) => {
        Swal.fire({
            title: "Are you absolutely sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            reverseButtons: true,
            focusCancel: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#ef4444",
            background: "#f8fafc",
            color: "#0f172a",
            showClass: {
                popup: "animate__animated animate__fadeInDown"
            },
            hideClass: {
                popup: "animate__animated animate__fadeOutUp"
            }
        }).then(async (result) => {
            if (!result.isConfirmed) return;

            try {
                // Show loading modal BEFORE deletion
                Swal.fire({
                    title: "Deleting...",
                    text: "Please wait a moment",
                    allowOutsideClick: false,
                    didOpen: () => Swal.showLoading()
                });

                // delete from backend
                const res = await axiosSecure.delete(`/parcels/${id}`);

                if (res.data.deletedCount) {
                    // refresh  new data
                    refetch()

                    await new Promise(resolve => setTimeout(resolve, 800)); // small delay for UX

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your parcel has been successfully deleted.",
                        icon: "success",
                        confirmButtonColor: "#16a34a"
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete the parcel.",
                        icon: "error",
                        confirmButtonColor: "#ef4444"
                    });
                }

            } catch (err) {
                console.log(err);
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong.",
                    icon: "error",
                    confirmButtonColor: "#ef4444"
                });
            }
        });
    };
    const handlePayment = async (parcel) => {

        const paymentInfo = {
            cost: parcel.cost,
            parcelName: parcel.parcelName,
            senderEmail: parcel.senderEmail,
            parcelId: parcel._id
        }
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
        console.log(res.data)
        window.location.assign(res.data.url)
    }

    return (
        <div>
            My all parcels here {applications.length}
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Scholarship Name</th>
                            <th>University Name</th>
                            <th>Application Fees</th>
                            <th>Payment Status</th>
                            <th>Application Status</th>
                            <th>Feedback</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applications.map((application, index) =>
                                <tr key={application._id}>
                                    <td>{index + 1}</td>
                                    <td>{application.scholarshipName}</td>
                                    <td>{application.universityName}</td>
                                    <td>{application.amountPaid}</td>
                                    <td>
                                        {
                                            application.paymentStatus === 'paid' ?
                                                <span className='bg-green-500 rounded-3xl px-3 py-2 text-accent'>Paid</span>
                                                :
                                                <button onClick={() => handlePayment(application)} className='btn btn-sm btn-primary text-accent'>Pay Now</button>
                                            // <button onClick={() => handlePayment(parcel)} className='btn btn-sm btn-primary text-accent'>Pay Now</button>
                                        }
                                    </td>
                                    <td>{application.status}</td>
                                    <td>{application.feedback}</td>
                                    <td className='flex gap-2'>
                                        <button className='btn btn-square hover:bg-primary'>
                                            <Pencil />
                                        </button>
                                        <button className='btn btn-square hover:bg-primary'>
                                            <ReceiptText />
                                        </button>
                                        <button className='btn btn-square hover:bg-primary'>
                                            <ReceiptText />
                                        </button>
                                        <button className='btn btn-square hover:bg-primary'>
                                            <ReceiptText />
                                        </button>
                                        <button onClick={() => handleApplicationDelete(application._id)} className='btn btn-square hover:bg-primary'>
                                            <Trash2 />
                                        </button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyApplications;