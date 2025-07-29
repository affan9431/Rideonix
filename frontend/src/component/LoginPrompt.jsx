import { Link } from "react-router-dom";

const LoginPrompt = () => {
  const riderToken = localStorage.getItem("riderToken");

  return (
    <section
      className={`flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-16 lg:px-24 py-12 md:py-20 gap-10 bg-white text-black
      `}
    >
      {/* Left Side - Text */}
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
          {riderToken ? "Go" : "Log In"} to see your recent{" "}
          <br className="hidden md:block" /> activity
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-base sm:text-lg">
          View past trips, tailored suggestions, support resources, and more.
        </p>

        <Link
          to={riderToken ? "/app/ride-history" : "/register"}
          className={`inline-block font-semibold px-6 py-3 rounded-md transition bg-black text-white`}
        >
          {!riderToken ? "Log in to your account" : "Go to your activity"}
        </Link>

        {!riderToken && (
          <p className="mt-6 text-sm text-gray-700 dark:text-gray-400 border-t pt-4 max-w-fit mx-auto md:mx-0">
            Don’t have a Rideonix account?{" "}
            <Link
              to="/register"
              className="underline hover:text-black dark:hover:text-white font-medium"
            >
              Sign up
            </Link>
          </p>
        )}
      </div>

      {/* Right Side - Image */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src="/images/Airportfall.webp"
          alt="Login Visual"
          className="rounded-lg w-full max-w-md h-auto object-cover"
        />
      </div>
    </section>
  );
};

export default LoginPrompt;
