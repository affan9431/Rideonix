import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { format } from "date-fns";
import {
  Car,
  CalendarDays,
  Clock,
  MapPin,
  User,
  IndianRupee,
  PhoneOffIcon as CarOff,
  Loader2,
  XCircle,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";

export default function RiderRideHistory() {
  const [rideHistory, setRideHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const riderToken = localStorage.getItem("riderToken");
  const decoded = riderToken && jwtDecode(riderToken);

  useEffect(() => {
    const fetchRideHistory = async () => {
      try {
        const res = await axios.get(
          `https://rideonix-backend.onrender.com/api/rideHistory/${decoded.id}?role=rider`
        );
        if (res.data.status === "success") {
          setRideHistory(res.data.data);
        } else {
          setError("Failed to fetch ride history: " + res.data.message);
        }
      } catch (err) {
        console.error("Failed to fetch ride history:", err);
        setError("Could not load ride history. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRideHistory();
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-8 text-center py-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-3">
          <Car className="h-8 w-8 text-blue-600" />
          Your Ride History
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          A detailed overview of your past journeys.
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
          <p className="mt-4 text-lg">Loading your ride history...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12 text-red-600">
          <XCircle className="h-10 w-10" />
          <p className="mt-4 text-lg">{error}</p>
        </div>
      ) : rideHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <CarOff className="h-12 w-12" />
          <p className="mt-4 text-xl font-semibold">No rides found.</p>
          <p className="text-md mt-2">
            It looks like you haven't taken any rides yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {rideHistory.map((ride, index) => {
            const dateObj = new Date(ride.createdAt);
            const formattedDate = format(dateObj, "dd MMM yyyy");
            const formattedTime = format(dateObj, "hh:mm a");
            return (
              <motion.div
                key={ride._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{
                  scale: 1.01,
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="bg-white border border-gray-200 p-6 rounded-xl shadow-md overflow-hidden relative"
              >
                {/* Date & Time */}
                <div className="flex justify-between items-center mb-4 text-sm text-gray-500 border-b pb-3 border-gray-100">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4 text-gray-400" />
                    {formattedDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    {formattedTime}
                  </span>
                </div>

                {/* Locations */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    <span className="font-medium">From:</span>
                    <span className="truncate">
                      {ride.rider.pickUpLocationName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <span className="font-medium">To:</span>
                    <span className="truncate">
                      {ride.rider.dropLocationName}
                    </span>
                  </div>
                </div>

                {/* Driver & Amount */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center pt-4 border-t border-gray-100">
                  <div className="text-gray-600 text-sm flex items-center gap-2 mb-2 md:mb-0">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">
                      {ride.driver.driverName}
                    </span>
                    <span className="mx-1">|</span>
                    <span>{ride.driver.vehicleType}</span>
                    <span className="mx-1">|</span>
                    <span>{ride.driver.cityName}</span>
                  </div>
                  <div className="text-green-600 text-2xl font-bold flex items-center gap-1">
                    <IndianRupee className="h-5 w-5" />
                    {ride.price}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
