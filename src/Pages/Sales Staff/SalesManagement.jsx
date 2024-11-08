import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";

const SalesManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    tripId: "",
    startDate: "",
    endDate: "",
    maxParticipants: "",
  });

  useEffect(() => {
    fetchBookings();
    fetchSchedules();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        "https://localhost:7043/api/OrderTrips?status=Pending"
      );
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      setBookings(data.Data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchSchedules = async () => {
    try {
      const response = await fetch("https://localhost:7043/api/TripSchedules");
      if (!response.ok) throw new Error("Failed to fetch schedules");
      const data = await response.json();
      setSchedules(data.Data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching schedules:", error);
      setLoading(false);
    }
  };

  const handleCreateSchedule = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7043/api/TripSchedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSchedule),
      });
      if (!response.ok) throw new Error("Failed to create schedule");
      const data = await response.json();
      setSchedules([...schedules, data]);
      setShowScheduleForm(false);
      setNewSchedule({
        tripId: "",
        startDate: "",
        endDate: "",
        maxParticipants: "",
      });
    } catch (error) {
      console.error("Error creating schedule:", error);
    }
  };

  const handleAssignSchedule = async (BookingId, ScheduleId) => {
    try {
      const response = await fetch(`/api/ordertrips/${BookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ScheduleId: ScheduleId,
          status: "Confirmed",
        }),
      });
      if (!response.ok) throw new Error("Failed to assign schedule");
      fetchBookings();
    } catch (error) {
      console.error("Error assigning schedule:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );

  const userRole = localStorage.getItem("userRole");

  return (
    <AdminLayout userRole={userRole}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Booking Management</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Requests */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Pending Bookings</h2>
            </div>

            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.OrderTripId}
                  className="bg-white rounded-lg shadow p-4"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">
                        Booking #{booking.OrderTripId}
                      </h3>
                      <p className="text-gray-600">Trip ID: {booking.TripId}</p>
                      <p className="text-gray-600">
                        Order Date: {formatDate(booking.OrderDate)}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                      {booking.status}
                    </span>
                  </div>

                  {booking.SpecialRequests && (
                    <div className="mb-4">
                      <p className="text-gray-600 text-sm">Special Requests:</p>
                      <p className="text-sm">{booking.SpecialRequests}</p>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Assign Schedule
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Schedules Management */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Itineraries</h2>
              <button
                onClick={() => setShowScheduleForm(!showScheduleForm)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Create New Itinerary
              </button>
            </div>

            {showScheduleForm && (
              <form
                onSubmit={handleCreateSchedule}
                className="bg-white rounded-lg shadow p-4 mb-4"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Trip ID
                    </label>
                    <input
                      type="number"
                      value={newSchedule.tripId}
                      onChange={(e) =>
                        setNewSchedule({
                          ...newSchedule,
                          tripId: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      required
                      value={newSchedule.startDate}
                      onChange={(e) =>
                        setNewSchedule({
                          ...newSchedule,
                          startDate: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      required
                      value={newSchedule.endDate}
                      onChange={(e) =>
                        setNewSchedule({
                          ...newSchedule,
                          endDate: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Max Participants
                    </label>
                    <input
                      type="number"
                      required
                      value={newSchedule.maxParticipants}
                      onChange={(e) =>
                        setNewSchedule({
                          ...newSchedule,
                          maxParticipants: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Create Schedule
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {schedules.map((schedule) => (
                <div
                  key={schedule.scheduleId}
                  className="bg-white rounded-lg shadow p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">
                        Schedule #{schedule.scheduleId}
                      </h3>
                      <p className="text-gray-600">
                        Trip ID: {schedule.tripId}
                      </p>
                      <p className="text-gray-600">
                        {formatDate(schedule.startDate)} -{" "}
                        {formatDate(schedule.endDate)}
                      </p>
                      <p className="text-gray-600">
                        Max Participants: {schedule.maxParticipants}
                      </p>
                    </div>
                    {selectedBooking && (
                      <button
                        onClick={() =>
                          handleAssignSchedule(
                            selectedBooking.OrderTripId,
                            schedule.ScheduleId
                          )
                        }
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Assign
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SalesManagement;
