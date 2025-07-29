// component/TripDetailModal.jsx
import { Dialog } from "@headlessui/react";

export default function TripDetailModal({ isOpen, onClose, data }) {
  if (!data) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[1000]">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm "
        aria-hidden="true"
      />

      {/* Centered Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold text-gray-900">
            Trip Details
          </Dialog.Title>
          <div className="mt-2 text-sm text-gray-600 space-y-1">
            <p>
              <strong>From:</strong> {data.rider.pickUpLocationName}
            </p>
            <p>
              <strong>To:</strong> {data.rider.dropLocationName}
            </p>
            <p>
              <strong>Date:</strong> {data.createdAt}
            </p>
            <p>
              <strong>Time:</strong> {data.time? data.time : "10min"}
            </p>

            <p>
              <strong>Fare:</strong> ₹{data.price}
            </p>
            <p>
              <strong>Rating:</strong> {data.rating ? data.rating : 4} / 5
            </p>
          </div>
          <div className="mt-4">
            <button
              onClick={onClose}
              className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 transition"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
