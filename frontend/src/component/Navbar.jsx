import { useEffect, useState } from "react";
import { ChevronDown, Globe, Moon, Sun, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import AvatarPage from "./Avatar";
import getDriverInfo from "../utils/getDriverData";
import getRiderInfo from "../utils/getRiderData";
import { LogOut, User, History, HelpCircle } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const riderToken = localStorage.getItem("riderToken");
const driverToken = localStorage.getItem("driverToken");
const storedRole = localStorage.getItem("activeRole");

const riderDecoded = riderToken && jwtDecode(riderToken);
const driverDecoded = driverToken && jwtDecode(driverToken);

const Navbar = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeRole, setActiveRole] = useState(storedRole);
  
  useEffect(() => {
    const fetchData = async () => {
      const driverData = driverToken && (await getDriverInfo());
      const riderData = riderToken && (await getRiderInfo());

      setProfileImage(
        activeRole === "driver"
          ? driverData?.profilePicture
          : riderData?.profilePicture
      );
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRoleChange = (role) => {
    const tokenKey = role === "rider" ? "riderToken" : "driverToken";
    const token = localStorage.getItem(tokenKey);
    if (!token) {
      toast.error(
        `You need to login as ${role} first before switching to this role.`
      );
      return;
    }
    setActiveRole(role);
    localStorage.setItem("activeRole", role);
    window.location.reload();
  };

  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between relative z-50">
      {/* Left Section */}
      <div className="flex items-center gap-8">
        <Link to="/" className="text-xl font-bold">
          Rideonix
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/ride" className="hover:underline cursor-pointer">
            Ride
          </Link>
          <Link
            to={driverToken ? "/driver" : "/app/drive"}
            className="hover:underline cursor-pointer"
          >
            Drive
          </Link>
          <li
            className="relative hover:underline cursor-pointer flex items-center gap-1"
            onClick={() => setIsAboutOpen(!isAboutOpen)}
          >
            About <ChevronDown size={16} />
            {isAboutOpen && (
              <div className="absolute top-6 left-0 mt-1 bg-white text-black shadow-lg rounded p-3 text-sm w-40 z-10">
                <p className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
                  How Rideonix works
                </p>
                <p className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
                  Our team
                </p>
                <p className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
                  Careers
                </p>
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        <div className="flex items-center gap-1 cursor-pointer">
          <Globe size={16} />
          EN
        </div>

        {/* Auth Dropdown */}
        {riderToken || driverToken ? (
          <div
            className="relative profile-dropdown flex items-center gap-1 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <AvatarPage image={profileImage} />
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white text-black rounded-xl shadow-lg z-50 p-2 transition-all duration-200">
                <div className="px-4 py-2 text-sm font-semibold border-b">
                  {activeRole === "rider"
                    ? riderDecoded?.username
                    : driverDecoded?.username}
                </div>
                <div className="px-4 py-2 flex items-center justify-between gap-2 text-sm font-medium">
                  <span>Mode:</span>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="userMode"
                        value="rider"
                        checked={activeRole === "rider"}
                        onChange={() => handleRoleChange("rider")}
                        className="accent-blue-500"
                      />
                      <span>Rider</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="userMode"
                        value="driver"
                        checked={activeRole === "driver"}
                        onChange={() => handleRoleChange("driver")}
                        className="accent-green-600"
                      />
                      <span>Driver</span>
                    </label>
                  </div>
                </div>

                {/* 🔧 MODIFIED: Show rider-only pages only if riderToken exists */}
                {riderToken && (
                  <>
                    <Link
                      to="/app/rider-profile"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded cursor-pointer text-sm"
                    >
                      <User size={16} /> View Profile
                    </Link>

                    <Link
                      to="/app/ride-history"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded cursor-pointer text-sm"
                    >
                      <History size={16} /> Ride History
                    </Link>
                  </>
                )}

                <Link
                  to="/app/help"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded cursor-pointer text-sm"
                >
                  <HelpCircle size={16} /> Help Center
                </Link>

                <div
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-red-100 text-red-600 rounded cursor-pointer text-sm"
                >
                  <LogOut size={16} /> Sign Out
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/register" className="cursor-pointer hover:underline">
              Log in
            </Link>
            <Link
              to="/register"
              className="bg-white text-black px-4 py-1.5 rounded-full font-semibold hover:bg-gray-200 transition cursor-pointer"
            >
              Sign up
            </Link>
          </>
        )}
      </div>

      {/* Hamburger (Mobile) */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black text-white px-6 py-4 flex flex-col gap-4 md:hidden z-40">
          <Link to="/ride" onClick={() => setMobileMenuOpen(false)}>
            Ride
          </Link>
          <Link
            to={driverToken ? "/driver" : "/app/drive"}
            onClick={() => setMobileMenuOpen(false)}
          >
            Drive
          </Link>
          <p
            className="cursor-pointer"
            onClick={() => setIsAboutOpen(!isAboutOpen)}
          >
            About
          </p>
          {isAboutOpen && (
            <div className="ml-4 text-sm text-gray-300 flex flex-col gap-1">
              <p>How Rideonix works</p>
              <p>Our team</p>
              <p>Careers</p>
            </div>
          )}
          {riderToken || driverToken ? (
            <div className="flex flex-col gap-2 mt-4 border-t border-gray-700 pt-4 text-sm">
              <Link to="/app/rider-profile">View Profile</Link>
              <Link to="/app/ride-history">Ride History</Link>
              <Link to="/app/help">Help Center</Link>
              <button
                className="text-red-500"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-4 border-t border-gray-700 pt-4 text-sm">
              <Link to="/register">Log in</Link>
              <Link to="/register">Sign up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
