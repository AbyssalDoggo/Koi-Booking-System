import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
  meetingPoint: string;
  meetingTime: string;
  checkInTime: string;
  checkOutTime: string;
  dailySchedule: DaySchedule[];
  additionalNotes: string;
}

const CreateTourItinerary: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState<TourItinerary>({
    meetingPoint: "",
    meetingTime: "",
    checkInTime: "",
    checkOutTime: "",
    dailySchedule: [
      {
        day: 1,
        date: "",
        activities: [{ time: "", description: "", location: "" }],
      },
    ],
    additionalNotes: "",
  });

  const handleBasicInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setItinerary((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDayChange = (dayIndex: number, field: string, value: string) => {
    setItinerary((prev) => ({
      ...prev,
      dailySchedule: prev.dailySchedule.map((day, index) =>
        index === dayIndex ? { ...day, [field]: value } : day
      ),
    }));
  };

  const handleActivityChange = (
    dayIndex: number,
    activityIndex: number,
    field: string,
    value: string
  ) => {
    setItinerary((prev) => ({
      ...prev,
      dailySchedule: prev.dailySchedule.map((day, dIndex) =>
        dIndex === dayIndex
          ? {
              ...day,
              activities: day.activities.map((activity, aIndex) =>
                aIndex === activityIndex
                  ? { ...activity, [field]: value }
                  : activity
              ),
            }
          : day
      ),
    }));
  };

  const addDay = () => {
    setItinerary((prev) => ({
      ...prev,
      dailySchedule: [
        ...prev.dailySchedule,
        {
          day: prev.dailySchedule.length + 1,
          date: "",
          activities: [{ time: "", description: "", location: "" }],
        },
      ],
    }));
  };

  const addActivity = (dayIndex: number) => {
    setItinerary((prev) => ({
      ...prev,
      dailySchedule: prev.dailySchedule.map((day, index) =>
        index === dayIndex
          ? {
              ...day,
              activities: [
                ...day.activities,
                { time: "", description: "", location: "" },
              ],
            }
          : day
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted itinerary:", itinerary);
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="border rounded-lg shadow-lg p-6 bg-white">
        <div className="text-2xl font-semibold mb-6">Create Tour Itinerary</div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meeting Point
              </label>
              <input
                type="text"
                name="meetingPoint"
                value={itinerary.meetingPoint}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meeting Time
              </label>
              <input
                type="time"
                name="meetingTime"
                value={itinerary.meetingTime}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-in Time
              </label>
              <input
                type="time"
                name="checkInTime"
                value={itinerary.checkInTime}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-out Time
              </label>
              <input
                type="time"
                name="checkOutTime"
                value={itinerary.checkOutTime}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>

          {/* Daily Schedule */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Daily Schedule</h3>
            {itinerary.dailySchedule.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="border rounded-lg p-4 space-y-4 bg-gray-50"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Day {day.day}
                    </label>
                    <input
                      type="date"
                      value={day.date}
                      onChange={(e) =>
                        handleDayChange(dayIndex, "date", e.target.value)
                      }
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                </div>

                {/* Activities */}
                <div className="space-y-4">
                  {day.activities.map((activity, activityIndex) => (
                    <div
                      key={activityIndex}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-md"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Time
                        </label>
                        <input
                          type="time"
                          value={activity.time}
                          onChange={(e) =>
                            handleActivityChange(
                              dayIndex,
                              activityIndex,
                              "time",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <input
                          type="text"
                          value={activity.description}
                          onChange={(e) =>
                            handleActivityChange(
                              dayIndex,
                              activityIndex,
                              "description",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={activity.location}
                          onChange={(e) =>
                            handleActivityChange(
                              dayIndex,
                              activityIndex,
                              "location",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded-md"
                          required
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addActivity(dayIndex)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Add Activity
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addDay}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add Day
            </button>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              name="additionalNotes"
              value={itinerary.additionalNotes}
              onChange={handleBasicInfoChange}
              className="w-full p-2 border rounded-md"
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            Create Itinerary
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTourItinerary;
