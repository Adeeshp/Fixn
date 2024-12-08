"use client";
import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaTruck,
  FaClock,
  FaStar,
  FaReceipt,
} from "react-icons/fa";

const TaskDetails = () => {
  const task = {
    title: "Fix a Leaking Faucet",
    description:
      "The kitchen faucet is leaking and needs urgent repair to stop water wastage.",
    image:
      "https://media.istockphoto.com/id/182691828/photo/bathroom-faucet.jpg?s=2048x2048&w=is&k=20&c=wSUKHQWM-C0cahFp8aJ8cJcswNNE2mH-3tLRdyECtdY=",
    date: "01-12-2024",
    isAccepted: true,
    location: "123 Maple Street, Springfield",
    totalProposals: 3,
    estimatedTime: "2 hours",
    startTime: "01/12/2024, 10:00 AM",
    endTime: "01/12/2024, 12:00 PM",
    transportRequired: true,
  };

  const [serviceProviders] = useState([
    {
      id: 1,
      name: "John Doe",
      avatar: "https://via.placeholder.com/64",
      status: "Pending",
      dateTime: "01/12/2024, 14:30",
      rating: 4,
      price: "$50/hour",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://via.placeholder.com/64",
      status: "Pending",
      dateTime: "01/12/2024, 15:00",
      rating: 5,
      price: "$100/fixed",
    },
    {
      id: 3,
      name: "Alice Johnson",
      avatar: "https://via.placeholder.com/64",
      status: "Pending",
      dateTime: "01/12/2024, 16:15",
      rating: 3,
      price: "$40/hour",
    },
    {
      id: 4,
      name: "Dakota Johnson",
      avatar: "https://via.placeholder.com/64",
      status: "Pending",
      dateTime: "01/12/2024, 16:15",
      rating: 4,
      price: "$40/hour",
    },
  ]);

  const [showReceipt, setShowReceipt] = useState(false);

  const navigate = (url) => {
    alert(`Navigating to ${url}`);
  };

  const handleProviderAction = (id, action) => {
    alert(`Provider ${id} has been ${action}`);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 m-6">
      {/* Left Panel: Task Details */}
      <div className="relative md:w-1/2 w-full bg-white p-8 shadow-lg rounded-lg">
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
          </div>
        </div>
        <button
          className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg"
          onClick={() => setShowReceipt(true)}
        >
          <FaReceipt size={20} />
        </button>
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
                    className="text-lg font-semibold text-primary cursor-pointer hover:underline"
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
                  <p className="text-gray-500 text-sm">
                    <strong>Price:</strong> {provider.price}
                  </p>
                  <p className="flex items-center text-sm">
                    <strong>Rating:</strong>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`ml-1 ${
                          i < provider.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <div>
                <button
                  className="bg-primary hover:bg-green-600 text-white py-1 px-3 rounded-md mr-2"
                  onClick={() => handleProviderAction(provider.id, "Accepted")}
                >
                  Accept
                </button>
                <button
                  className="bg-red-700 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                  onClick={() => handleProviderAction(provider.id, "Rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskDetails;
