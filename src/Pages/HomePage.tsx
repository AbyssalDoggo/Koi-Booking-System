import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import SectionsHome from "./SectionsHome";
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
    </>
  );
};

export default HomePage;
