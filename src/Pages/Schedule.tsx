import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Quote {
  id: number;
  destination: string;
  departureDate: string;
  returnDate: string;
  totalPrice: number;
  status: "Pending" | "Waiting for instructions" | "Organized";
}

const Schedule: React.FC = () => {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const mockQuotes: Quote[] = [
      {
        id: 1,
        destination: "Koito Farm",
        departureDate: "2024-06-15",
        returnDate: "2024-06-22",
        totalPrice: 2500,
        status: "Pending",
      },
      {
        id: 2,
        destination: "Niigata Farm",
        departureDate: "2024-07-10",
        returnDate: "2024-07-20",
        totalPrice: 3800,
        status: "Waiting for instructions",
      },
      {
        id: 3,
        destination: "Niigata Farm",
        departureDate: "2024-07-10",
        returnDate: "2024-07-20",
        totalPrice: 4000,
        status: "Organized",
      },
    ];

    setQuotes(mockQuotes);
  }, []);

  const handleQuoteClick = (quoteId: number) => {
    navigate(`/tripProcess/${quoteId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Trip Schedule</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quotes.map((quote) => (
          <div
            key={quote.id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => handleQuoteClick(quote.id)}
          >
            <h2 className="text-xl font-semibold mb-2">{quote.destination}</h2>
            <p className="text-gray-600">
              {quote.departureDate} - {quote.returnDate}
            </p>
            <p className="text-lg font-bold mt-2">
              ${quote.totalPrice.toLocaleString()}
            </p>
            <p
              className={`mt-2 inline-block px-2 py-1 rounded-full text-sm ${
                quote.status === "Organized"
                  ? "bg-green-200 text-green-800"
                  : quote.status === "Waiting for instructions"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-gray-200 text-black"
              }`}
            >
              {quote.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
