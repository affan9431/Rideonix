import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import ChangeMapView from "./ChangeMapView";
import { Outlet } from "react-router-dom";
import useLocation from "../hooks/useLocation";
import { jwtDecode } from "jwt-decode";
import { socket } from "../service/socket.io";
import toast from "react-hot-toast";
import LocationPermissionModal from "./LocationPermissionModal";

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function RideBookingMap() {
  const { position, dropLocation, setPosition } = useLocation();
  const [isLocationBlocked, setIsLocationBlocked] = useState(false);

  useEffect(() => {
    let watchId;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setPosition([latitude, longitude]);
          setIsLocationBlocked(false); // User allowed location
        },
        (err) => {
          console.error(err);
          if (err.code === 1) {
            if (navigator.permissions) {
              navigator.permissions
                .query({ name: "geolocation" })
                .then((result) => {
                  if (result.state === "denied") {
                    alert(
                      "You’ve previously blocked location access. To use this feature, please enable location in your browser settings."
                    );
                    setIsLocationBlocked(true); // trigger fallback UI
                  } else {
                    // Not permanently blocked, show confirmation dialog
                    const confirmDeny = window.confirm(
                      "We need your location to locate you on the map. Do you really want to deny access?"
                    );

                    if (confirmDeny) {
                      setIsLocationBlocked(true);
                    } else {
                      // Retry geolocation
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          const latitude = position.coords.latitude;
                          const longitude = position.coords.longitude;
                          setPosition([latitude, longitude]);
                          setIsLocationBlocked(false);
                        },
                        (err) => console.error("Retry failed:", err),
                        {
                          enableHighAccuracy: true,
                          maximumAge: 10000,
                          timeout: 5000,
                        }
                      );
                    }
                  }
                });
            } else {
              // permissions API not available (older browsers), fallback
              alert(
                "Location permission denied. Please enable it in your browser settings to use this feature."
              );
              setIsLocationBlocked(true);
            }
          }
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [setPosition, setIsLocationBlocked]);

  const retryGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setPosition([latitude, longitude]);
        setIsLocationBlocked(false);
      },
      (err) => {
        console.error("Retry failed:", err.message);
        toast.error("Still can’t access your location. Check settings.");
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
      }
    );
  };

  useEffect(() => {
    const riderToken = localStorage.getItem("riderToken");
    const decoded = riderToken && jwtDecode(riderToken);
    socket.emit("register_rider", {
      riderId: decoded.id,
    });
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen p-6 bg-white space-y-6 md:space-y-0 md:space-x-6">
      {/* Left Panel - Form */}
      <Outlet />

      {/* Right Panel - Map */}
      <div className="w-full md:flex-1 rounded-2xl overflow-hidden shadow-sm">
        {position.length > 0 && (
          <MapContainer
            center={position} // Patna
            touchZoom={true}
            zoom={13}
            scrollWheelZoom={true}
            enableHighAccuracy
            getCurrentPosition={true}
            className="h-[600px] w-full z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={redIcon}>
              <Popup>Your current location</Popup>
            </Marker>
            {dropLocation.length > 0 && (
              <Marker position={dropLocation} icon={redIcon}>
                <Popup>Your current location</Popup>
              </Marker>
            )}
            <ChangeMapView position={position} />
            {position.length > 0 && dropLocation.length > 0 && (
              <Polyline positions={[position, dropLocation]} color="black" />
            )}
          </MapContainer>
        )}
      </div>
      {isLocationBlocked && (
        <LocationPermissionModal
          open={isLocationBlocked}
          onClose={() => setIsLocationBlocked(false)}
          onRetry={retryGeolocation}
          text="drivers"
        />
      )}
    </div>
  );
}
