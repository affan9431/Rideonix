import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import StarRating from "./StarRating";
import TripDetailModal from "./TripDetailModal";
import { getTimeOfDay } from "../utils/getTimeOfDay";

function RideHistory() {
  const [historyData, setHistoryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const imageMap = {
    morning: "/images/morning.jpg",
    afternoon: "/images/afternoon.jpg",
    evening: "/images/evening.jpg",
    night: "/images/night.jpg",
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("https://rideonix-backend.onrender.com/api/rideHistory");
        setHistoryData(res.data.data);
      } catch (error) {
        console.log("ERROR:", error);
      }
    };
    fetchHistory();
  }, []);

  const handleViewDetails = (trip) => {
    setSelectedTrip(trip);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="lg:col-span-3 bg-stone-950 text-white rounded-lg shadow-md p-6 space-y-4">
        <h2 className="text-xl font-bold mb-4">History</h2>
        <div>
          {historyData.length === 0 ? (
            <p className="text-sm text-gray-400 italic">
              No past trips yet — your journey history will appear here once you
              take a ride.
            </p>
          ) : (
            historyData.map((trip) => {
              const timeOfDay = getTimeOfDay(trip.createdAt);
              return (
                <div
                  key={trip.id}
                  className="flex items-center space-x-4 pb-4 border-b border-gray-700 last:border-b-0"
                >
                  <img
                    src={imageMap[timeOfDay]}
                    alt={`Trip at ${timeOfDay}`}
                    className="rounded-[50px] object-cover w-[6vw] h-[6vh]"
                  />
                  <div className="flex-grow overflow-hidden">
                    <p className="text-sm truncate whitespace-nowrap overflow-hidden text-ellipsis">
                      From: {trip.rider.pickUpLocationName}
                    </p>
                    <p className="text-sm truncate whitespace-nowrap overflow-hidden text-ellipsis">
                      To: {trip.rider.dropLocationName}
                    </p>
                    <StarRating rating={trip.rating || 4} />
                  </div>

                  <button
                    onClick={() => handleViewDetails(trip)}
                    className="text-sm text-blue-400 hover:underline"
                  >
                    View Details
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      <TripDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedTrip}
      />
    </>
  );
}

export default RideHistory;
