import { Link } from "react-router-dom";

const RideSection = () => {
  const riderToken = localStorage.getItem("riderToken");
  return (
    <div
      className={`w-full px-6 py-12 flex flex-col md:flex-row items-center justify-center gap-12 bg-white mt-20`}
    >
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-5xl font-bold leading-tight">
          Go anywhere with <br /> Rideonix
        </h1>

        <div className="flex items-center gap-4 pt-4">
          <Link
            to={riderToken ? "/ride" : "/register"}
            className={`bg-black text-white
            text-sm font-semibold px-6 py-3 rounded-lg cursor-pointer`}
          >
            {riderToken ? "Book Ride" : "Login"}
          </Link>
          {!riderToken && (
            <p className="text-sm border-b border-black cursor-pointer">
              Log in to see your recent activity
            </p>
          )}
        </div>
      </div>
      {/* Right Section - Image */}
      <div className="max-w-lg w-full">
        <img
          src="/images/ridesharing.webp"
          alt="Uber"
          className="rounded-2xl object-cover w-full h-auto"
        />
      </div>
    </div>
  );
};

export default RideSection;
