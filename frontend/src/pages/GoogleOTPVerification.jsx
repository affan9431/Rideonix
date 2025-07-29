import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PrevNextButton from "../component/PrevNextButton";
import axios from "axios";
import toast from "react-hot-toast";
import { useOnboarding } from "../context/OnboardingProvider";

function GoogleOTPVerification() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { setDriverData } = useOnboarding();
  const driverState = localStorage.getItem("driverState") === "true";

  console.log("driverState:", driverState);

  const {
    identifier,
    otp: serverOTP,
    username,
    email,
    profilePicture,
  } = location.state || {};

  useEffect(() => {
    toast.success(`Your OTP is ${serverOTP}.`);
  }, [serverOTP]);

  const handleNext = async () => {
    try {
      const otpCode = Number(otp.join(""));

      const res = await axios.post(
        "https://rideonix-backend.onrender.com/api/auth/google-verify-otp",
        {
          identifier,
          otpCode,
          username,
          email,
          profilePicture,
          driverState,
        }
      );

      if (res.data.reason === "phone_conflict") {
        toast.error("Phone number is already use.");
        navigate("/registerPhoneNumber");
      }

      if (res.data.reason === "both_conflict") {
        toast.error("Phone number and email both are already use.");
        navigate("/register");
      }

      if (res.data.reason === "email_conflict") {
        toast.error("Email is already use.");
        navigate("/register");
      }

      // TODO: Update code for driver flow as well
      if (driverState === true) {
        setDriverData((prev) => ({
          ...prev,
          username,
          email,
          profilePicture,
          phoneNumber: identifier,
        }));

        localStorage.removeItem("driverState");
        setTimeout(() => {
          navigate("/location-referral", {
            state: {},
          });
        }, 100);
      } else {
        localStorage.setItem("riderToken", res.data.token);
        localStorage.setItem("activeRole", "rider");
        navigate("/ride");
      }
    } catch (error) {
      // Show backend error message if available
      const msg =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(msg);
      console.error("OTP Verification Error:", error); // helpful during testing
    }
  };

  const handleBack = () => {};

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1].focus(); // Move to next box
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus(); // Move to previous box
    }
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto m-40">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            OTP Verification
          </h1>
          <a
            href="#"
            className="text-blue-600 underline text-sm"
            onClick={() => navigate("/signup")}
          >
            Changed your mobile number?
          </a>
        </div>

        <div className="mb-6">
          <div className="flex justify-center gap-4 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-14 h-14 text-center text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
            ))}
          </div>

          <div className="text-center">
            <button className="text-gray-400 text-sm bg-gray-100 px-4 py-2 rounded-lg">
              Resend code via SMS (0:03)
            </button>
          </div>
        </div>
      </div>

      <PrevNextButton
        handleBack={handleBack}
        handleNext={handleNext}
        currentStep={1}
      />
    </>
  );
}

export default GoogleOTPVerification;
