import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import TripBooking from "./pages/TripBooking.tsx";
import KoiDisplay from "./pages/KoiDisplay.tsx";
import KoiDetail from "./pages/KoiDetail.tsx";
import ManageQuote from "./pages/ManageQuote.tsx";
import CreateQuote from "./pages/CreateQuote.tsx";
import TripProcess from "./pages/TripProcess.tsx";
import Schedule from "./pages/Schedule.tsx";
import KoiCart from "./pages/KoiCart.tsx";
import PrivateRoute from "./services/PrivateRoute.tsx";
import RoleRoute from "./services/RoleRoute.tsx";
import CheckOut from "./pages/CheckOut.tsx";
import Users from "./Pages/AdminPage/UsersManager.tsx";
import OrderHistory from "./Pages/AdminPage/OrderHistory.tsx";
import FarmDisplay from "./Pages/FarmDisplay.tsx";
import FarmDetail from "./Pages/FarmDetail.tsx";
import CreateTourItinerary from "./pages/CreateTourItinerary.tsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes */}

        <Route
          path="/tripBooking"
          element={<PrivateRoute element={<TripBooking />} />}
        />
        <Route
          path="/tripProcess/:id"
          element={<PrivateRoute element={<TripProcess />} />}
        />
        <Route
          path="/farm/:id"
          element={<PrivateRoute element={<FarmDetail />} />}
        />
        <Route
          path="/farm"
          element={<PrivateRoute element={<FarmDisplay />} />}
        />
        <Route
          path="/book"
          element={<PrivateRoute element={<TripBooking />} />}
        />
        <Route
          path="/koi"
          element={<PrivateRoute element={<KoiDisplay />} />}
        />
        <Route
          path="/koi/:id"
          element={<PrivateRoute element={<KoiDetail />} />}
        />
        <Route
          path="/koiCart"
          element={<PrivateRoute element={<KoiCart />} />}
        />
        <Route
          path="/schedule"
          element={<PrivateRoute element={<Schedule />} />}
        />
        <Route
          path="/checkout"
          element={<PrivateRoute element={<CheckOut />} />}
        />

        {/* Admin Routes - Role-based Access */}
        <Route
          path="/AdminUser"
          element={<RoleRoute role="ADMIN" element={<Users />} />}
        />
        <Route
          path="/AdminOrderHistory"
          element={<RoleRoute role="ADMIN" element={<OrderHistory />} />}
        />
        <Route
          path="/manageQuote"
          element={<PrivateRoute element={<ManageQuote />} />}
        />
        <Route
          path="/createTour"
          element={<PrivateRoute element={<CreateTourItinerary />} />}
        />
        <Route
          path="/createQuote/:id"
          element={<PrivateRoute element={<CreateQuote />} />}
        />
      </Routes>
    </>
  );
};

export default App;
