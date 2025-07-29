import React, { useState } from "react";
import PrevNextButton from "../component/PrevNextButton";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useOnboarding } from "../context/OnboardingProvider";
import toast from "react-hot-toast";

function TermAndCondition() {
  const [formData, setFormData] = useState({
    agreedToTerms: false,
  });
  const location = useLocation();
  const { username, email, phoneNumber } = location.state || {};
  const { driverState, driverData } = useOnboarding();

  const navigate = useNavigate();
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = async () => {
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phoneNumber.trim();

    if (!trimmedUsername || !trimmedEmail || !trimmedPhone) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      if (driverState === false) {
        const res = await axios.post(
          "https://rideonix-backend.onrender.com/api/rider",
          {
            username: trimmedUsername,
            email: trimmedEmail,
            phoneNumber: trimmedPhone,
          }
        );

        if (res.data.success === "success" && res.data?.token) {
          localStorage.removeItem("activeRole");
          localStorage.setItem("riderToken", res.data.token);
          localStorage.setItem("activeRole", "rider");
          navigate("/ride");
        } else {
          toast.error("Something went wrong...");
        }
      } else {
        navigate("/location-referral");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
      console.error(error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="w-full max-w-md mx-auto m-[170px]">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Accept Rideonix Terms &<br />
            Review Privacy Notice
          </h1>

          <div className="text-sm text-gray-700 leading-relaxed">
            <p>
              By selecting "I Agree" below, I have reviewed and agree to the{" "}
              <a href="#" className="text-blue-600 underline">
                Terms of Use
              </a>{" "}
              and acknowledge the{" "}
              <a href="#" className="text-blue-600 underline">
                Privacy Notice
              </a>
              . I am at least 18 years of age.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 mb-8 cursor-pointer">
          <span className="text-sm font-medium text-gray-700 ">I Agree</span>
          <button
            onClick={() =>
              handleInputChange("agreedToTerms", !formData.agreedToTerms)
            }
            className={`w-6 h-6 border-2 rounded ${
              formData.agreedToTerms
                ? "bg-black border-black"
                : "border-gray-300 bg-white"
            }`}
          >
            {formData.agreedToTerms && (
              <svg
                className="w-4 h-4 text-white mx-auto"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <PrevNextButton
        handleBack={handleBack}
        handleNext={handleNext}
        currentStep={4}
      />
    </>
  );
}

export default TermAndCondition;
