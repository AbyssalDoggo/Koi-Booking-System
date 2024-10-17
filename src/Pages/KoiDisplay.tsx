import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface KoiFish {
  KoiFishId: number;
  KoiFishVarietyId: number;
  FarmId: number;
  Weight: number;
  Length: number;
  Color: string | null;
  Price: number;
  DateAdded: string | null;
  IsAvailable: boolean | null;
  Notes: string | null;
  Supplier: string | null;
  Gender: number;
  Farm: any;
  KoiFishVariety: any;
}

const KoiDisplay: React.FC = () => {
  const [koiList, setKoiList] = useState<KoiFish[]>([]);

  useEffect(() => {
    const fetchKoiList = async () => {
      try {
        const response = await fetch("https://localhost:7043/api/KoiFish");
        const data = await response.json();
        setKoiList(data.Data);
      } catch (err) {}
    };

    fetchKoiList();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Koi Fish Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {koiList.map((koi) => (
          <Link
            to={`/koi/${koi.KoiFishId}`}
            key={koi.KoiFishId}
            className="block"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img
                src={`/api/placeholder/${koi.KoiFishId}/300/200`}
                alt={`Koi ${koi.KoiFishId}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  Koi #{koi.KoiFishId}
                </h2>
                <p className="text-gray-600 mb-2">
                  Variety: {koi.KoiFishVariety?.Name || "Unknown"}
                </p>
                <p className="text-gray-600 mb-2">
                  Color: {koi.Color || "N/A"}
                </p>
                <p className="text-green-600 font-bold">
                  Price: ${koi.Price.toFixed(2)}
                </p>
                {koi.IsAvailable ? (
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-2">
                    Available
                  </span>
                ) : (
                  <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-2">
                    Not Available
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default KoiDisplay;
