import { Link } from "react-router-dom";
import { useOnboarding } from "../context/OnboardingProvider";
import { jwtDecode } from "jwt-decode";

const riderToken = localStorage.getItem("riderToken");

const decoded = riderToken && jwtDecode(riderToken);

export default function DriverHero() {
  const { setDriverState } = useOnboarding();
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 md:px-12">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between">
        {/* Left Section */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Drive when you <br />
            want, make what <br />
            you need
          </h1>
          <p className="text-gray-300 mb-6">Earn on your own schedule.</p>
          <div className="flex flex-col md:flex-row items-center gap-4">
            {riderToken ? (
              <Link to="/location-referral">
                <button className="bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 cursor-pointer">
                  Get started
                </button>
              </Link>
            ) : (
              <Link to="/register" onClick={() => setDriverState(true)}>
                <button className="bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 cursor-pointer">
                  Get started
                </button>
              </Link>
            )}
            <p className="text-sm text-gray-300">
              Already have an account?{" "}
              <a href="#" className="underline hover:text-white">
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/images/illustrationSafety.webp"
            alt="Driver Illustration"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
}
