import { useEffect, useState } from "react";

function ToggleSwitch({ onToggle }) {
  const [isOnline, setIsOnline] = useState(false); // Default online

  useEffect(() => {
    const saved = sessionStorage.getItem("driverStatus");
    if (saved === "online") {
      setIsOnline(true);
      onToggle(true); // Let parent know on mount
    }
  }, [onToggle]);

  const handleToggle = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    sessionStorage.setItem("driverStatus", newStatus ? "online" : "offline");
    onToggle && onToggle(newStatus);
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Toggle Switch UI */}
      <div
        className={`relative inline-block w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ${
          isOnline ? "bg-green-500" : "bg-gray-300"
        }`}
        onClick={handleToggle}
      >
        <input
          type="checkbox"
          className="sr-only"
          checked={isOnline}
          readOnly
        />
        <div
          className={`absolute top-0 left-0 w-6 h-6 rounded-full bg-white shadow transform transition-transform duration-300 ${
            isOnline ? "translate-x-full" : ""
          }`}
        />
      </div>

      {/* Status Text for Driver */}
      <span
        className={`text-sm font-medium ${
          isOnline ? "text-green-700" : "text-gray-600"
        }`}
      >
        {isOnline
          ? "🟢 Online - You're available to accept rides"
          : "🔴 Offline - You're not accepting rides"}
      </span>
    </div>
  );
}

export default ToggleSwitch;
