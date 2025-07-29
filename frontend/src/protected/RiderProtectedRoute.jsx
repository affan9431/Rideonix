import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function RiderProtectedRoute() {
  const riderToken = localStorage.getItem("riderToken");
  return riderToken ? <Outlet /> : <Navigate to="/register" replace />;
}

export default RiderProtectedRoute;
