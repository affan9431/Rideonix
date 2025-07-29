import React from "react";
import { FaClock, FaDotCircle, FaPlus, FaStop, FaUser } from "react-icons/fa";
import LocationInput from "./LocationInput";
import { Link } from "react-router-dom";
import useLocation from "../hooks/useLocation";

function GetLocationForm() {
  const { position, dropLocation, setPosition, setDropLocation } =
    useLocation();
  return (
    <div className="w-full md:w-1/3 max-w-sm bg-white border rounded-2xl p-5 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Get a ride</h2>

      {/* Pickup Input */}
      <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 mb-3 border border-transparent focus-within:border-2 focus-within:border-amber-950">
        <FaDotCircle className="mr-3 text-black" />
        <LocationInput
          label="Pickup Location"
          onSelect={(place) => {
            setPosition([place.properties.lat, place.properties.lon]);
          }}
        />
      </div>

      {/* Dropoff Input */}
      <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 mb-3 border border-transparent focus-within:border-2 focus-within:border-amber-950">
        <FaStop className="mr-3 text-black" />
        <LocationInput
          label="Drop Location"
          onSelect={(place) => {
            setDropLocation([place.properties.lat, place.properties.lon]);
          }}
        />
        <FaPlus className="ml-2 text-black" />
      </div>

      {/* Pickup Time */}
      <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 mb-3">
        <FaClock className="mr-3 text-black" />
        <span className="text-sm font-medium text-gray-800">Pickup now</span>
        <select className="ml-auto bg-transparent text-sm text-gray-700 focus:outline-none">
          <option>Now</option>
          <option>Schedule</option>
        </select>
      </div>

      {/* Passenger */}
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4 w-max">
        <FaUser className="mr-2 text-black" />
        <span className="text-sm font-medium text-gray-800">For me</span>
        <select className="ml-2 bg-transparent text-sm text-gray-700 focus:outline-none">
          <option>Me</option>
          <option>Others</option>
        </select>
      </div>

      {/* Search Button */}
      <Link to="/ride/vehicle-selection">
        <button
          className={`w-full py-3 rounded-lg  text-sm font-semibold ${
            position.length === 0 || dropLocation.length === 0
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "cursor-pointer bg-slate-600 text-white"
          }`}
          disabled={position.length === 0 || dropLocation.length === 0}
        >
          Search
        </button>
      </Link>
    </div>
  );
}

export default GetLocationForm;
