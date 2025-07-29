import React, { useState } from "react";
import { useOnboarding } from "../context/OnboardingProvider";
import { useNavigate } from "react-router-dom";

export default function SelectVehicleType() {
  const [selectedOption, setSelectedOption] = useState("");
  const { driverData, setDriverData } = useOnboarding();
  const navigate = useNavigate();

  const options = [
    {
      id: "auto",
      title: "🛺 Auto",
      seats: "1-3",
      desc: "You're applying to drive an auto rickshaw (commercial license required)",
    },
    {
      id: "car",
      title: "🚘 RideonixGo",
      seats: "4",
      desc: "You have a car that you wish to drive or employ others to drive",
    },
    {
      id: "bike",
      title: "🏍️ Motorbike",
      seats: "1",
      desc: "You wish to drive a motorcycle or scooter",
    },
  ];

  const onContinue = async () => {
    setDriverData((prev) => ({
      ...prev,
      selectedVehicle: selectedOption,
    }));
    navigate("/select-language");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-100">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">
          Choose how you want to earn with Rideonix
        </h2>

        <div className="space-y-4">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => setSelectedOption(option.title)}
              className={`border p-4 rounded-md cursor-pointer transition-all duration-200 ${
                selectedOption === option.title
                  ? "border-black"
                  : "border-gray-300 hover:border-black"
              }`}
            >
              <p className="font-semibold">
                <span className="font-bold">Name:</span> {option.title}
              </p>
              <p className="font-semibold">
                <span className="font-bold">Seats Allowed:</span> {option.seats}
              </p>
              <p className="text-sm text-gray-600">{option.desc}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onContinue}
          disabled={!selectedOption}
          className={`w-full mt-6 py-3 rounded-full font-semibold ${
            selectedOption
              ? "bg-black text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
