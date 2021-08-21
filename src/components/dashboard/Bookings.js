import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';
import BookingRow from './BookingRow';

const Bookings = () => {

    const { loggedInUser } = useContext(userContext);

    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch('https://photo-pie.herokuapp.com/bookings')
            .then(res => res.json())
            .then(data => {
                setBookings(data);
                setLoading(false);
            });
    }, [loggedInUser.email]);

    return (
        <div className="bg-white rounded">
            <div className="container mx-auto py-6 p-2 sm:p-6 font-mono">
                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                    <th className="px-4 py-3">Service Name</th>
                                    <th className="px-4 py-3">Service Cost</th>
                                    <th className="px-4 py-3">Customer Email</th>
                                    <th className="px-4 py-3">Booking Date</th>
                                    <th className="px-4 py-3 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {
                                    bookings.map(booking => <BookingRow key={booking._id} booking={booking} />)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bookings;