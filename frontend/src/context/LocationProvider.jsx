// src/context/LocationContext.jsx
import React, { createContext, useState } from "react";

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const [position, setPosition] = useState([]);
  const [dropLocation, setDropLocation] = useState([]);
  const [pickUpLocationName, setPickUpLocationName] = useState("");
  const [dropLocationName, setDropLocationName] = useState("");

  return (
    <LocationContext.Provider
      value={{
        position,
        dropLocation,
        setPosition,
        setDropLocation,
        pickUpLocationName,
        dropLocationName,
        setPickUpLocationName,
        setDropLocationName,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export { LocationProvider, LocationContext };
