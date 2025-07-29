import React, { useState } from "react";
import PrevNextButton from "../component/PrevNextButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useOnboarding } from "../context/OnboardingProvider";
import toast from "react-hot-toast";


function RegisterName() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { identifier: phoneNumber } = location.state || {};
  const { driverState, setDriverData } = useOnboarding();

  const handleNext = () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("Please enter both your first and last name.");
      return;
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`;

    if (driverState === true) {
      setDriverData((prev) => ({
        ...prev,
        username: fullName,
        phoneNumber,
      }));
    }

    navigate("/register/email", {
      state: {
        username: fullName,
        phoneNumber,
      },
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto m-[125px]">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            What's your name?
          </h1>
          <p className="text-gray-600">
            Let us know how to properly address you
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First name
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last name
            </label>
            <input
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>
      <PrevNextButton
        handleBack={handleBack}
        handleNext={handleNext}
        currentStep={2}
      />
    </>
  );
}

export default RegisterName;
