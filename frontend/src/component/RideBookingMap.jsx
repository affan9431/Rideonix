import { useEffect } from "react";
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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setPosition([latitude, longitude]);
        },
        (err) => {
          console.error(err);
        },
        { enableHighAccuracy: true }
      );
    }
  }, [setPosition]);
  // emit here "register_rider"

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
    </div>
  );
}
