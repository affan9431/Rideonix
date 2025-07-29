// src/hooks/useLocation.js
import { useContext } from "react";
import { LocationContext } from "../context/LocationProvider";

const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used inside a LocationProvider");
  }
  return context;
};

export default useLocation;
