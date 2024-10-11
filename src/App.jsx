import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage.tsx";
import Login from "./Pages/Login.tsx";
import Register from "./Pages/Register.tsx";
import KoiDetails from "./Pages/KoiDetails.tsx";
import ProductsPage from "./Pages/ProductsPage.tsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Products" element={<ProductsPage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Detail" element={<KoiDetails />} />
        
      </Routes>
    </>
  );
};

export default App;
