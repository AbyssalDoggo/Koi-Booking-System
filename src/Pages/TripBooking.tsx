import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface OrderTrip {
  OrderTripId: number;
  CustomerId: number;
  TripId: number;
  OrderDate: string | null;
  TotalPrice: number;
  Status: string | null;
  CreatedDate: string | null;
  UpdatedDate: string | null;
  CancellationReason: string | null;
  SpecialRequests: string | null;
}

const TripBooking: React.FC = () => {
  const navigate = useNavigate();
  const [orderTrip, setOrderTrip] = useState<OrderTrip>({
    OrderTripId: 0,
    CustomerId: 0,
    TripId: 0,
    OrderDate: null,
    TotalPrice: 0,
    Status: null,
    CreatedDate: null,
    UpdatedDate: null,
    CancellationReason: null,
    SpecialRequests: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOrderTrip((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the orderTrip data to your API
    console.log("Submitting order:", orderTrip);
    // After submission, you might want to navigate to a confirmation page
    // navigate('/confirmation');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trip Booking</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Details Section */}
            <section className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Contact Details</h2>
              <div className="space-y-2">
                <input
                  type="text"
                  name="CustomerName"
                  placeholder="Full Name"
                  className="w-full p-2 border rounded"
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  name="CustomerEmail"
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                  onChange={handleInputChange}
                />
                <input
                  type="tel"
                  name="CustomerPhone"
                  placeholder="Phone"
                  className="w-full p-2 border rounded"
                  onChange={handleInputChange}
                />
              </div>
            </section>

            {/* Activity Details Section */}
            <section className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Activity Details</h2>
              <div className="space-y-2">
                <input
                  type="date"
                  name="OrderDate"
                  className="w-full p-2 border rounded"
                  onChange={handleInputChange}
                />
                <textarea
                  name="SpecialRequests"
                  placeholder="Special Requests"
                  className="w-full p-2 border rounded"
                  rows={3}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </section>

            {/* Payment Details Section */}
            <section className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
              <div className="space-y-2">
                <input
                  type="text"
                  name="CardholderName"
                  placeholder="Cardholder Name"
                  className="w-full p-2 border rounded"
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="CardNumber"
                  placeholder="Card Number"
                  className="w-full p-2 border rounded"
                  onChange={handleInputChange}
                />
                <div className="flex space-x-2">
                  <input
                    type="text"
                    name="ExpiryDate"
                    placeholder="MM/YY"
                    className="w-1/2 p-2 border rounded"
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="CVV"
                    placeholder="CVV"
                    className="w-1/2 p-2 border rounded"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </section>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Book Trip
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/3 mt-4 md:mt-0">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            <div className="space-y-2">
              <p>Trip ID: {orderTrip.TripId}</p>
              <p>Total Price: ${orderTrip.TotalPrice.toFixed(2)}</p>
              <p>Status: {orderTrip.Status || "Pending"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripBooking;
