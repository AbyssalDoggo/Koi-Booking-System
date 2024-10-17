import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
}

const FarmDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [farmDetails, setFarmDetails] = useState<FarmDetails | null>(null);

  useEffect(() => {
    const fetchFarmDetails = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7043/api/Farms/${id}`
        );
        const data = response.data;
        if (data.Status === 1 && data.Data) {
          setFarmDetails(data.Data);
        }
      } catch (error) {
        console.error("Error fetching farm details:", error);
      }
    };

    if (id) {
      fetchFarmDetails();
    }
  }, [id, navigate]);

  if (!farmDetails) {
    return <div className="text-center mt-8">Loading farm details...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-white font-bold mb-6">
        {farmDetails.FarmName}
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p>
              <strong>Location:</strong> {farmDetails.Location}
            </p>
            <p>
              <strong>Description:</strong> {farmDetails.Description}
            </p>
            <p>
              <strong>Owner:</strong> {farmDetails.OwnerName}
            </p>
            <p>
              <strong>Established:</strong> {farmDetails.EstablishedYear}
            </p>
            <p>
              <strong>Area Size:</strong> {farmDetails.AreaSize} hectares
            </p>
          </div>
          <div>
            <p>
              <strong>Contact Email:</strong> {farmDetails.ContactEmail}
            </p>
            <p>
              <strong>Contact Phone:</strong> {farmDetails.ContactPhone}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={farmDetails.Website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {farmDetails.Website}
              </a>
            </p>
            <p>
              <strong>Rating:</strong> {farmDetails.Rating}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {farmDetails.IsActive ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={() => {
              navigate("/tripBooking");
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Book Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmDetail;
