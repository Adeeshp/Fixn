"use client";
import React, { useState } from "react";

const TaskDetails = () => {
  const task = {
    title: "Fix a Leaking Faucet",
    description: "The kitchen faucet is leaking and needs urgent repair to stop water wastage.",
    image:
      "https://media.istockphoto.com/id/182691828/photo/bathroom-faucet.jpg?s=2048x2048&w=is&k=20&c=wSUKHQWM-C0cahFp8aJ8cJcswNNE2mH-3tLRdyECtdY=",
    date: "01-12-2024",
    isAccepted: true,
    location: "123 Maple Street, Springfield",
    totalProposals: 3,
  };

  const [serviceProviders] = useState([
    {
      id: 1,
      name: "John Doe",
      avatar: "https://via.placeholder.com/64",
      status: "Pending",
      dateTime: "01/12/2024, 14:30",
      rating: 4,
      review: "John did an excellent job. Highly professional and quick!",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://via.placeholder.com/64",
      status: "Pending",
      dateTime: "01/12/2024, 15:00",
      rating: 5,
      review: "Jane was fantastic! She fixed everything perfectly.",
    },
    {
      id: 3,
      name: "Alice Johnson",
      avatar: "https://via.placeholder.com/64",
      status: "Pending",
      dateTime: "01/12/2024, 16:15",
      rating: 3,
      review: "Alice was okay, but she took longer than expected.",
    },
  ]);

  const navigate = (url) => {
    alert(`Navigating to ${url}`);
  };

  const handleProviderAction = (providerId, newStatus) => {
    // Update status logic
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 m-6">
      {/* Left Panel: Task Details */}
      <div className="md:w-1/2 w-full bg-white p-8 shadow-md rounded-lg ">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Details</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{task.title}</h2>
        <p className="text-gray-600 leading-relaxed mb-6">{task.description}</p>
        {task.image && (
          <div className="flex justify-center mb-6">
            <img
              src={task.image}
              alt="Task Visual"
              className="w-3/4 max-w-sm h-40 object-cover rounded-md"
            />
          </div>
        )}
        <p className="text-gray-500 mb-4">
          <strong>Date:</strong> {task.date}
        </p>
        <p className={`mb-4 ${task.isAccepted ? "text-green-500" : "text-red-500"}`}>
          <strong>Status:</strong> {task.isAccepted ? "Accepted" : "Rejected"}
        </p>
        <p className="text-gray-500 mb-4">
          <strong>Location:</strong> {task.location}
        </p>
        <p className="text-gray-500 mb-6">
          <strong>Total Proposals:</strong> {task.totalProposals}
        </p>
        <div className="flex justify-center ">
        <button
          onClick={() => navigate("/home")}
          className="bg-green-600 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow"
        >
          Back to Home
        </button>
        </div>
      </div>

      {/* Right Panel: Service Providers */}
      <div className="md:w-1/2 w-full bg-gray-50 p-6 overflow-y-auto ">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Service Providers</h2>
        {serviceProviders.map((provider) => (
          <div key={provider.id} className="border rounded-lg p-6 mb-6 bg-white shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={provider.avatar}
                  alt={provider.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3
                    className="text-lg font-semibold text-blue-600 cursor-pointer hover:underline"
                    onClick={() => navigate(`/profile/${provider.id}`)}
                  >
                    {provider.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    <strong>Date & Time:</strong> {provider.dateTime}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <strong>Status:</strong> {provider.status}
                  </p>
                  <p className="flex items-center text-sm">
                    <strong>Rating:</strong>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`ml-1 ${i < provider.rating ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        ★
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <div>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md mr-2"
                  onClick={() => handleProviderAction(provider.id, "Accepted")}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                  onClick={() => handleProviderAction(provider.id, "Rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
            {/* Review Section */}
            <div className="mt-4 border-t pt-2">
              <h4 className="text-sm font-medium text-gray-700">Customer Review:</h4>
              <p className="text-gray-600 text-sm">{provider.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskDetails;
