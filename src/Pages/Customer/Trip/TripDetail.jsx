import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../components/AdminLayout";

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);

  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    fetchTripDetails();
  }, [id]);

  const fetchTripDetails = async () => {
    try {
      const response = await fetch(`https://localhost:7043/api/Trips/${id}`);
      if (!response.ok) throw new Error("Failed to fetch trip details");
      const data = await response.json();
      setTrip(data.Data);
    } catch (err) {}
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

  if (!trip) return null;

  return (
    <AdminLayout userRole={userRole}>
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-lg transition duration-200 mb-5"
        >
          Go Back
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
                  <div>
                    <p className="text-gray-600">Price</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatPrice(trip.Price)}
                    </p>
                  </div>
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
                  <button
                    onClick={() => navigate(`/book`)}
                    className="mt-8 w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Book Now
                  </button>
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
