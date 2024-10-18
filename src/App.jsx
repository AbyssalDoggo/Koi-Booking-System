import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import Login from "./pages/Login.tsx";
import FarmDisplayPage from "./pages/FarmDisplay.tsx";
import FarmDetailPage from "./pages/FarmDetail.tsx";
import Register from "./pages/Register.tsx";
import TripBooking from "./pages/TripBooking.tsx";
import KoiDisplay from "./pages/KoiDisplay.tsx";
import KoiDetail from "./pages/KoiDetail.tsx";
import ManageQuote from "./pages/ManageQuote.tsx";
import CreateQuote from "./pages/CreateQuote.tsx";
import TripProcess from "./pages/TripProcess.tsx";
import Schedule from "./pages/Schedule.tsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/farm/:id" element={<FarmDetailPage />} />
        <Route path="/farm" element={<FarmDisplayPage />} />
        <Route path="/book" element={<TripBooking />} />
        <Route path="/manageQuote" element={<ManageQuote />} />
        <Route path="/tripBooking" element={<TripBooking />} />
        <Route path="/tripProcess/:id" element={<TripProcess />} />
        <Route path="/koi" element={<KoiDisplay />} />
        <Route path="/koi/:id" element={<KoiDetail />} />
        <Route path="/createQuote/:id" element={<CreateQuote />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </>
  );
};

export default App;
