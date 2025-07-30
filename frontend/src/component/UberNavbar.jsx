import { FaCar } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsFillBookmarkFill } from "react-icons/bs";
import AvatarPage from "./Avatar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getRiderInfo from "../utils/getRiderData";

export default function UberNavbar() {
  const riderToken = localStorage.getItem("riderToken");
  const [profileImage, setProfileImage] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const riderData = riderToken && (await getRiderInfo());
      setProfileImage(riderData?.profilePicture);
    };
    fetchData();
  }, [riderToken]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

        {/* Right Section */}
        <div className="flex items-center space-x-3 md:space-x-4">
          <Link
            to="/app/ride-history"
            className="hidden sm:flex items-center space-x-1 bg-gray-100 text-black font-medium px-3 py-1 rounded-full"
          >
            <BsFillBookmarkFill />
            <span>Activity</span>
          </Link>

          <div
            className="relative flex items-center space-x-1 cursor-pointer profile-dropdown"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {riderToken && <AvatarPage image={profileImage} />}
            </div>
            <MdKeyboardArrowDown className="text-xl hidden sm:inline" />

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50 py-2">
                <Link
                  to="/app/rider-profile"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Profile
                </Link>
                <Link
                  to="/app/ride-history"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Ride History
                </Link>
                <Link
                  to="/app/help"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Help Center
                </Link>
                <div
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                  className="block px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer text-sm"
                >
                  Sign Out
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Menu */}
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
