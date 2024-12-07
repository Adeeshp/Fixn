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
          )}
          <p className="text-gray-500">
            <strong>Date:</strong> {task.date}
          </p>
          <p
            className={`mb-2 ${
              task.isAccepted ? "text-green-500" : "text-red-500"
            }`}
          >
            <strong>Status:</strong> {task.isAccepted ? "Accepted" : "Rejected"}
          </p>
          <p className="text-gray-500">
            <strong>Location:</strong> {task.location}
          </p>
          <p className="text-gray-500">
            <strong>Total Proposals:</strong> {task.totalProposals}
          </p>
        </div>

        {/* Service Providers */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Service Providers
          </h2>
          {serviceProviders.map((provider) => (
            <div
              key={provider.id}
              className="border rounded-md p-4 mb-4 flex justify-between items-center"
            >
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
