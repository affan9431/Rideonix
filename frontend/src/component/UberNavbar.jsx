import { FaCar } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsFillBookmarkFill } from "react-icons/bs";
import AvatarPage from "./Avatar";
import { Link } from "react-router-dom";

const riderToken = localStorage.getItem("riderToken");

export default function UberNavbar() {
  return (
    <div className="w-full shadow-md bg-white">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <span className="text-2xl md:text-3xl font-semibold">Rideonix</span>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          <div className="flex items-center space-x-6 text-sm font-medium text-black">
            <div className="flex items-center space-x-1">
              <FaCar />
              <span>Ride</span>
            </div>
          </div>
        </div>

        {/* Right Section (Activity + Avatar) */}
        <div className="flex items-center space-x-3 md:space-x-4">
          <Link
            to="/app/ride-history"
            className="hidden sm:flex items-center space-x-1 bg-gray-100 text-black font-medium px-3 py-1 rounded-full"
          >
            <BsFillBookmarkFill />
            <span>Activity</span>
          </Link>

          <div className="flex items-center space-x-1">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {riderToken && <AvatarPage />}
            </div>
            <MdKeyboardArrowDown className="text-xl hidden sm:inline" />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Menu (Optional) */}
      <div className="md:hidden px-4 pb-2 pt-1">
        <div className="flex items-center justify-around text-sm font-medium text-black">
          <div className="flex flex-col items-center">
            <FaCar className="text-lg" />
            <span>Ride</span>
          </div>
          <Link to="/app/ride-history" className="flex flex-col items-center">
            <BsFillBookmarkFill className="text-lg" />
            <span>Activity</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
