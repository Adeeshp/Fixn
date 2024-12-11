"use client";
import { useState, useEffect } from "react";
import { Mail, Phone, Edit, Save, Upload } from "lucide-react";
import BookingHistoryList from "@/app/_components/BookingHistoryList"; // Adjust the path

const ServiceProviderProfile = ({ userId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from the API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        console.log("API Response:", response); // Debugging log
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const { data } = await response.json();
        console.log("Fetched Data:", data); // Debugging log
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user data:", err.message); // Debugging log
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);
  

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to save user data");
      }
      const updatedData = await response.json();
      setUserData(updatedData);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const { userType, ...formData } = userData;

  return (
    <div className="pt-20 pb-20 mx-20 flex flex-row">
      <div className="lg:w-3/3 md:w-4/4 w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap mt-6">
          {/* Left: Profile Details */}
          <div className="lg:w-7/12 w-full pr-6 border-r border-gray-200">
            <div className="items-center mb-6">
              <div className="relative w-32 h-32 mb-6">
                <img
                  src={formData.profilePicture}
                  alt={`${formData.firstName} ${formData.lastName}`}
                  className="w-full h-full rounded-full object-cover"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer">
                    <Upload className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      // Handle image upload logic
                    />
                  </label>
                )}
              </div>
              <button
                onClick={isEditing ? handleSave : toggleEditMode}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
              >
                {isEditing ? <Save className="mr-2" /> : <Edit className="mr-2" />}
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>

            {/* Render common profile details */}
            <p className="text-gray-800">
              {formData.firstName} {formData.lastName}
            </p>
            {userType === "serviceProvider" && (
              <>
                <p className="text-gray-800">{formData.category}</p>
                <ul>
                  {formData.subcategories.map((subcategory, index) => (
                    <li key={index}>{subcategory}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Right: Past Jobs */}
          {userType === "serviceProvider" && (
            <div className="pl-5 w-4/12 border-l-2 border-primary">
              <h2 className="font-bold text-[20px] my-2">Past Jobs</h2>
              <BookingHistoryList pastJobs={formData.pastJobs} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderProfile;
