import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../../components/AdminLayout";

const BookingForm = () => {
  const { tripId } = useParams();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerId: userId,
    tripId: tripId,
    specialRequests: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://localhost:7043/api/OrderTrips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          orderDate: new Date(),
          status: "Pending",
        }),
      });

      if (!response.ok) throw new Error("Failed to submit booking");

      const data = await response.json();
      alert("Request submitted successfully!");
      navigate("/trips");
    } catch (error) {
      alert("Error submitting request: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const userRole = localStorage.getItem("userRole");

  return (
    <AdminLayout userRole={userRole}>
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-lg transition duration-200"
      >
        Go Back
      </button>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Reserve a seat</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="customerName"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Special Requests
              </label>
              <textarea
                name="specialRequests"
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-3 rounded-lg font-medium
              ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {loading ? "Submitting..." : "Send Request"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BookingForm;
