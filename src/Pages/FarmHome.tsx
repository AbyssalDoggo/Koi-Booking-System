import React, { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/Koi Farm.jpg";

const mockFarms = [
  {
    id: 1,
    name: "Sunny Meadows",
    image: image,
    slotOrder: 1,
  },
  {
    id: 2,
    name: "Green Valley",
    image: image,
    slotOrder: 2,
  },
  {
    id: 3,
    name: "Misty Mountains",
    image: image,
    slotOrder: 3,
  },
  {
    id: 4,
    name: "Golden Fields",
    image: image,
    slotOrder: 4,
  },
];

type Farm = (typeof mockFarms)[0];

const FarmPanel: React.FC<{ farm: Farm }> = ({ farm }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/trip/${farm.id}`);
  };

  return (
    <div
      className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-[70vh] overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <img
        src={farm.image}
        alt={farm.name}
        className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
      />
      <div
        className={`absolute inset-0 bg-black flex flex-col justify-center items-center text-white p-6 transition-opacity duration-300 ${
          isHovered ? "bg-opacity-0" : "bg-opacity-70"
        }`}
      >
        <p className="text-lg mb-4">{farm.slotOrder}</p>
        <h3 className="text-2xl font-semibold mb-2">{farm.name}</h3>
      </div>
    </div>
  );
};

interface FarmHomeProps extends React.HTMLProps<HTMLDivElement> {}

const FarmHome = forwardRef<HTMLDivElement, FarmHomeProps>((props, ref) => {
  return (
    <div
      ref={ref}
      className="min-h-screen flex items-center bg-wheat-0 justify-center transition-all duration-1000 ease-in-out snap-start"
      {...props}
    >
      <div className="w-full">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">
          Our Farms
        </h2>
        <div className="flex flex-wrap justify-center items-stretch w-full">
          {mockFarms.map((farm) => (
            <FarmPanel key={farm.id} farm={farm} />
          ))}
        </div>
      </div>
    </div>
  );
});

FarmHome.displayName = "FarmHome";

export default FarmHome;
