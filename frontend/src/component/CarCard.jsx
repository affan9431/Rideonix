import React, { useEffect, useState } from "react";
import getDriverInfo from "../utils/getDriverData";

const vehicleImages = {
  Auto: "/images/auto.webp",
  RideonixGo: "/images/car.jpg",
  Motorbike: "/images/bike.webp",
};

const vehicleInfo = {
  Auto: { seats: "1-3", estTime: "3 mins" },
  RideonixGo: { seats: "4", estTime: "2 mins" },
  Motorbike: { seats: "1", estTime: "4 mins" },
};

function CarCard() {
  const driverToken = localStorage.getItem("driverToken");
  const [driverData, setDriverData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!driverToken) return;
      const data = await getDriverInfo();
      setDriverData(data);
    };
    fetchData();
  }, [driverToken]);

  console.log("From card:", driverData);

  const selectedVehicle = driverData?.selectedVehicle
    ?.replace(/[\u{1F300}-\u{1FAFF}]/gu, "")
    .trim();
  const vehicle = vehicleInfo[selectedVehicle];
  const image = vehicleImages[selectedVehicle];

  if (!driverData || !vehicle) return null;

  return (
    <div className="rounded-xl overflow-hidden shadow-md bg-white max-w-sm mx-auto">
      <img
        src={image}
        alt={selectedVehicle}
        className="w-full h-[200px] object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-xl font-semibold">{selectedVehicle}</h3>
        <p className="text-gray-500 text-sm mb-2">Seats: {vehicle.seats}</p>
        <p className="text-gray-600 text-sm">ETA: {vehicle.estTime}</p>
      </div>
    </div>
  );
}

export default CarCard;
