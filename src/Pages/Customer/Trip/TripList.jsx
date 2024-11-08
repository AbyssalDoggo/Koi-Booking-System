import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../components/AdminLayout";

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await fetch("https://localhost:7043/api/Trips"); // Replace with your API endpoint
      if (!response.ok) throw new Error("Failed to fetch trips");
      const data = await response.json();
      setTrips(data.Data);
    } catch (err) {}
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <AdminLayout userRole={userRole}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Available Trips</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div
              key={trip.TripId}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate(`/trips/${trip.TripId}`)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold">
                    {trip.MeetingLocation}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      trip.Status
                    )}`}
                  >
                    {trip.Status}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Date:</span>{" "}
                    {formatDate(trip.TripDate)}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Duration:</span>{" "}
                    {trip.Duration}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Transport:</span>{" "}
                    {trip.Transportation}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Available Spots:</span>{" "}
                    {trip.MaxParticipants}
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {formatPrice(trip.Price)}
                  </p>
                  {trip.AverageRating && (
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-gray-600">
                        {trip.AverageRating.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default TripList;
