"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Save, Upload } from "lucide-react";

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
        if (userData.imageURL && userData.imageURL.data) {
            const binaryData = new Uint8Array(userData.imageURL.data); // Ensure binary data is a Uint8Array
            const binaryString = Array.from(binaryData)
              .map((byte) => String.fromCharCode(byte))
              .join("");
            userData.profilePicture = `data:image/jpeg;base64,${btoa(binaryString)}`;
          }


        
        setUser(response.data.user);
        
        
        setLoading(false);
        console.log(response.data.user);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  
  const isValidBase64Image = (base64) => {
    return base64.startsWith("data:image/") && base64.includes("base64,");
  };
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

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="pt-20 pb-20 mx-20 flex flex-row">
      <div className="lg:w-3/3 md:w-4/4 w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
          <button
            onClick={toggleEditMode}
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

        <div className="flex flex-wrap lg:flex-nowrap mt-6">
      
      {/* Left: Profile Details */}
      <div className="lg:w-7/12 w-full pr-6 border-r border-gray-200">
        <div className="flex justify-center items-center mb-6">
          <div className="relative w-32 h-32 mb-6">
          {console.log(user.profilePicture)}  
            {/* Display user profile image */}
            {user ? (
                  <img
                  src={
                    isValidBase64Image(user.profilePicture)
                      ?
                       user.profilePicture
                      : "/images/male_avatar.jpg" // Use fallback if invalid or no profile picture
                  }
                  alt={`${user.firstname} ${user.lastname}`}
                  className="w-full h-full rounded-full object-cover"
                />
                ) : (
                  <p>Loading...</p>
                )}

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

            {/* Editable Fields */}
            {[
              { label: "First Name", name: "firstName", value: user.firstname },
              { label: "Last Name", name: "lastName", value: user.lastname },
              { label: "Email", name: "email", value: user.email },
              { label: "Phone Number", name: "phoneNo", value: user.phoneNo },
              { label: "City", name: "city", value: user.city },
              { label: "Province", name: "province", value: user.province },
              { label: "Country", name: "country", value: user.country },
            ].map(({ label, name, value }) => (
              <div className="mb-6" key={name}>
                <label className="block text-gray-600 text-sm">{label}</label>
                {isEditing ? (
                  <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        [name]: e.target.value,
                      }))
                    }
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                ) : (
                  <p className="text-gray-800">{value || "N/A"}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
