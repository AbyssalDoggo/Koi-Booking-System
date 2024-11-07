import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../components/AdminLayout";

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    fetchTripDetails();
  }, [id]);

  const fetchTripDetails = async () => {
    try {
      const response = await fetch(`https://localhost:7043/api/Trips/${id}`); // Replace with your API endpoint
      if (!response.ok) throw new Error("Failed to fetch trip details");
      const data = await response.json();
      setTrip(data.Data);
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

  if (!trip) return null;

  return (
    <AdminLayout userRole={userRole}>
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/trips")}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Trips
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-bold">{trip.MeetingLocation}</h1>
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  trip.Status === "Scheduled"
                    ? "bg-blue-100 text-blue-800"
                    : trip.Status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {trip.Status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">Date</p>
                    <p className="font-medium">{formatDate(trip.TripDate)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Duration</p>
                    <p className="font-medium">{trip.Duration}</p>
                  </div>
                  {/* <div>
                    <p className="text-gray-600">Price</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatPrice(trip.Price)}
                    </p>
                  </div> */}
                  <div>
                    <p className="text-gray-600">Transportation</p>
                    <p className="font-medium">{trip.Transportation}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Meeting Location</p>
                    <p className="font-medium">{trip.MeetingLocation}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Participants</p>
                    <p className="font-medium">
                      Min: {trip.MinParticipants} - Max: {trip.MaxParticipants}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Additional Information
                </h2>
                <div className="space-y-4">
                  {trip.SpecialInstructions && (
                    <div>
                      <p className="text-gray-600">Special Instructions</p>
                      <p className="font-medium">{trip.SpecialInstructions}</p>
                    </div>
                  )}
                  {trip.CancellationPolicy && (
                    <div>
                      <p className="text-gray-600">Cancellation Policy</p>
                      <p className="font-medium">{trip.CancellationPolicy}</p>
                    </div>
                  )}
                  {trip.AverageRating && (
                    <div>
                      <p className="text-gray-600">Average Rating</p>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, index) => (
                            <svg
                              key={index}
                              className={`w-5 h-5 ${
                                index < Math.floor(trip.AverageRating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-gray-600">
                            {trip.AverageRating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TripDetail;
