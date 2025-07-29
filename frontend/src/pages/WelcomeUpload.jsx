import React from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../context/OnboardingProvider";
import supabase from "../service/supabase";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const riderToken = localStorage.getItem("riderToken");
const decoded = riderToken && jwtDecode(riderToken);

export default function WelcomeUpload() {
  const { driverData, setDriverData } = useOnboarding();
  const {
    username,
    email,
    phoneNumber,
    cityName,
    referralCode,
    selectedVehicle,
    selectedLanguage,
  } = driverData;
  const navigate = useNavigate();

  const [preview, setPreview] = React.useState({
    drivingLicense: null,
    profilePicture: null,
    aadhaarCard: null,
    rc: null,
  });

  const handleFileChange = (field, file) => {
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    setPreview((prev) => ({ ...prev, [field]: fileUrl }));

    setDriverData((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const uploadFile = async (bucket, file) => {
    const filePath = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error(`❌ Upload error to ${bucket}:`, error.message);
      throw error;
    }

    const publicUrl = supabase.storage.from(bucket).getPublicUrl(filePath)
      .data.publicUrl;
    return publicUrl;
  };

  const handleNext = async () => {
    const { drivingLicense, profilePicture, aadhaarCard, rc } = driverData;
    if (!drivingLicense || !profilePicture || !aadhaarCard || !rc) {
      toast.error(
        "Please upload all the required documents before proceeding."
      );
      return;
    }

    try {
      const [licenseUrl, profileUrl, aadhaarUrl, rcUrl] = await Promise.all([
        uploadFile("driving-license", drivingLicense),
        uploadFile("profile-image", profilePicture),
        uploadFile("aadhaar-card", aadhaarCard),
        uploadFile("registration-certificate", rc),
      ]);

      const updatedData = {
        username: decoded ? decoded.username : username,
        email: decoded ? decoded.email : email,
        phoneNumber: decoded ? decoded.phoneNumber : phoneNumber,
        cityName,
        referralCode,
        selectedVehicle,
        selectedLanguage,
        drivingLicense: licenseUrl,
        profilePicture: profileUrl,
        aadhaarCard: aadhaarUrl,
        rc: rcUrl,
        documents: true,
      };

      setDriverData(updatedData);
      const res = await axios.post("https://rideonix-backend.onrender.com/api/driver", updatedData);
      localStorage.removeItem("activeRole");
      localStorage.setItem("driverToken", res.data.token);
      localStorage.setItem("activeRole", "driver");

      navigate("/driver");
    } catch (err) {
      toast.error("Upload failed. See console.");
      console.error(err);
    }
  };

  const renderPreview = (fileUrl, file) => {
    if (!file) return null;
    if (file.type === "application/pdf") {
      return <span className="text-sm text-blue-600">📄 PDF selected</span>;
    }
    return (
      <img
        src={fileUrl}
        alt="preview"
        className="mt-2 rounded-md border max-w-xs max-h-28 object-cover"
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-100">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">Welcome, Affan</h2>
        <p className="text-gray-600 mb-8">
          Here's what you need to do to set up your account.
        </p>

        <ul className="space-y-6 text-left text-sm">
          {/* Profile Picture with Round Preview */}
          <li className="border-b pb-4">
            <label className="font-semibold block mb-2">Profile Picture</label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) =>
                  handleFileChange("profilePicture", e.target.files[0])
                }
                className="text-xs"
              />
              {preview.profilePicture && (
                <img
                  src={preview.profilePicture}
                  alt="Profile Preview"
                  className="w-16 h-16 rounded-full object-cover border"
                />
              )}
            </div>
          </li>

          {/* Driving License */}
          <li className="border-b pb-4">
            <label className="font-semibold block mb-1">
              Driving License{" "}
              <span className="text-blue-500 text-xs">(Required)</span>
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) =>
                handleFileChange("drivingLicense", e.target.files[0])
              }
              className="text-xs"
            />
            {renderPreview(preview.drivingLicense, driverData.drivingLicense)}
          </li>

          {/* Aadhaar Card */}
          <li className="border-b pb-4">
            <label className="font-semibold block mb-1">Aadhaar Card</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) =>
                handleFileChange("aadhaarCard", e.target.files[0])
              }
              className="text-xs"
            />
            {renderPreview(preview.aadhaarCard, driverData.aadhaarCard)}
          </li>

          {/* RC */}
          <li className="border-b pb-4">
            <label className="font-semibold block mb-1">
              Registration Certificate (RC)
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => handleFileChange("rc", e.target.files[0])}
              className="text-xs"
            />
            {renderPreview(preview.rc, driverData.rc)}
          </li>

          {/* Language (just status display) */}
          <li className="text-green-600 font-semibold pt-2">
            Preferred Language - Completed
          </li>
        </ul>

        <button
          onClick={handleNext}
          className="w-full mt-8 bg-black text-white py-3 rounded-full font-semibold cursor-pointer"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
