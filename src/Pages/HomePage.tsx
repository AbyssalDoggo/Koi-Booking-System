import React from "react";
import slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick/lib/slider";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import SectionsHome from "./SectionsHome";
const HomePage = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <NavigationBar />
      <SectionsHome />
    </>
  );
};

export default HomePage;



