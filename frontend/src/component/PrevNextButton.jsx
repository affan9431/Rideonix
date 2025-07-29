import React from "react";

function PrevNextButton({ handleBack, currentStep, handleNext }) {
  return (
    <div className="bg-white flex flex-col">
      <div className=" flex items-center justify-center px-4 py-8"></div>

      <div className="flex justify-between items-center px-6 py-6 max-w-md mx-auto w-full">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`p-3 rounded-full ${
            currentStep === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100 cursor-pointer"
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
          onClick={handleNext}
          disabled={currentStep === 5}
          className={`px-6 py-3 rounded-full font-medium flex items-center space-x-2 ${
            currentStep === 5
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800 cursor-pointer"
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

export default PrevNextButton;
