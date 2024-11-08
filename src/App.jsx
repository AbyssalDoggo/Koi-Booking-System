import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import Register from "./pages/Register.tsx";
import Login from "./Pages/Login.tsx";
import Profile from "./pages/Customer/Profile/Profile.jsx";
import TripList from "./pages/Customer/Trip/TripList.jsx";
import TripDetail from "./pages/Customer/Trip/TripDetail.jsx";
import BookingForm from "./pages/Customer/Trip/BookingForm.jsx";
import SalesManagement from "./pages/Sales Staff/SalesManagement.jsx";
import UserBookings from "./pages/Customer/Trip/Schedule.jsx";
import KoiList from "./pages/Customer/Koi/KoiList.jsx";
import KoiCart from "./pages/Customer/Koi/KoiCart.jsx";
import KoiDetail from "./pages/Customer/Koi/KoiDetail.jsx";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/customer" element={<Profile />} />
      <Route path="/trips" element={<TripList />} />
      <Route path="/trips/:id" element={<TripDetail />} />
      <Route path="/book" element={<BookingForm />} />
      <Route path="/sales" element={<SalesManagement />} />
      <Route path="/schedule" element={<UserBookings />} />
      <Route path="/koi" element={<KoiList />} />
      <Route path="/koi/:id" element={<KoiDetail />} />
      <Route path="/koiCart" element={<KoiCart />} />

      {/* <Route
        path="/customer"
        element={
          <PrivateRoute role="1">
            <Profile />
          </PrivateRoute>
        }
      /> */}

      {/* {/* {/* Private Routes
        <Route
          path="/tripBooking"
          element={<PrivateRoute element={<ToursList />} />}
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
          path="/book/:id"
          element={<PrivateRoute element={<BookingForm />} />}
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

        <Route
          path="/bookingForm/:tripId"
          element={<PrivateRoute element={<BookingForm />} />}
        />

        <Route
          path="/AdminUser"
          element={<RoleRoute role="8" element={<Users />} />}
        />
        <Route
          path="/AdminOrderHistory"
          element={<RoleRoute role="8" element={<OrderHistory />} />}
        />
        <Route
          path="/manageQuote"
          element={<PrivateRoute element={<ManageQuote />} />}
        />
        <Route
          path="/manageItinerary"
          element={<PrivateRoute element={<ManageItinerary />} />}
        />
        <Route
          path="/createItinerary"
          element={<PrivateRoute element={<CreateTourItinerary />} />}
        />
        <Route
          path="/createQuote/:id"
          element={<PrivateRoute element={<CreateQuote />} />}
        />

        <Route
          path="/salesDashboard"
          element={<PrivateRoute element={<SalesStaffDashboard />} />}
        />
      //   */}
    </Routes>
  );
};

export default App;
