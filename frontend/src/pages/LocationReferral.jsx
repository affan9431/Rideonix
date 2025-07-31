import React from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../context/OnboardingProvider";

export default function LocationReferral() {
  const { driverData, setDriverData } = useOnboarding();
  const navigate = useNavigate();

  // TODO: Get city name and show on input box.
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, []);

  const onNext = async () => {
    navigate("/select-vehicle");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-100">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2">Earn with Rideonix</h1>
        <p className="text-gray-600 mb-6">
          Decide when, where, and how you want to earn.
        </p>

        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Where would you like to earn?
        </label>
        <input
          type="text"
          placeholder="City"
          className="w-full mb-4 px-4 py-2 border rounded-md bg-gray-100"
          value={driverData.cityName}
          onChange={(e) =>
            setDriverData((prev) => ({
              ...prev,
              cityName: e.target.value,
            }))
          }
        />

        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Referral code (optional)
        </label>
        <input
          type="text"
          placeholder="Referral Code"
          className="w-full mb-6 px-4 py-2 border rounded-md bg-gray-100"
          value={driverData.referralCode}
          onChange={(e) =>
            setDriverData((prev) => ({
              ...prev,
              referralCode: e.target.value,
            }))
          }
        />

        <p className="text-xs text-gray-500 mb-6">
          By proceeding, I agree that Rideonix or its representatives may contact
          me...
        </p>

        <button
          onClick={onNext}
          className="w-full bg-black text-white py-3 rounded-full font-semibold"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
