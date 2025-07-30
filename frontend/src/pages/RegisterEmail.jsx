import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrevNextButton from "../component/PrevNextButton";
import { useLocation } from "react-router-dom";
import { useOnboarding } from "../context/OnboardingProvider";
import toast from "react-hot-toast";

function RegisterEmail() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { username, phoneNumber } = location.state || {};
  const { driverState, setDriverData } = useOnboarding();

  const handleNext = () => {
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email bro 💀");
      return;
    }

    if (driverState === true) {
      setDriverData((prev) => ({
        ...prev,
        email: email.trim(),
      }));
    }

    navigate("/term-and-conditions", {
      state: {
        email: email.trim(),
        username,
        phoneNumber,
      },
    });
  };

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="w-full max-w-md mx-auto m-[175px]">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Enter your email address
          </h1>
          <p className="text-gray-600">
            Add your email to aid in account recovery
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>
      <PrevNextButton
        handleBack={handleBack}
        handleNext={handleNext}
        currentStep={3}
      />
    </>
  );
}

export default RegisterEmail;
