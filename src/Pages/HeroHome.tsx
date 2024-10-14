import React, { forwardRef } from "react";
import img from "../assets/Koi.jpg";

const HeroHome = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        className="h-screen flex items-center justify-center transition-all duration-1000 ease-in-out opacity-0 translate-y-10 snap-start"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm"></div>

        <div className="relative z-10 p-8 text-center">
          <h2 className="text-9xl font-bold text-white mb-4 font-stick font-extralight">
            KOITO
          </h2>
          <p className="text-3xl text-white font-sans">
            Where tranquility meets nature
          </p>
        </div>
      </div>
    );
  }
);

export default HeroHome;
