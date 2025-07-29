import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import supabase from "../service/supabase";
import toast from "react-hot-toast";

const riderToken = localStorage.getItem("riderToken");
const decoded = riderToken && jwtDecode(riderToken);

export default function RiderProfile() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    profilePicture: "", // Will be public URL
  });

  const [newImageFile, setNewImageFile] = useState(null); // Actual file
  const [imagePreview, setImagePreview] = useState(null); // Local preview

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const res = await axios.get(`https://rideonix-backend.onrender.com/api/rider/${decoded.id}`);

        const { username, email, phoneNumber, profilePicture } = res.data.data;

        setFormData({
          username,
          email,
          phoneNumber,
          profilePicture: profilePicture
            ? profilePicture
            : "/images/default-user.png",
        });

        setImagePreview(
          profilePicture ? profilePicture : "/images/default-user.png"
        );
      } catch (error) {
        console.error("Error fetching driver data:", error);
      }
    };

    fetchDriverData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedImageUrl = formData.profilePicture;

    if (newImageFile) {
      const fileName = `profile_${Date.now()}_${newImageFile.name}`;
      const { data, error } = await supabase.storage
        .from("profile-image") // ⛳ Replace with your Supabase bucket
        .upload(fileName, newImageFile);

      if (error) {
        console.error("Image upload failed", error);
        return;
      }

      const { data: publicURLData } = supabase.storage
        .from("profile-image")
        .getPublicUrl(data.path);

      uploadedImageUrl = publicURLData.publicUrl;
    }

    const finalData = {
      ...formData,
      profilePicture: uploadedImageUrl,
    };

    try {
      await axios.patch(`https://rideonix-backend.onrender.com/api/rider/${decoded.id}`, finalData);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Profile Page</h1>

        <div className="flex flex-col items-center">
          <img
            src={imagePreview}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />

          <label className="mt-4 px-4 py-2 bg-purple-200 text-purple-700 font-semibold rounded hover:bg-purple-300 cursor-pointer">
            Change Profile
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {/* Name */}
          <div>
            <label className="block text-lg font-semibold">Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border-b border-black focus:outline-none mt-1"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="w-full bg-gray-300 text-gray-700 border-b border-black focus:outline-none mt-1"
              readOnly
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-lg font-semibold">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border-b border-black focus:outline-none mt-1"
            />
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="px-6 py-2 bg-purple-200 text-purple-700 font-semibold rounded hover:bg-purple-300 transition"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}
