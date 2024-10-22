import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

interface FarmDetails {
  FarmId: number;
  FarmName: string;
  Location: string;
  Description: string;
  Price: number;
  ImageUrl: string;
}

const CheckOut: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const farmDetails: FarmDetails = {
    FarmId: 1,
    FarmName: "Koi Farm",
    Location: "123 Farm Road",
    Description: "Best farm ever",
    Price: 200,
    ImageUrl: "/api/placeholder/300/200",
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setShowNotification(true);
  };

  useEffect(() => {
    if (isSubmitted) {
      const timeoutId = setTimeout(() => {
        setIsSubmitted(false);
        setShowNotification(false);
        navigate("/");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [isSubmitted, navigate]);

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Success Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg transition-all duration-500 ease-in-out transform translate-y-0 z-50">
          <div className="flex items-center space-x-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium">Payment successful!</span>
          </div>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section - Customer Info & Trip Details */}
        <div className="space-y-6">
          {/* Personal Information Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Contact details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={customerInfo.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={customerInfo.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Trip Details Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Farm Name:</p>
                <p className="text-gray-700">{farmDetails.FarmName}</p>
              </div>
              <div>
                <p className="font-semibold">Location:</p>
                <p className="text-gray-700">{farmDetails.Location}</p>
              </div>
              <div>
                <p className="font-semibold">Description:</p>
                <p className="text-gray-700">{farmDetails.Description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary & Payment */}
        <div className="space-y-6">
          {/* Order Summary Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={farmDetails.ImageUrl}
                  alt={farmDetails.FarmName}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{farmDetails.FarmName}</h3>
                  <p className="text-sm text-gray-600">
                    {farmDetails.Location}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <div className="space-y-2">
                <label
                  htmlFor="promoCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Promo Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="promoCode"
                    placeholder="Enter promo code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${farmDetails.Price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${(farmDetails.Price * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(farmDetails.Price * 1.1).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="expiryDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors mt-4"
                disabled={isSubmitted}
              >
                {isSubmitted ? "Processing..." : "Complete Purchase"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
