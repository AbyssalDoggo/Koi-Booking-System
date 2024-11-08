// UserBookings.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const userId = localStorage.getItem("userId");

  const fetchUserBookings = async () => {
    try {
      const response = await fetch(
        `https://localhost:7043/api/OrderTrips/${userId}`
      );
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      setBookings(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      <div className="grid grid-cols-1 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.orderTripId}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Booking #{booking.orderTripId}
                  </h2>
                  <p className="text-gray-600">
                    Order Date: {formatDate(booking.orderDate)}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
              </div>

              {booking.schedule && (
                <div className="mb-4">
                  <p className="text-gray-600">Trip Dates:</p>
                  <p className="font-medium">
                    {formatDate(booking.schedule.startDate)} -{" "}
                    {formatDate(booking.schedule.endDate)}
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center mt-4">
                <p className="text-xl font-bold text-blue-600">
                  {formatPrice(booking.totalPrice)}
                </p>
                <button
                  onClick={() => navigate(`/mybookings/${booking.orderTripId}`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">
              You don't have any bookings yet.
            </p>
            <button
              onClick={() => navigate("/trips")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Browse Trips
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookings;
