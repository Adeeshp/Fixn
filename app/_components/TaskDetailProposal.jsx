import { User } from "lucide-react";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
// import axios from "axios";
import DateFormatter from "./DateFormatter";
import convertDateToString from "./convertDateToString";

const TaskDetailProposalCard = ({ job }) => {
  const arrRequest = job.requestId;
  const [loading, setLoading] = useState(null); // Tracks which provider's button is loading
  const [disabled, setDisabled] = useState({}); // Tracks which provider's button is disabled

  // Handle Review Popup
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const openReviewPopup = () => setShowReviewPopup(true);
  const closeReviewPopup = () => setShowReviewPopup(false);

  const submitReview = async (job) => {
    await handleReviewSubmit(job, review, rating);
    setShowReviewPopup(false); // Close popup after submission
  };

  const handleReviewSubmit = async (job, review, rating) => {
    try {
      const userId = getCurrentUserId(job);
      const taskId = job._id;

      if (!userId) {
        alert("User ID is missing or invalid.");
        return;
      }

      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, userId, review, rating }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Review submitted successfully!");
        window.location.reload(); // Refresh the page
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("An error occurred while submitting the review. Please try again.");
    }
  };

  const getCurrentUserId = (job) => {
    if (!job || !job.requestId) return null; // Safeguard against undefined or invalid job object

    const provider = job.requestId.find(
      (provider) => provider.requested_Status === "Accepted"
    );
    return provider ? provider.userId?._id : null; // Return userId if found, otherwise null
  };

  const handleProviderAction = async (providerId, startTime, action) => {
    setLoading(providerId);
    const requestId = providerId;

    try {
      const endpoint =
        action === "Accepted" ? `/api/request/accept` : `/api/request/reject`;

      const requestBody = {
        requestId,
        appointmentDate: convertDateToString(startTime, "MMM d, yyyy"),
        appointmentTime: convertDateToString(startTime, "hh:mm a"),
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setDisabled((prev) => ({ ...prev, [providerId]: true }));
        alert(data.message);
        window.location.reload(); // Refresh the page
      } else {
        alert(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error handling provider action:", error);
      alert("An error occurred, please try again.");
    } finally {
      setLoading(null);
    }
  };

  const updateTask = async (taskId, updateFields) => {
    try {
      const response = await fetch(`/api/task/updateTask/${taskId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateFields),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Task updated successfully!");
        window.location.reload(); // Refresh the page
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error calling updateTask API:", error);
      alert("An error occurred while updating the task status.");
    }
  };

  return (
    <div className="w-full bg-gray-50 px-6 overflow-auto">
      <h2 className="text-3xl font-bold text-gray-700 mb-6 drop-shadow">
        Proposals
      </h2>
      {arrRequest.length === 0 ? (
        <div className="text-center text-gray-500 font-semibold py-4">
          No proposal found
        </div>
      ) : (
        arrRequest.map((provider) => (
          <div
            key={provider._id}
            className="border rounded-lg p-6 mb-6 bg-white shadow transition-transform transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col bg-primary/80 self-start border-primary border-2 text-white drop-shadow rounded-[40px] p-1">
                  <User />
                  {/* <Image
                src={provider.avatar}
                alt={provider.userId?.firstname}
                className="w-12 h-12 rounded-full object-cover"
              /> */}
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold text-primary cursor-pointer hover:underline"
                    onClick={() => navigate(`/profile/${provider.id}`)}
                  >
                    {provider.userId?.firstname} {provider.userId?.lastname}
                  </h3>
                  <p className="flex text-gray-500 text-sm inline gap-1">
                    <strong>Date & Time : </strong>{" "}
                    <DateFormatter
                      formatter="MMM d, yyyy"
                      isoDate={job.taskStartTime}
                    />{" "}
                    <DateFormatter
                      formatter="h:mm a"
                      isoDate={job.taskStartTime}
                    />
                    {/* {provider.createdAt} */}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <strong>Status: </strong>
                    {provider.requested_Status}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <strong>Price : </strong> {"$ "} {provider.wage} {"/"}{" "}
                    {provider.wageType}
                  </p>
                  <p className="flex items-center text-sm">
                    <strong>Rating : </strong>
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
              {provider.requested_Status === "Requested" ? (
                <div>
                  <button
                    className="bg-primary text-white py-1 px-3 rounded-md mr-2 hover:bg-white hover:border-primary hover:text-primary hover:border-2"
                    onClick={() =>
                      handleProviderAction(
                        provider._id,
                        job.taskStartTime,
                        "Accepted"
                      )
                    }
                    disabled={
                      disabled[provider._id] || loading === provider._id
                    }
                  >
                    {loading === provider._id ? "Loading..." : "Accept"}
                  </button>
                  <button
                    className="bg-red-700 text-white py-1 px-3 rounded-md hover:bg-white hover:border-red-700 hover:text-red-700 border-2"
                    onClick={() =>
                      handleProviderAction(
                        provider._id,
                        job.taskStartTime,
                        "Rejected"
                      )
                    }
                    disabled={
                      disabled[provider._id] || loading === provider._id
                    }
                  >
                    {loading === provider._id ? "Loading..." : "Reject"}
                  </button>
                </div>
              ) : provider.requested_Status === "Accepted" ? (
                job.status === "upcoming" ? (
                  <div>
                    <button
                      className="bg-primary text-white py-1 px-3 rounded-md mr-2 hover:bg-white hover:border-primary hover:text-primary hover:border-2"
                      onClick={() => updateTask(job._id, { status: "ongoing" })}
                    >
                      Start Task
                    </button>
                  </div>
                ) : job.status === "ongoing" ? (
                  <div>
                    <button
                      className="bg-primary text-white py-1 px-3 rounded-md mr-2 hover:bg-white hover:border-primary hover:text-primary hover:border-2"
                      onClick={
                        () => updateTask(job._id, { paymentStatus: "requested" }) // Send with "paymentStatus" key
                      }
                    >
                      Make Payment
                    </button>
                  </div>
                ) : (
                  job.status === "completed" && (
                    <div>
                      <button
                        className="bg-primary text-white py-1 px-3 rounded-md mr-2 hover:bg-white hover:border-primary hover:text-primary hover:border-2"
                        onClick={openReviewPopup}
                      >
                        Submit Review
                      </button>
                    </div>
                  )
                )
              ) : (
                <div className="text-red-500">Proposal Rejected</div>
              )}
            </div>
          </div>
        ))
      )}

      {/* Review Modal */}
      {showReviewPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Submit Review</h3>
            <textarea
              className="w-full border p-2 rounded mb-4"
              placeholder="Write your review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <div className="flex items-center mb-4">
              <label className="mr-2">Rating:</label>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={closeReviewPopup}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                onClick={() => submitReview(job)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function TaskDetailProposal({ taskList, loading, error }) {
  const { user } = useContext(UserContext);

  if (loading) {
    return (
      <div className="p-10 text-primary font-semibold text-xl text-center animate-pulse bg-gray-100 rounded-lg shadow-lg">
        Loading Proposals...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (taskList.length === 0) {
    return <div>No tasks available.</div>;
  }

  return (
    <div>
      <TaskDetailProposalCard job={taskList} />
    </div>
  );
}

export default TaskDetailProposal;
