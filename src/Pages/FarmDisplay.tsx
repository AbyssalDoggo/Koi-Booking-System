import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../services/FirebaseConfig";
import { format } from "date-fns";

interface Farm {
  FarmId: number;
  FarmName: string;
  Location: string;
  Description: string;
  Rating: number;
  ImageFarm: string | null;
  CreatedDate: string;
  OwnerName: string;
  IsActive: boolean;
}

const FarmDisplay: React.FC = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await axios.get("https://localhost:7043/api/Farms");
        if (response.data.Status === 1 && Array.isArray(response.data.Data)) {
          const farmsData = response.data.Data;

          // Fetch image URLs from Firebase for each farm
          const farmsWithImages = await Promise.all(
            farmsData.map(async (farm: Farm) => {
              if (farm.ImageFarm) {
                try {
                  const imageRef = ref(storage, farm.ImageFarm);
                  const imageUrl = await getDownloadURL(imageRef);
                  return { ...farm, ImageFarm: imageUrl };
                } catch (error) {
                  console.error(
                    `Error loading image for farm ${farm.FarmId}:`,
                    error
                  );
                  return farm;
                }
              }
              return farm;
            })
          );

          setFarms(farmsWithImages);
        } else {
          setError("Failed to fetch farm data");
        }
      } catch (err) {
        setError("An error occurred while fetching farm data");
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);

  const handleFarmClick = (farmId: number) => {
    navigate(`/farm/${farmId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-lg transition duration-200"
      >
        Go Back
      </button>
      <h1 className="text-3xl font-bold mb-6">Koi Farms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farms.map((farm) => (
          <div
            key={farm.FarmId}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => handleFarmClick(farm.FarmId)}
          >
            <div className="relative h-48 bg-gray-200">
              {farm.ImageFarm ? (
                <img
                  src={farm.ImageFarm}
                  alt={farm.FarmName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-200">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
              <div className="absolute top-2 right-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    farm.IsActive
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {farm.IsActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{farm.FarmName}</h2>
                <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="text-sm">{farm.Rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-2">{farm.Location}</p>
              <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                {farm.Description}
              </p>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span>Owner: {farm.OwnerName}</span>
                <span>{format(new Date(farm.CreatedDate), "MMM yyyy")}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmDisplay;
