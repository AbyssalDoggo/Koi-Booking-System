import React, { useState, useEffect } from "react";
import axios from "axios";
import { Clock, MapPin, Users, Star } from "lucide-react";

// Available Tours List Component
const ToursList = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://localhost:7043/api/Trips");
        setTours(response.data.Data);
      } catch (err) {
        setError("Failed to load tours. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {tours.map((tour) => (
        <div
          key={tour.tripId}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
        >
          <div className="border-b pb-2 mb-4">
            <h3 className="text-xl font-bold">{tour.tripName}</h3>
            <div className="flex items-center space-x-2 text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{tour.duration}</span>
            </div>
          </div>
          <div>
            <img
              src="/api/placeholder/400/200"
              alt="Tour preview"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{tour.meetingLocation}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span>Max {tour.maxParticipants} participants</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>
                  {tour.averageRating
                    ? tour.averageRating.toFixed(1)
                    : "No ratings"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4 pt-2 border-t">
            <div className="text-xl font-bold">${tour.price}</div>
            <button
              onClick={() => (window.location.href = `/book/${tour.tripId}`)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const BookingForm = ({ tripId }) => {
  const [trip, setTrip] = useState(null);
  const [formData, setFormData] = useState({
    customerId: "", // This would come from your auth system
    specialRequests: "",
    participants: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7043/api/Trips/${tripId}`
        );
        setTrip(response.data);
      } catch (err) {
        setError("Failed to load trip details.");
      }
    };

    fetchTripDetails();
  }, [tripId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const orderData = {
        ...formData,
        tripId,
        orderDate: new Date().toISOString(),
        status: "Pending",
      };

      await axios.post("https://localhost:7043/api/OrderTrips", orderData);
      window.location.href = "/booking-confirmation";
    } catch (err) {
      setError("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!trip) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-2xl font-bold">Book Your Tour</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Participants
          </label>
          <input
            type="number"
            min="1"
            max={trip.maxParticipants}
            value={formData.participants}
            onChange={(e) =>
              setFormData({ ...formData, participants: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Special Requests
          </label>
          <textarea
            value={formData.specialRequests}
            onChange={(e) =>
              setFormData({ ...formData, specialRequests: e.target.value })
            }
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
        >
          {loading ? "Submitting..." : "Request Booking"}
        </button>
      </form>
    </div>
  );
};

// Sales Staff Dashboard Component
const SalesStaffDashboard = () => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingRequests = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7043/api/OrderTrips"
        );
        setBookingRequests(response.data.Data);
      } catch (err) {
        setError("Failed to load booking requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingRequests();
  }, []);

  const handleAssignSchedule = async (orderId, scheduleId) => {
    try {
      await axios.patch(`/api/orders/${orderId}`, {
        scheduleId,
        status: "Confirmed",
      });

      // Refresh booking requests
      const response = await axios.get("/api/orders?status=Pending");
      setBookingRequests(response.data);
    } catch (err) {
      setError("Failed to assign schedule.");
    }
  };

  const fetchSchedulesForTrip = async (tripId) => {
    try {
      const response = await axios.get(`/api/trips/${tripId}/schedules`);
      setSchedules(response.data);
    } catch (err) {
      setError("Failed to load schedules.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Pending Booking Requests</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="space-y-6">
        {bookingRequests.map((booking) => (
          <div
            key={booking.orderTripId}
            className="p-4 border rounded-lg shadow"
          >
            <div className="border-b border-gray-200 pb-2 mb-4">
              <h3 className="text-xl font-bold">
                Booking #{booking.orderTripId}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Customer Details</h4>
                <p>
                  Order Date: {new Date(booking.orderDate).toLocaleDateString()}
                </p>
                <p>Special Requests: {booking.specialRequests || "None"}</p>
              </div>
              <div>
                <h4 className="font-semibold">Assign Schedule</h4>
                <select
                  onChange={(e) =>
                    handleAssignSchedule(booking.orderTripId, e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a schedule
                  </option>
                  {schedules.map((schedule) => (
                    <option
                      key={schedule.scheduleId}
                      value={schedule.scheduleId}
                    >
                      {new Date(schedule.startDate).toLocaleDateString()} -
                      {new Date(schedule.endDate).toLocaleDateString()}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => fetchSchedulesForTrip(booking.tripId)}
                  className="mt-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  View Available Schedules
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { BookingForm, SalesStaffDashboard, ToursList };
