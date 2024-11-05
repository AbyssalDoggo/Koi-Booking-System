import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface QuoteRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  numberOfPeople: number;
  departureDate: string;
  returnDate: string;
  guideLanguage: string;
  specialRequirements: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

const TripBooking: React.FC = () => {
  const navigate = useNavigate();
  const [quoteRequest, setQuoteRequest] = useState<QuoteRequest>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    numberOfPeople: 1,
    departureDate: "",
    returnDate: "",
    guideLanguage: "",
    specialRequirements: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");

      setQuoteRequest((prev) => {
        const parentValue = prev[parent as keyof QuoteRequest];

        if (typeof parentValue === "object" && parentValue !== null) {
          return {
            ...prev,
            [parent]: { ...parentValue, [child]: value },
          };
        }

        return prev;
      });
    } else {
      setQuoteRequest((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isSubmitted) {
      const timeoutId = setTimeout(() => {
        setIsSubmitted(false);
        navigate("/");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [isSubmitted, navigate]);

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-lg transition duration-200"
      >
        Go Back
      </button>
      <h1 className="text-2xl text-white font-bold mb-4">Trip Quote Request</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                className="w-full p-2 border rounded"
                value={quoteRequest.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="w-full p-2 border rounded"
                value={quoteRequest.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 border rounded"
                value={quoteRequest.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                className="w-full p-2 border rounded"
                value={quoteRequest.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Trip Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Number of People</label>
              <input
                type="number"
                name="numberOfPeople"
                className="w-full p-2 border rounded"
                value={quoteRequest.numberOfPeople}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Guide Language</label>
              <select
                name="guideLanguage"
                className="w-full p-2 border rounded"
                value={quoteRequest.guideLanguage}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Guide Language</option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="italian">Italian</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Departure Date</label>
              <input
                type="date"
                name="departureDate"
                className="w-full p-2 border rounded"
                value={quoteRequest.departureDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Return Date</label>
              <input
                type="date"
                name="returnDate"
                className="w-full p-2 border rounded"
                value={quoteRequest.returnDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700">
                Special Requirements
              </label>
              <textarea
                name="specialRequirements"
                className="w-full p-2 border rounded"
                rows={3}
                value={quoteRequest.specialRequirements}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Street Address</label>
              <input
                type="text"
                name="address.street"
                className="w-full p-2 border rounded"
                value={quoteRequest.address.street}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                name="address.city"
                className="w-full p-2 border rounded"
                value={quoteRequest.address.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">State/Province</label>
              <input
                type="text"
                name="address.state"
                className="w-full p-2 border rounded"
                value={quoteRequest.address.state}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Zip/Postal Code</label>
              <input
                type="text"
                name="address.zipCode"
                className="w-full p-2 border rounded"
                value={quoteRequest.address.zipCode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Country</label>
              <input
                type="text"
                name="address.country"
                className="w-full p-2 border rounded"
                value={quoteRequest.address.country}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Request Quote
        </button>
      </form>
      {isSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">Success!</h2>
            <p>Your request for a quote has been submitted successfully.</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripBooking;
