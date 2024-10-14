import React, { forwardRef } from "react";
import image from "../assets/Koi2.jpg";
import { Fish, Stethoscope, MapPinned, TicketsPlane } from "lucide-react";

const IntroductionHome = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>((props, ref) => {
  const data = [
    {
      title: "Beautiful Koi",
      description: "Experience the elegance of colorful Koi fish.",
      icon: <Fish className="w-20 h-20 text-dark" />,
    },
    {
      title: "Koi Care Tips",
      description: "Learn how to care for your Koi to keep them healthy.",
      icon: <Stethoscope className="w-20 h-20 text-dark" />,
    },
    {
      title: "Farm Tour",
      description: "Take a tour of our peaceful Koi farm.",
      icon: <MapPinned className="w-16 h-20 text-dark" />,
    },
    {
      title: "Book a Visit",
      description: "Plan your visit and enjoy a day with the Koi.",
      icon: <TicketsPlane className="w-16 h-20 text-dark" />,
    },
  ];

  return (
    <div
      ref={ref}
      className="h-screen flex items-center justify-center bg-wheat-0 transition-all duration-1000 ease-in-out snap-start"
    >
      <div className="container mx-auto pl-20 flex items-center justify-between h-auto my-auto">
        {/* {Main description} */}
        <div className="w-1/2 pr-8 flex gap-16 flex-col">
          <div>
            <h2 className="text-7xl font-bold font-stick text-dark mb-4">
              Discover the World of Koi
            </h2>
            <p className="text-2xl text-dark font-sans">
              Join us on an immersive journey through our Koi farm, where you
              can explore the beauty, history, and care of these elegant fish.
              Book your farm tour today and experience the serene world of Koi.
            </p>
          </div>
          {/* Sub description */}
          <div className="w-full mx-auto grid grid-cols-2 grid-rows-2 gap-10">
            {data.map((item, index) => (
              <div key={index} className={`flex flex-row gap-8`}>
                {item.icon}
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold text-dark">{item.title}</h3>
                  <p className="text-lg text-dark">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Main image */}
        <div className="w-1/2 flex justify-center items-center">
          <img
            src={image}
            className="w-auto max-h-[80vh] rounded-full shadow-lg"
          />
        </div>
      </div>
    </div>
  );
});

export default IntroductionHome;
