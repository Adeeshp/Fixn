import { Calendar, MapPin, User } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import DateFormatter from "./DateFormatter";
import { calculateTimeAgo } from "./calculateTimeAgo";

const TaskDetailProposalCard = ({ job, user, isServiceProvider }) => {

    return (
        <div className="md:w-1/2 w-full bg-gray-50 p-6 overflow-auto">
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
    )
}

function TaskDetailProposal({ taskList = [], loading, error }) {
    
}

export default TaskDetailProposal;