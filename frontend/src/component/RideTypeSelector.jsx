import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { getDistance } from "geolib";
import { motion } from "framer-motion";
import { socket } from "../service/socket.io";
import { jwtDecode } from "jwt-decode";
import useLocation from "../hooks/useLocation";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const getEmoji = (name) => {
  switch (name) {
    case "Auto":
      return "🛺";
    case "RideonixGo":
      return "🚗";
    case "Motorbike":
      return "🏍️";
    default:
      return "🚘";
  }
};

const BIKE_PER_KM_PRICE = 7;
const BIKE_BASE_FARE_PRICE = 17;

const CAR_PER_KM_PRICE = 11;
const CAR_BASE_FARE_PRICE = 45;

const AUTO_PER_KM_PRICE = 10;
const AUTO_BASE_FARE_PRICE = 27;

export default function RideTypeSelector() {
  const [selectedRide, setSelectedRide] = useState("RideonixGo");
  const { pickUpLocationName, dropLocationName, position, dropLocation } =
    useLocation();
  const [bikePrice, setBikePrice] = useState(1);
  const [carPrice, setCarPrice] = useState(1);
  const [autoPrice, setAutoPrice] = useState(1);
  const [distanceInKm, setDistanceInKm] = useState(1);
  const [isFindingDriver, setIsFindingDriver] = useState(false);

  const navigate = useNavigate();

  const rides = [
    {
      name: "Auto",
      seats: "1-3",
      time: "3 mins",
      dropoff: "12:45pm",
      price: `₹${autoPrice}`,
    },
    {
      name: "RideonixGo",
      seats: "4",
      time: "2 mins",
      dropoff: "12:45pm",
      price: `₹${carPrice}`,
    },
    {
      name: "Motorbike",
      seats: "1",
      time: "4 mins",
      dropoff: "12:55pm",
      price: `₹${bikePrice}`,
    },
  ].map((ride) => ({
    ...ride,
    img: getEmoji(ride.name),
  }));

  const getSelectedRidePrice = () => {
    switch (selectedRide) {
      case "Motorbike":
        return bikePrice;
      case "Auto":
        return autoPrice;
      case "RideonixGo":
        return carPrice;
      default:
        return 0;
    }
  };

  useEffect(() => {
    const pickup = { latitude: position[0], longitude: position[1] };
    const drop = { latitude: dropLocation[0], longitude: dropLocation[1] };

    const distanceInMeters = getDistance(pickup, drop);
    const distanceInKM = distanceInMeters / 1000;
    setDistanceInKm(distanceInKM);
  }, [position, dropLocation]);

  useEffect(() => {
    if (distanceInKm > 0) {
      setAutoPrice(
        Math.round(AUTO_BASE_FARE_PRICE + AUTO_PER_KM_PRICE * distanceInKm)
      );
      setCarPrice(
        Math.round(CAR_BASE_FARE_PRICE + CAR_PER_KM_PRICE * distanceInKm)
      );
      setBikePrice(
        Math.round(BIKE_BASE_FARE_PRICE + BIKE_PER_KM_PRICE * distanceInKm)
      );
    }
  }, [distanceInKm]);

  const requestRide = () => {
    const riderToken = localStorage.getItem("riderToken");
    const decoded = riderToken && jwtDecode(riderToken);

    if (
      !position?.[0] ||
      !position?.[1] ||
      !dropLocation?.[0] ||
      !dropLocation?.[1] ||
      !pickUpLocationName ||
      !dropLocationName ||
      !selectedRide
    ) {
      console.warn("Missing required ride request data");
      return;
    }

    if (decoded) {
      socket.emit("ride_request", {
        pickUpLocation: { lat: position[0], lon: position[1] },
        dropLocation: { lat: dropLocation[0], lon: dropLocation[1] },
        pickUpLocationName,
        dropLocationName,
        vehicleType: selectedRide,
        riderId: decoded.id,
        price: getSelectedRidePrice(),
        riderName: decoded.username,
        riderPhoneNumber: decoded.phoneNumber,
      });

      setIsFindingDriver(true);
    }
  };

  useEffect(() => {
    socket.on("no_driver_found", () => {
      toast.success("No Driver Found");
      navigate("/ride");
    });
  }, [navigate]);

  useEffect(() => {
    socket.on("ride_confirmed", (data) => {
      localStorage.removeItem("OTP");
      localStorage.setItem("driverData", JSON.stringify(data.driverData));
      localStorage.setItem("OTP", JSON.stringify(data.otp));
      setIsFindingDriver(false);
      navigate("/ride/ride-accept");
    });

    return () => {
      socket.off("ride_confirmed");
    };
  }, [navigate]);

  return (
    <div className="relative">
      {/* Blur overlay */}
      {isFindingDriver && (
        <div className="fixed inset-0 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center space-y-2">
            <div className="text-3xl animate-bounce">🚗</div>
            <p className="text-lg font-semibold">Finding a nearby driver...</p>
            <p className="text-sm text-gray-500">Hang tight, we’re on it!</p>
          </div>
        </div>
      )}

      {/* Main content always rendered */}
      <div
        className={`max-w-sm w-full bg-white border rounded-2xl p-4 shadow-xl text-sm space-y-4 mx-auto relative z-10 ${
          isFindingDriver ? "pointer-events-none opacity-70" : ""
        }`}
      >
        {/* Pickup */}
        <div className="bg-blue-500 text-white px-4 py-3 rounded-lg flex justify-between items-center">
          <span className="font-bold">From:</span>
          <span>{pickUpLocationName}</span>
          <FaChevronDown className="text-xs" />
        </div>

        {/* Drop */}
        <div className="bg-blue-500 text-white px-4 py-3 rounded-lg flex justify-between items-center">
          <span className="font-bold">To:</span>
          <span>{dropLocationName}</span>
          <FaChevronDown className="text-xs" />
        </div>

        {/* Ride Options */}
        {rides.map((ride, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            key={idx}
            className={`flex items-center justify-between px-4 py-3 rounded-lg border cursor-pointer ${
              selectedRide === ride.name
                ? "border-black bg-gray-100"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedRide(ride.name)}
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{ride.img}</div>
              <div>
                <div className="font-semibold">{ride.name}</div>
                <div className="text-xs text-gray-500">
                  {ride.time} · {ride.dropoff}
                </div>
              </div>
            </div>
            <div className="font-semibold">{ride.price}</div>
          </motion.div>
        ))}

        {/* Payment method */}
        <div className="text-xs text-gray-600">
          <div className="flex items-center justify-between px-4">
            <span>
              <span className="font-medium text-black">Visa</span> 1234 ·
              Personal
            </span>
            <span className="text-green-600 font-semibold">You save ₹12</span>
          </div>
        </div>

        {/* Request Button */}
        <button
          className="w-full mt-2 bg-black text-white py-3 rounded-lg font-semibold cursor-pointer"
          onClick={requestRide}
        >
          Request {selectedRide}
        </button>
      </div>
    </div>
  );
}
