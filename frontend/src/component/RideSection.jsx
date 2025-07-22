import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import ChangeMapView from "./ChangeMapView";
import useDarkMode from "../hooks/useDarkMode";
import { Link } from "react-router-dom";

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

const riderToken = localStorage.getItem("riderToken");

const RideSection = () => {
  const [position, setPosition] = useState([]);
  const [dropLocation, setDropLocation] = useState([]);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
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
  }, []);

  return (
    <div
      className={`w-full px-6 py-12 flex flex-col md:flex-row items-center justify-center gap-12 ${
        darkMode ? "bg-black text-white" : "bg-white"
      } mt-20`}
    >
      {/* Left Section */}
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-5xl font-bold leading-tight">
          Go anywhere with <br /> Rideonix
        </h1>

        {/* <div className="space-y-3">
          <div className="flex items-center bg-gray-100 rounded px-4 py-3">
            <div className="mr-3 text-black">
              <span className="text-lg">●</span>
            </div>
            <input
              type="text"
              placeholder="Pickup location"
              className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
            />
            <Send className="h-4 w-4 text-gray-500" />
          </div>

          <div className="flex items-center bg-gray-100 rounded px-4 py-3">
            <div className="mr-3 text-black">
              <span className="text-lg">■</span>
            </div>
            <input
              type="text"
              placeholder="Dropoff location"
              className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
            />
          </div>
        </div> */}

        <div className="flex items-center gap-4 pt-4">
          <Link
            to={riderToken ? "/ride" : "/register"}
            className={`${
              darkMode ? "bg-white text-black" : "bg-black text-white"
            } text-sm font-semibold px-6 py-3 rounded-lg cursor-pointer`}
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
