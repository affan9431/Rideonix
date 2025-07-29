import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../service/socket.io";
import { jwtDecode } from "jwt-decode";
import { QRCode } from "react-qrcode-logo";
import toast from "react-hot-toast";

const driverToken = localStorage.getItem("driverToken");
const decoded = driverToken && jwtDecode(driverToken);

export default function RideDetailsToDriver() {
  const [rideData, setRideData] = useState(null);
  const [position, setPosition] = useState([]);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showQr, setShowQr] = useState(false);
  const [rideCompleted, setRideCompleted] = useState(false);

  // Dummy UPI (ideally should come from DB or backend)
  const upiId = "8092393403@ptyes";
  const price = rideData?.price || 1;

  const handleGenerateQrCoode = () => {
    setShowQr(true);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("rideData"));
    if (data) {
      setRideData(data);
    }

    const watchId = navigator.geolocation.watchPosition((pos) => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const handleCancelRide = () => {
    socket.emit("ride_canceled_by_driver", {
      driverId: decoded.id,
      riderId: rideData?.riderId,
      reason: "Canceled by driver",
      timestamp: Date.now(),
    });
    localStorage.removeItem("rideData");
    toast.success("This ride is successfully canceled!");
    navigate("/driver");
  };

  const openOtpModal = () => {
    setShowOtpModal(true);
  };

  const handleOtpSubmit = () => {
    if (otp.length !== 4 || isNaN(otp)) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }

    socket.emit("ride_started_by_driver", {
      driverId: decoded.id,
      riderId: rideData?.riderId,
      otp: otp,
      startTime: Date.now(),
    });

    setShowOtpModal(false);
    setShowBtn(false);
  };

  useEffect(() => {
    socket.on("otp_incorrect", () => {
      setError("Incorrect OTP");
      setShowOtpModal(true); // maybe reopen modal if needed
      setShowBtn(true);
    });

    return () => {
      socket.off("otp_incorrect"); // clean up
    };
  }, []);

  const handleCompeleteRide = () => {
    const requiredData = {
      driverId: decoded.id,
      riderId: rideData.riderId,
      riderName: rideData.riderName,
      pickUpLocationName: rideData.pickUpLocationName,
      dropLocationName: rideData.dropLocationName,
      price: rideData.price,
    };

    socket.emit("ride_finished", requiredData);
    setRideCompleted(true);
  };

  useEffect(() => {
    socket.on("ride_cancel_to_driver", (data) => {
      toast.error(data.reason);
      navigate("/driver");
    });
  }, [navigate]);

  const handlePaymentConfirm = () => {
    socket.emit("payment_done", {
      riderId: rideData.riderId,
    });
    localStorage.removeItem("rideData");
  };

  if (!rideData) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Ride Info Card */}
      <div className="bg-white p-4 rounded-lg shadow-md space-y-3">
        <h2 className="text-xl font-bold">Pickup Rider</h2>
        <p>
          <strong>Name:</strong> {rideData.riderName}
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a
            href={`tel:${rideData.riderPhoneNumber}`}
            className="text-blue-600"
          >
            {rideData.riderPhoneNumber}
          </a>
        </p>
        <p>
          <strong>Pickup:</strong> {rideData.pickUpLocationName}
        </p>
        <p>
          <strong>Drop:</strong> {rideData.dropLocationName}
        </p>

        {showBtn ? (
          <div className="flex gap-4 pt-2">
            <button
              onClick={handleCancelRide}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 cursor-pointer"
            >
              Cancel Ride
            </button>
            <button
              onClick={openOtpModal}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 cursor-pointer"
            >
              Start Ride
            </button>
          </div>
        ) : (
          <>
            {!rideCompleted ? (
              <button
                onClick={handleCompeleteRide}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 cursor-pointer"
              >
                Compelete Ride
              </button>
            ) : (
              <>
                <button
                  onClick={handleGenerateQrCoode}
                  className="bg-slate-600 text-white py-2 px-4 rounded-md hover:bg-slate-500 cursor-pointer"
                >
                  Generate Qr Code
                </button>
                <button
                  onClick={() => {
                    handlePaymentConfirm();
                    navigate("/driver");
                  }}
                  className="bg-black text-white py-2 px-4 rounded-md hover:bg-slate-800 cursor-pointer"
                >
                  Back to home
                </button>
              </>
            )}
          </>
        )}
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-1000">
          <div className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4">
            <h3 className="text-lg font-semibold">Enter OTP to Start Ride</h3>
            <input
              type="text"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setError("");
              }}
              maxLength={4}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 4-digit OTP"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowOtpModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleOtpSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQr && (
        <div className="transition-transform duration-300 scale-100 hover:scale-105 rotate-0 hover:rotate-1">
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center w-[320px]">
              <h3 className="text-xl font-semibold text-gray-800">
                Scan to Pay
              </h3>
              <QRCode
                value={`upi://pay?pa=${upiId}&pn=${rideData.riderName}&am=${price}&cu=INR`}
                size={200}
                logoImage="/images/logo.png" // optional: add your own branding
                qrStyle="dots"
                eyeRadius={10}
              />
              <p className="text-gray-600 text-sm">Pay ₹{price} via UPI</p>
              <button
                onClick={() => setShowQr(false)}
                className="mt-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Close
              </button>
              <button
                onClick={handlePaymentConfirm} // You should define this function in your component
                className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
              >
                Payment Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
