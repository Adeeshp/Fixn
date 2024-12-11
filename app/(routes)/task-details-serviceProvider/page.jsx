"use client";
import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaStar,
  FaInfoCircle,
} from "react-icons/fa";

const ProviderDashboard = () => {
  const task = {
    title: "Fix a Leaking Faucet",
    description:
      "The kitchen faucet is leaking and needs urgent repair to stop water wastage.",
    image:
      "https://media.istockphoto.com/id/182691828/photo/bathroom-faucet.jpg?s=2048x2048&w=is&k=20&c=wSUKHQWM-C0cahFp8aJ8cJcswNNE2mH-3tLRdyECtdY=",
    date: "01-12-2024",
    location: "123 Maple Street, Springfield",
    estimatedTime: "2 hours",
    startTime: "01/12/2024, 10:00 AM",
    endTime: "01/12/2024, 12:00 PM",
  };

  const [priceType, setPriceType] = useState("hourly");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const submitProposal = () => {
    if (!price || parseFloat(price) <= 0) {
      alert("Please enter a valid price.");
      return;
    }
    alert(
      `Proposal Submitted:\nPrice: ${priceType === "hourly" ? `$${price}/hour` : `$${price} fixed`}\nMessage: ${message}`
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 m-6">
      {/* Left Panel: Task Details */}
      <div className="md:w-1/2 w-full bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Task Details</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">
          {task.title}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">{task.description}</p>
        {task.image && (
          <div className="flex justify-center mb-6">
            <img
              src={task.image}
              alt="Task Visual"
              className="w-full max-w-md h-56 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p className="text-gray-500 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-600" />
              <strong>Location:</strong> {task.location}
            </p>
            <p className="text-gray-500 flex items-center">
              <FaClock className="mr-2 text-gray-600" />
              <strong>Date:</strong> {task.date}
            </p>
            <p className="text-gray-500 flex items-center">
              <FaClock className="mr-2 text-gray-600" />
              <strong>Start Time:</strong> {task.startTime}
            </p>
            <p className="text-gray-500 flex items-center">
              <FaClock className="mr-2 text-gray-600" />
              <strong>End Time:</strong> {task.endTime}
            </p>
            <p className="text-gray-500 flex items-center">
              <FaInfoCircle className="mr-2 text-gray-600" />
              <strong>Estimated Time:</strong> {task.estimatedTime}
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel: Proposal Form */}
      <div className="md:w-1/2 w-full bg-gray-50 p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Submit Your Proposal
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <label className="block text-gray-700 font-medium mb-2">
            Price Type:
          </label>
          <div className="flex items-center space-x-4 mb-4">
            <button
              className={`py-2 px-4 rounded-md font-medium ${
                priceType === "hourly"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setPriceType("hourly")}
            >
              Hourly Rate
            </button>
            <button
              className={`py-2 px-4 rounded-md font-medium ${
                priceType === "fixed"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setPriceType("fixed")}
            >
              Fixed Price
            </button>
          </div>

          <label className="block text-gray-700 font-medium mb-2">
            {priceType === "hourly" ? "Hourly Rate ($):" : "Fixed Price ($):"}
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border-gray-300 rounded-md p-3 mb-4"
            placeholder={`Enter ${priceType === "hourly" ? "hourly rate" : "fixed price"}`}
          />

          <label className="block text-gray-700 font-medium mb-2">
            Message to Client (Optional):
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border-gray-300 rounded-md p-3 mb-6"
            rows="4"
            placeholder="Write a message explaining your proposal..."
          ></textarea>

          <button
            className="bg-primary hover:bg-green-600 text-white py-3 px-6 rounded-md w-full font-semibold shadow-md"
            onClick={submitProposal}
          >
            Submit Proposal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
