import { useState } from "react";
import { FaGoogle, FaGithub, FaQrcode } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useOnboarding } from "../context/OnboardingProvider";
import toast from "react-hot-toast";

const Registeration = () => {
  const [identifier, setIdentifier] = useState("");
  const navigate = useNavigate();
  const { driverState } = useOnboarding();

  const handleSubmit = async () => {
    const phoneRegex = /^\+?[0-9]{7,15}$/;

    if (!phoneRegex.test(identifier)) {
      toast.error("Enter a valid phone number bro 💀");
      return;
    }

    const res = await axios.post(
      "https://rideonix-backend.onrender.com/api/auth/send-otp",
      {
        identifier,
      }
    );

    navigate("/otp-verification", {
      state: {
        otp: res.data.otp,
        identifier,
      },
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-2xl font-semibold text-black">
          What's your phone number?
        </h2>

        <input
          type="text"
          placeholder="Enter phone number here"
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

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google Button */}
        <Link
          onClick={() =>
            driverState === true && localStorage.setItem("driverState", true)
          }
          to="https://rideonix-backend.onrender.com/auth/google"
          className="w-full flex items-center justify-center gap-3 bg-gray-100 py-3 rounded-md hover:bg-gray-200 transition"
        >
          <FaGoogle size={18} />
          Continue with Google
        </Link>

        <p className="text-xs text-gray-500 text-center pt-4">
          By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages,
          including by automated means, from Rideonix and its affiliates to the
          number provided.
        </p>
      </div>
    </div>
  );
};

export default Registeration;
