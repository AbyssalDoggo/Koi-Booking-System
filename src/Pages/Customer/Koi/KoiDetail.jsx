import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import img from "../../../assets/Koi1.png";

const KoiDetail = () => {
  const { id } = useParams();
  const [koi, setKoi] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKoiDetail = async () => {
      try {
        const response = await fetch(
          `https://localhost:7043/api/KoiFish/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Koi fish data");
        }
        const data = await response.json();
        setKoi(data.Data);
      } catch (err) {
        console.error("Error fetching Koi fish data:", err);
      }
    };

    fetchKoiDetail();
  }, [id]);

  if (!koi) return <div className="text-center py-4">No Koi fish found</div>;

  const addToCart = () => {
    navigate("/koiCart");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={img}
          alt={`Koi ${koi.KoiFishId}`}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Koi #{koi.KoiFishId}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">
                <span className="font-semibold">Variety:</span>{" "}
                {koi.KoiFishVariety?.Name || "Unknown"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Color:</span>{" "}
                {koi.Color || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Weight:</span> {koi.Weight} kg
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Length:</span> {koi.Length} cm
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Gender:</span>{" "}
                {koi.Gender === 1 ? "Male" : "Female"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                <span className="font-semibold">Farm:</span>{" "}
                {koi.Farm?.Name || "Unknown"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Supplier:</span>{" "}
                {koi.Supplier || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Date Added:</span>{" "}
                {koi.DateAdded
                  ? new Date(koi.DateAdded).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="text-green-600 font-bold text-xl mt-2">
                Price: ${koi.Price.toFixed(2)}
              </p>
              {koi.IsAvailable ? (
                <span className="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full mt-2">
                  Available
                </span>
              ) : (
                <span className="inline-block bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full mt-2">
                  Not Available
                </span>
              )}
            </div>
          </div>
          {koi.Notes && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Notes</h2>
              <p className="text-gray-600">{koi.Notes}</p>
            </div>
          )}
          <div className="mt-8 flex space-x-4">
            <button
              onClick={addToCart}
              className="bg-cyan-600 hover:bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-lg transition duration-200"
            >
              Add to Cart
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

export default KoiDetail;
