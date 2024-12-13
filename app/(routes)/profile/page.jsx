"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Save, Upload, Plus, Trash2 } from "lucide-react";
import BookingHistoryList from "@/app/_components/BookingHistoryList";


const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [certificates, setCertificates] = useState([]);

  // Inside your useEffect hook, after fetching user profile
useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`/api/user/profile/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const userData = response.data.user;

      // Decode certificates data
      const formattedCertificates = (userData.documents || []).map((doc) => ({
        id: doc, // Assuming the ID or unique identifier
        name: `Certificate ${doc}`, // Generate or fetch meaningful names if available
        url: `/api/certificates/${doc}`, // URL endpoint to fetch or view the certificate
      }));

      if (userData.imageURL && userData.imageURL.data) {
        const binaryData = new Uint8Array(userData.imageURL);
        const binaryString = Array.from(binaryData)
          .map((byte) => String.fromCharCode(byte))
          .join("");
        userData.profilePicture = `data:image/jpeg;base64,${btoa(binaryString)}`;
      }

      // // Set category and subcategory names
      // const categoryName = userData.categoryId?.name || "N/A";
      // const subCategoryName = userData.subCategoryId?.name || "N/A";

      const categoriesResponse = await axios.get("/api/category");
        const categories = categoriesResponse.data;
        setCategoryList(categories);

        if (user.categoryId) {
          setSelectedCategory(userData.categoryId);
          const subcategoriesResponse = await axios.get(
            `/api/subcategories?categoryId=${userData.categoryId}`
          );
          const subcategories = subcategoriesResponse.data;
          setSubcategoryList(subcategories);

          if (userData.subCategoryId) {
            setSelectedSubcategory(userData.subCategoryId);
          }
        }

      setUser({
        ...userData,
        categoryName,
        subCategoryName,
      });
      setCertificates(formattedCertificates);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  fetchUserProfile();
}, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubcategoryChange = (index, value) => {
    const updatedSubcategories = [...user.subcategories];
    updatedSubcategories[index] = value;
    setUser((prev) => ({
      ...prev,
      subcategories: updatedSubcategories,
    }));
  };

  const addSubcategory = () => {
    setUser((prev) => ({
      ...prev,
      subcategories: [...prev.subcategories, ""],
    }));
  };

  const removeSubcategory = (index) => {
    const updatedSubcategories = user.subcategories.filter((_, i) => i !== index);
    setUser((prev) => ({
      ...prev,
      subcategories: updatedSubcategories,
    }));
  };


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

  const handleCertificateUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const certificateName = file.name;
      setCertificates((prev) => [...prev, { id: Date.now(), name: certificateName, url: URL.createObjectURL(file) }]);
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
                    src={
                      isValidBase64Image(user.profilePicture)
                        ? user.profilePicture
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
              { label: "Gender", name: "gender", value: user.gender },
              { label: "Address", name: "address", value: user.address }
            ].map(({ label, name, value }) => (
              <div className="mb-6" key={name}>
                <label className="block text-gray-600 text-sm">{label}</label>
                {isEditing ? (
                  <input
                    type="text"
                    name={name}
                    value={value || ""}
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
          
          {/* Category and Subcategories */}
          {/* <div className="mb-6">
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
            </div> */}

              {/* Category Section */}
            <div className="mb-6 border-b pb-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Category</h2>
              {selectedCategory ? (
                <p className="text-gray-800">{categoryList.find((cat) => cat._id === selectedCategory)?.categoryName || "N/A"}</p>
              ) : (
                <p className="text-gray-800">No category selected</p>
              )}
            </div>

            {/* Subcategory Section */}
            {selectedCategory && (
              <div className="mb-6 border-b pb-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Subcategory</h2>
                {selectedSubcategory ? (
                  <p className="text-gray-800">
                    {subcategoryList.find((subcat) => subcat._id === selectedSubcategory)?.subCategoryName || "N/A"}
                  </p>
                ) : (
                  <p className="text-gray-800">No subcategory selected</p>
                )}
              </div>
            )}
          </div>




                {/* Certification Section */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Certification</h2>
                  {isEditing ? (
                    <div>
                      <label className="block text-gray-600 text-sm mb-1">Upload Certification</label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleCertificateUpload}
                        className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer"
                      />
                      {user.uploadedCertification && (
                        <a
                          href={user.uploadedCertification}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 text-blue-500 underline block"
                        >
                          View Uploaded Certification
                        </a>
                      )}
                    </div>
                  ) : (
                    <a
                      href={user.uploadedCertification}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Certification
                    </a>
                  )}
                </div>

                {/* Payment Type and Amount Section */}
                <div className="mb-6">
                  <label className="block text-gray-600 text-sm">Payment Type</label>
                  {isEditing ? (
                    <select
                      name="paymentType"
                      value={user.paymentType}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    >
                      <option value="Hourly">Hourly</option>
                      <option value="Per Job">Per Job</option>
                    </select>
                  ) : (
                    <p className="text-gray-800">{user.wageType}</p>
                  )}
                </div>

                {/* Payment Amount */}
                {user.wageType && (
                  <div className="mb-6">
                    <label className="block text-gray-600 text-sm">Payment Amount</label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="paymentAmount"
                        value={user.paymentAmount}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                    ) : (
                      <p className="text-gray-800">${user.wage}</p>
                    )}
                  </div>
                )}
              </div>
              {/* Right: Past Jobs */}
          <div className="pl-5 w-4/12 border-l-2 border-primary">
            <h2 className="font-bold text-[20px] my-2">Past Jobs</h2>
            <BookingHistoryList />
          </div>
            </div>
          </div>

  );
};

export default UserProfile;
