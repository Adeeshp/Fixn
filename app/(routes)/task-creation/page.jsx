"use client";
import React, { useState, useEffect, useContext} from "react";
import { Plus } from "lucide-react";
import { UserContext } from "../../contexts/UserContext";
import Link from "next/link";

const TaskForm = () => {
  const { user } = useContext(UserContext);

  const [estimatedTime, setEstimatedTime] = useState("");
  const [taskStartTime, setTaskStartTime] = useState("");
  const [taskEndTime, setTaskEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [vehicleRequired, setVehicleRequired] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  // Fetch category list on initial render
  useEffect(() => {
    getCategoryList();
  }, []);

  // Fetches category list from the backend API

  const getCategoryList = async () => {
    try {
      const response = await fetch("/api/category");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setCategoryList(data.data);
      } else {
        console.error("Error fetching categories:", data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  //  Fetches subcategories based on the selected category

  const getSubcategoriesByCategory = async (categoryId) => {
    try {
      const response = await fetch(`/api/subcategory/${categoryId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setSubcategoryList(data.data);
      } else {
        console.error("Error fetching subcategories:", data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (address.trim() === "") {
      setError("Address is required");
      return;
    }
    if(!province){
      setError("Province is required");
      return;
    }
    if(!city){
      setError("city is required");
      return;
    }
    if(!zipCode){
      setError("zipCode is required");
      return;
    }
    const zipPattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (!zipPattern.test(zipCode)) {
      setError("Please enter a valid Canadian zip code (e.g., A1A 1A1)");
      return;
    }

    if(!category){
      setError("category is required");
      return;
    }
    if(!subcategory){
      setError("subcategory is required");
      return;
    }

    // if(vehicleRequired != true || vehicleRequired != false){
    //   console.log(vehicleRequired)
    //   setError("vehicleRequired is required");
    //   return;
    // }
    
    if (description.trim() === "") {
      setError("Description is required");
      return;
    }
    if(!estimatedTime){
      setError("estimatedTime is required");
      return;
    }
    if(!taskStartTime){
      setError("taskStartTime is required");
      return;
    }
    if(!taskEndTime){
      setError("taskEndTime is required");
      return;
    }
    
    if (!image) {
      setError("An image is required");
      return;
    }

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("userId", user._id);
      formData.append("categoryId", category);
      formData.append("subCategoryId", subcategory);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("province", province);
      formData.append("zipcode", zipCode);
      formData.append("estimatedTime", estimatedTime);
      formData.append("transportRequired", vehicleRequired);
      formData.append("taskStartTime", taskStartTime);
      formData.append("taskEndTime", taskEndTime);

      const response = await fetch("/api/task", {
        method: "POST",
        body: formData,
      });
      console.log("this is the api", response);
      const data = await response.json();
      console.log("this is the data", data);
      if (response.ok) {
        // Handle successful task creation
        // console.log("Task created successfully:", data);
        alert("Task created successfully");
        <Link href="/posting"/>
      } else {
        setError(data.message || "Task creation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during task creation:", error);
      setError("Server error. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-6 py-10 ">
      <div className="md:w-3/4 w-full bg-white rounded-lg shadow-lg p-10">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          Create Your Task
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="shadow-inner rounded-xl bg-gray-700 p-10 ">
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-white text-sm font-medium mb-1"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="province"
                className="block text-white text-sm font-medium mb-1"
              >
                Province
              </label>
              <select
                id="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full text-gray-700 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select a Province</option>
                <option value="Alberta">Alberta</option>
                <option value="British Columbia">British Columbia</option>
                <option value="Manitoba">Manitoba</option>
                <option value="New Brunswick">New Brunswick</option>
                <option value="Newfoundland and Labrador">
                  Newfoundland and Labrador
                </option>
                <option value="Nova Scotia">Nova Scotia</option>
                <option value="Ontario">Ontario</option>
                <option value="Prince Edward Island">Prince Edward Island</option>
                <option value="Quebec">Quebec</option>
                <option value="Saskatchewan">Saskatchewan</option>
              </select>
            </div>

            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label
                  htmlFor="city"
                  className="block text-white text-sm font-medium mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="zipCode"
                  className="block text-white text-sm font-medium mb-1"
                >
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>  

          {/* Category Section */}
          <div className="mb-6 border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Category
            </h2>
            <label
              htmlFor="category"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Select Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => {
                const selectedCategory = e.target.value;
                setCategory(selectedCategory);
                setSubcategory(""); // Reset subcategory
                if (selectedCategory) {
                  getSubcategoriesByCategory(selectedCategory);
                } else {
                  setSubcategoryList([]); // Clear subcategory list
                }
              }}
              className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out"
            >
              <option value="">Select a category</option>
              {categoryList.length > 0 ? (
                categoryList.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                ))
              ) : (
                <option value="no-category">No categories found</option>
              )}
            </select>
          </div>

          {/* Subcategory Section */}
          {category && (
            <div className="mb-6 border-b pb-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Subcategory
              </h2>
              <label
                htmlFor="subcategory"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Select Subcategory
              </label>
              <select
                id="subcategory"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out"
              >
                <option value="">Select a subcategory</option>
                {subcategoryList.length > 0 ? (
                  subcategoryList.map((subcat) => (
                    <option key={subcat._id} value={subcat._id}>
                      {subcat.subCategoryName}
                    </option>
                  ))
                ) : (
                  <option value="no-subcategory">No subcategories found</option>
                )}
              </select>
            </div>
          )}

          {/* Task Time Details Section */}
          <div className="mb-6 border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Task Time Details
            </h2>
            <div className="mb-4">
              <label
                htmlFor="estimatedTime"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Estimated Time (in hours)
              </label>
              <input
                type="number"
                id="estimatedTime"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="taskStartTime"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Task Start Time
              </label>
              <input
                type="datetime-local"
                id="taskStartTime"
                value={taskStartTime}
                onChange={(e) => setTaskStartTime(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="taskEndTime"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Task End Time
              </label>
              <input
                type="datetime-local"
                id="taskEndTime"
                value={taskEndTime}
                onChange={(e) => setTaskEndTime(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          {/* Vehicle Requirement Section */}
          <div className="mb-6 border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Vehicle Requirement
            </h2>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Is a Vehicle Required?
            </label>
            <div className=" flex gap-5">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="vehicle-required"
                  value="Yes"
                  checked={vehicleRequired === true}
                  onChange={() => setVehicleRequired(true)}
                  className="form-radio text-primary mr-3"
                />
                <span className="text-gray-700">Yes</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="vehicle-required"
                  value="No"
                  checked={vehicleRequired === false}
                  onChange={() => setVehicleRequired(false)}
                  className="form-radio text-primary mr-3"
                />
                <span className="text-gray-700">No</span>
              </label>
            </div>
          </div>
          {/* Task Description Section */}
          <div className="mb-6 border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Task Description
            </h2>
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Describe Your Task
            </label>
            <textarea
              id="description"
              placeholder="Brief description of the task"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className=" w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out resize-none"
              rows="4"
            />
          </div>

          {/* Image Upload Section */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Upload an Image (Optional)
            </label>
            <div
              className="relative m-auto mt-5 w-80 h-80 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-primary transition duration-200 ease-in-out"
              onClick={() => document.getElementById("fileInput")}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <Plus className="text-gray-400  text-4xl" />
              )}
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`bg-primary hover:bg-white hover:border-primary hover:text-primary border-2 border-transparent cursor-pointer text-white font-semibold rounded-md py-3 px-4 w-full transition duration-200 ease-in-out ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isProcessing}
          >
            {isProcessing ? "Creating Task..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
