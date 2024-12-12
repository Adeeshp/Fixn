import { useState } from "react";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const TaskDetailRequestCard = ({ job }) => {
  const [priceType, setPriceType] = useState("hourly"); // default value for priceType
  const [price, setPrice] = useState(""); // state to hold the price
  const [message, setMessage] = useState(""); // state to hold the message
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useContext(UserContext); // Get the current user context

  const submitProposal = async () => {
    if (!price || price <= 0) {
      alert("Please enter a valid price.");
      return; // Exit the function if the price is invalid
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId: job._id,
          userId: user._id, // Assuming user object has an ID
          wageType: priceType,
          wage: price,
          requested_Status: "Requested", // Or other status based on your use case
          description: message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Proposal submitted successfully");
      } else {
        throw new Error(data.message || "Failed to submit proposal");
      }
    } catch (error) {
      setError(error.message);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

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
          placeholder={`Enter ${
            priceType === "hourly" ? "hourly rate" : "fixed price"
          }`}
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
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Proposal"}
        </button>

        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

function TaskDetailRequest({ taskList, loading, error }) {
  const { user } = useContext(UserContext);

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <TaskDetailRequestCard job={taskList} />
    </div>
  );
}

export default TaskDetailRequest;
