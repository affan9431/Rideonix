import { ChevronDown, MapPin, Star } from "lucide-react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
} from "react-leaflet";
import ChangeMapView from "../component/ChangeMapView";
import DashBoardNavbar from "../component/DashboardNavbar";
import L from "leaflet";
import { useEffect, useState } from "react";
import ToggleSwitch from "../component/ToggleSwitch";
import StarRating from "../component/StarRating";
import TripDetailModal from "../component/TripDetailModal";
import { socket } from "../service/socket.io";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import RideRequestPopup from "../component/RideRequestPopup";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import RideHistory from "../component/RideHistory";
import toast from "react-hot-toast";

const redIcon = new L.Icon({
  iconUrl:
    "https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  iconSize: [25, 41],
  shadowUrl:
    "https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

export default function UberDashboard() {
  const [position, setPosition] = useState([]);
  const [incomingRide, setIncomingRide] = useState(null);
  const [showRidePopup, setShowRidePopup] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const hideMapRoutes = ["/driver/profile", "/driver/performance"];
  const shouldHideMap = hideMapRoutes.includes(location.pathname);

  const [address, setAddress] = useState({
    cityName: "",
    state: "",
  });

  const [driverInfo, setDriverInfo] = useState({
    driverId: "",
    username: "",
    phoneNumber: "",
    cityName: "",
    selectedVehicle: "",
    profilePicture: "",
  });

  const getCityName = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://rideonix-backend.onrender.com/get-city?lat=${lat}&lon=${lon}`
      );

      const data = await response.json();
      console.log(data);
      setAddress({
        cityName:
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          "Unknown",
        state: data.address?.state || "Unknown",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const coords = [position.coords.latitude, position.coords.longitude];
        setPosition(coords);
        getCityName(coords[0], coords[1]);

        socket.emit("driverLocationUpdate", {
          driverId: driverInfo.driverId,
          location: { lat: coords[0], lon: coords[1] },
        });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          // Show confirm popup
          const confirmDeny = window.confirm(
            "We need your location to locate you on the map. Do you really want to deny access?"
          );

          if (confirmDeny) {
            setPermissionDenied(true);
          } else {
            setPermissionDenied(false);
            // Retry geolocation request
            navigator.geolocation.watchPosition(
              (position) => {
                const coords = [
                  position.coords.latitude,
                  position.coords.longitude,
                ];
                setPosition(coords);
                getCityName(coords[0], coords[1]);

                socket.emit("driverLocationUpdate", {
                  driverId: driverInfo.driverId,
                  location: { lat: coords[0], lon: coords[1] },
                });
              },
              (err) => console.error("Retry failed:", err),
              {
                enableHighAccuracy: true,
                maximumAge: 10000,
                timeout: 5000,
              }
            );
          }
        } else {
          console.error("Geolocation error:", error.message);
        }
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [driverInfo]);

  useEffect(() => {
    const driverToken = localStorage.getItem("driverToken");
    const decoded = driverToken && jwtDecode(driverToken);
    const fetchDriverData = async () => {
      const res = await axios.get(
        `https://rideonix-backend.onrender.com/api/driver/${decoded.id}`
      );

      const requiredData = {
        driverId: res.data.data._id,
        username: res.data.data.username,
        phoneNumber: res.data.data.phoneNumber,
        cityName: res.data.data.cityName,
        selectedVehicle: res.data.data.selectedVehicle,
        profilePicture: res.data.data.profilePicture,
      };
      setDriverInfo(requiredData);
      socket.emit("register_driver", {
        driverId: requiredData.driverId,
      });
    };
    fetchDriverData();
  }, []);

  useEffect(() => {
    const handleRideRequest = (data) => {
      setIncomingRide(data);
      setShowRidePopup(true);
    };

    socket.on("ride_request_to_driver", handleRideRequest);

    return () => {
      // Clean up listener *only* on component unmount
      socket.off("ride_request_to_driver", handleRideRequest);
    };
  }, []);

  useEffect(() => {
    socket.on("ride_assigned", (data) => {
      localStorage.setItem("rideData", JSON.stringify(data.rideData));
      navigate("/driver/on-the-way");
    });

    return () => {
      socket.off("ride_assigned");
    };
  }, [navigate]);

  useEffect(() => {
    socket.on("ride_already_taken", () => {
      toast.error("❌ Ride already taken. Closing popup.");
      setShowRidePopup(false);
      setIncomingRide(null);
    });

    return () => {
      socket.off("ride_already_taken");
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 font-sans">
      {/* Header */}
      <DashBoardNavbar />

      {/* Main Content Area */}
      <main className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-9 bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Welcome Section */}
          <div className="flex items-center justify-between  pb-4">
            <div className="flex items-center space-x-4">
              <img
                src={driverInfo.profilePicture}
                alt="Affan's Avatar"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold">Welcome, Affan</h2>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>
                    {address.cityName}, {address.state}
                  </span>
                </div>
              </div>
            </div>
            <ToggleSwitch
              onToggle={(isOnline) => {
                isOnline
                  ? socket.emit("driverOnline", {
                      driverInfo,
                      location: { lat: position[0], lon: position[1] },
                    })
                  : socket.emit("driverOffline", {
                      driverInfo,
                      location: { lat: position[0], lon: position[1] },
                    });
              }}
            />
          </div>

          {/* Car + Map Side-by-Side */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className={`w-full ${shouldHideMap ? "" : "lg:w-[45%]"}`}>
              <Outlet />
            </div>

            {/* Map Container Box */}
            {!shouldHideMap && !permissionDenied && (
              <div className="flex-1 h-[300px] lg:h-[400px] rounded-xl overflow-hidden shadow-md">
                {position.length > 0 && (
                  <MapContainer
                    center={position}
                    zoom={13}
                    scrollWheelZoom={true}
                    className="h-full w-full"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position} icon={redIcon}>
                      <Popup>From: Sitapur</Popup>
                    </Marker>
                    <ChangeMapView position={position} />
                  </MapContainer>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - History */}
        <RideHistory />
      </main>
      {showRidePopup && incomingRide && (
        <RideRequestPopup
          open={showRidePopup}
          handleClose={() => setShowRidePopup(false)}
          incomingRide={incomingRide}
          driverInfo={driverInfo}
          setIncomingRide={setIncomingRide}
          setShowRidePopup={setShowRidePopup}
        />
      )}
    </div>
  );
}
