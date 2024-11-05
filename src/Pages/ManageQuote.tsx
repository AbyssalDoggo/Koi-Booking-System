import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const ManageQuote: React.FC = () => {
  const navigate = useNavigate();
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([
    {
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
    },
    {
      id: 2,
      firstName: "Bert",
      lastName: "To",
      email: "berto312@gmail.com",
      phoneNumber: "0904375354",
      numberOfPeople: 2,
      departureDate: "2024-05-01",
      returnDate: "2024-05-10",
      guideLanguage: "Italian",
      specialRequirements: "No special requests",
      address: {
        street: "123 Street",
        city: "Sein",
        state: "TA",
        zipCode: "99999",
        country: "Italy",
      },
    },
  ]);

  const [expandedQuoteId, setExpandedQuoteId] = useState<number | null>(null);

  const toggleQuoteDetails = (id: number) => {
    setExpandedQuoteId(expandedQuoteId === id ? null : id);
  };

  const handleCreateQuote = (id: number) => {
    navigate(`/createQuote/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-white font-bold mb-4">
        Manage Quote Requests
      </h1>
      <div className="space-y-4">
        {quoteRequests.map((quote) => (
          <div
            key={quote.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div
              className="p-4 cursor-pointer flex justify-between items-center"
              onClick={() => toggleQuoteDetails(quote.id)}
            >
              <div>
                <h2 className="text-lg font-semibold">
                  {quote.firstName} {quote.lastName}
                </h2>
                <p className="text-sm text-gray-600">{quote.email}</p>
              </div>
              <div className="text-sm text-gray-600">
                {quote.departureDate} - {quote.returnDate}
              </div>
            </div>
            {expandedQuoteId === quote.id && (
              <div className="p-4 bg-gray-50 border-t">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p>
                      <strong>Phone:</strong> {quote.phoneNumber}
                    </p>
                    <p>
                      <strong>People:</strong> {quote.numberOfPeople}
                    </p>
                    <p>
                      <strong>Guide Language:</strong> {quote.guideLanguage}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Address:</strong>
                    </p>
                    <p>{quote.address.street}</p>
                    <p>
                      {quote.address.city}, {quote.address.state}{" "}
                      {quote.address.zipCode}
                    </p>
                    <p>{quote.address.country}</p>
                  </div>
                </div>
                <p className="mt-2">
                  <strong>Special Requirements:</strong>{" "}
                  {quote.specialRequirements}
                </p>
                <button
                  onClick={() => handleCreateQuote(quote.id)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Create Quote
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageQuote;
