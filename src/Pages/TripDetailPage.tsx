import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface TripDetails {
  TripID: number;
  TripDate: string;
  Price: number;
  Duration: string;
  MaxParticipants: number;
  MinParticipants: number;
  Transportation: string;
  MeetingLocation: string;
  SpecialInstructions: string;
  Status: string;
}

const mockTripDetails: Record<number, TripDetails> = {
  1: {
    TripID: 1,
    TripDate: "2024-06-15",
    Price: 299.99,
    Duration: "3 days",
    MaxParticipants: 20,
    MinParticipants: 5,
    Transportation: "Bus",
    MeetingLocation: "Central Station",
    SpecialInstructions: "Bring comfortable walking shoes",
    Status: "Open",
  },
  2: {
    TripID: 2,
    TripDate: "2024-07-01",
    Price: 399.99,
    Duration: "5 days",
    MaxParticipants: 15,
    MinParticipants: 4,
    Transportation: "Van",
    MeetingLocation: "Airport Terminal 2",
    SpecialInstructions: "Pack for varying weather conditions",
    Status: "Almost Full",
  },
};

const TripDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);

  useEffect(() => {
    if (id) {
      // In a real application, you would fetch the trip details from an API
      // For this example, we're using the mock data
      const details = mockTripDetails[Number(id)];
      if (details) {
        setTripDetails(details);
      } else {
        // Handle case where trip is not found
        navigate("/not-found");
      }
    }
  }, [id, navigate]);

  const handleBooking = () => {
    // Implement booking logic here
    console.log(`Booking trip with ID: ${tripDetails?.TripID}`);
    // You could navigate to a booking page or open a modal
    // navigate('/booking');
  };

  if (!tripDetails) {
    return <div className="text-center mt-8">Loading trip details...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Trip Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Trip ID: {tripDetails.TripID}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p>
              <strong>Date:</strong> {tripDetails.TripDate}
            </p>
            <p>
              <strong>Price:</strong> ${tripDetails.Price.toFixed(2)}
            </p>
            <p>
              <strong>Duration:</strong> {tripDetails.Duration}
            </p>
            <p>
              <strong>Max Participants:</strong> {tripDetails.MaxParticipants}
            </p>
            <p>
              <strong>Min Participants:</strong> {tripDetails.MinParticipants}
            </p>
          </div>
          <div>
            <p>
              <strong>Transportation:</strong> {tripDetails.Transportation}
            </p>
            <p>
              <strong>Meeting Location:</strong> {tripDetails.MeetingLocation}
            </p>
            <p>
              <strong>Special Instructions:</strong>{" "}
              {tripDetails.SpecialInstructions}
            </p>
            <p>
              <strong>Status:</strong> {tripDetails.Status}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={handleBooking}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Book This Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripDetailPage;
