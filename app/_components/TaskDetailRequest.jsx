import { Calendar, MapPin, User } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import DateFormatter from "./DateFormatter";
import { calculateTimeAgo } from "./calculateTimeAgo";

const TaskDetailRequestCard = ({ job, user, isServiceProvider }) => {

    return (
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
    )
}

function TaskDetailRequest({ taskList = [], loading, error }) {
    
}

export default TaskDetailRequest;