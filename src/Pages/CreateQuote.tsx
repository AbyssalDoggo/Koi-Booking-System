import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface QuoteRequest {
  id: number;
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

interface QuoteDetails {
  accommodationType: string;
  accommodationPrice: number;
  transportationType: string;
  transportationPrice: number;
  activities: string;
  activitiesPrice: number;
  guidePrice: number;
  additionalFees: number;
  discount: number;
}

const CreateQuote: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quoteRequest, setQuoteRequest] = useState<QuoteRequest | null>(null);
  const [quoteDetails, setQuoteDetails] = useState<QuoteDetails>({
    accommodationType: "",
    accommodationPrice: 0,
    transportationType: "",
    transportationPrice: 0,
    activities: "",
    activitiesPrice: 0,
    guidePrice: 0,
    additionalFees: 0,
    discount: 0,
  });

  useEffect(() => {
    const mockQuoteRequest: QuoteRequest = {
      id: 1,
      firstName: "Phan",
      lastName: "Tri",
      email: "sirisz2003@gmail.com",
      phoneNumber: "0907560789",
      numberOfPeople: 1,
      departureDate: "2024-05-01",
      returnDate: "2024-05-10",
      guideLanguage: "English",
      specialRequirements: "Vegetarian meals",
      address: {
        street: "123 Street",
        city: "Hcm",
        state: "CA",
        zipCode: "12345",
        country: "Vietnam",
      },
    };

    setQuoteRequest(mockQuoteRequest);
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setQuoteDetails((prev) => ({
      ...prev,
      [name]:
        name.includes("Price") ||
        name === "additionalFees" ||
        name === "discount"
          ? parseFloat(value)
          : value,
    }));
  };

  const calculateTotalPrice = () => {
    const {
      accommodationPrice,
      transportationPrice,
      activitiesPrice,
      guidePrice,
      additionalFees,
      discount,
    } = quoteDetails;
    const subtotal =
      accommodationPrice +
      transportationPrice +
      activitiesPrice +
      guidePrice +
      additionalFees;
    return subtotal - discount;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quote details:", {
      ...quoteDetails,
      totalPrice: calculateTotalPrice(),
    });
    navigate("/manageQuote");
  };

  if (!quoteRequest) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Create Quote for {quoteRequest.firstName} {quoteRequest.lastName}
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-2">Quote Request Details</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <p>
            <strong>Email:</strong> {quoteRequest.email}
          </p>
          <p>
            <strong>Phone:</strong> {quoteRequest.phoneNumber}
          </p>
          <p>
            <strong>Departure:</strong> {quoteRequest.departureDate}
          </p>
          <p>
            <strong>Return:</strong> {quoteRequest.returnDate}
          </p>
          <p>
            <strong>People:</strong> {quoteRequest.numberOfPeople}
          </p>
          <p>
            <strong>Guide Language:</strong> {quoteRequest.guideLanguage}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Accommodation Type</label>
              <select
                name="accommodationType"
                value={quoteDetails.accommodationType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Accommodation</option>
                <option value="hotel">Hotel</option>
                <option value="resort">Resort</option>
                <option value="villa">Villa</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Accommodation Price</label>
              <input
                type="number"
                name="accommodationPrice"
                value={quoteDetails.accommodationPrice}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Transportation Type</label>
              <select
                name="transportationType"
                value={quoteDetails.transportationType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Transportation</option>
                <option value="flight">Flight</option>
                <option value="train">Train</option>
                <option value="bus">Bus</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Transportation Price</label>
              <input
                type="number"
                name="transportationPrice"
                value={quoteDetails.transportationPrice}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Activities</label>
            <input
              type="text"
              name="activities"
              value={quoteDetails.activities}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Activities Price</label>
              <input
                type="number"
                name="activitiesPrice"
                value={quoteDetails.activitiesPrice}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Guide Price</label>
              <input
                type="number"
                name="guidePrice"
                value={quoteDetails.guidePrice}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Additional Fees</label>
              <input
                type="number"
                name="additionalFees"
                value={quoteDetails.additionalFees}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Discount</label>
              <input
                type="number"
                name="discount"
                value={quoteDetails.discount}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="text-xl font-semibold">
            Total Price: ${calculateTotalPrice().toFixed(2)}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit Quote
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuote;
