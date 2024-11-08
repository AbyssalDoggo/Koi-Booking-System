import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import SectionsHome from "./SectionsHome";
import Footer from "../components/Footer";
const HomePage = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
      console.log("Access token retrieved:", storedToken);
    }
  }, []);

  return (
    <>
      <NavigationBar />
      <SectionsHome />
      <Footer></Footer>
    </>
  );
};

export default HomePage;
