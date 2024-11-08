import React, { forwardRef } from "react";
import image from "../assets/gosante.jpg";
import image2 from "../assets/bekko.jpg";
import { useNavigate } from "react-router-dom";

const koiVarieties = [
  {
    name: "Gosanke",
    image: image,
  },
  {
    name: "Bekko",
    image: image2,
  },
  {
    name: "Asagi & Shusui",
    image: image,
  },
  {
    name: "Koromo",
    image: image2,
  },
  {
    name: "Kawarimono",
    image: image,
  },
  {
    name: "Hikarimoyo",
    image: image2,
  },
  {
    name: "Hikarimuji",
    image: image,
  },
  {
    name: "Utsurimono",
    image: image2,
  },
];

const KoiHome = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  (props, ref) => {
    const navigate = useNavigate();
    return (
      <div
        ref={ref}
        className=" flex items-center justify-center bg-wheat-0 transition-all duration-1000 ease-in-out snap-start"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center text-gray-900 mb-2">
            Koi Fish
          </h1>
          <p
            className="text-3xl text-center text-blue-300 mb-12 cursor-pointer hover:underline"
            onClick={() => navigate("/koi")}
          >
            Visit store
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-40">
            {koiVarieties.map((variety, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-52 h-52 rounded-full bg-white shadow-lg overflow-hidden mb-4">
                  <img
                    src={variety.image}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-center font-medium text-gray-800">
                  {variety.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default KoiHome;
