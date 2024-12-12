"use client";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskDetailDescription from '@/app/_components/TaskDetaiDescription';
import TaskDetailProposal from "@/app/_components/TaskDetailProposal";
import TaskDetailRequest from "@/app/_components/TaskDetailRequest";
import { FaMapMarkerAlt, FaTruck, FaClock, FaStar, FaReceipt, } from "react-icons/fa";
import { useRouter } from 'next/router';

const TaskDetails = () => {
  const router = useRouter();
  // const job = router.state?.job;
  console.log("Job Details:", router);

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
      <TaskDetailDescription />

      {/* Right Panel: Service Providers */}
      <div className="md:w-1/2 w-full bg-gray-50 p-6 overflow-auto    ">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Proposals
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
