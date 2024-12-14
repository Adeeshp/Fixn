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
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get(`/api/user/profile`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//  console.log(response.data.user);
//         setUser(response.data.user);
//         setLoading(false);
//       } catch (err) {
//         setError(err.response?.data?.message || "An error occurred");
//         setLoading(false);
//       }
//     };
 
const fetchUserProfile = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Authorization token is missing.");

    const response = await fetch(`/api/user/profile`, {
      method: "GET",
      // headers: {
      //   Authorization: `Bearer ${token}`,
      //   "Content-Type": "application/json",
      // },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("User data fetched:", data.user);
    setUser(data.user);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    setError(err.message || "An unexpected error occurred.");
  } finally {
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
            {/* Display user profile image */}
            {user ? (
               <img
               src={user.profilePicture ? user.profilePicture : '/images/male_avatar.jpg'} // Use a fallback image if no profile picture
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
           {/* Category and Subcategories */}
           <div className="mb-6">
                  <label className="block text-gray-600 text-sm">Category</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="category"
                      value={user.categoryId}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  ) : (
                    <p className="text-gray-800">{user.categoryId}</p>
                  )}
                </div>

                

                <div className="mb-6">
                  <label className="block text-gray-600 text-sm">Subcategories</label>
                  {isEditing ? (
                    <>
                      {user.subcategories.map((subcategory, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="text"
                            value={subcategory}
                            onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-full"
                          />
                          <button
                            className="ml-2 text-red-500"
                            onClick={() => removeSubcategory(index)}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      <button
                        className="flex items-center mt-2 text-blue-500"
                        onClick={addSubcategory}
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Subcategory
                      
                  </button>
                </>
              ) : (
                <ul className="list-disc pl-5 text-gray-800">
                  {user?.subcategories?.map((subcategory, index) => (
                    <li key={index}>{subcategory}</li>
                  )) || <p>No subcategories available</p>}
                </ul>
              )}
            </div>

        </div>
      </div>
    </div>
  );
};
 
export default UserProfile; 