import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Divider from "../components/Divider";

interface QuoteDetails {
  id: number;
  destination: string;
  departureDate: string;
  returnDate: string;
  numberOfPeople: number;
  accommodationType: string;
  accommodationPrice: number;
  transportationType: string;
  transportationPrice: number;
  activities: string;
  activitiesPrice: number;
  guidePrice: number;
  additionalFees: number;
  discount: number;
  totalPrice: number;
  status: "Pending" | "Accepted" | "Rejected";
}

const TripProcess: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quoteDetails, setQuoteDetails] = useState<QuoteDetails | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("credit_card");

  useEffect(() => {
    const mockQuoteDetails: QuoteDetails = {
      id: 1,
      destination: "Niigata Farm",
      departureDate: "2024-06-15",
      returnDate: "2024-06-22",
      numberOfPeople: 2,
      accommodationType: "Hotel",
      accommodationPrice: 1200,
      transportationType: "Flight",
      transportationPrice: 800,
      activities: "Harvest Koi, Sightseeing",
      activitiesPrice: 300,
      guidePrice: 400,
      additionalFees: 100,
      discount: 300,
      totalPrice: 2500,
      status: "Pending",
    };

    setQuoteDetails(mockQuoteDetails);
  }, [id]);

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (!quoteDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trip Details and Payment</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/*Trip Details */}
        <div className="w-full md:w-2/3">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {quoteDetails.destination}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <p>
                <strong>Departure:</strong> {quoteDetails.departureDate}
              </p>
              <p>
                <strong>Return:</strong> {quoteDetails.returnDate}
              </p>
              <p>
                <strong>People:</strong> {quoteDetails.numberOfPeople}
              </p>
              <p>
                <strong>Status:</strong> {quoteDetails.status}
              </p>
            </div>
            <Divider />
            <h3 className="text-lg font-semibold mt-4 mb-2">Accommodation</h3>
            <p>
              {quoteDetails.accommodationType} - $
              {quoteDetails.accommodationPrice}
            </p>
            <h3 className="text-lg font-semibold mt-4 mb-2">Transportation</h3>
            <p>
              {quoteDetails.transportationType} - $
              {quoteDetails.transportationPrice}
            </p>
            <h3 className="text-lg font-semibold mt-4 mb-2">Activities</h3>
            <p>{quoteDetails.activities}</p>
            <p>Activities Cost: ${quoteDetails.activitiesPrice}</p>
            <h3 className="text-lg font-semibold mt-4 mb-2">
              Additional Costs
            </h3>
            <p>Guide: ${quoteDetails.guidePrice}</p>
            <p>Additional Fees: ${quoteDetails.additionalFees}</p>
            <p>Discount: -${quoteDetails.discount}</p>
          </div>
        </div>

        {/*Summary and Payment */}
        <div className="w-full md:w-1/3">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="space-y-2 mb-4">
              <p>
                <strong>Accommodation:</strong> $
                {quoteDetails.accommodationPrice}
              </p>
              <p>
                <strong>Transportation:</strong> $
                {quoteDetails.transportationPrice}
              </p>
              <p>
                <strong>Activities:</strong> ${quoteDetails.activitiesPrice}
              </p>
              <p>
                <strong>Guide:</strong> ${quoteDetails.guidePrice}
              </p>
              <p>
                <strong>Additional Fees:</strong> ${quoteDetails.additionalFees}
              </p>
              <p>
                <strong>Discount:</strong> -${quoteDetails.discount}
              </p>
              <Divider />

              <p className="text-xl font-bold">
                Total: ${quoteDetails.totalPrice}
              </p>
            </div>

            <form onSubmit={handlePaymentSubmit} className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
              <select
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                className="w-full p-2 border rounded mb-4"
              >
                <option value="credit_card">VnPay</option>
              </select>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Process Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripProcess;
