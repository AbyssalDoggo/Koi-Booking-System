import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

interface Activity {
  time: string;
  description: string;
  location: string;
}

interface DaySchedule {
  day: number;
  date: string;
  activities: Activity[];
}

interface TourItinerary {
  id: string;
  title: string;
  meetingPoint: string;
  meetingTime: string;
  checkInTime: string;
  checkOutTime: string;
  dailySchedule: DaySchedule[];
  additionalNotes: string;
  createdAt: string;
  tourGuide: string;
  totalParticipants: number;
}

const ManageItinerary: React.FC = () => {
  const navigate = useNavigate();
  const [itineraries] = useState<TourItinerary[]>([
    {
      id: "1",
      title: "City Explorer Tour",
      meetingPoint: "Central Station",
      meetingTime: "09:00",
      checkInTime: "08:30",
      checkOutTime: "17:00",
      tourGuide: "John Smith",
      totalParticipants: 12,
      dailySchedule: [
        {
          day: 1,
          date: "2024-11-10",
          activities: [
            {
              time: "09:30",
              description: "Historical Walking Tour",
              location: "City Center",
            },
          ],
        },
      ],
      additionalNotes: "Comfortable walking shoes recommended",
      createdAt: "2024-11-01",
    },
    {
      id: "2",
      title: "Mountain Adventure Tour",
      meetingPoint: "Mountain Base Camp",
      meetingTime: "07:00",
      checkInTime: "06:30",
      checkOutTime: "16:00",
      tourGuide: "Sarah Johnson",
      totalParticipants: 8,
      dailySchedule: [
        {
          day: 1,
          date: "2024-11-15",
          activities: [
            {
              time: "08:00",
              description: "Mountain Hiking",
              location: "Trail Head",
            },
          ],
        },
      ],
      additionalNotes: "Bring warm clothing and hiking boots",
      createdAt: "2024-11-02",
    },
  ]);

  const [expandedItineraryId, setExpandedItineraryId] = useState<string | null>(
    null
  );

  const toggleItineraryDetails = (id: string) => {
    setExpandedItineraryId(expandedItineraryId === id ? null : id);
  };

  const handleCreateNew = () => {
    navigate("/createItinerary");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-white font-bold">Manage Itineraries</h1>
        <button
          onClick={handleCreateNew}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create New Itinerary
        </button>
      </div>

      <div className="space-y-4">
        {itineraries.map((itinerary) => (
          <div
            key={itinerary.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div
              className="p-4 cursor-pointer flex justify-between items-center"
              onClick={() => toggleItineraryDetails(itinerary.id)}
            >
              <div>
                <h2 className="text-lg font-semibold">{itinerary.title}</h2>
                <p className="text-sm text-gray-600">
                  Created on{" "}
                  {new Date(itinerary.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <Calendar size={16} />
                <span>
                  {itinerary.dailySchedule[0].date} -{" "}
                  {
                    itinerary.dailySchedule[itinerary.dailySchedule.length - 1]
                      .date
                  }
                </span>
              </div>
            </div>

            {expandedItineraryId === itinerary.id && (
              <div className="p-4 bg-gray-50 border-t">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-600" />
                      <p>
                        <strong>Meeting Time:</strong> {itinerary.meetingTime}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-600" />
                      <p>
                        <strong>Meeting Point:</strong> {itinerary.meetingPoint}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-gray-600" />
                      <p>
                        <strong>Participants:</strong>{" "}
                        {itinerary.totalParticipants}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <strong>Check-in:</strong> {itinerary.checkInTime}
                    </p>
                    <p>
                      <strong>Check-out:</strong> {itinerary.checkOutTime}
                    </p>
                    <p>
                      <strong>Tour Guide:</strong> {itinerary.tourGuide}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <strong>Additional Notes:</strong>
                  <p className="text-gray-600">{itinerary.additionalNotes}</p>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => navigate(`/itinerary/${itinerary.id}`)}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {itineraries.length === 0 && (
        <div className="text-center py-12 text-white">
          <p className="text-lg">No itineraries found.</p>
          <p className="mt-2">
            Click the 'Create New Itinerary' button to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageItinerary;
