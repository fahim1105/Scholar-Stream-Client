import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query'
import Swal from 'sweetalert2';


const PaymentHistory = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure()

    const { data: payments = [], refetch: paymentsRefetch } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data

        }
    })
    // console.log(payments);

    const handleDeletePayment = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will delete all payment history!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete all !'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete('/payments')
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'All payment history has been deleted.',
                                'success'
                            );
                            paymentsRefetch(); // refetch payment history
                        }
                    })
                    .catch(() => {
                        Swal.fire(
                            'Error!',
                            'Something went wrong.',
                            'error'
                        );
                    });
            }
        });
    };


    return (
        <div>
            <h1 className="text-5xl"> Payment History: {payments.length}</h1>
            <button
                onClick={handleDeletePayment}
                className='btn bg-red-400 hover:bg-red-500 text-white px-3 py-1 my-5'>
                Delete All
            </button>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Transaction ID</th>
                            <th>Paid At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, index) => <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td>{payment.parcelName}</td>
                                <td>${payment.amount}</td>
                                <td>{payment.transactionId}</td>
                                <td>
                                    {new Date(payment.paidAt).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                        hour12: true
                                    })}
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;