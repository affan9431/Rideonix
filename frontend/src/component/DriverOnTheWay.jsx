import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../service/socket.io";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import useLocation from "../hooks/useLocation";

export default function DriverOnTheWay() {
  const [driver, setDriver] = useState(null);
  const [showBtn, setShowBtn] = useState(true);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rideId, setRideId] = useState("");
  const {
    setPosition,
    setDropLocation,
    setPickUpLocationName,
    setDropLocationName,
  } = useLocation();

  useEffect(() => {
    const storedOtp = JSON.parse(localStorage.getItem("OTP"));
    setOtp(storedOtp);
  }, []);

  useEffect(() => {
    const storedDriver = JSON.parse(localStorage.getItem("driverData"));
    if (storedDriver) {
      setDriver(storedDriver);
    }
  }, []);

  useEffect(() => {
    socket.on("ride_cancel_to_rider", (data) => {
      toast.error(data.reason);
      navigate("/ride");
    });
  }, [navigate]);

  useEffect(() => {
    socket.on("driver_location_update", (data) => {
      console.log("Driver Live Location:", data.location);
    });
  }, []);

  useEffect(() => {
    socket.on("ride_start", () => {
      toast.success("Ride is begin.");
      setShowBtn(false);
    });
  }, []);

  useEffect(() => {
    socket.on("payment_success", () => {
      toast.success(
        "Ride completed! Thank you for riding with us. Have a great day! 🚗✨"
      );
      setShowReviewModal(true);
      setPosition([]);
      setDropLocation([]);
      setPickUpLocationName("");
      setDropLocationName("");
    });
  }, [
    navigate,
    setPosition,
    setDropLocation,
    setPickUpLocationName,
    setDropLocationName,
  ]);

  useEffect(() => {
    socket.on("ride_finished_on_rider", (data) => {
      localStorage.removeItem("driverData");
      localStorage.removeItem("OTP");
      setRideId(data.rideId);
    });
  }, []);

  const handleCancelRide = () => {
    const riderToken = localStorage.getItem("riderToken");
    const decoded = riderToken && jwtDecode(riderToken);

    socket.emit("ride_canceled_by_rider", {
      riderId: decoded.id,
      driverId: driver && driver.driverId,
      reason: "Canceled by rider",
      timestamp: Date.now(),
    });
    localStorage.removeItem("driverData");
    localStorage.removeItem("OTP");
    navigate("/ride");
  };

  const submitReview = async () => {
    try {
      const token = localStorage.getItem("riderToken");
      if (!token) {
        console.error("No token found.");
        return;
      }

      const decoded = jwtDecode(token);
      const riderId = decoded.id || decoded._id;
      if (!riderId) {
        console.error("Invalid token structure. Rider ID missing.");
        return;
      }

      const payload = {
        rideId,
        rider: riderId,
        review: reviewText,
        rating: rating,
      };

      await axios.post(
        "https://rideonix-backend.onrender.com/api/review",
        payload
      );

      toast.success("Review submitted successfully:");
      navigate("/ride");
    } catch (error) {
      console.error(
        "Error submitting review:",
        error.response?.data || error.message
      );
    }
  };

  if (!driver) {
    return <div className="text-center py-10">Looking for driver...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 text-gray-800 space-y-6">
      <h2 className="text-2xl font-bold text-center">Driver is on the way</h2>

      <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow">
        <img
          src={driver.profilePicture}
          alt={driver.username}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{driver.username}</h3>
          <p className="text-sm text-gray-600">{driver.selectedVehicle}</p>
          <p className="text-sm text-gray-500">{driver.cityName}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow space-y-2">
        <div>
          <strong>Pickup:</strong> Coming from your location
        </div>
        <div>
          <strong>Contact:</strong>{" "}
          <a
            href={`tel:${driver.phoneNumber}`}
            className="text-blue-600 underline"
          >
            {driver.phoneNumber}
          </a>
        </div>
        <div>
          <strong>OTP:</strong> <p>{otp}</p>
        </div>
      </div>

      {showBtn && (
        <>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold"
          >
            Back to Home
          </button>
          <button
            className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold"
            onClick={handleCancelRide}
          >
            Cancel Ride
          </button>
        </>
      )}

      {/* ✨ Review card shown like a normal section (not overlay) */}
      {showReviewModal && (
        <div className="bg-white p-6 rounded-xl shadow-xl space-y-4 mt-6">
          <h3 className="text-xl font-bold text-center">How was your ride?</h3>

          <div className="flex justify-center space-x-1">
            {[...Array(5)].map((_, i) => {
              const starValue = i + 1;
              return (
                <label key={i}>
                  <input
                    type="radio"
                    name="rating"
                    value={starValue}
                    className="hidden"
                    onClick={() => setRating(starValue)}
                  />
                  <FaStar
                    size={30}
                    color={
                      starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    className="cursor-pointer transition"
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>

          <textarea
            rows="4"
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          ></textarea>

          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={() => {
                setShowReviewModal(false);
                navigate("/ride");
              }}
              className="text-gray-600 border border-gray-300 rounded px-4 py-2 hover:bg-gray-100"
            >
              Skip
            </button>
            <button
              onClick={submitReview}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
