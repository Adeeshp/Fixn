"use client";
import React, { useState } from "react";

const TaskDetails = () => {
  // Static task data
  const task = {
    title: "Fix a Leaking Faucet",
    description: "The kitchen faucet is leaking and needs urgent repair to stop water wastage.",
    image:
      "https://media.istockphoto.com/id/182691828/photo/bathroom-faucet.jpg?s=2048x2048&w=is&k=20&c=wSUKHQWM-C0cahFp8aJ8cJcswNNE2mH-3tLRdyECtdY=", // Real task image
    date: "2024-12-01",
    isAccepted: true,
    location: "123 Maple Street, Springfield",
    totalProposals: 3,
  };

  // Static service providers data
  const [serviceProviders, setServiceProviders] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://via.placeholder.com/64",
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "https://via.placeholder.com/64",
      status: "Pending",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      avatar: "https://via.placeholder.com/64",
      status: "Pending",
    },
  ]);

  // Mock navigate function
  const navigate = (url) => {
    alert(`Navigating to ${url}`); // Simulates navigation
  };

  // Handle provider action
  const handleProviderAction = (providerId, newStatus, pricing = {}) => {
    setServiceProviders((prevProviders) =>
      prevProviders.map((provider) =>
        provider.id === providerId
          ? {
              ...provider,
              status: newStatus,
              pricing: { ...provider.pricing, ...pricing },
            }
          : provider
      )
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="lg:w-1/2 md:w-3/4 w-full bg-white rounded-lg shadow-lg p-6 my-20">
        {/* Task Details */}
        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Task Details
        </h1>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">{task.title}</h2>
          <p className="text-gray-600 mb-4">{task.description}</p>
          {task.image && (
            <img
              src={task.image}
              alt="Task Visual"
              className="w-full h-64 object-cover rounded-md mb-4"
            />
          </div>
        )}
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between mb-4">
            <span className="text-gray-500">
              <strong>Date:</strong> {task.date}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                task.isAccepted
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {task.isAccepted ? "Accepted" : "Rejected"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p className="text-gray-500 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-600" />
              <strong>Location:</strong> {task.location}
            </p>
            <p className="text-gray-500">
              <strong>Proposals :</strong> {task.totalProposals}
            </p>
            <p className="text-gray-500 flex items-center">
              <FaClock className="mr-2 text-gray-600" />
              <strong>Estimated Time:</strong> {task.estimatedTime}
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
              <FaTruck className="mr-2 text-gray-600" />
              <strong>Transport Required:</strong>{" "}
              {task.transportRequired ? "Yes" : "No"}
            </p>
        <button
          className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg"
          onClick={() => setShowReceipt(true)}
        >
          <FaReceipt size={20} />
        </button>
          </div>
        </div>
        {showReceipt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-bold mb-4">Invoice Receipt</h3>
              <table className="table-auto w-full text-sm">
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">Task Title</td>
                    <td className="border px-4 py-2 text-right">
                      {task.title}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Location</td>
                    <td className="border px-4 py-2 text-right">
                      {task.location}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Date</td>
                    <td className="border px-4 py-2 text-right">{task.date}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Service Charge</td>
                    <td className="border px-4 py-2 text-right">$100</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Transport Charge</td>
                    <td className="border px-4 py-2 text-right">$20</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Tax (10%)</td>
                    <td className="border px-4 py-2 text-right">$12</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">Total Amount</td>
                    <td className="border px-4 py-2 text-right font-bold">
                      $132
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md w-full"
                onClick={() => setShowReceipt(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel: Service Providers */}
      <div className="md:w-1/2 w-full bg-gray-50 p-6 overflow-auto    ">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Service Providers
        </h2>
        {serviceProviders.map((provider) => (
          <div
            key={provider.id}
            className="border rounded-lg p-6 mb-6 bg-white shadow transition-transform transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={provider.avatar}
                  alt={provider.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3
                    className="text-lg font-medium text-primary cursor-pointer hover:underline"
                    onClick={() => navigate(`/profile/${provider.id}`)}
                  >
                    {provider.name}
                  </h3>
                  <p className="text-gray-500">{provider.email}</p>
                  <p className="text-gray-500">
                    <strong>Status:</strong> {provider.status}
                  </p>
                </div>
              </div>
              <div className="space-x-2">
                <input
                  type="number"
                  placeholder="Hourly ($)"
                  className="w-24 border px-2 py-1 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                  onChange={(e) =>
                    handleProviderAction(provider.id, "Pending", {
                      hourly: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Fixed ($)"
                  className="w-24 border px-2 py-1 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                  onChange={(e) =>
                    handleProviderAction(provider.id, "Pending", {
                      fixed: e.target.value,
                    })
                  }
                />
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-md"
                  onClick={() => handleProviderAction(provider.id, "Accepted")}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md"
                  onClick={() => handleProviderAction(provider.id, "Rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
