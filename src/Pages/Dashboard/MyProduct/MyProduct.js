import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyProduct = () => {

    const { user } = useContext(AuthContext);

    const url = `https://market-thrifty-server.vercel.app/booking?email=${user?.email}`;

    const { data: bookings = [] } = useQuery({
        queryKey: ['booking', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('marketThrifty-token')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    return (
        <div>
            <h1 className='text-3xl mb-8'>My Bookings</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Device Name</th>
                            <th>Price</th>
                            <th>Phone Number</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, i) =>
                                <tr key={booking._id} className="hover">
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-10 rounded-full ring ring-violet-300 ring-offset-base-100 ring-offset-2">
                                                <img alt='' src={booking.img} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{booking.customerName}</td>
                                    <td>{booking.phoneName}</td>
                                    <td>{booking.price}$ </td>
                                    <td>{booking.phone}</td>
                                    <td>
                                        {
                                            booking.price && !booking.paid &&
                                            <Link to={`/dashboard/payment/${booking._id}`}>
                                                <button className='btn btn-outline btn-sm btn-info'>
                                                    Pay
                                                </button>
                                            </Link>
                                        }
                                        {
                                            booking.price && booking.paid &&
                                            <span className='text-green-500 font-bold'>Paid</span>
                                        }
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProduct;