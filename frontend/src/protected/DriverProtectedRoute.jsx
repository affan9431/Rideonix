import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function DriverProtectedRoute() {
  const driverToken = localStorage.getItem("driverToken");
  return driverToken ? <Outlet /> : <Navigate to="/register" replace />;
}

export default DriverProtectedRoute;
