import { useState } from "react";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const TaskDetailRequestCard = ({ job }) => {
  const [priceType, setPriceType] = useState("hourly"); // default value for priceType
  const [price, setPrice] = useState(""); // state to hold the price
  const [priceError, setPriceError] = useState(""); // state to hold the price validation error
  const [message, setMessage] = useState(""); // state to hold the message
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useContext(UserContext); // Get the current user context

  const submitProposal = async () => {
    // Validate price input
    if (!price || price <= 0) {
      setPriceError("Please enter a valid price greater than 0.");
      return; // Exit the function if the price is invalid
    }
    setPriceError(""); // Clear error if valid

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl text-center font-bold text-gray-700 mb-6">
          Submit Your Proposal
        </h2>
        <label className="block text-gray-700 font-medium mb-2">
          Price Type:
        </label>
        <div className="flex items-center space-x-4 mb-4">
          <button
            className={`py-2 px-4 rounded-md font-medium w-full ${
              priceType === "hourly"
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setPriceType("hourly")}
          >
            Hourly Rate
          </button>
          <button
            className={`py-2 px-4 rounded-md font-medium w-full ${
              priceType === "fixed"
                ? "bg-gray-700 text-white"
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
          className="shadow-inner w-full border-gray-300 rounded-md p-3 mb-2"
          placeholder={`Enter ${
            priceType === "hourly" ? "hourly rate" : "fixed price"
          }`}
        />
        {priceError && (
          <p className="text-red-500 text-sm mb-2">{priceError}</p>
        )}

        <label className="block text-gray-700 font-medium mb-2">
          Message to Client (Optional):
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="shadow-inner w-full border-gray-300 rounded-md p-3 mb-6"
          rows="4"
          placeholder="Write a message explaining your proposal..."
        ></textarea>

        <button
          className="bg-primary text-white py-3 px-6 rounded-md w-full font-semibold shadow-md transition-transform duration-200 hover:scale-[101%] hover:bg-white hover:border-primary hover:text-primary hover:border-2 "
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
    return <div className="p-10 text-primary font-semibold text-xl text-center animate-pulse bg-gray-100 rounded-lg shadow-lg">Loading Proposal Form...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (taskList.length === 0) {
    return <div>No tasks available.</div>;
  }

  return (
    <div>
      <TaskDetailRequestCard job={taskList} />
    </div>
  );
}

export default TaskDetailRequest;
