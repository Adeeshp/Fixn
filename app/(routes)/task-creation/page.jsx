"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

const TaskForm = () => {
  const [taskSize, setTaskSize] = useState('');
  const [taskType, setTaskType] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [category, setCategory] = React.useState("");
const [subcategory, setSubcategory] = React.useState("");
const [vehicleRequired, setVehicleRequired] = useState('');
    const [address, setAddress] = useState(""); // Add this state for the address
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    updateProgress();
  }, [address, taskSize, taskType, description, image, vehicleRequired]);

  const handleContinue = (e) => {
    e.preventDefault();
    setError('');

    if (address.trim() === '') {
      setError('Address is required');
      return;
    }

    if (taskSize === '') {
      setError('Please select a task size');
      return;
    }

    if (taskType === '') {
      setError('Please select a task type');
      return;
    }

    if (description.trim() === '') {
      setError('Description is required');
      return;
    }

    if (!image) {
      setError('An image is required');
      return;
    }

    // Form submission logic here
    console.log("Address:", address);
    console.log("Task Size:", taskSize);
    console.log("Task Type:", taskType);
    console.log("Description:", description);
    console.log("Image:", image);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const updateProgress = () => {
    let filledFields = 0;
    if (address) filledFields++;
    if (taskSize) filledFields++;
    if (taskType) filledFields++;
    if (description) filledFields++;
    if (image) filledFields++;
    setProgress((filledFields / 5) * 100);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-6 pt-40 pb-24 ">
      <div className="lg:w-1/2 md:w-3/4 w-full bg-white rounded-lg shadow-lg p-10">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Task Details</h1>

        {/* Enhanced Progress Bar */}
        <div className="w-full bg-gray-200 h-1.5 rounded-full mb-6 relative flex">
          <div
            style={{ width: `${Math.min(progress, 20)}%` }}
            className={`h-1.5 rounded-l-full ${progress >= 20 ? 'bg-yellow-500' : 'bg-gray-300'} transition-all duration-300`}
          ></div>
          <div
            style={{ width: `${Math.max(0, progress - 20)}%` }}
            className={`h-1.5 ${progress >= 40 ? 'bg-blue-500' : 'bg-gray-300'} transition-all duration-300`}
          ></div>
          <div
            style={{ width: `${Math.max(0, progress - 40)}%` }}
            className={`h-1.5 ${progress >= 60 ? 'bg-purple-500' : 'bg-gray-300'} transition-all duration-300`}
          ></div>
          <div
            style={{ width: `${Math.max(0, progress - 60)}%` }}
            className={`h-1.5 ${progress >= 80 ? 'bg-green-500' : 'bg-gray-300'} transition-all duration-300`}
          ></div>
          <div
            style={{ width: `${Math.max(0, progress - 80)}%` }}
            className={`h-1.5 rounded-r-full ${progress === 100 ? 'bg-pink-500' : 'bg-gray-300'} transition-all duration-300`}
          ></div>
        </div>

        <form onSubmit={handleContinue}>
          {/* Address Section */}
          <div className="mb-6 border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Task Location</h2>
            <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-2">
              Street Address
            </label>
            <div className="relative">
              <input
                type="text"
                id="address"
                placeholder="Street address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out"
                autoComplete="off"
              />
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="absolute right-3 top-3 text-gray-400"
              />
            </div>
          </div>
          <div className="mb-4">
  <label
    htmlFor="country"
    className="block text-gray-600 text-sm font-medium mb-1"
  >
    Country
  </label>
  <input
    type="text"
    id="country"
    value="Canada"
    readOnly
    className="w-full border border-gray-300 rounded-md py-2 px-3 bg-gray-100 cursor-not-allowed focus:outline-none"
  />
</div>

<div className="mb-4">
  <label
    htmlFor="province"
    className="block text-gray-600 text-sm font-medium mb-1"
  >
    Province
  </label>
  <select
    id="province"
    value={province}
    onChange={(e) => setProvince(e.target.value)}
    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
  >
    <option value="">Select a Province</option>
    <option value="Alberta">Alberta</option>
    <option value="British Columbia">British Columbia</option>
    <option value="Manitoba">Manitoba</option>
    <option value="New Brunswick">New Brunswick</option>
    <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
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
      className="block text-gray-600 text-sm font-medium mb-1"
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
      className="block text-gray-600 text-sm font-medium mb-1"
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

        {/* Category Section */}
<div className="mb-6 border-b pb-4">
  <h2 className="text-lg font-semibold text-gray-700 mb-3">Category</h2>
  <label htmlFor="category" className="block text-gray-700 text-sm font-medium mb-2">
    Select Category
  </label>
  <select
    id="category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out"
  >
    <option value="">Select a category</option>
    <option value="Cleaning">Cleaning</option>
    <option value="Maintenance">Maintenance</option>
    <option value="Delivery">Delivery</option>
    <option value="Shopping">Shopping</option>
  </select>
</div>

{/* Subcategory Section */}
{category && (
  <div className="mb-6 border-b pb-4">
    <h2 className="text-lg font-semibold text-gray-700 mb-3">Subcategory</h2>
    <label htmlFor="subcategory" className="block text-gray-700 text-sm font-medium mb-2">
      Select Subcategory
    </label>
    <select
      id="subcategory"
      value={subcategory}
      onChange={(e) => setSubcategory(e.target.value)}
      className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out"
    >
      <option value="">Select a subcategory</option>
      {category === "Cleaning" && (
        <>
          <option value="Home Cleaning">Home Cleaning</option>
          <option value="Office Cleaning">Office Cleaning</option>
          <option value="Deep Cleaning">Deep Cleaning</option>
        </>
      )}
      {category === "Maintenance" && (
        <>
          <option value="Electrical">Electrical</option>
          <option value="Plumbing">Plumbing</option>
          <option value="HVAC">HVAC</option>
        </>
      )}
      {category === "Delivery" && (
        <>
          <option value="Food Delivery">Food Delivery</option>
          <option value="Parcel Delivery">Parcel Delivery</option>
          <option value="Grocery Delivery">Grocery Delivery</option>
        </>
      )}
      {category === "Shopping" && (
        <>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Groceries">Groceries</option>
        </>
      )}
    </select>
  </div>
)}

          {/* Task Size Section */}
          <div className="mb-6 border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Task Size</h2>
            <label className="block text-gray-700 text-sm font-medium mb-2">Select Task Size</label>
            <div className="space-y-3">
              {["Small - Est. 1 hr", "Medium - Est. 2-3 hrs", "Large - Est. 4+ hrs"].map((size) => (
                <label key={size} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="task-size"
                    value={size}
                    checked={taskSize === size}
                    onChange={(e) => setTaskSize(e.target.value)}
                    className="form-radio text-primary mr-3"
                  />
                  <span className="text-gray-700">{size}</span>
                </label>
              ))}
            </div>
          </div>
  {/* Vehicle Requirement Section */}
  <div className="mb-6 border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Vehicle Requirement</h2>
            <label className="block text-gray-700 text-sm font-medium mb-2">Is a Vehicle Required?</label>
            <div className="space-y-3">
              {['Yes', 'No'].map((option) => (
                <label key={option} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="vehicle-required"
                    value={option}
                    checked={vehicleRequired === option}
                    onChange={(e) => setVehicleRequired(e.target.value)}
                    className="form-radio text-primary mr-3"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Task Description Section */}
          <div className="mb-6 border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Task Description</h2>
            <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">
              Describe Your Task
            </label>
            <textarea
              id="description"
              placeholder="Brief description of the task"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out"
              rows="4"
            />
          </div>

           {/* Image Upload Section */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Upload an Image (Optional)</label>
            <div
              className="relative m-auto mt-5 w-80 h-80 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-primary transition duration-200 ease-in-out"
              onClick={() => document.getElementById("fileInput").click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-md" />
              ) : (
                <FontAwesomeIcon icon={faPlus} className="text-gray-400 text-4xl" />
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
          <button
            type="submit"
            className="bg-primary hover:bg-white hover:border-primary hover:text-primary border-2 border-transparent text-white font-semibold rounded-md py-3 px-4 w-full transition duration-200 ease-in-out"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
