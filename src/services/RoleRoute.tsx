import React from "react";
import { Route, Navigate } from "react-router-dom";

const RoleRoute = ({ element, role, ...rest }) => {
  const userRole = localStorage.getItem("userRole");
  return userRole === role ? element : <Navigate to="/unauthorized" />;
};

export default RoleRoute;
