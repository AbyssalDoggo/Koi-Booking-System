import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../services/FirebaseConfig";

interface FarmDetails {
  FarmId: number;
  FarmName: string;
  Location: string;
  Description: string;
  OwnerName: string;
  ContactEmail: string;
  ContactPhone: string;
  EstablishedYear: number;
  AreaSize: number;
  IsActive: boolean;
  Rating: number;
  Website: string;
  CreatedDate: string;
  UpdatedDate: string;
  ImageFarm: string | null;
  KoiFishes: any[];
}

const FarmDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [farmDetails, setFarmDetails] = useState<FarmDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmDetails = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7043/api/Farms/${id}`
        );
        const data = response.data;
        if (data.Status === 1 && data.Data) {
          let farmData = data.Data;

          if (farmData.ImageFarm) {
            try {
              const imageRef = ref(storage, farmData.ImageFarm);
              const imageUrl = await getDownloadURL(imageRef);
              farmData = { ...farmData, ImageFarm: imageUrl };
            } catch (error) {
              console.error("Error loading farm image:", error);
            }
          }

          setFarmDetails(farmData);
        }
      } catch (error) {
        console.error("Error fetching farm details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFarmDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!farmDetails) {
    return <div className="text-center mt-8">Farm not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative h-64 bg-gray-200">
          {farmDetails.ImageFarm ? (
            <img
              src={farmDetails.ImageFarm}
              alt={farmDetails.FarmName}
              className="w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          <div className="absolute top-4 right-4">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                farmDetails.IsActive
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {farmDetails.IsActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              {farmDetails.FarmName}
            </h1>
            <div className="flex items-center bg-yellow-100 px-3 py-1 rounded">
              <span className="text-yellow-500 mr-1">★</span>
              <span>{farmDetails.Rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Farm Information</h2>
                <p className="text-gray-600">
                  <strong>Location:</strong> {farmDetails.Location}
                </p>
                <p className="text-gray-600">
                  <strong>Description:</strong> {farmDetails.Description}
                </p>
                <p className="text-gray-600">
                  <strong>Area Size:</strong> {farmDetails.AreaSize} hectares
                </p>
                <p className="text-gray-600">
                  <strong>Established:</strong> {farmDetails.EstablishedYear}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Contact Information
                </h2>
                <p className="text-gray-600">
                  <strong>Owner:</strong> {farmDetails.OwnerName}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {farmDetails.ContactEmail}
                </p>
                <p className="text-gray-600">
                  <strong>Phone:</strong> {farmDetails.ContactPhone}
                </p>
                {farmDetails.Website && (
                  <p className="text-gray-600">
                    <strong>Website:</strong>{" "}
                    <a
                      href={farmDetails.Website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      {farmDetails.Website}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            <button
              onClick={() => navigate("/tripBooking")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
            >
              Book Now
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-lg transition duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmDetail;
