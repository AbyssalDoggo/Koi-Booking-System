import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage.tsx";
import Login from "./Pages/Login.tsx";
import Register from "./Pages/Register.tsx";
import TripDetailPage from "./pages/TripDetailPage.tsx";
import KoiDetails from "./Pages/KoiDetails.tsx";
import ProductsPage from "./Pages/ProductsPage.tsx";
import Users from "./Pages/AdminPage/UsersManager.tsx";
import OrderHistory from "./Pages/AdminPage/OrderHistory.tsx";
import KoiFish from "./Pages/AdminPage/KoiFish.tsx";



const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trip/:id" element={<TripDetailPage />} />
        <Route path="/Products" element={<ProductsPage />} />
        <Route path="/Detail" element={<KoiDetails />} />
        <Route path="/AdminUser" element={<Users/>}/>
        <Route path="/AdminOrderHistory" element={<OrderHistory/>}/>
        <Route path="/AdminKoiManager" element={<KoiFish/>}/>
        
      </Routes>
    </>
  );
};

export default App;
