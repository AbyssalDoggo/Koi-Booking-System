// UserBookingDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BookingStatus = {
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
  Completed: "bg-blue-100 text-blue-800",
};

const UserBookingDetails = () => {
  const { orderTripId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookingDetails();
  }, [orderTripId]);

  const fetchBookingDetails = async () => {
    try {
      const response = await fetch(
        `https://localhost:7043/api/ordertrips/${orderTripId}`
      );
      if (!response.ok) throw new Error("Failed to fetch booking details");
      const data = await response.json();
      setBooking(data);
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

  if (!booking) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Booking Details</h1>
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              BookingStatus[booking.status]
            }`}
          >
            {booking.status}
          </span>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Booking Summary */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 mb-2">Booking ID</p>
                <p className="font-medium">#{booking.orderTripId}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Order Date</p>
                <p className="font-medium">{formatDate(booking.orderDate)}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Total Price</p>
                <p className="font-medium text-xl text-blue-600">
                  {formatPrice(booking.totalPrice)}
                </p>
              </div>
              {booking.specialRequests && (
                <div className="md:col-span-2">
                  <p className="text-gray-600 mb-2">Special Requests</p>
                  <p className="font-medium">{booking.specialRequests}</p>
                </div>
              )}
            </div>
          </div>

          {/* Trip Schedule */}
          {booking.schedule && (
            <div className="p-6 border-b bg-gray-50">
              <h2 className="text-xl font-semibold mb-4">Trip Schedule</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 mb-2">Schedule ID</p>
                  <p className="font-medium">#{booking.schedule.scheduleId}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-2">Trip Dates</p>
                  <p className="font-medium">
                    {formatDate(booking.schedule.startDate)} -{" "}
                    {formatDate(booking.schedule.endDate)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-2">Maximum Participants</p>
                  <p className="font-medium">
                    {booking.schedule.maxParticipants} people
                  </p>
                </div>
                {booking.schedule.isActive !== null && (
                  <div>
                    <p className="text-gray-600 mb-2">Status</p>
                    <p className="font-medium">
                      {booking.schedule.isActive ? (
                        <span className="text-green-600">Active</span>
                      ) : (
                        <span className="text-red-600">Inactive</span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Trip Details */}
          {booking.trip && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 mb-2">Trip ID</p>
                  <p className="font-medium">#{booking.trip.tripId}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-2">Meeting Location</p>
                  <p className="font-medium">{booking.trip.meetingLocation}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-2">Transportation</p>
                  <p className="font-medium">{booking.trip.transportation}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-2">Duration</p>
                  <p className="font-medium">{booking.trip.duration}</p>
                </div>
                {booking.trip.specialInstructions && (
                  <div className="md:col-span-2">
                    <p className="text-gray-600 mb-2">Special Instructions</p>
                    <p className="font-medium">
                      {booking.trip.specialInstructions}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate(`/trips/${booking.trip.tripId}`)}
                className="mt-6 text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                View Full Trip Details
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="p-6 bg-gray-50 border-t">
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={() => navigate("/mybookings")}
                className="px-6 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
              >
                Back to My Bookings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBookingDetails;
