import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function RegisterPhoneNumber() {
  const [identifier, setIdentifier] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const decoded = token && jwtDecode(token);

  const handleSubmit = async () => {
    try {
      if (identifier === "") {
        toast.error("Please enter Phone number.");
        return;
      }
      
      const res = await axios.post(
        "https://rideonix-backend.onrender.com/api/auth/send-otp",
        {
          identifier,
        }
      );

      navigate("/google-otp-verification", {
        state: {
          otp: res.data.otp,
          identifier,
          username: decoded.username,
          email: decoded.email,
          profilePicture: decoded.profilePicture,
        },
      });
    } catch (error) {
      toast.error("Something went wrong");
      console.log("ERROR:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-2xl font-semibold text-black">
          What's your phone number or email?
        </h2>

        <input
          type="text"
          placeholder="Enter phone number or email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition cursor-pointer"
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default RegisterPhoneNumber;
