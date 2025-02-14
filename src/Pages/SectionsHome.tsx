import React, { useEffect, useRef } from "react";
import HeroHome from "./HeroHome";
import IntroductionHome from "./IntroductionHome";
import FarmHome from "./FarmHome";
import KoiHome from "./KoiHome";

const SectionsHome = () => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div
      className="scroll-smooth overflow-y-scroll snap-y snap-mandatory no-scrollbar"
      style={{ scrollSnapType: "y mandatory" }}
    >
      <HeroHome ref={(el) => (sectionsRef.current[0] = el)} />
      <IntroductionHome ref={(el) => (sectionsRef.current[1] = el)} />
      <FarmHome ref={(el) => (sectionsRef.current[2] = el)} />
      <KoiHome ref={(el) => (sectionsRef.current[3] = el)} />
    </div>
  );
};

export default SectionsHome;
