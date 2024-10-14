import React, { forwardRef } from "react";

const IntroductionHome = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      className="h-screen flex items-center justify-center bg-wheat-0 transition-all duration-1000 ease-in-out opacity-0 translate-y-10 snap-start"
    >
      <div className="relative z-10 p-8 text-left w-1/3">
        <h2 className="text-9xl font-bold text-white mb-4 font-stick font-extralight">
          KOITO
        </h2>
        <p className="text-3xl text-white font-sans">
          Where tranquility meets nature
        </p>
      </div>
    </div>
  );
});

export default IntroductionHome;
