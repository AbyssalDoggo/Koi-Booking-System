import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Farm {
  FarmId: number;
  FarmName: string;
  Location: string;
  Description: string;
  Rating: number;
  ImageFarm: string | null;
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
          setFarms(response.data.Data);
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
    return <div className="text-center mt-8">Loading farms...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Koi Farms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farms.map((farm) => (
          <div
            key={farm.FarmId}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => handleFarmClick(farm.FarmId)}
          >
            <div className="h-48 bg-gray-200">
              {farm.ImageFarm && (
                <img
                  src={farm.ImageFarm}
                  alt={farm.FarmName}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{farm.FarmName}</h2>
              <p className="text-gray-600 mb-2">{farm.Location}</p>
              <p className="text-sm text-gray-500 mb-2 truncate">
                {farm.Description}
              </p>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span>{farm.Rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmDisplay;
