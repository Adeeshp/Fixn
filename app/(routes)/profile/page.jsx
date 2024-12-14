"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Save, Upload } from "lucide-react";
import BookingHistoryList from "@/app/_components/BookingHistoryList";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/api/user/profile/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const userData = response.data.user;

        // Decode binary image if available
        if (userData.imageURL?.data) {
          const binaryData = new Uint8Array(userData.imageURL.data);
          const binaryString = Array.from(binaryData)
            .map((byte) => String.fromCharCode(byte))
            .join("");
          userData.profilePicture = `data:image/jpeg;base64,${btoa(binaryString)}`;
        } else {
          userData.profilePicture = "/images/male_avatar.jpg"; // Fallback image
        }

        setUser(userData);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setUser((prev) => ({
        ...prev,
        profilePicture: imageURL,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...user,
        categoryId: user.categoryId?._id || user.categoryId,
        subCategoryId: user.subCategoryId?._id || user.subCategoryId,
      };

      const response = await axios.post(`/api/user/updateUser/${user._id}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("User updated successfully:", response.data);
      setIsEditing(false); // Exit edit mode after saving
    } catch (err) {
      console.error("Error updating profile:", err.response);
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="pt-20 pb-20 mx-20">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
          <button
            onClick={isEditing ? handleSave : toggleEditMode}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
          >
            {isEditing ? (
              <>
                <Save className="mr-2" />
                Save
              </>
            ) : (
              <>
                <Edit className="mr-2" />
                Edit
              </>
            )}
          </button>
        </div>

        <div
          className={`flex ${
            user.role === "serviceProvider" ? "flex-row" : "flex-col"
          }`}
        >
          {/* Left: Profile Details */}
          <div
            className={`${
              user.role === "serviceProvider" ? "lg:w-7/12" : "w-full"
            } pr-6`}
          >
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-32 h-32 mb-6">
                {/* Display user profile image */}
                <img
                  src={user.profilePicture}
                  alt={`${user.firstname} ${user.lastname}`}
                  className="w-full h-full rounded-full object-cover"
                />
                {/* Image upload button */}
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer">
                    <Upload className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Editable Fields */}
              {[
                { label: "First Name", name: "firstname", value: user.firstname },
                { label: "Last Name", name: "lastname", value: user.lastname },
                { label: "Email", name: "email", value: user.email },
                { label: "Phone Number", name: "phoneNo", value: user.phoneNo },
                { label: "City", name: "city", value: user.city },
                { label: "Province", name: "province", value: user.province },
                { label: "Country", name: "country", value: user.country },
              ].map(({ label, name, value }) => (
                <div className="" key={name}>
                  <label className="block text-gray-600 text-sm">{label}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name={name}
                      value={value}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  ) : (
                    <p className="text-gray-800 bg-gray-100 rounded-lg py-2 px-3 mt-2">{value || "N/A"}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Past Jobs */}
          {user.role === "serviceProvider" && (
            <div className="lg:w-5/12 pl-6 border-l border-gray-200">
              <h2 className="font-bold text-lg mb-4">Past Jobs</h2>
              <BookingHistoryList />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;


