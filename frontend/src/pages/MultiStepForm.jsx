import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const location = useLocation();
  const { identifier, otp } = location.state || {};
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    smsCode: "",
    agreedToTerms: false,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    await axios.post("https://rideonix-backend.onrender.com/api/user/verify-otp", {
      identifier,
      otp,
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                form.title.sms_variable_otp
              </h1>
              <a href="#" className="text-blue-600 underline text-sm">
                Changed your mobile number?
              </a>
            </div>

            <div className="mb-6">
              <div className="flex justify-center mb-4">
                <input
                  type="text"
                  maxLength={6}
                  value={formData.smsCode}
                  onChange={(e) => handleInputChange("smsCode", e.target.value)}
                  className="w-16 h-16 text-center text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="text-center">
                <button className="text-gray-400 text-sm bg-gray-100 px-4 py-2 rounded-lg">
                  Resend code via SMS (0:03)
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="w-full max-w-md mx-auto">
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
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
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
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="w-full max-w-md mx-auto">
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
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="w-full max-w-md mx-auto">
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

            <div className="flex items-center space-x-3 mb-8">
              <span className="text-sm font-medium text-gray-700">I Agree</span>
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
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        {renderStep()}
      </div>

      <div className="flex justify-between items-center px-6 py-6 max-w-md mx-auto w-full">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`p-3 rounded-full ${
            currentStep === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={handleSubmit}
          disabled={currentStep === 4}
          className={`px-6 py-3 rounded-full font-medium flex items-center space-x-2 ${
            currentStep === 4
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          <span>Next</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
