import { useEffect, useState } from "react";
import { AlignLeft, Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AvatarPage from "./Avatar";
import getDriverInfo from "../utils/getDriverData";
import { LayoutDashboard, User, BarChart, LogOut, X } from "lucide-react";

const riderToken = localStorage.getItem("riderToken");

const DashBoardNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDriverInfo();
      setProfileImage(data.profilePicture);
    };
    fetchData();
  }, []);

  return (
    <>
      <nav className="bg-black text-white px-6 py-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold">
            Rideonix
          </Link>

          <AlignLeft
            className="cursor-pointer"
            onClick={() => setShowSidebar(true)}
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <div className="flex items-center gap-1 cursor-pointer">
            <Globe size={16} />
            EN
          </div>
          <AvatarPage
            image={profileImage}
            onClick={() => navigate("/driver/profile")}
          />
        </div>
      </nav>
      <div>
        {showSidebar && (
          <div className="fixed top-[70px] left-0 z-50 w-64 h-[90vh] bg-white shadow-xl border-r transition-transform duration-300">
            <div className="p-4 flex items-center justify-between border-b">
              <h2 className="text-lg font-bold">Menu</h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="text-gray-600 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>
            <ul className="p-4 space-y-4">
              <li className="flex items-center gap-2 text-gray-700 hover:text-black">
                <LayoutDashboard size={18} />
                <Link to="/driver" onClick={() => setShowSidebar(false)}>
                  Dashboard
                </Link>
              </li>
              <li className="flex items-center gap-2 text-gray-700 hover:text-black">
                <User size={18} />
                <Link
                  to="/driver/profile"
                  onClick={() => setShowSidebar(false)}
                >
                  Profile
                </Link>
              </li>
              <li className="flex items-center gap-2 text-gray-700 hover:text-black">
                <BarChart size={18} />
                <Link
                  to="/driver/performance"
                  onClick={() => setShowSidebar(false)}
                >
                  Performance
                </Link>
              </li>
              <li className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer">
                <LogOut size={18} />
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    localStorage.removeItem("driverToken");
                    window.location.reload();
                    navigate("/app/home");
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default DashBoardNavbar;
