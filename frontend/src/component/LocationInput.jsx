import { useEffect, useRef, useState } from "react";
import axios from "axios";
import useLocation from "../hooks/useLocation";

export default function LocationInput({ label, onSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null); // ref for entire component
  const { setPickUpLocationName, setDropLocationName } = useLocation();

  const fetchSuggestions = async (text) => {
    const res = await axios.get(
      `https://api.geoapify.com/v1/geocode/autocomplete`,
      {
        params: {
          text,
          lang: "en",
          filter: "countrycode:in",
          apiKey: "ebb11248b66c4f8cabdbfa18a82c6560",
        },
      }
    );
    setSuggestions(res.data.features);
  };

  useEffect(() => {
    if (label === "Pickup Location") {
      setPickUpLocationName(query);
    } else {
      setDropLocationName(query);
    }
  }, [label, query, setDropLocationName, setPickUpLocationName]);

  // Debounce search
  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.length >= 3) fetchSuggestions(query);
    }, 300);
    return () => clearTimeout(delay);
  }, [query]);

  // Detect outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full mb-4" ref={inputRef}>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        placeholder="Start typing location..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-50 bg-white border border-gray-300 mt-1 rounded-lg shadow-md w-full max-h-60 overflow-y-auto">
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              onClick={() => {
                setQuery(item.properties.formatted);
                setSuggestions([]);
                onSelect(item);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {item.properties.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
