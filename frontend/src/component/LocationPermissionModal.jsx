import React from "react";
import { Dialog } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function LocationPermissionModal({
  open,
  onRetry,
  onClose,
  text,
}) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="max-w-md w-full rounded-xl bg-white p-6 shadow-lg space-y-4">
          <div className="flex items-center space-x-3">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
            <Dialog.Title className="text-lg font-semibold">
              Location Access Needed
            </Dialog.Title>
          </div>
          <Dialog.Description className="text-sm text-gray-600">
            We need your location to locate you on the map and match you with
            nearby {text}. You may have previously denied location access.
          </Dialog.Description>

          <ul className="text-sm text-gray-500 list-disc pl-5">
            <li>Check your browser's site settings.</li>
            <li>Allow location access for this site.</li>
            <li>Reload the page after enabling it.</li>
          </ul>

          <div className="flex justify-end gap-2 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md text-gray-600 hover:text-black"
            >
              Close
            </button>
            <button
              onClick={onRetry}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Retry Access
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
